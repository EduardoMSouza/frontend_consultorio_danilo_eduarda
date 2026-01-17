"use client"

import { Card, CardContent } from "@/components/ui-shadcn/card"
import { Users, UserCheck, UserX, Stethoscope } from "lucide-react"

interface DentistaStatsCardsProps {
    total: number
    ativos: number
    inativos: number
    especialidades: number
}

export function DentistaStatsCards({ total, ativos, inativos, especialidades }: DentistaStatsCardsProps) {
    const stats = [
        {
            label: "Total de Dentistas",
            value: total,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            label: "Ativos",
            value: ativos,
            icon: UserCheck,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
        },
        {
            label: "Inativos",
            value: inativos,
            icon: UserX,
            color: "text-red-600",
            bgColor: "bg-red-50",
        },
        {
            label: "Especialidades",
            value: especialidades,
            icon: Stethoscope,
            color: "text-violet-600",
            bgColor: "bg-violet-50",
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
