import { colors } from "@/lib/utils/utils";
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
    ReceiptText,
    X 
} from "lucide-react"

interface DesiredIconProps {
    icon: string,
    color: string
}

export function DesiredIcon({
    icon,
    color
}: DesiredIconProps){
    const desiredColor = colors.get(color) ? colors.get(color)?.strongFont : colors.get('gray')?.strongFont

    const iconMap = new Map<string, React.ReactNode>([
        ["BriefcaseBusiness", <BriefcaseBusiness className={`${desiredColor} w-5`} />],
        ["CarFront", <CarFront className={`${desiredColor} w-5`} />],
        ["HeartPulse", <HeartPulse className={`${desiredColor} w-5`} />],
        ["PiggyBank", <PiggyBank className={`${desiredColor} w-5`} />],
        ["ShoppingCart", <ShoppingCart className={`${desiredColor} w-5`} />],
        ["Ticket", <Ticket className={`${desiredColor} w-5`} />],
        ["ToolCase", <ToolCase className={`${desiredColor} w-5`} />],
        ["ForkKnife", <ForkKnife className={`${desiredColor} w-5`} />],
        ["PawPrint", <PawPrint className={`${desiredColor} w-5`} />],
        ["House", <House className={`${desiredColor} w-5`} />],
        ["Gift", <Gift className={`${desiredColor} w-5`} />],
        ["Dumbbell", <Dumbbell className={`${desiredColor} w-5`} />],
        ["BookOpen", <BookOpen className={`${desiredColor} w-5`} />],
        ["BaggageClaim", <BaggageClaim className={`${desiredColor} w-5`} />],
        ["Mailbox", <Mailbox className={`${desiredColor} w-5`} />],
        ["ReceiptText", <ReceiptText className={`${desiredColor} w-5`} />],
        ["X", <X className={`${desiredColor} w-5`} />],
    ]);

    const desiredIcon = iconMap.get(icon)

    return (
        desiredIcon
    )
}