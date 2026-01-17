"use client"

import { Card, CardContent } from "@/components/ui-shadcn/card"
import { Calendar, Clock, CheckCircle, XCircle, Users } from "lucide-react"

interface AgendaStatsProps {
    totalHoje: number
    confirmados: number
    pendentes: number
    concluidos: number
    cancelados: number
    filaEspera: number
}

export function AgendaStatsCards({
                                     totalHoje,
                                     confirmados,
                                     pendentes,
                                     concluidos,
                                     cancelados,
                                     filaEspera,
                                 }: AgendaStatsProps) {
    const stats = [
        {
            label: "Agendamentos Hoje",
            value: totalHoje,
            icon: Calendar,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            label: "Confirmados",
            value: confirmados,
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            label: "Pendentes",
            value: pendentes,
            icon: Clock,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
        },
        {
            label: "Concluídos",
            value: concluidos,
            icon: CheckCircle,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
        },
        {
            label: "Cancelados",
            value: cancelados,
            icon: XCircle,
            color: "text-red-600",
            bgColor: "bg-red-50",
        },
        {
            label: "Fila de Espera",
            value: filaEspera,
            icon: Users,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
