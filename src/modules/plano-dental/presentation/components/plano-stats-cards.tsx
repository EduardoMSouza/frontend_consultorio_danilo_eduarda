"use client";

import type { PlanoDentalStats, StatusPlano } from "@/modules/plano-dental/domain/types/plano-dental.types";
import { Card, CardContent } from "@/components/ui-shadcn/card";
import { CheckCircle2, Clock, PlayCircle, TrendingUp, XCircle } from "lucide-react";

interface Props {
    stats?: PlanoDentalStats | null;
}

const statsConfig: Record<StatusPlano, { icon: typeof Clock; color: string; bgColor: string }> = {
    PENDENTE:      { icon: Clock,       color: "text-amber-600",  bgColor: "bg-amber-100" },
    EM_ANDAMENTO:  { icon: PlayCircle,  color: "text-blue-600",   bgColor: "bg-blue-100" },
    CONCLUIDO:     { icon: CheckCircle2, color: "text-emerald-600", bgColor: "bg-emerald-100" },
    CANCELADO:     { icon: XCircle,     color: "text-red-600",    bgColor: "bg-red-100" },
};

const statusLabels: Record<StatusPlano, string> = {
    PENDENTE:     "Pendentes",
    EM_ANDAMENTO: "Em Andamento",
    CONCLUIDO:    "Concluídos",
    CANCELADO:    "Cancelados",
};

export function PlanoDentalStatsCards({ stats }: Props) {
    // fallback seguro enquanto os dados não chegam
    const safe = {
        total:     stats?.total     ?? 0,
        urgente:   stats?.urgente   ?? 0,
        ativos:    stats?.ativos    ?? 0,
        inativos:  stats?.inativos  ?? 0,
        porStatus: stats?.porStatus ?? {
            PENDENTE: 0,
            EM_ANDAMENTO: 0,
            CONCLUIDO: 0,
            CANCELADO: 0,
        },
    };

    const cards = [
        { label: "Total",    value: safe.total,    icon: TrendingUp,  color: "text-primary",      bg: "bg-primary/10" },
        { label: "Urgentes", value: safe.urgente,  icon: Clock,       color: "text-rose-600",     bg: "bg-rose-50" },
        { label: "Ativos",   value: safe.ativos,   icon: CheckCircle2,color: "text-emerald-600",  bg: "bg-emerald-50" },
        { label: "Inativos", value: safe.inativos, icon: XCircle,     color: "text-slate-600",    bg: "bg-slate-100" },
        ...Object.entries(safe.porStatus).map(([status, count]) => {
            const cfg = statsConfig[status as StatusPlano];
            return {
                label: statusLabels[status as StatusPlano],
                value: count,
                icon:  cfg.icon,
                color: cfg.color,
                bg:    cfg.bgColor,
            };
        }),
    ];

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {cards.map((c) => (
                <Card key={c.label} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className={`rounded-lg p-2 ${c.bg}`}>
                                <c.icon className={`h-5 w-5 ${c.color}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{c.value}</p>
                                <p className="text-xs text-muted-foreground">{c.label}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}