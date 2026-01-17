"use client";
import { useState } from "react";
import type { StatusPlano, PlanoDentalFiltros } from '@/modules/plano-dental/domain/types/plano-dental.types';
import { Button } from "@/components/ui-shadcn/button";
import { Input } from "@/components/ui-shadcn/input";
import { Label } from "@/components/ui-shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-shadcn/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui-shadcn/popover";
import { Calendar } from "@/components/ui-shadcn/calendar";
import { Checkbox } from "@/components/ui-shadcn/checkbox";
import { Search, Filter, X, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Props {
    filtros: PlanoDentalFiltros;
    onFiltrosChange: (f: PlanoDentalFiltros) => void;
    onLimparFiltros: () => void;
}

export function PlanoDentalFilters({ filtros, onFiltrosChange, onLimparFiltros }: Props) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleChange = <K extends keyof PlanoDentalFiltros>(key: K, value: PlanoDentalFiltros[K]) => {
        onFiltrosChange({ ...filtros, [key]: value });
    };

    const hasActive = Object.values(filtros).some((v) => v !== undefined && v !== '');

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 md:flex-row md:items-end">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Buscar por procedimento..."
                    value={filtros.termo || ''}
                    onChange={(e) => handleChange('termo', e.target.value)}
                    className="pl-10"
                />
            </div>

            <Select value={filtros.status || 'all'} onValueChange={(v) => handleChange('status', v === 'all' ? undefined : v as StatusPlano)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                    <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                    <SelectItem value="CANCELADO">Cancelado</SelectItem>
                </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Filter className="h-4 w-4" />
                Filtros
            </Button>

            <Button onClick={() => null}>Buscar</Button>

            {hasActive && (
                <Button variant="ghost" size="sm" onClick={onLimparFiltros}>
                    <X className="mr-1 h-4 w-4" />
                    Limpar
                </Button>
            )}

            {showAdvanced && (
                <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 md:grid-cols-3 lg:grid-cols-4">
                    <Checkbox
                        id="urgente"
                        checked={filtros.urgente || false}
                        onCheckedChange={(c) => handleChange('urgente', c === true ? true : undefined)}
                    />
                    <Label htmlFor="urgente" className="text-sm font-normal cursor-pointer">
                        Apenas urgentes
                    </Label>
                </div>
            )}
        </div>
    );
}