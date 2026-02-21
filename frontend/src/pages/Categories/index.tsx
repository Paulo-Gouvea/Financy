import { PageDescription } from "@/components/PageDescription";
import { CategoryStatisticsCards } from "./components/CategoryStatisticsCard";
import { Tag, ArrowUpDown } from "lucide-react"
import { CategoryCard } from "./components/CategoryCard";
import { DesiredIcon } from "@/components/desiredIcon";

export function Categories(){
    const categories = [
        {
            title: "Alimentação",
            description: "Restaurante, delivery e refeições",
            count: 12,
            icon: "ForkKnife",
            color: "blue"
        },
        {
            title: "Alimentação",
            description: "Restaurante, delivery e refeições",
            count: 12,
            icon: "Ticket",
            color: "pink"
        },
        {
            title: "Alimentação",
            description: "Restaurante, delivery e refeições",
            count: 12,
            icon: "PiggyBank",
            color: "green"
        },
        {
            title: "Alimentação",
            description: "Restaurante, delivery e refeições",
            count: 12,
            icon: "ShoppingCart",
            color: "orange"
        },
        {
            title: "Alimentação",
            description: "Restaurante, delivery e refeições",
            count: 12,
            icon: "BriefcaseBusiness",
            color: "green"
        },
        {
            title: "Alimentação",
            description: "Restaurante, delivery e refeições",
            count: 12,
            icon: "HeartPulse",
            color: "red"
        },
        {
            title: "Alimentação",
            description: "Restaurante, delivery e refeições",
            count: 12,
            icon: "CarFront",
            color: "purple"
        },
        {
            title: "Alimentação",
            description: "Restaurante, delivery e refeições",
            count: 12,
            icon: "ToolCase",
            color: "yellow"
        }
    ]

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
                            count={category.count}
                            color={category.color}
                            icon={<DesiredIcon key={index} icon={category.icon} color={category.color} />}
                        />
                    ))
                }
            </div>
        </>
    )
}