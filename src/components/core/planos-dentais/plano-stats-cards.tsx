import type { EstatisticaStatus, StatusPlano } from "@/models/plano-dental.model"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-shadcn/card"
import { Clock, PlayCircle, CheckCircle2, XCircle, TrendingUp } from "lucide-react"

interface PlanoStatsCardsProps {
    estatisticas: EstatisticaStatus[]
    totalGeral?: string
}

const statsConfig: Record<StatusPlano, { icon: typeof Clock; color: string; bgColor: string }> = {
    PENDENTE: {
        icon: Clock,
        color: "text-amber-600",
        bgColor: "bg-amber-100",
    },
    EM_ANDAMENTO: {
        icon: PlayCircle,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
    },
    CONCLUIDO: {
        icon: CheckCircle2,
        color: "text-emerald-600",
        bgColor: "bg-emerald-100",
    },
    CANCELADO: {
        icon: XCircle,
        color: "text-red-600",
        bgColor: "bg-red-100",
    },
}

const statusLabels: Record<StatusPlano, string> = {
    PENDENTE: "Pendentes",
    EM_ANDAMENTO: "Em Andamento",
    CONCLUIDO: "Concluídos",
    CANCELADO: "Cancelados",
}

export function PlanoStatsCards({ estatisticas, totalGeral }: PlanoStatsCardsProps) {
    const formatCurrency = (value: string) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number.parseFloat(value))
    }

    const totalQuantidade = estatisticas.reduce((acc, e) => acc + e.quantidade, 0)

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Total Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total de Planos</CardTitle>
                    <div className="rounded-full bg-primary/10 p-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalQuantidade}</div>
                    {totalGeral && <p className="text-xs text-muted-foreground">{formatCurrency(totalGeral)} em valor</p>}
                </CardContent>
            </Card>

            {/* Status Cards */}
            {estatisticas.map((estatistica) => {
                const config = statsConfig[estatistica.status]
                const Icon = config.icon
                return (
                    <Card key={estatistica.status}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {statusLabels[estatistica.status]}
                            </CardTitle>
                            <div className={`rounded-full ${config.bgColor} p-2`}>
                                <Icon className={`h-4 w-4 ${config.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{estatistica.quantidade}</div>
                            <p className="text-xs text-muted-foreground">{formatCurrency(estatistica.valorTotal)}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
