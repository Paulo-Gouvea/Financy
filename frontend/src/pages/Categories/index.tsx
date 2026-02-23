import { PageDescription } from "@/components/PageDescription";
import { CategoryStatisticsCards } from "./components/CategoryStatisticsCard";
import { Tag, ArrowUpDown } from "lucide-react"
import { CategoryCard } from "./components/CategoryCard";
import { DesiredIcon } from "@/components/DesiredIcon";
import { LIST_CATEGORIES, COUNT_CATEGORIES, GET_CATEGORIES_WITH_THE_MOST_TRANSACTIONS } from "@/lib/graphql/queries/categories";
import { COUNT_TRANSACTIONS } from "@/lib/graphql/queries/transactions"; 
import { useMutation, useQuery } from "@apollo/client/react";
import type { Category } from "@/types";
import { CreateCategoryModal } from "@/pages/Categories/components/CreateCategoryModal";
import { useState } from "react";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/category";
import { toast } from "sonner";
import { UpdateCategoryModal } from "./components/UpdateCategoryModal";

export function Categories(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategoryTitle, setNewCategoryTitle] = useState(''); 
    const [newCategoryDescription, setNewCategoryDescription] = useState(''); 
    const [newCategoryIcon, setNewCategoryIcon] = useState('BriefcaseBusiness')
    const [newCategoryColor, setNewCategoryColor] = useState('green')
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const { data: categoriesData } = useQuery<{listCategoriesFromOwner: Category[] }>(LIST_CATEGORIES)
    const { data: categoriesTotal } = useQuery<{countCategoriesFromOwner: number }>(COUNT_CATEGORIES)
    const { data: transactionsTotal } = useQuery<{countTransactionsFromOwner: number }>(COUNT_TRANSACTIONS)
    const { data: categoryWithTheMostTransactions } = useQuery<{getCategoryWithTheMostTransactions: Category }>(GET_CATEGORIES_WITH_THE_MOST_TRANSACTIONS)

    const categories = categoriesData?.listCategoriesFromOwner || []
    const totalOfCategories = categoriesTotal?.countCategoriesFromOwner ?? 0
    const totalOfTransactions = transactionsTotal?.countTransactionsFromOwner ?? 0
    const desiredCategory = categoryWithTheMostTransactions?.getCategoryWithTheMostTransactions 

    type DeleteCategoryMutationData = { deleteCategory: boolean }
    type DeleteCategoryVariables = {
        deleteCategoryId: string,
    }

    const [deleteCategoryMutation] = useMutation<
        DeleteCategoryMutationData,
        DeleteCategoryVariables
    >(DELETE_CATEGORY, {
        onCompleted: (res: DeleteCategoryMutationData) => {
            const deletedCategoryResponse = res.deleteCategory
            console.log(deletedCategoryResponse)
        },
        refetchQueries: [
            { query: LIST_CATEGORIES },
            { query: COUNT_CATEGORIES }
        ],
        awaitRefetchQueries: true
    })

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleOpenUpdateModal = (category: Category) => {
        setSelectedCategory(category);
        setNewCategoryTitle(category.title);
        setNewCategoryDescription(category.description);
        setNewCategoryIcon(category.icon);
        setNewCategoryColor(category.color);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteCategory = async (categoryId: string) => {
        try {
            await deleteCategoryMutation({
                variables: {
                    deleteCategoryId: categoryId
                }
            })

            toast.success("Categoria excluida com sucesso!")
        } catch (error) {
            toast.error("Erro ao excluir a categoria!")
            console.log(error)
        } 
    }

    return (
        <>
            <CreateCategoryModal 
                open={isModalOpen}
                setOpen={setIsModalOpen}
                title="Nova categoria"
                categoryTitle={newCategoryTitle}
                setCategoryTitle={setNewCategoryTitle}
                categoryDescription={newCategoryDescription}
                setCategoryDescription={setNewCategoryDescription}
                description="Organize suas transações com categorias"
                selectedIcon={newCategoryIcon}
                setSelectedIcon={setNewCategoryIcon}
                selectedColor={newCategoryColor}
                setSelectedColor={setNewCategoryColor}
            />

            <UpdateCategoryModal
                open={isUpdateModalOpen}
                setOpen={setIsUpdateModalOpen}
                title="Atualizar Categoria"
                description="Atualize os detalhes da categoria"
                categoryTitle={newCategoryTitle}
                setCategoryTitle={setNewCategoryTitle}
                categoryDescription={newCategoryDescription}
                setCategoryDescription={setNewCategoryDescription}
                selectedIcon={newCategoryIcon}
                setSelectedIcon={setNewCategoryIcon}
                selectedColor={newCategoryColor}
                setSelectedColor={setNewCategoryColor}
                selectedCategory={selectedCategory}
            />

            <PageDescription 
                title="Categorias"
                description="Organize suas transações por categorias"
                buttonTitle="Nova categoria"
                onClick={handleOpenModal}
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
                    categories.map((category) => (
                        <CategoryCard 
                            key={category.id}
                            title={category.title}
                            description={category.description}
                            totalOfTransactions={category.totalOfTransactions}
                            color={category.color}
                            icon={<DesiredIcon key={category.id} icon={category.icon} color={category.color} />}
                            onDelete={() => handleDeleteCategory(category.id)}
                            onEdit={() => handleOpenUpdateModal(category)}
                        />
                    ))
                }
            </div>
        </>
    )
}