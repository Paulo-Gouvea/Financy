import { Card } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories";
import type { Category, Transaction } from "@/types";
import { useQuery } from "@apollo/client/react";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transactions";

interface TransactionsFilterProps {
    description: string
    setDescription: (value: string) => void
    type: string
    setType: (value: string) => void
    category: string
    setCategory: (value: string) => void
    selectedDate: Date | undefined
    setSelectedDate: (value: Date | undefined) => void
}

function formatDateToDDMMYYYY(d: Date) {
  const date = new Date(d);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function TransactionsFilter({
    description,
    setDescription,
    type,
    setType,
    category,
    setCategory,
    selectedDate,
    setSelectedDate
}: TransactionsFilterProps) {
    const { data: categoriesData } = useQuery<{listCategoriesFromOwner: Category[] }>(LIST_CATEGORIES)
    const { data: transactionsData } = useQuery<{listTransactionsFromOwner: Transaction[] }>(LIST_TRANSACTIONS)
    const categories = categoriesData?.listCategoriesFromOwner || []
    const allUserTransactions = transactionsData?.listTransactionsFromOwner || [] 
    const formattedTransactionsDates= allUserTransactions.map(transaction => transaction.selectedDate)

    const desiredTransactionsDates = formattedTransactionsDates.map(date => {
        return {
            data: date,
            formattedDate: formatDateToDDMMYYYY(date)
        }
    })

    const arraySemDuplicados = Array.from(
        new Map(desiredTransactionsDates.map(item => [item.data, item])).values()
    );

    const handleFilterTransactions = () => {
        console.log("description => " +description)
        console.log("type => " +type)
        console.log("category => " +category)
        console.log("selectedDate => " +selectedDate)
    }

    return(
        <Card className="mt-6">
            <FieldGroup className="px-6 pt-6 pb-8 flex flex-row items-center justify-center">
                <Field>
                    <Label htmlFor="description">Buscar</Label>
                    <div className="relative w-full">
                        <Search onClick={handleFilterTransactions} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground text-gray-400 hover:cursor-pointer hover:opacity-60"/>
                        <Input 
                            id="description"
                            type="text"
                            placeholder="Buscar por descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="pl-10 py-6 placeholder:text-gray-400"
                            required
                        />
                    </div>
                </Field>

                <Field>
                    <Label htmlFor="title">Tipo</Label>
                    <Select onValueChange={(type) => setType(type)}>
                        <SelectTrigger className="w-[220px] px-4 py-6">
                            <SelectValue className="py-8" placeholder="Todas" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="todas">Todas</SelectItem>
                            <SelectItem value="OUTCOME">Despesa</SelectItem>
                            <SelectItem value="INCOME">Receita</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <Label htmlFor="title">Categoria</Label>
                    <Select onValueChange={(category) => setCategory(category)}>
                        <SelectTrigger className="w-[220px] px-4 py-6">
                            <SelectValue className="py-8" placeholder="Todas" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="todas">Todas</SelectItem>
                            {
                                categories.map((cat) => (
                                    <SelectItem value={cat.id}>{cat.title}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <Label htmlFor="title">Período</Label>
                    <Select onValueChange={(selectedDate) => setSelectedDate(new Date(selectedDate))}>
                        <SelectTrigger className="w-[220px] px-4 py-6">
                            <SelectValue className="py-8" placeholder="Todas" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="todas">Todos</SelectItem>
                            {
                                arraySemDuplicados.map((date) => (
                                    <SelectItem value={date.data.toString()}>
                                        {date.formattedDate}
                                    </SelectItem>
                                ))
                            } 
                        </SelectContent>
                    </Select>
                </Field>
          </FieldGroup>
        </Card>
    )
}