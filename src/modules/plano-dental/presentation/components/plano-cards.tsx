"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui-shadcn/card"
import { Button } from "@/components/ui-shadcn/button"
import { PlanoStatusBadge } from "./plano-status-badge"
import { Badge } from "@/components/ui-shadcn/badge"
import { MoreHorizontal, AlertTriangle, Calendar, User, Stethoscope } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui-shadcn/dropdown-menu"
import { PlanoDentalResponse } from "@/modules/plano-dental/domain/types/plano-dental.types"

interface PlanoCardProps {
    plano: PlanoDentalResponse
    onEdit?: (plano: PlanoDentalResponse) => void
    onIniciar?: (plano: PlanoDentalResponse) => void
    onConcluir?: (plano: PlanoDentalResponse) => void
    onCancelar?: (plano: PlanoDentalResponse) => void
    onView?: (plano: PlanoDentalResponse) => void
}

export function PlanoCards({ plano, onEdit, onIniciar, onConcluir, onCancelar, onView }: PlanoCardProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)
    }

    const formatDate = (date?: string) => {
        if (!date) return "-"
        return new Date(date).toLocaleDateString("pt-BR")
    }

    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-base">{plano.procedimento}</h3>
                        {plano.urgente && (
                            <Badge variant="destructive" className="gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                Urgente
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Dente: {plano.dente}
                        {plano.faceDente && ` - Face: ${plano.faceDente}`}
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView?.(plano)}>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit?.(plano)}>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {plano.status === "PENDENTE" && (
                            <DropdownMenuItem onClick={() => onIniciar?.(plano)}>Iniciar Tratamento</DropdownMenuItem>
                        )}
                        {plano.status === "EM_ANDAMENTO" && (
                            <DropdownMenuItem onClick={() => onConcluir?.(plano)}>Marcar como Concluído</DropdownMenuItem>
                        )}
                        {plano.status !== "CANCELADO" && plano.status !== "CONCLUIDO" && (
                            <DropdownMenuItem onClick={() => onCancelar?.(plano)} className="text-destructive">
                                Cancelar
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{plano.pacienteNome}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Stethoscope className="h-4 w-4" />
                        <span>Dr(a). {plano.dentistaNome}</span>
                    </div>
                </div>

                {plano.dataPrevista && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Previsto: {formatDate(plano.dataPrevista)}</span>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t pt-4">
                <PlanoStatusBadge status={plano.status} />
                <div className="text-right">
                    {plano.valorDesconto != null && plano.valorDesconto > 0 && (
                        <p className="text-xs text-muted-foreground line-through">
                            {formatCurrency(plano.valor)}
                        </p>
                    )}
                    <p className="font-semibold text-lg">{formatCurrency(plano.valorFinal)}</p>
                </div>
            </CardFooter>
        </Card>
    )
}