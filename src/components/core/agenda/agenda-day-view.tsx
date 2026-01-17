"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-shadcn/card"
import { Button } from "@/components/ui-shadcn/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui-shadcn/dropdown-menu"
import { MoreVertical, Play, CheckCircle, XCircle, AlertTriangle, Eye, Edit, Clock } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ProcedimentoBadge } from "./procedimento-badge"
import {AgendamentoStatusBadge} from "@/components/core/agenda/agendamento/agendamento-status-badge";
import {AgendamentoResponse} from "@/models/agenda/agendamento.type";

interface AgendaDayViewProps {
    agendamentos: AgendamentoResponse[]
    selectedDate: Date
    onConfirmar: (id: number) => void
    onIniciar: (id: number) => void
    onConcluir: (id: number) => void
    onCancelar: (id: number) => void
    onMarcarFalta: (id: number) => void
    onVerDetalhes: (agendamento: AgendamentoResponse) => void
    onEditar: (agendamento: AgendamentoResponse) => void
}

export function AgendaDayView({
                                  agendamentos,
                                  selectedDate,
                                  onConfirmar,
                                  onIniciar,
                                  onConcluir,
                                  onCancelar,
                                  onMarcarFalta,
                                  onVerDetalhes,
                                  onEditar,
                              }: AgendaDayViewProps) {
    const sortedAgendamentos = [...agendamentos].sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))

    const formatCurrency = (value?: number) => {
        if (!value) return "-"
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)
    }

    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                    <span className="text-sm font-normal text-muted-foreground ml-2">
            ({agendamentos.length} agendamento{agendamentos.length !== 1 ? "s" : ""})
          </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {sortedAgendamentos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">Nenhum agendamento para este dia</div>
                ) : (
                    sortedAgendamentos.map((agendamento) => (
                        <div
                            key={agendamento.id}
                            className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                        >
                            {/* Horário */}
                            <div className="flex flex-col items-center min-w-[70px]">
                                <span className="text-lg font-bold text-foreground">{agendamento.horaInicio}</span>
                                <span className="text-xs text-muted-foreground">{agendamento.horaFim}</span>
                            </div>

                            {/* Linha divisória */}
                            <div className="h-12 w-px bg-border" />

                            {/* Informações */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-foreground truncate">{agendamento.nomePaciente}</span>
                                    <AgendamentoStatusBadge status={agendamento.status} />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>Dr(a). {agendamento.nomeDentista}</span>
                                    {agendamento.tipoProcedimento && (
                                        <>
                                            <span>•</span>
                                            <ProcedimentoBadge tipo={agendamento.tipoProcedimento} />
                                        </>
                                    )}
                                </div>
                                {agendamento.valorConsulta && (
                                    <div className="text-sm font-medium text-green-600 mt-1">
                                        {formatCurrency(agendamento.valorConsulta)}
                                    </div>
                                )}
                            </div>

                            {/* Ações */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onVerDetalhes(agendamento)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Ver Detalhes
                                    </DropdownMenuItem>
                                    {agendamento.podeSerEditado && (
                                        <DropdownMenuItem onClick={() => onEditar(agendamento)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Editar
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    {agendamento.status === "PENDENTE" && (
                                        <DropdownMenuItem onClick={() => onConfirmar(agendamento.id)}>
                                            <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                                            Confirmar
                                        </DropdownMenuItem>
                                    )}
                                    {agendamento.status === "CONFIRMADO" && (
                                        <DropdownMenuItem onClick={() => onIniciar(agendamento.id)}>
                                            <Play className="h-4 w-4 mr-2 text-purple-600" />
                                            Iniciar Atendimento
                                        </DropdownMenuItem>
                                    )}
                                    {agendamento.status === "EM_ATENDIMENTO" && (
                                        <DropdownMenuItem onClick={() => onConcluir(agendamento.id)}>
                                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                            Concluir
                                        </DropdownMenuItem>
                                    )}
                                    {agendamento.podeSerCancelado && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onMarcarFalta(agendamento.id)}>
                                                <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                                                Marcar Falta
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onCancelar(agendamento.id)} className="text-destructive">
                                                <XCircle className="h-4 w-4 mr-2" />
                                                Cancelar
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}
