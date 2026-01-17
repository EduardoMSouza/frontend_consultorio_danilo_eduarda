"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-shadcn/card"
import { Badge } from "@/components/ui-shadcn/badge"
import { ScrollArea } from "@/components/ui-shadcn/scroll-area"
import { History, Plus, Edit, CheckCircle, Play, XCircle, AlertTriangle, Trash } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {AgendamentoHistoricoResponse, TipoAcao} from "@/models/agenda/agendamento-historico.type";


interface HistoricoPanelProps {
    historico: AgendamentoHistoricoResponse[]
}

const acaoConfig: Record<TipoAcao, { label: string; icon: typeof Plus; color: string }> = {
    CRIACAO: { label: "Criação", icon: Plus, color: "text-green-600" },
    ATUALIZACAO: { label: "Atualização", icon: Edit, color: "text-blue-600" },
    CONFIRMACAO: { label: "Confirmação", icon: CheckCircle, color: "text-blue-600" },
    INICIO_ATENDIMENTO: { label: "Início", icon: Play, color: "text-purple-600" },
    CONCLUSAO: { label: "Conclusão", icon: CheckCircle, color: "text-green-600" },
    CANCELAMENTO: { label: "Cancelamento", icon: XCircle, color: "text-red-600" },
    FALTA: { label: "Falta", icon: AlertTriangle, color: "text-orange-600" },
    EXCLUSAO: { label: "Exclusão", icon: Trash, color: "text-red-600" },
}

export function HistoricoPanel({ historico }: HistoricoPanelProps) {
    const formatDateTime = (date: string) => {
        return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: ptBR })
    }

    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <History className="h-5 w-5 text-blue-600" />
                    Histórico Recente
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                    {historico.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">Nenhum histórico disponível</div>
                    ) : (
                        <div className="space-y-3">
                            {historico.map((item) => {
                                const config = acaoConfig[item.acao]
                                const Icon = config.icon

                                return (
                                    <div key={item.id} className="flex gap-3 p-3 rounded-lg border bg-card">
                                        <div className={`mt-0.5 ${config.color}`}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="text-xs">
                                                    {config.label}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">#{item.agendamentoId}</span>
                                            </div>
                                            <p className="text-sm text-foreground">{item.descricao}</p>
                                            {item.detalhes && <p className="text-xs text-muted-foreground mt-1">{item.detalhes}</p>}
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {formatDateTime(item.dataHora)} • {item.usuarioResponsavel}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
