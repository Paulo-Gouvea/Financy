import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { 
    CircleArrowDown,
    CircleArrowUp
} from "lucide-react"

import { Calendar } from "@/components/ui/calendar"

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories"
import type { Category, Transaction as TransactionType } from "@/types"
import { useMutation, useQuery } from "@apollo/client/react"
import { DesiredIcon } from "@/components/DesiredIcon"
import { UPDATE_TRANSACTION } from "@/lib/graphql/mutations/transaction"
import { toast } from "sonner"
import { FILTER_TRANSACTIONS } from "@/lib/graphql/queries/transactions"
import { useEffect } from "react"

interface UpdateTransactionModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  description: string
  transactionType?: string
  setTransactionType: (type: string) => void
  transactionDescription: string
  setTransactionDescription: (value: string) => void
  transactionSelectedDate: Date | undefined
  setTransactionSelectedDate: (value: Date | undefined) => void
  transactionValue: number
  setTransactionValue: (value: number) => void
  transactionCategory: string
  setTransactionCategory: (value: string) => void
  selectedTransaction: TransactionType | null
}

export function UpdateTransactionModal({
  open,
  setOpen,
  title,
  description,
  transactionType,
  transactionDescription,
  transactionSelectedDate,
  transactionValue,
  transactionCategory,
  setTransactionType,
  setTransactionDescription,
  setTransactionSelectedDate,
  setTransactionCategory,
  setTransactionValue,
  selectedTransaction
}: UpdateTransactionModalProps) {
  useEffect(() => {
  if (!selectedTransaction) return;

  console.log("selectedTransaction ==> " +JSON.stringify(selectedTransaction));

  setTransactionType(selectedTransaction.type);
  setTransactionDescription(selectedTransaction.description ?? '');
  setTransactionSelectedDate(
    selectedTransaction.selectedDate
      ? new Date(selectedTransaction.selectedDate)
      : undefined
  );
  setTransactionValue(selectedTransaction.value);
  setTransactionCategory(selectedTransaction.category?.id || '');
}, [selectedTransaction, setTransactionCategory, setTransactionDescription, setTransactionSelectedDate, setTransactionType, setTransactionValue]);

    const { data: categoriesData } = useQuery<{listCategoriesFromOwner: Category[] }>(LIST_CATEGORIES)
    
    const categories = categoriesData?.listCategoriesFromOwner || []

    type UpdateTransactionMutationData = { updateTransaction: TransactionType }
    type UpdateTransactionVariables = {
        updateTransactionId: string,
        data: {
            type?: string,
            description?: string,
            value?: number,
            selectedDate?: Date
            categoryId: string
        }
    }

      const [updateTransactionMutation, { loading }] = useMutation<
        UpdateTransactionMutationData,
        UpdateTransactionVariables
      >(UPDATE_TRANSACTION, {
        onCompleted(res: UpdateTransactionMutationData){
        console.log(res)
          toast.success("Transação atualizada com sucesso")

          setTransactionType('OUTCOME')
          setTransactionDescription('')
          setTransactionSelectedDate(undefined)
          setTransactionValue(0) 
          setTransactionCategory('')
    
          setOpen(false) 
        },
        onError(error) {
          toast.error(error.message)
        },
        refetchQueries: [
          { query: FILTER_TRANSACTIONS, variables: { data: {} } },
          { query: LIST_CATEGORIES }
        ],
        awaitRefetchQueries: true
      })


  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault() 
    if (!selectedTransaction) return

    updateTransactionMutation({
      variables: {
        updateTransactionId: selectedTransaction.id,
        data: {
            type: transactionType,
            description: transactionDescription,
            value: transactionValue,
            selectedDate: transactionSelectedDate,
            categoryId: transactionCategory
        }
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-4">
            <Field>
              <div className="w-full p-2 border border-solid border-gray-300 rounded-md">
                <Button 
                    type="button"
                    className={`w-1/2 bg-white shadow-none ${transactionType === 'OUTCOME' ? 'border border-solid border-red-500' : ''}`}
                    onClick={() => setTransactionType && setTransactionType('OUTCOME')}
                >
                    <CircleArrowDown className={transactionType === 'OUTCOME' ? "text-red-500" : "text-gray-400"} />
                    <p className="text-gray-800">Despesa</p>
                </Button>
                <Button 
                    type="button"
                    className={`w-1/2 bg-white shadow-none ${transactionType === 'INCOME' ? 'border border-solid border-green-500' : ''}`}
                    onClick={() => setTransactionType && setTransactionType('INCOME')}
                >
                    <CircleArrowUp className={transactionType === 'INCOME' ? "text-green-500" : "text-gray-400"} />
                    <p className="text-gray-800">Receita</p>
                </Button>
              </div>
            </Field>
            <Field>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                type="text"
                placeholder="Ex. Almoço no restaurante"
                value={transactionDescription}
                onChange={(e) => setTransactionDescription(e.target.value)}
                className="pl-3 py-6 placeholder:text-gray-400"
                required
              />
            </Field>
            <div className="flex gap-4">
                <Field>
                <Label htmlFor="selectedDate">Data</Label>

                <Popover >
                    <PopoverTrigger className="border border-solid border-gray-300 shadow-none" asChild>
                    <Button
                        id="selectedDate"
                        type="button"
                        className="w-full justify-between py-6 pl-3 font-normal bg-white hover:bg-white"
                    >
                        <span className="text-muted-foreground">
                            {transactionSelectedDate ? transactionSelectedDate.toLocaleDateString("pt-BR") : "Selecione"}
                        </span>
                    </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={transactionSelectedDate}
                        onSelect={(day) => setTransactionSelectedDate(day)}
                    />
                    </PopoverContent>
                </Popover>
                </Field>  
                <Field>
                    <Label htmlFor="value">Valor</Label>
                    <Input
                        id="value"
                        type="number"
                        step="0.01"
                        placeholder="R$   0,00"
                        value={transactionValue}
                        onChange={(e) => setTransactionValue(parseFloat(e.target.value))}
                        className="pl-3 py-6 placeholder:text-black"
                        required
                    />
                </Field>  
            </div>
            <Field>
                    <Label htmlFor="title">Categoria</Label>
                    <Select value={transactionCategory} onValueChange={(category) => setTransactionCategory(category)}>
                        <SelectTrigger className="w-[220px] px-4 py-5">
                            <SelectValue className="text-gray-400" placeholder="Selecione" />
                        </SelectTrigger>

                        <SelectContent>
                            {
                                categories.map((category) => (
                                    <div className="flex p-4 gap-2 items-center">
                                        <DesiredIcon key={category.id} icon={category.icon} color={category.color} />
                                        <SelectItem className="bg-white text-black hover:text-black hover:bg-white" id={category.id} value={category.id}>{category.title}</SelectItem>
                                    </div>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="submit" className="w-full" disabled={loading}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}