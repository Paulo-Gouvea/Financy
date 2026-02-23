import { PageDescription } from "@/components/PageDescription";
import { TransactionsFilter } from "./components/TransactionsFilter";
import { TransactionsTable } from "./components/TransactionsTable";
import { useState } from "react";
import type { Transaction } from "@/types";
import { CreateTransactionModal } from "./components/CreateTransactionModel";
import { FILTER_TRANSACTIONS } from "@/lib/graphql/queries/transactions";
import { useMutation, useQuery } from "@apollo/client/react";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/transaction";
import { toast } from "sonner";
import { UpdateTransactionModal } from "./components/UpdateTransactionModel";

export function Transaction(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTransactionType, setNewTransactionType] = useState('OUTCOME')
    const [newTransactionDescription, setNewTransactionDescription] = useState('')
    const [newTransactionSelectedDate, setNewTransactionSelectedDate] = useState<Date | undefined>(undefined)
    const [newTransactionValue, setNewTransactionValue] = useState(0)
    const [newTransactionCategory, setNewTransactionCategory] = useState('')
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false)
    const [descriptionInput, setDescriptionInput] = useState('')
    const [typeInput, setTypeInput] = useState('')
    const [categoryInput, setCategoryInput] = useState('')
    const [periodInput, setPeriodInput] = useState<Date | undefined>(undefined)

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
    variables: { data: {
        description: "",
        type: "",
        categoryId: "",
        selectedDate: null,
        page: 1
    } }
    });

    type DeleteTransactionMutationData = { deleteTransaction: boolean }
        type DeleteTransactionVariables = {
            deleteTransactionId: string,
        }
    
        const [delecteTransactionMutation] = useMutation<
            DeleteTransactionMutationData,
            DeleteTransactionVariables
        >(DELETE_TRANSACTION, {
            onCompleted: (res: DeleteTransactionMutationData) => {
                const deletedCategoryResponse = res.deleteTransaction
                console.log(deletedCategoryResponse)
            },
            refetchQueries: [
                { query: FILTER_TRANSACTIONS, variables: {data: {}} },
            ],
            awaitRefetchQueries: true
        })

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
                type: typeInput === "todas" ? "" : typeInput,
                categoryId: categoryInput === "todas" ? "" : categoryInput,
                selectedDate: periodInput ?? null,
                page: newPage
            }
        });
    };

    const handleSearch = () => {
    filterTransactionRefetch({
        data: {
            description: descriptionInput,
            type: typeInput === "todas" ? "" : typeInput,
            categoryId: categoryInput === "todas" ? "" : categoryInput,
            selectedDate: periodInput ?? null,
            page: 1
        }
    });
};

    const handleOpenUpdateModal = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setNewTransactionType(transaction.type);
        setNewTransactionDescription(transaction.description ?? '');
        setNewTransactionSelectedDate(
        transaction.selectedDate
            ? new Date(transaction.selectedDate)
            : undefined
        );
        setNewTransactionValue(transaction.value)
        setIsUpdatedModalOpen(true);
    };

    const handleDeleteTransaction = async (transactionId: string) => {
        try {
            await delecteTransactionMutation({
                variables: {
                    deleteTransactionId: transactionId
                }
            })

            toast.success("Transação excluida com sucesso!")
        } catch (error) {
            toast.error("Erro ao excluir a transação!")
            console.log(error)
        } 
    }

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

            <UpdateTransactionModal 
                open={isUpdatedModalOpen}
                setOpen={setIsUpdatedModalOpen}
                title="Atualizar Transação"
                description="Atualize os detalhes da transação"
                transactionType={newTransactionType}
                transactionDescription={newTransactionDescription}
                transactionSelectedDate={newTransactionSelectedDate}
                transactionValue={newTransactionValue}
                transactionCategory={newTransactionCategory}
                setTransactionType={setNewTransactionType}
                setTransactionDescription={setNewTransactionDescription}
                setTransactionSelectedDate={setNewTransactionSelectedDate}
                setTransactionCategory={setNewTransactionCategory}
                setTransactionValue={setNewTransactionValue}
                selectedTransaction={selectedTransaction}
            />

            <PageDescription 
                title="Transações"
                description="Gerencie todas as suas transações financeiras"
                buttonTitle="Nova transação"
                onClick={handleOpenModal}
            />

            <TransactionsFilter 
                description={descriptionInput}
                setDescription={setDescriptionInput}
                setType={setTypeInput}
                setCategory={setCategoryInput}
                setSelectedDate={setPeriodInput}
                onSearch={handleSearch}
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
                onDelete={handleDeleteTransaction}
                onEdit={handleOpenUpdateModal}
            />
        </>
    )
}