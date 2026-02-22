import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Trash,
  SquarePen,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronLeft,
  ChevronRight,
  ReceiptText,
  Mailbox,
  BaggageClaim,
  BookOpen,
  Dumbbell,
  Gift,
  House,
  PawPrint,
  ForkKnife,
  ToolCase,
  Ticket,
  ShoppingCart,
  PiggyBank,
  HeartPulse,
  CarFront,
  BriefcaseBusiness,
  X
} from "lucide-react"

import type { Transaction } from "@/types"

interface TransactionsTableProps {
  transactions: Transaction[]
  totalOfTransactions: number
  page: number
  perPage: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  totalPages: number
  onChangePage: (page: number) => void
}

const iconMap = new Map<string, React.ElementType>([
  ["BriefcaseBusiness", BriefcaseBusiness],
  ["CarFront", CarFront],
  ["HeartPulse", HeartPulse],
  ["PiggyBank", PiggyBank],
  ["ShoppingCart", ShoppingCart],
  ["Ticket", Ticket],
  ["ToolCase", ToolCase],
  ["ForkKnife", ForkKnife],
  ["PawPrint", PawPrint],
  ["House", House],
  ["Gift", Gift],
  ["Dumbbell", Dumbbell],
  ["BookOpen", BookOpen],
  ["BaggageClaim", BaggageClaim],
  ["Mailbox", Mailbox],
  ["ReceiptText", ReceiptText],
])

const colorMap: Record<
  string,
  { bg: string; text: string; icon: string; iconBg: string }
> = {
  green: {
    bg: "bg-green-200",
    text: "text-green-600",
    icon: "text-green-600",
    iconBg: "bg-green-100",
  },
  blue: {
    bg: "bg-blue-200",
    text: "text-blue-600",
    icon: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  purple: {
    bg: "bg-purple-200",
    text: "text-purple-600",
    icon: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  pink: {
    bg: "bg-pink-200",
    text: "text-pink-600",
    icon: "text-pink-600",
    iconBg: "bg-pink-100",
  },
  red: {
    bg: "bg-red-200",
    text: "text-red-600",
    icon: "text-red-600",
    iconBg: "bg-red-100",
  },
  orange: {
    bg: "bg-orange-200",
    text: "text-orange-600",
    icon: "text-orange-600",
    iconBg: "bg-orange-100",
  },
  yellow: {
    bg: "bg-yellow-200",
    text: "text-yellow-600",
    icon: "text-yellow-600",
    iconBg: "bg-yellow-100",
  },
}

function getTypeStyle(type: string) {
  if (type === "INCOME") {
    return {
      label: "Entrada",
      className: "text-green-600",
      icon: ArrowUpCircle,
    }
  }

  return {
    label: "Saída",
    className: "text-red-600",
    icon: ArrowDownCircle,
  }
}

function formatDateToDDMMYYYY(d: Date) {
  const date = new Date(d);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Janeiro é 0
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

function getNumberButton(hasPreviousPage: boolean, hasNextPage: boolean, totalOfTransactions: number, page: number, totalPages: number,  onChangePage: (page: number) => void ){
  console.log(totalOfTransactions)
  console.log(page)


  if(totalOfTransactions > 0 && totalOfTransactions <= 10){
    return (
      <Button size="icon" variant="outline" disabled={true} onClick={() => onChangePage(1)}>
        1
      </Button>
    )
  } else if(totalOfTransactions > 10 && totalOfTransactions <= 20){
    return (
      <>
        <Button size="icon" variant="outline" disabled={!hasPreviousPage} onClick={() => onChangePage(1)} >
        1
      </Button>

      <Button size="icon" variant="outline" disabled={!hasNextPage} onClick={() => onChangePage(2)} >
        2
      </Button>
      </>
    )
  } else if(totalOfTransactions > 20){
    if(page === 1 || page === 2) {
      return (
      <>
        <Button size="icon" variant="outline" disabled={page === 1} onClick={() => onChangePage(1)}>
          1
        </Button>

        <Button size="icon" variant="outline" disabled={page === 2} onClick={() => onChangePage(2)}>
          2
        </Button>

        <Button size="icon" variant="outline" onClick={() => onChangePage(3)}>
          3
        </Button>
      </>
    )
    } else if(page >= 2){
      const actualPage = totalPages - page;

      if(actualPage === 0){
        return (
          <>
            <Button size="icon" variant="outline" onClick={() => onChangePage(page - 2)}>
              {page - 2}
            </Button>

            <Button size="icon" variant="outline" onClick={() => onChangePage(page - 1)}>
              {page - 1 }
            </Button>

            <Button size="icon" variant="outline" disabled={true} onClick={() => onChangePage(page)}>
              {page}
            </Button>
          </>
        )
      } else if(actualPage >= 1) {
        return (
          <>
            <Button size="icon" variant="outline" onClick={() => onChangePage(page - 1)}>
              {page - 1}
            </Button>

            <Button size="icon" variant="outline" onClick={() => onChangePage(page)}>
              {page}
            </Button>

            <Button size="icon" variant="outline" onClick={() => onChangePage(page + 1)}>
              {page + 1}
            </Button>
          </>
        )
      }
    }
  }
}

export function TransactionsTable({
  transactions,
  totalOfTransactions,
  page,
  perPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onChangePage
}: TransactionsTableProps) {
  return (
    <Card className="mt-7 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead className="text-gray-500 p-4">
              Descrição
            </TableHead>
            <TableHead className="text-center text-gray-500 p-4">
              Data
            </TableHead>
            <TableHead className="text-center text-gray-500 p-4">
              Categoria
            </TableHead>
            <TableHead className="text-center text-gray-500 p-4">
              Tipo
            </TableHead>
            <TableHead className="text-right text-gray-500 p-4">
              Valor
            </TableHead>
            <TableHead className="text-right text-gray-500 p-4">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => {
            const type = getTypeStyle(transaction.type)

            const Icon =
              iconMap.get(transaction.category?.icon ?? "") ?? X

            const color =
              colorMap[transaction.category?.color ?? "blue"] ??
              colorMap.blue

            const TypeIcon = type.icon

            return (
              <TableRow
                className="hover:bg-white"
                key={transaction.id}
              >
                {/* Descrição */}
                <TableCell>
                  <div className="flex items-center gap-3 py-2 px-2">
                    <div className={`p-2 rounded-md ${color.iconBg}`}>
                      <Icon className={`w-4 h-4 ${color.icon}`} />
                    </div>

                    <span className="font-medium">
                      {transaction.description}
                    </span>
                  </div>
                </TableCell>

                {/* Data */}
                <TableCell className="text-center text-gray-600">
                  {formatDateToDDMMYYYY(transaction.selectedDate)}
                </TableCell>

                {/* Categoria */}
                <TableCell className="text-center">
                  <Badge
                    className={`${color.bg} ${color.text} rounded-2xl`}
                  >
                    {transaction.category?.title}
                  </Badge>
                </TableCell>

                {/* Tipo */}
                <TableCell className="text-center">
                  <div
                    className={`inline-flex items-center gap-2 ${type.className}`}
                  >
                    <TypeIcon className="w-4 h-4" />
                    {type.label}
                  </div>
                </TableCell>

                {/* Valor */}
                {
                  transaction.type === 'OUTCOME' ? 
                  <TableCell className="text-right font-medium">
                    {
                      `- ${transaction.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}`
                    }
                  </TableCell>
                  :
                  <TableCell className="text-right font-medium">
                    {
                      `+ ${transaction.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}`
                    }
                  </TableCell>
                }

                {/* Ações */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="outline">
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>

                    <Button size="icon" variant="outline">
                      <SquarePen className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>

        <TableFooter>
          <TableRow className="bg-white hover:bg-white">
            <TableCell colSpan={6}>
              <div className="py-2 px-2 flex items-center justify-between w-full text-gray-700">
                <p>1 a {perPage} | {totalOfTransactions} resultados</p>

                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="outline" onClick={() => onChangePage(page - 1)} disabled={!hasPreviousPage}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {
                    getNumberButton(hasPreviousPage, hasNextPage, totalOfTransactions, page, totalPages, onChangePage)
                  }

                  <Button size="icon" variant="outline" onClick={() => onChangePage(page + 1)} disabled={!hasNextPage}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  )
}