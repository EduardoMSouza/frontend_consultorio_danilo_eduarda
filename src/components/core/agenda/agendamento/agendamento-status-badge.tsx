import { Badge } from "@/components/ui-shadcn/badge"
import {StatusAgendamento} from "@/models/agenda/agendamento.type";


interface AgendamentoStatusBadgeProps {
    status: StatusAgendamento
}

const statusConfig: Record<
    StatusAgendamento,
    { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className: string }
> = {
    PENDENTE: { label: "Pendente", variant: "secondary", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
    CONFIRMADO: { label: "Confirmado", variant: "default", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    EM_ATENDIMENTO: {
        label: "Em Atendimento",
        variant: "default",
        className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    },
    CONCLUIDO: { label: "Concluído", variant: "default", className: "bg-green-100 text-green-800 hover:bg-green-100" },
    CANCELADO: { label: "Cancelado", variant: "destructive", className: "bg-red-100 text-red-800 hover:bg-red-100" },
    FALTA: { label: "Falta", variant: "destructive", className: "bg-orange-100 text-orange-800 hover:bg-orange-100" },
}

export function AgendamentoStatusBadge({ status }: AgendamentoStatusBadgeProps) {
    const config = statusConfig[status]
    return (
        <Badge variant={config.variant} className={config.className}>
            {config.label}
        </Badge>
    )
}
