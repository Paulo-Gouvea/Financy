import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ChevronRight} from "lucide-react";

const categories = [
  {
    category: "Alimentação",
    quantity: 12,
    value: 542.30,
  },
  {
    category: "Transporte",
    quantity: 8,
    value: 385.50,
  },
  {
    category: "Mercado",
    quantity: 3,
    value: 298.75,
  },
  {
    category: "Entretenimento",
    quantity: 2,
    value: 186.20,
  },
  {
    category: "Utilidades",
    quantity: 7,
    value: 245.80,
  },
];

export function DashboardCategoriesTable() {
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
              <div className="flex text-right items-center mr-3 justify-end text-green-600 cursor-pointer" onClick={() => console.log('teste teste')}>
                <p className="text-xs">Gerenciar</p>
                <ChevronRight className="text-green-600 w-5 h-5" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            categories.map((category, index) => (
                <TableRow key={index} className="border-b-0">
                    <TableCell className={`flex text-left ${index === 0 ? "mt-4" : ""}`}>
                        <span className="mx-5 my-2 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                            {category.category}
                        </span>
                    </TableCell>

                    <TableCell>
                        <p className="text-gray-600">
                            {`${category.quantity} itens`}
                        </p>
                    </TableCell>

                    <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 font-medium mr-4">
                    <span
                    >
                      {`R$ ${Math.abs(category.value).toFixed(2)}`}
                    </span>
                  </div>
                </TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Card>
  );
}