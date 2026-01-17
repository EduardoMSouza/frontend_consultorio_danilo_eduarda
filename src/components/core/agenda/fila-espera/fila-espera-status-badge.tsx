import { Badge } from "@/components/ui-shadcn/badge"
import {StatusFila} from "@/models/agenda/fila-espera.type";


interface FilaEsperaStatusBadgeProps {
    status: StatusFila
}

const statusConfig: Record<StatusFila, { label: string; className: string }> = {
    AGUARDANDO: { label: "Aguardando", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
    NOTIFICADO: { label: "Notificado", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    AGENDADO: { label: "Agendado", className: "bg-green-100 text-green-800 hover:bg-green-100" },
    CANCELADO: { label: "Cancelado", className: "bg-red-100 text-red-800 hover:bg-red-100" },
    EXPIRADO: { label: "Expirado", className: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
}

export function FilaEsperaStatusBadge({ status }: FilaEsperaStatusBadgeProps) {
    const config = statusConfig[status]
    return (
        <Badge variant="secondary" className={config.className}>
            {config.label}
        </Badge>
    )
}
