"use client"

import { Card, CardContent } from "@/components/ui-shadcn/card"
import { Users, UserCheck, UserX, Building2, UserMinus } from "lucide-react"
import type { EstatisticasContagem } from "@/models/paciente.types"

interface PacienteStatsCardsProps {
    estatisticas: EstatisticasContagem
}

export function PacienteStatsCards({ estatisticas }: PacienteStatsCardsProps) {
    const stats = [
        {
            label: "Total de Pacientes",
            value: estatisticas.total,
            icon: Users,
            color: "text-sky-600",
            bgColor: "bg-sky-50",
        },
        {
            label: "Ativos",
            value: estatisticas.ativos,
            icon: UserCheck,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
        },
        {
            label: "Inativos",
            value: estatisticas.inativos,
            icon: UserX,
            color: "text-slate-600",
            bgColor: "bg-slate-100",
        },
        {
            label: "Com Convênio",
            value: estatisticas.comConvenio,
            icon: Building2,
            color: "text-violet-600",
            bgColor: "bg-violet-50",
        },
        {
            label: "Sem Convênio",
            value: estatisticas.semConvenio,
            icon: UserMinus,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
        },
    ]

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat) => (
                <Card key={stat.label} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
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
