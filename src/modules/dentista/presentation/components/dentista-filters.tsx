"use client"

import { Input } from "@/components/ui-shadcn/input"
import { Button } from "@/components/ui-shadcn/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-shadcn/select"
import { Search, X } from "lucide-react"

const ESPECIALIDADES = [
    "Clínico Geral",
    "Ortodontia",
    "Endodontia",
    "Periodontia",
    "Implantodontia",
    "Odontopediatria",
    "Cirurgia Bucomaxilofacial",
    "Prótese Dentária",
    "Estética Dental",
    "Radiologia Odontológica",
]

interface DentistaFiltersProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    especialidade: string
    onEspecialidadeChange: (value: string) => void
    situacao: string
    onSituacaoChange: (value: string) => void
    onClear: () => void
}

export function DentistaFilters({
                                    searchTerm,
                                    onSearchChange,
                                    especialidade,
                                    onEspecialidadeChange,
                                    situacao,
                                    onSituacaoChange,
                                    onClear,
                                }: DentistaFiltersProps) {
    const hasFilters = searchTerm || especialidade || situacao

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Buscar por nome, CRO ou email..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>

            <Select value={especialidade} onValueChange={onEspecialidadeChange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Especialidade" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {ESPECIALIDADES.map((esp) => (
                        <SelectItem key={esp} value={esp}>
                            {esp}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={situacao} onValueChange={onSituacaoChange}>
                <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Situação" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ativo">Ativos</SelectItem>
                    <SelectItem value="inativo">Inativos</SelectItem>
                </SelectContent>
            </Select>

            {hasFilters && (
                <Button variant="ghost" size="sm" onClick={onClear} className="gap-2">
                    <X className="h-4 w-4" />
                    Limpar
                </Button>
            )}
        </div>
    )
}
