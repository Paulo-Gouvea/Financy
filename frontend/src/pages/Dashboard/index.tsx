import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { DashboardStatisticsCards } from "./components/DashboardStatisticsCards";
import { DashboardTransactionsTable } from "./components/DashboardTransactionsTable";
import { DashboardCategoriesTable } from "./components/DashboardCategoriesTable";

export function Dashboard () {
    return (
        <>
            <div className="w-full flex justify-between mt-10">
                <DashboardStatisticsCards 
                    icon={<Wallet className="text-purple-500" />}
                    info="SALDO TOTAL"
                    value="R$ 12.847,32"
                />
                <DashboardStatisticsCards 
                    icon={<CircleArrowUp className="text-green-500" />}
                    info="RECEITAS DO MÊS"
                    value="R$ 4.250,00"
                />
                <DashboardStatisticsCards 
                    icon={<CircleArrowDown className="text-red-500" />}
                    info="DESPESAS DO MÊS"
                    value="R$ 2.180,45"
                />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-32 col-span-2">
                <DashboardTransactionsTable
                
                />

                <DashboardCategoriesTable 
                
                />
            </div>
        </>
    )
}