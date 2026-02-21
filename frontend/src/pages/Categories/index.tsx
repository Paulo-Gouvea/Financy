import { PageDescription } from "@/components/PageDescription";
import { CategoryStatisticsCards } from "./components/CategoryStatisticsCard";
import { Tag, ArrowUpDown } from "lucide-react"
import { CategoryCard } from "./components/CategoryCard";
import { DesiredIcon } from "@/components/desiredIcon";
import { LIST_CATEGORIES, COUNT_CATEGORIES, GET_CATEGORIES_WITH_THE_MOST_TRANSACTIONS } from "@/lib/graphql/queries/categories";
import { COUNT_TRANSACTIONS } from "@/lib/graphql/queries/transactions"; 
import { useQuery } from "@apollo/client/react";
import type { Category } from "@/types";

export function Categories(){
    const { data: categoriesData } = useQuery<{listCategoriesFromOwner: Category[] }>(LIST_CATEGORIES)
    const { data: categoriesTotal } = useQuery<{countCategoriesFromOwner: number }>(COUNT_CATEGORIES)
    const { data: transactionsTotal } = useQuery<{countTransactionsFromOwner: number }>(COUNT_TRANSACTIONS)
    const { data: categoryWithTheMostTransactions } = useQuery<{getCategoryWithTheMostTransactions: Category }>(GET_CATEGORIES_WITH_THE_MOST_TRANSACTIONS)

    const categories = categoriesData?.listCategoriesFromOwner || []
    const totalOfCategories = categoriesTotal?.countCategoriesFromOwner ?? 0
    const totalOfTransactions = transactionsTotal?.countTransactionsFromOwner ?? 0
    const desiredCategory = categoryWithTheMostTransactions?.getCategoryWithTheMostTransactions 

    console.log('desiredCategory ===> ' +JSON.stringify(desiredCategory))

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
                    info={totalOfCategories.toString()}
                    description="TOTAL DE CATEGORIAS"
                />

                <CategoryStatisticsCards 
                    icon={<ArrowUpDown className="mt-2 text-purple-500" />}
                    info={totalOfTransactions.toString()}
                    description="TOTAL DE TRANSAÇÕES"
                />

                <CategoryStatisticsCards 
                    icon={<DesiredIcon icon={desiredCategory?.icon ?? "X"} color={desiredCategory?.color || "gray"} />}
                    info={desiredCategory?.title ?? 'Categoria não encontrada!'}
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