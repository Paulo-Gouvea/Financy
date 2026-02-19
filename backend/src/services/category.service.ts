import { prismaClient } from "../../prisma/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

export class CategoryService {
    async listAllCategories() {
        const categories = await prismaClient.category.findMany()

        return categories;
    }

    async listCategoriesFromOwner(ownerId: string){
        const [categories, incomesList, outcomesList] = await Promise.all([
            prismaClient.category.findMany({
                where: { ownerId },
                include: {
                    _count: {
                        select: { transactions: true }
                    }
                }
            }),

            prismaClient.transaction.groupBy({
                by: ['categoryId'],
                where: {
                    ownerId,
                    type: 'INCOME'
                },
                _sum: {
                    valueInCents: true
                }
            }),

            prismaClient.transaction.groupBy({
                by: ['categoryId'],
                where: {
                    ownerId,
                    type: 'OUTCOME'
                },
                _sum: {
                    valueInCents: true
                }
            })
        ])

        const formattedCategories = categories.map(category => {
            const income =
                incomesList.find(t => t.categoryId === category.id)?._sum.valueInCents ?? 0

            const outcome =
                outcomesList.find(t => t.categoryId === category.id)?._sum.valueInCents ?? 0

            return {
                categoryId: category.id,
                ownerId: category.ownerId,
                title: category.title,
                description: category.description,
                icon: category.icon,
                color: category.color,
                totalOfTransactions: category._count.transactions,
                balance: income - outcome
            }
        })

        return formattedCategories
    }

    async getCategoryWithTheMostTransactions(ownerId: string) {
        const category = await prismaClient.category.findFirst({
            where: {
                ownerId,
                transactions: {
                    some: {}
                }
            },
            include: {
                _count: {
                    select: { transactions: true }
                }
            },
            orderBy: {
                transactions: {
                    _count: 'desc'
                }
            }
        })

        if (!category) return null

        return {
            id: category.id,
            title: category.title,
            description: category.description,
            icon: category.icon,
            color: category.color,
            totalOfTransactions: category._count.transactions
        }
    }

    async countCategoriesFromOwner(ownerId: string){
        return prismaClient.category.count({
            where: {
                ownerId: ownerId
            }
        })
    }

    async findCategoryById(id: string){
        const category = await prismaClient.category.findUnique({
            where: {
                id
            }
        })

        if(!category) throw new Error('Categoria não encontrada no sistema!')

        return category
    }

    async createCategory(data: CreateCategoryInput, ownerId: string) {
        const findCategory = await prismaClient.category.findUnique({
            where: {
               title: data.title 
            }
        })

        if(findCategory) throw new Error('Categoria já cadastrada no sistema!')

        return prismaClient.category.create({
            data: {
                title: data.title,
                description: data.description,
                icon: data.icon,
                color: data.color,
                ownerId: ownerId
            }
        })
    }
    
    async updateCategory(id: string, data: UpdateCategoryInput){
        const category = await prismaClient.category.findUnique({
            where: {
                id,
            }
        })

        if(!category) throw new Error('Categoria não encontrada no sistema!')

        return prismaClient.category.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                icon: data.icon,
                color: data.color
            }
        })
    }

    async deleteCategory(id: string){
        const findCategory = await prismaClient.category.findUnique({
            where: {
                id,
            }
        })
        if(!findCategory) throw new Error('Categoria não encontrada no sistema!')
        return prismaClient.category.delete({
            where: {
                id
            }
        })
    }
}