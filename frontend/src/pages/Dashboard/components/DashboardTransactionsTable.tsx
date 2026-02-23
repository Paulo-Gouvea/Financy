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
import type { Transaction } from "@/types";
import { X, BaggageClaim, BookOpen, BriefcaseBusiness, CarFront, ChevronRight, CircleArrowDown, CircleArrowUp, Dumbbell, ForkKnife, Gift, HeartPulse, House, Mailbox, PawPrint, PiggyBank, Plus, ReceiptText, ShoppingCart, Ticket, ToolCase } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardTransactionsTableProps {
  transactions: Transaction[]
  onClick: () => void
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

function formatDateToDDMMYYYY(d: Date) {
  const date = new Date(d);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function DashboardTransactionsTable({
  transactions,
  onClick
}: DashboardTransactionsTableProps) {
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
              <Link to="/transactions" className="flex text-right items-center mr-3 justify-end text-green-600 cursor-pointer" onClick={() => console.log('teste teste')}>
                <p className="text-xs">Ver todas</p>
                <ChevronRight className="text-green-600 w-5 h-5" />
              </Link>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "INCOME";
            const Icon =iconMap.get(transaction.category?.icon ?? "") ?? X
            const color =
              colorMap[transaction.category?.color ?? "blue"] ??
              colorMap.blue

            return (
              <TableRow key={transaction.id}>
                <TableCell className="py-5 px-7">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${color.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${color.icon}`} />
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{formatDateToDDMMYYYY(transaction.selectedDate)}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className={`ml-32 px-3 py-1 rounded-full text-sm ${color.iconBg} ${color.icon}`}>
                    {transaction.category?.title}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 font-medium mr-4">
                    <span
                    >
                      {isIncome ? "+" : "-"} R${" "}
                      {Math.abs(transaction.value).toFixed(2)}
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
              <button className="w-full flex items-center justify-center gap-2 py-2 text-green-600 font-medium" onClick={onClick}>
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