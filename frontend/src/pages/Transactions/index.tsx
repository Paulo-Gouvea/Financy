import { PageDescription } from "@/components/PageDescription";
import { TransactionsFilter } from "./components/TransactionsFilter";
import { TransactionsTable } from "./components/TransactionsTable";

export function Transaction(){
    return (
        <>
            <PageDescription 
                title="Transações"
                description="Gerencie todas as suas transações financeiras"
                buttonTitle="Nova transação"
                onClick={() => console.log('teste modal')}
            />

            <TransactionsFilter 

            />

            <TransactionsTable 
            
            />
        </>
    )
}