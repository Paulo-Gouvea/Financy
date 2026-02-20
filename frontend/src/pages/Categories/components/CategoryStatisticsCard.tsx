import { Card } from '@/components/ui/card'

interface CategoryStatisticsCardsProps {
    icon: React.ReactNode
    info: string
    description: string
}

export function CategoryStatisticsCards({
    icon,
    info,
    description
}: CategoryStatisticsCardsProps){
    return (
        <Card className="bg-white flex item pl-7 pr-48 py-5">
            {
                icon
            }
            <div className='ml-4'>
                <p className='text-gray-800 text-2xl font-bold mb-1'>{info}</p>
                <p className='text-xs text-gray-600'>{description}</p>
            </div>
        </Card>
    )
}