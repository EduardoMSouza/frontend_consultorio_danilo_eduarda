"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui-shadcn/table"
import { Button } from "@/components/ui-shadcn/button"
import { Badge } from "@/components/ui-shadcn/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui-shadcn/dropdown-menu"
import { MoreHorizontal, Eye, Pencil, UserCheck, UserX, Trash2, Phone, Mail } from "lucide-react"
import type { DentistaResponse } from "@/models/dentista.type"

interface DentistaTableProps {
    dentistas: DentistaResponse[]
    onView: (dentista: DentistaResponse) => void
    onEdit: (dentista: DentistaResponse) => void
    onToggleStatus: (dentista: DentistaResponse) => void
    onDelete: (dentista: DentistaResponse) => void
}

export function DentistaTable({ dentistas, onView, onEdit, onToggleStatus, onDelete }: DentistaTableProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("pt-BR")
    }

    return (
        <div className="rounded-lg border border-border bg-card">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Dentista</TableHead>
                        <TableHead className="font-semibold">CRO</TableHead>
                        <TableHead className="font-semibold">Especialidade</TableHead>
                        <TableHead className="font-semibold">Contato</TableHead>
                        <TableHead className="font-semibold">Situação</TableHead>
                        <TableHead className="font-semibold">Cadastro</TableHead>
                        <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dentistas.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                                Nenhum dentista encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        dentistas.map((dentista) => (
                            <TableRow key={dentista.id} className="hover:bg-muted/30">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                                            {dentista.nome.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">{dentista.nome}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-mono text-sm text-muted-foreground">{dentista.cro}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                                        {dentista.especialidade}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Phone className="h-3 w-3" />
                                            {dentista.telefone}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Mail className="h-3 w-3" />
                                            {dentista.email}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={dentista.ativo ? "default" : "secondary"}
                                        className={
                                            dentista.ativo
                                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                                : "bg-red-100 text-red-700 hover:bg-red-100"
                                        }
                                    >
                                        {dentista.ativo ? "Ativo" : "Inativo"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">{formatDate(dentista.criadoEm)}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onView(dentista)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                Visualizar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit(dentista)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onToggleStatus(dentista)}>
                                                {dentista.ativo ? (
                                                    <>
                                                        <UserX className="mr-2 h-4 w-4" />
                                                        Desativar
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserCheck className="mr-2 h-4 w-4" />
                                                        Ativar
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onDelete(dentista)} className="text-red-600 focus:text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Excluir
                                            </DropdownMenuItem>
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
