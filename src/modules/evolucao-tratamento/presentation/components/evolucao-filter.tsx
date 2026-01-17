"use client";
import { useState } from "react";
import type { EvolucaoTratamentoFiltros, TipoEvolucao } from "@/modules/evolucao-tratamento";
import { Button } from "@/components/ui-shadcn/button";
import { Input } from "@/components/ui-shadcn/input";
import { Label } from "@/components/ui-shadcn/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-shadcn/select";
import { Checkbox } from "@/components/ui-shadcn/checkbox";
import { Search, Filter, X } from "lucide-react";

interface Props {
    filtros: EvolucaoTratamentoFiltros;
    onFiltrosChange: (f: EvolucaoTratamentoFiltros) => void;
    onLimparFiltros: () => void;
    onBuscar: () => void;
}

export function EvolucaoFilters({ filtros, onFiltrosChange, onLimparFiltros, onBuscar }: Props) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const change = <K extends keyof EvolucaoTratamentoFiltros>(k: K, v: EvolucaoTratamentoFiltros[K]) =>
        onFiltrosChange({ ...filtros, [k]: v });

    const hasActive = Object.values(filtros).some((v) => v !== undefined && v !== "");

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 md:flex-row md:items-end">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Buscar por título ou descrição..."
                    value={filtros.termo || ""}
                    onChange={(e) => change("termo", e.target.value)}
                    className="pl-10"
                />
            </div>

            <Select value={filtros.tipoEvolucao || "all"} onValueChange={(v) => change("tipoEvolucao", v === "all" ? undefined : (v as TipoEvolucao))}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="ANAMNESE">Anamnese</SelectItem>
                    <SelectItem value="EVOLUCAO">Evolução</SelectItem>
                    <SelectItem value="CONCLUSAO">Conclusão</SelectItem>
                    <SelectItem value="RETORNO">Retorno</SelectItem>
                </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowAdvanced((s) => !s)}>
                <Filter className="h-4 w-4" />
                Filtros
            </Button>

            <Button onClick={onBuscar}>Buscar</Button>

            {hasActive && (
                <Button variant="ghost" size="sm" onClick={onLimparFiltros}>
                    <X className="mr-1 h-4 w-4" />
                    Limpar
                </Button>
            )}

            {showAdvanced && (
                <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 md:grid-cols-3 lg:grid-cols-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="urgente"
                            checked={!!filtros.urgente}
                            onCheckedChange={(c) => change("urgente", c ? true : undefined)}
                        />
                        <Label htmlFor="urgente" className="text-sm font-normal cursor-pointer">
                            Apenas urgentes
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="retorno"
                            checked={!!filtros.retornoNecessario}
                            onCheckedChange={(c) => change("retornoNecessario", c ? true : undefined)}
                        />
                        <Label htmlFor="retorno" className="text-sm font-normal cursor-pointer">
                            Com retorno necessário
                        </Label>
                    </div>
                </div>
            )}
        </div>
    );
}