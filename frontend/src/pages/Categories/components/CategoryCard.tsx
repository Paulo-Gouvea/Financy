import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash, SquarePen } from "lucide-react"
import { colors } from "@/lib/utils/utils"

type CategoryCardProps = {
  title: string
  description: string
  color: string
  totalOfTransactions: number
  icon?: React.ReactNode
  onEdit?: () => void
  onDelete?: () => void
}

export function CategoryCard({
  title,
  description,
  totalOfTransactions,
  icon,
  color,
  onEdit,
  onDelete,
}: CategoryCardProps) {
    const desiredColor = colors.get(color) ? colors.get(color)?.light : colors.get('grey')?.light
    const desiredFont = colors.get(color) ? colors.get(color)?.strongFont : colors.get('grey')?.strongFont

    return (
    <Card className="w-full rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${desiredColor} text-xl`}>
            {icon}
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-lg border text-red-500 hover:bg-white hover:text-red-300"
            onClick={onDelete}
          >
            <Trash size={16} />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="rounded-lg border hover:bg-white hover:text-gray-400"
            onClick={onEdit}
          >
            <SquarePen size={16} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="mt-1">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Badge className={`rounded-full px-3 py-1 ${desiredColor} ${desiredFont} hover:${desiredColor}`}>
          {title}
        </Badge>

        <span className="text-sm text-muted-foreground">
          {totalOfTransactions} itens
        </span>
      </CardFooter>
    </Card>
  )
}