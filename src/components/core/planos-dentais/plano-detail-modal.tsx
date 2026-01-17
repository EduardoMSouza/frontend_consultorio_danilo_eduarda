"use client"

import type { PlanoDentalResponse } from "@/models/plano-dental.model"
import { PlanoStatusBadge } from "./plano-status-badge"
import { Badge } from "@/components/ui-shadcn/badge"
import { Button } from "@/components/ui-shadcn/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui-shadcn/dialog"
import { Separator } from "@/components/ui-shadcn/separator"
import { AlertTriangle, User, Stethoscope, Calendar, DollarSign, FileText } from "lucide-react"

interface PlanoDetailModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    plano: PlanoDentalResponse | null
    onEdit?: () => void
}

export function PlanoDetailModal({ open, onOpenChange, plano, onEdit }: PlanoDetailModalProps) {
    if (!plano) return null

    const formatCurrency = (value: string) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number.parseFloat(value))
    }

    const formatDate = (date?: string) => {
        if (!date) return "-"
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-2">
                            {plano.procedimento}
                            {plano.urgente && (
                                <Badge variant="destructive" className="gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    Urgente
                                </Badge>
                            )}
                        </DialogTitle>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                        <PlanoStatusBadge status={plano.status} />
                        {plano.codigoProcedimento && <Badge variant="outline">Cód: {plano.codigoProcedimento}</Badge>}
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Tooth info */}
                    <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="font-medium mb-2">Informações do Dente</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Dente:</span>
                                <span className="ml-2 font-mono font-medium">{plano.dente}</span>
                            </div>
                            {plano.faceDente && (
                                <div>
                                    <span className="text-muted-foreground">Face:</span>
                                    <span className="ml-2">{plano.faceDente}</span>
                                </div>
                            )}
                            {plano.prioridade && (
                                <div>
                                    <span className="text-muted-foreground">Prioridade:</span>
                                    <span className="ml-2">{plano.prioridade}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Patient and Dentist */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Paciente</p>
                                <p className="font-medium">{plano.pacienteNome}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <Stethoscope className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Dentista</p>
                                <p className="font-medium">Dr(a). {plano.dentistaNome}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Values */}
                    <div className="space-y-2">
                        <h4 className="font-medium flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Valores
                        </h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Valor Original</p>
                                <p className="font-medium">{formatCurrency(plano.valor)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Desconto</p>
                                <p className="font-medium">{plano.valorDesconto ? formatCurrency(plano.valorDesconto) : "-"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Valor Final</p>
                                <p className="font-semibold text-lg text-primary">{formatCurrency(plano.valorFinal)}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Dates */}
                    <div className="space-y-2">
                        <h4 className="font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Datas
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Criado em</p>
                                <p>{formatDate(plano.criadoEm)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Data Prevista</p>
                                <p>{formatDate(plano.dataPrevista)}</p>
                            </div>
                            {plano.dataRealizacao && (
                                <div>
                                    <p className="text-muted-foreground">Data de Realização</p>
                                    <p>{formatDate(plano.dataRealizacao)}</p>
                                </div>
                            )}
                            {plano.dataCancelamento && (
                                <div>
                                    <p className="text-muted-foreground">Data de Cancelamento</p>
                                    <p className="text-destructive">{formatDate(plano.dataCancelamento)}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Observations */}
                    {plano.observacoes && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <h4 className="font-medium flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Observações
                                </h4>
                                <p className="text-sm text-muted-foreground">{plano.observacoes}</p>
                            </div>
                        </>
                    )}

                    {/* Cancellation reason */}
                    {plano.motivoCancelamento && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <h4 className="font-medium text-destructive">Motivo do Cancelamento</h4>
                                <p className="text-sm text-muted-foreground">{plano.motivoCancelamento}</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                    <Button onClick={onEdit}>Editar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
