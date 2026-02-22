import { PageDescription } from "@/components/PageDescription";
import { TransactionsFilter } from "./components/TransactionsFilter";
import { TransactionsTable } from "./components/TransactionsTable";
import { useState } from "react";
import type { Transaction } from "@/types";
import { CreateTransactionModal } from "./components/CreateTransactionModel";
import { FILTER_TRANSACTIONS } from "@/lib/graphql/queries/transactions";
import { useQuery } from "@apollo/client/react";

export function Transaction(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTransactionType, setNewTransactionType] = useState('OUTCOME')
    const [newTransactionDescription, setNewTransactionDescription] = useState('')
    const [newTransactionSelectedDate, setNewTransactionSelectedDate] = useState<Date | undefined>(undefined)
    const [newTransactionValue, setNewTransactionValue] = useState(0)
    const [newTransactionCategory, setNewTransactionCategory] = useState('')
    //const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    //const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false)
    const [descriptionInput, setDescriptionInput] = useState('')
    const [typeInput, setTypeInput] = useState('')
    const [categoryInput, setCategoryInput] = useState('')
    const [periodInput, setPeriodInput] = useState<Date | null>(null)

    const { data: transactionsData, refetch: filterTransactionRefetch } = useQuery<{
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

    console.log('transactionsData?.filterTransactions ===> ' +JSON.stringify(transactionsData?.filterTransactions))

    const transactions = transactionsData?.filterTransactions.transactions || [];
    const totalOfTransactions = transactionsData?.filterTransactions.totalOfTransactions || 0
    const page = transactionsData?.filterTransactions.page || 1
    const perPage = transactionsData?.filterTransactions.perPage || 0
    const totalPages = transactionsData?.filterTransactions.totalPages || 0
    const hasPreviousPage = transactionsData?.filterTransactions.hasPreviousPage || false
    const hasNextPage = transactionsData?.filterTransactions.hasNextPage || false

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleChangePage = (newPage: number) => {

        filterTransactionRefetch({
            data: {
                description: descriptionInput,
                type: typeInput,
                categoryId: categoryInput,
                selectedDate: periodInput,
                page: newPage
            }
        });
    };


    return (
        <>
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

            <PageDescription 
                title="Transações"
                description="Gerencie todas as suas transações financeiras"
                buttonTitle="Nova transação"
                onClick={handleOpenModal}
            />

            <TransactionsFilter 

            />

            <TransactionsTable 
                transactions={transactions}
                totalOfTransactions={totalOfTransactions}
                page={page}
                perPage={perPage}
                hasPreviousPage={hasPreviousPage}
                hasNextPage={hasNextPage}
                onChangePage={handleChangePage}
                totalPages={totalPages}
            />
        </>
    )
}