"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui-shadcn/dialog"
import { Separator } from "@/components/ui-shadcn/separator"
import { Calendar, Clock, User, Stethoscope, FileText, DollarSign, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { AgendamentoStatusBadge } from "./agendamento-status-badge"
import {AgendamentoResponse} from "@/models/agenda/agendamento.type";
import {ProcedimentoBadge} from "@/components/core/agenda/procedimento-badge";


interface AgendamentoDetailsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    agendamento: AgendamentoResponse | null
}

export function AgendamentoDetailsModal({ open, onOpenChange, agendamento }: AgendamentoDetailsModalProps) {
    if (!agendamento) return null

    const formatCurrency = (value?: number) => {
        if (!value) return "-"
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)
    }

    const formatDateTime = (date: string) => {
        return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Detalhes do Agendamento
                        <AgendamentoStatusBadge status={agendamento.status} />
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Paciente e Dentista */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="h-4 w-4" />
                                Paciente
                            </div>
                            <p className="font-medium">{agendamento.nomePaciente}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Stethoscope className="h-4 w-4" />
                                Dentista
                            </div>
                            <p className="font-medium">Dr(a). {agendamento.nomeDentista}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Data e Horário */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                Data
                            </div>
                            <p className="font-medium">
                                {format(new Date(agendamento.dataConsulta), "dd/MM/yyyy", { locale: ptBR })}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                Horário
                            </div>
                            <p className="font-medium">
                                {agendamento.horaInicio} - {agendamento.horaFim}
                                {agendamento.duracaoEmMinutos && (
                                    <span className="text-muted-foreground text-sm ml-1">({agendamento.duracaoEmMinutos} min)</span>
                                )}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Procedimento e Valor */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <FileText className="h-4 w-4" />
                                Procedimento
                            </div>
                            {agendamento.tipoProcedimento ? (
                                <ProcedimentoBadge tipo={agendamento.tipoProcedimento} />
                            ) : (
                                <p className="text-muted-foreground">-</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <DollarSign className="h-4 w-4" />
                                Valor
                            </div>
                            <p className="font-medium text-green-600">{formatCurrency(agendamento.valorConsulta)}</p>
                        </div>
                    </div>

                    {agendamento.observacoes && (
                        <>
                            <Separator />
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Observações</p>
                                <p className="text-sm bg-muted p-3 rounded-lg">{agendamento.observacoes}</p>
                            </div>
                        </>
                    )}

                    {agendamento.motivoCancelamento && (
                        <>
                            <Separator />
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    Motivo do Cancelamento
                                </div>
                                <p className="text-sm bg-destructive/10 p-3 rounded-lg text-destructive">
                                    {agendamento.motivoCancelamento}
                                </p>
                                {agendamento.canceladoEm && (
                                    <p className="text-xs text-muted-foreground">
                                        Cancelado em {formatDateTime(agendamento.canceladoEm)} por {agendamento.canceladoPor}
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    <Separator />

                    {/* Informações de Auditoria */}
                    <div className="text-xs text-muted-foreground space-y-1">
                        <p>
                            Criado em {formatDateTime(agendamento.criadoEm)} {agendamento.criadoPor && `por ${agendamento.criadoPor}`}
                        </p>
                        {agendamento.atualizadoEm !== agendamento.criadoEm && (
                            <p>
                                Atualizado em {formatDateTime(agendamento.atualizadoEm)}{" "}
                                {agendamento.atualizadoPor && `por ${agendamento.atualizadoPor}`}
                            </p>
                        )}
                        {agendamento.confirmadoEm && <p>Confirmado em {formatDateTime(agendamento.confirmadoEm)}</p>}
                        {agendamento.lembreteEnviado && agendamento.lembreteEnviadoEm && (
                            <p>Lembrete enviado em {formatDateTime(agendamento.lembreteEnviadoEm)}</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
