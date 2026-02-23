import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import type { Category } from "@/types";
import { ChevronRight} from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardCategoriesTableProps {
  categories: Category[]
}

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

export function DashboardCategoriesTable({
  categories
}: DashboardCategoriesTableProps) {
  return (
    <Card className="p-0 overflow-hidden max-h-[400px]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead className="text-gray-500 px-7 py-6 text-xs">
              CATEGORIAS
            </TableHead>
            <TableHead />
            <TableHead >
              <Link to="/categories" className="flex text-right items-center mr-3 justify-end text-green-600 cursor-pointer" >
                <p className="text-xs">Gerenciar</p>
                <ChevronRight className="text-green-600 w-5 h-5" />
              </Link>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            categories.map((category, index) => {
              const formattedBalance = (category.balance / 100).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )

              const color =
              colorMap[category.color ?? "blue"] ??
              colorMap.blue

              return (
                <TableRow key={index} className="border-b-0">
                  <TableCell
                    className={`flex text-left ${index === 0 ? "mt-4" : ""}`}
                  >
                    <span className={`mx-5 my-2 px-3 py-1 rounded-full text-sm ${color.iconBg} ${color.text}`}>
                      {category.title}
                    </span>
                  </TableCell>

                  <TableCell>
                    <p className="text-gray-600">
                      {category.totalOfTransactions} itens
                    </p>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 font-medium mr-4">
                      <span>{formattedBalance}</span>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </Card>
  );
}