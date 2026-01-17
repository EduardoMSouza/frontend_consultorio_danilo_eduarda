import type { StatusPlano } from "@/models/plano-dental.model"
import { Badge } from "@/components/ui-shadcn/badge"
import { cn } from "@/lib/utils"
import { Clock, PlayCircle, CheckCircle2, XCircle } from "lucide-react"

interface PlanoStatusBadgeProps {
    status: StatusPlano
    className?: string
}

const statusConfig: Record<StatusPlano, { label: string; icon: typeof Clock; className: string }> = {
    PENDENTE: {
        label: "Pendente",
        icon: Clock,
        className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    },
    EM_ANDAMENTO: {
        label: "Em Andamento",
        icon: PlayCircle,
        className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    },
    CONCLUIDO: {
        label: "Concluído",
        icon: CheckCircle2,
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    },
    CANCELADO: {
        label: "Cancelado",
        icon: XCircle,
        className: "bg-red-100 text-red-700 hover:bg-red-100",
    },
}

export function PlanoStatusBadge({ status, className }: PlanoStatusBadgeProps) {
    const config = statusConfig[status]
    const Icon = config.icon

    return (
        <Badge variant="secondary" className={cn(config.className, className)}>
            <Icon className="mr-1 h-3 w-3" />
            {config.label}
        </Badge>
    )
}
