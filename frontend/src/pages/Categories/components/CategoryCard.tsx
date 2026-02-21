import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash, SquarePen } from "lucide-react"

type CategoryCardProps = {
  title: string
  description: string
  count: number
  icon?: React.ReactNode
  onEdit?: () => void
  onDelete?: () => void
}

export function CategoryCard({
  title,
  description,
  count,
  icon,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 text-xl">
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
        <Badge className="rounded-full px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-100">
          {title}
        </Badge>

        <span className="text-sm text-muted-foreground">
          {count} itens
        </span>
      </CardFooter>
    </Card>
  )
}