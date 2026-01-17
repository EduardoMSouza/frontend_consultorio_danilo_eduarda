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
import { MoreHorizontal, Eye, Pencil, UserCheck, UserX, Trash2, Phone, Building2 } from "lucide-react"
import type { PacienteResumoResponse } from "@/models/paciente.types"

interface PacienteTableProps {
    pacientes: PacienteResumoResponse[]
    onVisualizar: (paciente: PacienteResumoResponse) => void
    onEditar: (paciente: PacienteResumoResponse) => void
    onAtivar: (paciente: PacienteResumoResponse) => void
    onInativar: (paciente: PacienteResumoResponse) => void
    onExcluir: (paciente: PacienteResumoResponse) => void
}

export function PacienteTable({
                                  pacientes,
                                  onVisualizar,
                                  onEditar,
                                  onAtivar,
                                  onInativar,
                                  onExcluir,
                              }: PacienteTableProps) {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("pt-BR")
    }

    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Prontuário</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Nascimento</TableHead>
                        <TableHead>Convênio</TableHead>
                        <TableHead>Situação</TableHead>
                        <TableHead className="w-[80px]">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pacientes.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                                Nenhum paciente encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        pacientes.map((paciente) => (
                            <TableRow key={paciente.id}>
                                <TableCell className="font-mono text-sm">{paciente.prontuarioNumero}</TableCell>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{paciente.nome}</p>
                                        {paciente.cpfFormatado && (
                                            <p className="text-xs text-muted-foreground">CPF: {paciente.cpfFormatado}</p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {paciente.telefone ? (
                                        <div className="flex items-center gap-1 text-sm">
                                            <Phone className="h-3 w-3 text-muted-foreground" />
                                            {paciente.telefone}
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p className="text-sm">{formatDate(paciente.dataNascimento)}</p>
                                        {paciente.idade !== undefined && (
                                            <p className="text-xs text-muted-foreground">{paciente.idade} anos</p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {paciente.convenio ? (
                                        <div className="flex items-center gap-1">
                                            <Building2 className="h-3 w-3 text-violet-500" />
                                            <span className="text-sm">{paciente.convenio}</span>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground text-sm">Particular</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={paciente.ativo ? "default" : "secondary"}
                                        className={
                                            paciente.ativo
                                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                                : "bg-slate-100 text-slate-600"
                                        }
                                    >
                                        {paciente.ativo ? "Ativo" : "Inativo"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onVisualizar(paciente)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                Visualizar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEditar(paciente)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            {paciente.ativo ? (
                                                <DropdownMenuItem onClick={() => onInativar(paciente)}>
                                                    <UserX className="mr-2 h-4 w-4" />
                                                    Inativar
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem onClick={() => onAtivar(paciente)}>
                                                    <UserCheck className="mr-2 h-4 w-4" />
                                                    Ativar
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive" onClick={() => onExcluir(paciente)}>
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
