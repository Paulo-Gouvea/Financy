import { Card, CardDescription, CardTitle } from '@/components/ui/card'

interface DashboardStatisticsCardsProps {
    icon: React.ReactNode
    info: string
    value: string
}

export function DashboardStatisticsCards({
    icon,
    info,
    value
}: DashboardStatisticsCardsProps){
    return (
        <Card className="bg-white flex item pl-7 pr-48 py-5 flex-col">
            <CardTitle className='flex text-gray-500 text-xs items-center gap-4'>
                {icon}
                {info}
            </CardTitle>

            <CardDescription className='text-black text-3xl font-bold mt-4' > 
                {value}
            </CardDescription>
        </Card>
    )
}