import { Badge } from "@/components/ui-shadcn/badge"
import {TipoProcedimento} from "@/models/agenda/agendamento.type";


interface ProcedimentoBadgeProps {
    tipo: TipoProcedimento
}

const procedimentoConfig: Record<TipoProcedimento, { label: string; className: string }> = {
    CONSULTA: { label: "Consulta", className: "bg-slate-100 text-slate-700" },
    RETORNO: { label: "Retorno", className: "bg-cyan-100 text-cyan-700" },
    AVALIACAO: { label: "Avaliação", className: "bg-indigo-100 text-indigo-700" },
    LIMPEZA: { label: "Limpeza", className: "bg-emerald-100 text-emerald-700" },
    EXTRACAO: { label: "Extração", className: "bg-rose-100 text-rose-700" },
    RESTAURACAO: { label: "Restauração", className: "bg-amber-100 text-amber-700" },
    CANAL: { label: "Canal", className: "bg-orange-100 text-orange-700" },
    PROTESE: { label: "Prótese", className: "bg-violet-100 text-violet-700" },
    ORTODONTIA: { label: "Ortodontia", className: "bg-pink-100 text-pink-700" },
    URGENCIA: { label: "Urgência", className: "bg-red-100 text-red-700" },
    OUTROS: { label: "Outros", className: "bg-gray-100 text-gray-700" },
}

export function ProcedimentoBadge({ tipo }: ProcedimentoBadgeProps) {
    const config = procedimentoConfig[tipo]
    return (
        <Badge variant="outline" className={config.className}>
            {config.label}
        </Badge>
    )
}
