import { Button } from "@/components/ui/button"

const colorsList = [
  { name: "green", bg: "bg-green-600", border: "border-green-600" },
  { name: "blue", bg: "bg-blue-600", border: "border-blue-600" },
  { name: "purple", bg: "bg-purple-600", border: "border-purple-600" },
  { name: "pink", bg: "bg-pink-600", border: "border-pink-600" },
  { name: "red", bg: "bg-red-600", border: "border-red-600" },
  { name: "orange", bg: "bg-orange-600", border: "border-orange-600" },
  { name: "yellow", bg: "bg-yellow-600", border: "border-yellow-600" },
]

export function getColoredButton(
  selectedColor: string,
  onSelect: (color: string) => void
) {
  return colorsList.map((color) => (
    <Button
      key={color.name}
      type="button"
      size="icon"
      variant="ghost"
      onClick={() => onSelect(color.name)}
      className={`
        h-6 w-10 border
        ${selectedColor === color.name
          ? `border-${color.name}-500 ring-2 ring-${color.name}-400`
          : `hover:${color.border}`}
      `}
    >
      <div className={`h-4 w-8 rounded-md ${color.bg}`} />
    </Button>
  ))
}