"use client"

import { useState } from "react"
import { Button } from "@/components/ui-shadcn/button"
import { Input } from "@/components/ui-shadcn/input"
import { Label } from "@/components/ui-shadcn/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-shadcn/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui-shadcn/sheet"
import { Search, SlidersHorizontal, X } from "lucide-react"
import type { PacienteFiltros } from "@/models/paciente.types"

interface PacienteFiltersProps {
    filtros: PacienteFiltros
    convenios: string[]
    onFiltrosChange: (filtros: PacienteFiltros) => void
    onLimparFiltros: () => void
}

export function PacienteFilters({ filtros, convenios, onFiltrosChange, onLimparFiltros }: PacienteFiltersProps) {
    const [open, setOpen] = useState(false)

    const handleChange = (key: keyof PacienteFiltros, value: string | boolean | undefined) => {
        onFiltrosChange({ ...filtros, [key]: value })
    }

    const hasActiveFilters = Object.values(filtros).some((v) => v !== undefined && v !== "")

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Buscar por nome..."
                    value={filtros.nome || ""}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    className="pl-10"
                />
            </div>

            <div className="flex items-center gap-2">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="gap-2 bg-transparent">
                            <SlidersHorizontal className="h-4 w-4" />
                            Filtros
                            {hasActiveFilters && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
                  !
                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Filtros de Pacientes</SheetTitle>
                            <SheetDescription>Filtre os pacientes por diferentes critérios</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 flex flex-col gap-4">
                            <div className="space-y-2">
                                <Label>CPF</Label>
                                <Input
                                    placeholder="000.000.000-00"
                                    value={filtros.cpf || ""}
                                    onChange={(e) => handleChange("cpf", e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Convênio</Label>
                                <Select
                                    value={filtros.convenio || "all"}
                                    onValueChange={(v) => handleChange("convenio", v === "all" ? undefined : v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todos os convênios" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todos os convênios</SelectItem>
                                        {convenios.map((conv) => (
                                            <SelectItem key={conv} value={conv}>
                                                {conv}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Situação</Label>
                                <Select
                                    value={filtros.ativo === undefined ? "all" : filtros.ativo ? "ativo" : "inativo"}
                                    onValueChange={(v) => handleChange("ativo", v === "all" ? undefined : v === "ativo")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todas as situações" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todas as situações</SelectItem>
                                        <SelectItem value="ativo">Ativos</SelectItem>
                                        <SelectItem value="inativo">Inativos</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1 bg-transparent"
                                    onClick={() => {
                                        onLimparFiltros()
                                        setOpen(false)
                                    }}
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Limpar
                                </Button>
                                <Button className="flex-1" onClick={() => setOpen(false)}>
                                    Aplicar
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={onLimparFiltros}>
                        <X className="mr-1 h-4 w-4" />
                        Limpar filtros
                    </Button>
                )}
            </div>
        </div>
    )
}
