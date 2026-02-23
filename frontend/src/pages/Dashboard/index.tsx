import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { DashboardStatisticsCards } from "./components/DashboardStatisticsCards";
import { DashboardTransactionsTable } from "./components/DashboardTransactionsTable";
import { DashboardCategoriesTable } from "./components/DashboardCategoriesTable";
import { FILTER_TRANSACTIONS, GET_TOTAL_INCOME_FROM_CURRENT_MONTH, GET_TOTAL_OUTCOME_FROM_CURRENT_MONTH, GET_TOTAL_VALUE } from "@/lib/graphql/queries/transactions";
import { useQuery } from "@apollo/client/react";
import type { Category, Transaction } from "@/types";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories";
import { CreateTransactionModal } from "../Transactions/components/CreateTransactionModel";
import { useState } from "react";

export function Dashboard () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTransactionType, setNewTransactionType] = useState('OUTCOME')
    const [newTransactionDescription, setNewTransactionDescription] = useState('')
    const [newTransactionSelectedDate, setNewTransactionSelectedDate] = useState<Date | undefined>(undefined)
    const [newTransactionValue, setNewTransactionValue] = useState(0)
    const [newTransactionCategory, setNewTransactionCategory] = useState('')

    const { data: totalValueData } = useQuery<{getTotalValue: number }>(GET_TOTAL_VALUE)
    const { data: totalIncomeData } = useQuery<{getTotalIncomeFromCurrentMonth: number }>(GET_TOTAL_INCOME_FROM_CURRENT_MONTH)
    const { data: totalOutcomeData } = useQuery<{getTotalIncomeOutcomeFromCurrentMonth: number }>(GET_TOTAL_OUTCOME_FROM_CURRENT_MONTH)
    const { data: categoriesData } = useQuery<{listCategoriesFromOwner: Category[] }>(LIST_CATEGORIES)

    const totalValue = totalValueData?.getTotalValue || 0
    const formattedValue = totalValue / 100

    const totalIncomeValue = totalIncomeData?.getTotalIncomeFromCurrentMonth || 0   
    const formattedTotalIncomeValue = totalIncomeValue / 100

    const totalOutcomeValue = totalOutcomeData?.getTotalIncomeOutcomeFromCurrentMonth || 0
    const formattedTotalOutcomeValue = totalOutcomeValue / 100

    const categories = categoriesData?.listCategoriesFromOwner || []
    const negativeCategoriesList = categories.filter((category) => category.balance < 0)

    const { data: transactionsData } = useQuery<{
        filterTransactions: {
            transactions: Transaction[]
            totalOfTransactions: number
            page: number
            perPage: number
            totalPages: number
            hasNextPage: boolean
            hasPreviousPage: boolean
        }
        }>(FILTER_TRANSACTIONS, {
        variables: { data: {} }
    });

    const reducedTransactionsList = transactionsData ? transactionsData?.filterTransactions.transactions.slice(0, 5) : [];

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="w-full flex justify-between mt-10">
                <DashboardStatisticsCards 
                    icon={<Wallet className="text-purple-500" />}
                    info="SALDO TOTAL"
                    value={`${formattedValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}`}
                />
                <DashboardStatisticsCards 
                    icon={<CircleArrowUp className="text-green-500" />}
                    info="RECEITAS DO MÊS"
                    value={`${formattedTotalIncomeValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}`}
                />
                <DashboardStatisticsCards 
                    icon={<CircleArrowDown className="text-red-500" />}
                    info="DESPESAS DO MÊS"
                    value={`${formattedTotalOutcomeValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}`}
                />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-32 col-span-2">
                <DashboardTransactionsTable
                    transactions={reducedTransactionsList}
                    onClick={handleOpenModal}
                />

                <DashboardCategoriesTable 
                    categories={negativeCategoriesList}
                />
            </div>

            <CreateTransactionModal 
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Nova Transação"
                description="Registre sua despesa ou receita"
                transactionType={newTransactionType}
                setTransactionType={setNewTransactionType}
                transactionDescription={newTransactionDescription}
                setTransactionDescription={setNewTransactionDescription}
                transactionSelectedDate={newTransactionSelectedDate}
                setTransactionSelectedDate={setNewTransactionSelectedDate}
                transactionValue={newTransactionValue}
                setTransactionValue={setNewTransactionValue}
                transactionCategory={newTransactionCategory}
                setTransactionCategory={setNewTransactionCategory}
            />
        </>
    )
}