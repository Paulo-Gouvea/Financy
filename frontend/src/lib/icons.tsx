import { Button } from "@/components/ui/button"
import { 
  BriefcaseBusiness, 
  CarFront, 
  HeartPulse, 
  PiggyBank, 
  ShoppingCart,
  Ticket,
  ToolCase,
  ForkKnife,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText
} from "lucide-react"

const iconsList = {
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  ToolCase,
  ForkKnife,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText,
}

export function getIcons(
  selectedIcon: string,
  onSelect: (icon: string) => void
) {
  return Object.entries(iconsList).map(([name, Icon]) => (
    <Button
      key={name}
      type="button"
      size="icon"
      variant="ghost"
      onClick={() => onSelect(name)}
      className={`
        border
        ${selectedIcon === name 
          ? "border-green-500 text-green-600 bg-green-100"
          : "hover:border-primary hover:text-primary hover:bg-primary/10"}
      `}
    >
      <Icon />
    </Button>
  ))
}