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
import { Badge } from "@/components/ui-shadcn/badge"
import { Users, MoreVertical, Bell, Calendar, XCircle, Clock } from "lucide-react"
import { FilaEsperaStatusBadge } from "./fila-espera-status-badge"
import {FilaEsperaResponse} from "@/models/agenda/fila-espera.type";
import {ProcedimentoBadge} from "@/components/core/agenda/procedimento-badge";

interface FilaEsperaPanelProps {
    filaEspera: FilaEsperaResponse[]
    onNotificar: (id: number) => void
    onConverterEmAgendamento: (item: FilaEsperaResponse) => void
    onCancelar: (id: number) => void
}

const periodoLabels: Record<string, string> = {
    MANHA: "Manhã",
    TARDE: "Tarde",
    NOITE: "Noite",
    QUALQUER: "Qualquer",
}

export function FilaEsperaPanel({
                                    filaEspera,
                                    onNotificar,
                                    onConverterEmAgendamento,
                                    onCancelar,
                                }: FilaEsperaPanelProps) {
    const filaAtiva = filaEspera.filter((f) => f.status === "AGUARDANDO" || f.status === "NOTIFICADO")

    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Fila de Espera
                    <Badge variant="secondary" className="ml-auto">
                        {filaAtiva.length}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
                {filaAtiva.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">Nenhum paciente na fila de espera</div>
                ) : (
                    filaAtiva.map((item) => (
                        <div key={item.id} className="p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <span className="font-medium text-foreground">{item.nomePaciente}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FilaEsperaStatusBadge status={item.status} />
                                        {item.prioridade > 1 && (
                                            <Badge variant="destructive" className="text-xs">
                                                Prioridade {item.prioridade}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {item.status === "AGUARDANDO" && (
                                            <DropdownMenuItem onClick={() => onNotificar(item.id)}>
                                                <Bell className="h-4 w-4 mr-2 text-blue-600" />
                                                Notificar
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem onClick={() => onConverterEmAgendamento(item)}>
                                            <Calendar className="h-4 w-4 mr-2 text-green-600" />
                                            Agendar
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => onCancelar(item.id)} className="text-destructive">
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Cancelar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="space-y-1 text-sm text-muted-foreground">
                                {item.nomeDentista && <p>Dentista: Dr(a). {item.nomeDentista}</p>}
                                {item.tipoProcedimento && (
                                    <div className="flex items-center gap-2">
                                        <span>Procedimento:</span>
                                        <ProcedimentoBadge tipo={item.tipoProcedimento} />
                                    </div>
                                )}
                                {item.periodoPreferencial && <p>Período: {periodoLabels[item.periodoPreferencial]}</p>}
                                {item.diasNaFila !== undefined && (
                                    <div className="flex items-center gap-1 text-xs">
                                        <Clock className="h-3 w-3" />
                                        {item.diasNaFila} dia{item.diasNaFila !== 1 ? "s" : ""} na fila
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}
