import { PageDescription } from "@/components/PageDescription";
import { TransactionsFilter } from "./components/TransactionsFilter";
import { TransactionsTable } from "./components/TransactionsTable";
import { useState } from "react";
import type { Transaction } from "@/types";
import { CreateTransactionModal } from "./components/CreateTransactionModel";

export function Transaction(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTransactionType, setNewTransactionType] = useState('OUTCOME')
    const [newTransactionDescription, setNewTransactionDescription] = useState('')
    const [newTransactionSelectedDate, setNewTransactionSelectedDate] = useState<Date | undefined>(undefined)
    const [newTransactionValue, setNewTransactionValue] = useState(0)
    const [newTransactionCategory, setNewTransactionCategory] = useState('')
    //const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    //const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
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

            <PageDescription 
                title="Transações"
                description="Gerencie todas as suas transações financeiras"
                buttonTitle="Nova transação"
                onClick={handleOpenModal}
            />

            <TransactionsFilter 

            />

            <TransactionsTable 
            
            />
        </>
    )
}