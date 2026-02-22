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
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ModalProps {
  open: boolean
  title: string
  description: string
  transactionType?: string
  transactionDescription: string
  setOpen: (open: boolean) => void
  setTransactionType?: (type: string) => void
  setTransactionDescription: (value: string) => void
}

export function CreateTransactionModal({
  open,
  setOpen,
  title,
  description,
  transactionType = 'OUTCOME',
  transactionDescription,
  setTransactionType,
  setTransactionDescription,
}: ModalProps) {
    const [date, setDate] = useState<Date | undefined>()

  useEffect(() => {

  }, [])


  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault() 

    const data = {
        transactionType,
        transactionDescription
    }

    console.log('data ===> ' +JSON.stringify(data))
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
                            {date ? date.toLocaleDateString("pt-BR") : "Selecione"}
                        </span>
                    </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(day) => setDate(day)}
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
                        //value={transactionDescription}
                        //onChange={(e) => setTransactionDescription(e.target.value)}
                        className="pl-3 py-6 placeholder:text-black"
                        required
                    />
                </Field>  
            </div>
            <Field>
                    <Label htmlFor="title">Categoria</Label>
                    <Select>
                        <SelectTrigger className="w-[220px] px-4 py-5">
                            <SelectValue className="text-gray-400" placeholder="Selecione" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="receitas">Receitas</SelectItem>
                            <SelectItem value="despesas">Despesas</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="submit" className="w-full" /*disabled={loading} */>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}