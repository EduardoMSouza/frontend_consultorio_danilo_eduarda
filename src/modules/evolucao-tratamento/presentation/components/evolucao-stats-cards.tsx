"use client";
import type { EvolucaoTratamentoStats, TipoEvolucao } from "@/modules/evolucao-tratamento";
import { Card, CardContent } from "@/components/ui-shadcn/card";
import { FileText, Clock, CheckCircle2, Flag, TrendingUp, XCircle } from "lucide-react";

interface Props {
  stats?: EvolucaoTratamentoStats | null;
}

const tipoConfig: Record<TipoEvolucao, { icon: typeof FileText; color: string; bgColor: string }> = {
  ANAMNESE:  { icon: FileText,      color: "text-blue-600",   bgColor: "bg-blue-100" },
  EVOLUCAO:  { icon: Clock,         color: "text-amber-600",  bgColor: "bg-amber-100" },
  CONCLUSAO: { icon: CheckCircle2,  color: "text-emerald-600",bgColor: "bg-emerald-100" },
  RETORNO:   { icon: Flag,          color: "text-purple-600", bgColor: "bg-purple-100" },
};

const tipoLabels: Record<TipoEvolucao, string> = {
  ANAMNESE:  "Anamneses",
  EVOLUCAO:  "Evoluções",
  CONCLUSAO: "Conclusões",
  RETORNO:   "Retornos",
};

export function EvolucaoStatsCards({ stats }: Props) {
  const safe = {
    total: stats?.total ?? 0,
    urgente: stats?.urgente ?? 0,
    retornoNecessario: stats?.retornoNecessario ?? 0,
    ativos: stats?.ativos ?? 0,
    inativos: stats?.inativos ?? 0,
    porTipo: stats?.porTipo ?? { ANAMNESE: 0, EVOLUCAO: 0, CONCLUSAO: 0, RETORNO: 0 },
  };

  const cards = [
    { label: "Total",         value: safe.total,         icon: TrendingUp,    color: "text-primary",     bg: "bg-primary/10" },
    { label: "Urgentes",      value: safe.urgente,       icon: FileText,      color: "text-rose-600",    bg: "bg-rose-50" },
    { label: "Retornos Nec.", value: safe.retornoNecessario, icon: Flag,      color: "text-orange-600",  bg: "bg-orange-50" },
    { label: "Ativos",        value: safe.ativos,        icon: CheckCircle2,  color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Inativos",      value: safe.inativos,      icon: XCircle,       color: "text-slate-600",   bg: "bg-slate-100" },
    ...Object.entries(safe.porTipo).map(([tipo, count]) => {
      const cfg = tipoConfig[tipo as TipoEvolucao];
      return {
        label: tipoLabels[tipo as TipoEvolucao],
        value: count,
        icon: cfg.icon,
        color: cfg.color,
        bg: cfg.bgColor,
      };
    }),
  ];

  return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-7">
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