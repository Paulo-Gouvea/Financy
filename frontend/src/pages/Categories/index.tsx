import { PageDescription } from "@/components/PageDescription";
import { CategoryStatisticsCards } from "./components/CategoryStatisticsCard";
import { Tag, ArrowUpDown } from "lucide-react"

export function Categories(){
    return (
        <>
            <PageDescription 
                title="Categorias"
                description="Organize suas transações por categorias"
                buttonTitle="Nova categoria"
                onClick={() => console.log()}
            />

            <div className="w-full mt-8 flex justify-between">
                <CategoryStatisticsCards 
                    icon={<Tag className="mt-2" />}
                    info="8"
                    description="TOTAL DE CATEGORIAS"
                />

                <CategoryStatisticsCards 
                    icon={<ArrowUpDown className="mt-2 text-purple-500" />}
                    info="27"
                    description="TOTAL DE TRANSAÇÕES"
                />

                <CategoryStatisticsCards 
                    icon=""
                    info="Alimentação"
                    description="CATEGORIA MAIS UTILIZADA"
                />
            </div>

            
        </>
    )
}