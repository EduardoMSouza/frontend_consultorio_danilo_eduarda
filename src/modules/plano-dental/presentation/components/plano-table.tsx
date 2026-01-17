"use client"

import { PlanoStatusBadge } from "./plano-status-badge"
import { Badge } from "@/components/ui-shadcn/badge"
import { Button } from "@/components/ui-shadcn/button"
import { Checkbox } from "@/components/ui-shadcn/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui-shadcn/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui-shadcn/dropdown-menu"
import { AlertTriangle, MoreHorizontal, Eye, Pencil, Play, CheckCircle, XCircle } from "lucide-react"
import { PlanoDentalResponse } from "@/modules/plano-dental/domain/types/plano-dental.types"

interface PlanoTableProps {
    planos: PlanoDentalResponse[]
    selectedIds?: number[]
    onSelectChange?: (ids: number[]) => void
    onView?: (plano: PlanoDentalResponse) => void
    onEdit?: (plano: PlanoDentalResponse) => void
    onIniciar?: (plano: PlanoDentalResponse) => void
    onConcluir?: (plano: PlanoDentalResponse) => void
    onCancelar?: (plano: PlanoDentalResponse) => void
}

export function PlanoTable({
                               planos,
                               selectedIds = [],
                               onSelectChange,
                               onView,
                               onEdit,
                               onIniciar,
                               onConcluir,
                               onCancelar,
                           }: PlanoTableProps) {
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

    const toggleSelect = (id: number) => {
        if (!onSelectChange) return
        if (selectedIds.includes(id)) {
            onSelectChange(selectedIds.filter((i) => i !== id))
        } else {
            onSelectChange([...selectedIds, id])
        }
    }

    const toggleSelectAll = () => {
        if (!onSelectChange) return
        if (selectedIds.length === planos.length) {
            onSelectChange([])
        } else {
            onSelectChange(planos.map((p) => p.id))
        }
    }

    return (
        <div className="rounded-lg border border-border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        {onSelectChange && (
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={planos.length > 0 && selectedIds.length === planos.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                        )}
                        <TableHead>Procedimento</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Dentista</TableHead>
                        <TableHead>Dente</TableHead>
                        <TableHead>Data Prevista</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-12" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {planos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={onSelectChange ? 9 : 8} className="h-24 text-center text-muted-foreground">
                                Nenhum plano encontrado.
                            </TableCell>
                        </TableRow>
                    ) : (
                        planos.map((plano) => (
                            <TableRow key={plano.id}>
                                {onSelectChange && (
                                    <TableCell>
                                        <Checkbox checked={selectedIds.includes(plano.id)} onCheckedChange={() => toggleSelect(plano.id)} />
                                    </TableCell>
                                )}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{plano.procedimento}</span>
                                        {plano.urgente && (
                                            <Badge variant="destructive" className="h-5 gap-0.5 px-1.5">
                                                <AlertTriangle className="h-3 w-3" />
                                            </Badge>
                                        )}
                                    </div>
                                    {plano.codigoProcedimento && (
                                        <span className="text-xs text-muted-foreground">Cód: {plano.codigoProcedimento}</span>
                                    )}
                                </TableCell>
                                <TableCell>{plano.pacienteNome}</TableCell>
                                <TableCell>Dr(a). {plano.dentistaNome}</TableCell>
                                <TableCell>
                                    <span className="font-mono">
                                        {plano.dente}
                                        {plano.faceDente && <span className="text-muted-foreground"> ({plano.faceDente})</span>}
                                    </span>
                                </TableCell>
                                <TableCell>{formatDate(plano.dataPrevista)}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        {plano.valorDesconto != null && plano.valorDesconto > 0 && (
                                            <span className="text-xs text-muted-foreground line-through">{formatCurrency(plano.valor)}</span>
                                        )}
                                        <span className="font-medium">{formatCurrency(plano.valorFinal)}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <PlanoStatusBadge status={plano.status} />
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onView?.(plano)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                Ver Detalhes
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit?.(plano)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            {plano.status === "PENDENTE" && (
                                                <DropdownMenuItem onClick={() => onIniciar?.(plano)}>
                                                    <Play className="mr-2 h-4 w-4" />
                                                    Iniciar
                                                </DropdownMenuItem>
                                            )}
                                            {plano.status === "EM_ANDAMENTO" && (
                                                <DropdownMenuItem onClick={() => onConcluir?.(plano)}>
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Concluir
                                                </DropdownMenuItem>
                                            )}
                                            {plano.status !== "CANCELADO" && plano.status !== "CONCLUIDO" && (
                                                <DropdownMenuItem onClick={() => onCancelar?.(plano)} className="text-destructive">
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Cancelar
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}