"use client"

import { useState } from "react"
import type { StatusPlano, PlanoDentalFiltros } from "@/models/plano-dental.model"
import { Button } from "@/components/ui-shadcn/button"
import { Input } from "@/components/ui-shadcn/input"
import { Label } from "@/components/ui-shadcn/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-shadcn/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui-shadcn/popover"
import { Calendar } from "@/components/ui-shadcn/calendar"
import { Checkbox } from "@/components/ui-shadcn/checkbox"
import { Search, Filter, X, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface PlanoFiltersProps {
    onFilter: (filtros: PlanoDentalFiltros) => void
    onClear: () => void
}

export function PlanoFilters({ onFilter, onClear }: PlanoFiltersProps) {
    const [filtros, setFiltros] = useState<PlanoDentalFiltros>({})
    const [showAdvanced, setShowAdvanced] = useState(false)

    const handleFilter = () => {
        onFilter(filtros)
    }

    const handleClear = () => {
        setFiltros({})
        onClear()
    }

    return (
        <div className="space-y-4 rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-end gap-4">
                {/* Search by procedure */}
                <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="procedimento" className="text-sm">
                        Buscar procedimento
                    </Label>
                    <div className="relative mt-1.5">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="procedimento"
                            placeholder="Digite o nome do procedimento..."
                            className="pl-9"
                            value={filtros.procedimento || ""}
                            onChange={(e) => setFiltros({ ...filtros, procedimento: e.target.value })}
                        />
                    </div>
                </div>

                {/* Status filter */}
                <div className="w-[180px]">
                    <Label className="text-sm">Status</Label>
                    <Select
                        value={filtros.status || "all"}
                        onValueChange={(value) =>
                            setFiltros({
                                ...filtros,
                                status: value === "all" ? undefined : (value as StatusPlano),
                            })
                        }
                    >
                        <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="PENDENTE">Pendente</SelectItem>
                            <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                            <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                            <SelectItem value="CANCELADO">Cancelado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Tooth filter */}
                <div className="w-[120px]">
                    <Label htmlFor="dente" className="text-sm">
                        Dente
                    </Label>
                    <Input
                        id="dente"
                        placeholder="Ex: 11"
                        className="mt-1.5"
                        value={filtros.dente || ""}
                        onChange={(e) => setFiltros({ ...filtros, dente: e.target.value })}
                    />
                </div>

                {/* Toggle advanced filters */}
                <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowAdvanced(!showAdvanced)}>
                    <Filter className="h-4 w-4" />
                    Filtros
                </Button>

                <Button onClick={handleFilter}>Buscar</Button>

                {Object.values(filtros).some((v) => v !== undefined) && (
                    <Button variant="ghost" size="icon" onClick={handleClear}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Advanced filters */}
            {showAdvanced && (
                <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 md:grid-cols-3 lg:grid-cols-4">
                    {/* Date range - Start */}
                    <div>
                        <Label className="text-sm">Data Início</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "mt-1.5 w-full justify-start text-left font-normal",
                                        !filtros.dataInicio && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {filtros.dataInicio ? format(new Date(filtros.dataInicio), "PPP", { locale: ptBR }) : "Selecionar"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={filtros.dataInicio ? new Date(filtros.dataInicio) : undefined}
                                    onSelect={(date: { toISOString: () => any }) =>
                                        setFiltros({
                                            ...filtros,
                                            dataInicio: date?.toISOString(),
                                        })
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Date range - End */}
                    <div>
                        <Label className="text-sm">Data Fim</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "mt-1.5 w-full justify-start text-left font-normal",
                                        !filtros.dataFim && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {filtros.dataFim ? format(new Date(filtros.dataFim), "PPP", { locale: ptBR }) : "Selecionar"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={filtros.dataFim ? new Date(filtros.dataFim) : undefined}
                                    onSelect={(date: { toISOString: () => any }) =>
                                        setFiltros({
                                            ...filtros,
                                            dataFim: date?.toISOString(),
                                        })
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Urgency checkbox */}
                    <div className="flex items-end pb-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="urgente"
                                checked={filtros.urgente || false}
                                onCheckedChange={(checked) =>
                                    setFiltros({
                                        ...filtros,
                                        urgente: checked === true ? true : undefined,
                                    })
                                }
                            />
                            <Label htmlFor="urgente" className="text-sm font-normal cursor-pointer">
                                Apenas urgentes
                            </Label>
                        </div>
                    </div>

                    {/* Active checkbox */}
                    <div className="flex items-end pb-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="ativo"
                                checked={filtros.ativo !== false}
                                onCheckedChange={(checked) =>
                                    setFiltros({
                                        ...filtros,
                                        ativo: checked === true ? true : false,
                                    })
                                }
                            />
                            <Label htmlFor="ativo" className="text-sm font-normal cursor-pointer">
                                Apenas ativos
                            </Label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
