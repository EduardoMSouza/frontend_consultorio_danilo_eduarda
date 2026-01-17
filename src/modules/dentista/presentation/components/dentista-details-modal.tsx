"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui-shadcn/dialog"
import { Badge } from "@/components/ui-shadcn/badge"
import { Separator } from "@/components/ui-shadcn/separator"
import { Phone, Mail, Calendar, Clock, Stethoscope, CreditCard } from "lucide-react"
import type { DentistaResponse } from "@/models/dentista.type"

interface DentistaDetailsModalProps {
    open: boolean
    onClose: () => void
    dentista: DentistaResponse | null
}

export function DentistaDetailsModal({ open, onClose, dentista }: DentistaDetailsModalProps) {
    if (!dentista) return null

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Detalhes do Dentista</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Header com avatar e nome */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
                            {dentista.nome.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground">{dentista.nome}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge
                                    variant={dentista.ativo ? "default" : "secondary"}
                                    className={dentista.ativo ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}
                                >
                                    {dentista.ativo ? "Ativo" : "Inativo"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Informações profissionais */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Informações Profissionais</h4>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                                    <CreditCard className="h-4 w-4 text-violet-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">CRO</p>
                                    <p className="font-mono font-medium text-foreground">{dentista.cro}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                                    <Stethoscope className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Especialidade</p>
                                    <p className="font-medium text-foreground">{dentista.especialidade}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Contato */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Contato</h4>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                                    <Phone className="h-4 w-4 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Telefone</p>
                                    <p className="font-medium text-foreground">{dentista.telefone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                                    <Mail className="h-4 w-4 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Email</p>
                                    <p className="font-medium text-foreground text-sm">{dentista.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Datas */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Registro</h4>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                                    <Calendar className="h-4 w-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Cadastrado em</p>
                                    <p className="text-sm text-foreground">{formatDate(dentista.criadoEm)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                                    <Clock className="h-4 w-4 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Última atualização</p>
                                    <p className="text-sm text-foreground">{formatDateTime(dentista.atualizadoEm)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
