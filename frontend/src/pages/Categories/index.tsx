import { PageDescription } from "@/components/PageDescription";
import { CategoryStatisticsCards } from "./components/CategoryStatisticsCard";
import { Tag, ArrowUpDown } from "lucide-react"
import { CategoryCard } from "./components/CategoryCard";
import { DesiredIcon } from "@/components/desiredIcon";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories";
import { useQuery } from "@apollo/client/react";
import type { Category } from "@/types";

export function Categories(){
    const { data } = useQuery<{listCategoriesFromOwner: Category[] }>(LIST_CATEGORIES)

    const categories = data?.listCategoriesFromOwner || []

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

            <div className="mt-10 grid grid-cols-4 gap-10">
                {
                    categories.map((category, index) => (
                        <CategoryCard 
                            key={index}
                            title={category.title}
                            description={category.description}
                            totalOfTransactions={category.totalOfTransactions}
                            color={category.color}
                            icon={<DesiredIcon key={index} icon={category.icon} color={category.color} />}
                        />
                    ))
                }
            </div>
        </>
    )
}