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
  Utensils,
  TrendingUp,
  Trash2,
  Pencil,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react"

const transactions = [
  {
    id: "1",
    description: "Jantar no restaurante",
    selectedDate: "30/11/25",
    category: "Alimentação",
    type: "OUTCOME",
    value: -89.5,
    icon: Utensils,
  },
  {
    id: "2",
    description: "Freelance",
    selectedDate: "24/11/25",
    category: "Salário",
    type: "INCOME",
    value: 2500,
    icon: TrendingUp,
  },
  {
    id: "1",
    description: "Jantar no restaurante",
    selectedDate: "30/11/25",
    category: "Alimentação",
    type: "OUTCOME",
    value: -89.5,
    icon: Utensils,
  },
  {
    id: "2",
    description: "Freelance",
    selectedDate: "24/11/25",
    category: "Salário",
    type: "INCOME",
    value: 2500,
    icon: TrendingUp,
  },
  {
    id: "1",
    description: "Jantar no restaurante",
    selectedDate: "30/11/25",
    category: "Alimentação",
    type: "OUTCOME",
    value: -89.5,
    icon: Utensils,
  },
  {
    id: "2",
    description: "Freelance",
    selectedDate: "24/11/25",
    category: "Salário",
    type: "INCOME",
    value: 2500,
    icon: TrendingUp,
  },
  {
    id: "1",
    description: "Jantar no restaurante",
    selectedDate: "30/11/25",
    category: "Alimentação",
    type: "OUTCOME",
    value: -89.5,
    icon: Utensils,
  },
  {
    id: "2",
    description: "Freelance",
    selectedDate: "24/11/25",
    category: "Salário",
    type: "INCOME",
    value: 2500,
    icon: TrendingUp,
  }
]

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

export function TransactionsTable() {
  return (
    <Card className="mt-7 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Categoria</TableHead>
            <TableHead className="text-center">Tipo</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => {
            const type = getTypeStyle(transaction.type)
            const Icon = transaction.icon
            const TypeIcon = type.icon

            return (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-muted">
                      <Icon className="w-4 h-4" />
                    </div>

                    <span className="font-medium">
                      {transaction.description}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-center">{transaction.selectedDate}</TableCell>

                <TableCell className="text-center">
                  <Badge variant="secondary">
                    {transaction.category}
                  </Badge>
                </TableCell>

                <TableCell className="text-center">
                    <div className={`inline-flex items-center gap-2 ${type.className}`}>
                        <TypeIcon className="w-4 h-4" />
                        {type.label}
                    </div>
                </TableCell>

                <TableCell
                  className={`text-right font-medium ${
                    transaction.type === "INCOME"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <Button size="icon" variant="outline">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
            sssssssssssss
        </TableFooter>
      </Table>
    </Card>
  )
}