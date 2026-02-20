import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"

interface PageDescriptionProps {
    title: string
    description: string
    buttonTitle: string
    onClick: () => void
}

export function PageDescription({
    title,
    description,
    buttonTitle,
    onClick
}: PageDescriptionProps) {
    return (
        <div className="w-full flex items-center justify-between mt-5">
            <div>
                <h2 className="text-gray-800 text-2xl font-bold">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>

            <Button>
                <PlusIcon />
                {buttonTitle}
            </Button>
        </div>
    )
}