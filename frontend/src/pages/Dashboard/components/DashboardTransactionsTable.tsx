import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus } from "lucide-react";

const transactions = [
  {
    title: "Pagamento de Salário",
    date: "01/12/25",
    category: "Receita",
    value: 4250,
    type: "income",
  },
  {
    title: "Jantar no Restaurante",
    date: "30/11/25",
    category: "Alimentação",
    value: -89.5,
    type: "expense",
  },
  {
    title: "Posto de Gasolina",
    date: "29/11/25",
    category: "Transporte",
    value: -100,
    type: "expense",
  },
  {
    title: "Compras no Mercado",
    date: "28/11/25",
    category: "Mercado",
    value: -156.8,
    type: "expense",
  },
  {
    title: "Retorno de Investimento",
    date: "26/11/25",
    category: "Investimento",
    value: 340.25,
    type: "income",
  },
];

export function DashboardTransactionsTable() {
  return (
    <Card className="p-0 overflow-hidden col-span-2 ">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead className="text-gray-500 px-7 py-6 text-xs">
              TRANSAÇÕES RECENTES
            </TableHead>
            <TableHead />
            <TableHead >
              <div className="flex text-right items-center mr-3 justify-end text-green-600 cursor-pointer" onClick={() => console.log('teste teste')}>
                <p className="text-xs">Ver todas</p>
                <ChevronRight className="text-green-600 w-5 h-5" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((t, i) => {
            const isIncome = t.type === "income";

            return (
              <TableRow key={i}>
                <TableCell className="py-5 px-7">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      $
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">{t.title}</p>
                      <p className="text-sm text-gray-500">{t.date}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="ml-32 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                    {t.category}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 font-medium mr-4">
                    <span
                    >
                      {isIncome ? "+" : "-"} R${" "}
                      {Math.abs(t.value).toFixed(2)}
                    </span>

                    {isIncome ? (
                      <CircleArrowUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <CircleArrowDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow className="bg-white hover:bg-white">
            <TableCell colSpan={3}>
              <button className="w-full flex items-center justify-center gap-2 py-2 text-green-600 font-medium" onClick={() => console.log('teste2 teste2')}>
                <Plus className="w-4 h-4" />
                Nova transação
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}