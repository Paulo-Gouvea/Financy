import { prismaClient } from "../../prisma/prisma";
import { CreateTransactionInput, FilterTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { fromCents, toCents } from "../utils/format";

export class TransactionService {
    async listAllTransactions(){
        const transactions = await prismaClient.transaction.findMany()

        return transactions.map(transaction => ({
            ...transaction,
            value: fromCents(transaction.valueInCents)
        }))
    }

    async listTransactionsFromOwner(ownerId: string){
        const transactions = await prismaClient.transaction.findMany({
            where: {
                ownerId: ownerId
            }
        })

        return transactions.map(transaction => ({
            ...transaction,
            value: fromCents(transaction.valueInCents)
        }))
    }

    async countTransactionsFromOwner(ownerId: string){
        return prismaClient.transaction.count({
            where: {
                ownerId: ownerId
            }
        })
    }

    async getTotalValue(ownerId: string){
        const incomes = await prismaClient.transaction.aggregate({
            where: {
            ownerId,
            type: 'INCOME'
            },
            _sum: {
            valueInCents: true
            }
        })

        const outcomes = await prismaClient.transaction.aggregate({
            where: {
            ownerId,
            type: 'OUTCOME'
            },
            _sum: {
            valueInCents: true
            }
        })

        const total = (incomes._sum.valueInCents ?? 0) - (outcomes._sum.valueInCents ?? 0)

        return total
    }

    async getTotalFromCurrentMonth(ownerId: string, type: string){
        const actualDate = new Date()

        const startOfMonth = new Date(actualDate.getFullYear(), actualDate.getMonth(), 1)
        const startOfNextMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 1)

        let total = 0;

        if(type === 'INCOME'){
            const incomes = await prismaClient.transaction.aggregate({
                where: {
                ownerId,
                type: 'INCOME',
                selectedDate: {
                    gte: startOfMonth,
                    lt: startOfNextMonth
                }
                },
                _sum: {
                valueInCents: true
                }
            })

            total = incomes._sum.valueInCents ?? 0
        } else if(type === 'OUTCOME'){
            const outcomes = await prismaClient.transaction.aggregate({
                where: {
                ownerId,
                type: 'OUTCOME',
                selectedDate: {
                    gte: startOfMonth,
                    lt: startOfNextMonth
                }
                },
                _sum: {
                valueInCents: true
                }
            })

            total = outcomes._sum.valueInCents ?? 0
        }

        return total
    }
    
    async filterTransactions(ownerId: string, data?: FilterTransactionInput) {
        if(data === null) {
            data = {}
        }

        const page = data?.page ?? 1
        const perPage = data?.perPage ?? 10

        const safePage = Math.max(1, page)
        const safePerPage = Math.min(perPage, 100)

        const skip = (safePage - 1) * safePerPage

        const where: any = {
            ownerId,
        }

        if (data?.description) {
            where.description = {
                contains: data.description,
            }
        }

        if (data?.type) {
            where.type = data.type
        }

        if (data?.categoryId) {
            where.categoryId = data.categoryId
        }

        if (data?.selectedDate) {
            where.selectedDate = data.selectedDate
        }

        const [transactions, total] = await Promise.all([
            prismaClient.transaction.findMany({
                where,
                orderBy: {
                    selectedDate: 'desc'
                },
                skip,
                take: safePerPage,
            }),

            prismaClient.transaction.count({
                where
            })
        ])

        const formattedTransactions = transactions.map(transaction => ({
            ...transaction,
            value: fromCents(transaction.valueInCents)
        }))

        const totalPages = Math.ceil(total / safePerPage)

        return {
            transactions: formattedTransactions,
            totalOfTransactions: total,
            page: safePage,
            perPage: safePerPage,
            totalPages,
            hasNextPage: safePage < totalPages,
            hasPreviousPage: safePage > 1
        }
    }

    async createTransaction(data: CreateTransactionInput, ownerId: string){
        const transaction = await prismaClient.transaction.create({
            data: {
                type: data.type,
                description: data.description,
                selectedDate: data.selectedDate,
                valueInCents: toCents(data.value),
                category: {
                    connect: { id: data.categoryId }
                },
                owner: {
                    connect: { id: ownerId }
                }
            }
        })

        return {
            ...transaction, 
            value: fromCents(transaction.valueInCents)
        }
    }

    async updateTransaction(id: string, data: UpdateTransactionInput){
        const transaction = await prismaClient.transaction.findUnique({
            where: {
                id,
            }
        })

        if(!transaction) throw new Error('Categoria não encontrada no sistema!')

        const updatedTransaction =  await prismaClient.transaction.update({
            where: { id },
            data: {
                type: data.type,
                description: data.description,
                selectedDate: data.selectedDate,
                valueInCents: toCents(data.value),
            }
        })

        return {
            ...updatedTransaction,
            value: fromCents(updatedTransaction.valueInCents)
        }
    }

    async deleteTransaction(id: string){
        const findTransaction = await prismaClient.transaction.findUnique({
            where: {
                id,
            }
        })
        if(!findTransaction) throw new Error('Transação não encontrada no sistema!')
        return prismaClient.transaction.delete({
            where: {
                id
            }
        })
    }
}