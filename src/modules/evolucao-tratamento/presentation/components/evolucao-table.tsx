"use client";
import { EvolucaoStatusBadge } from "./evolucao-status-badge";
import { Badge } from "@/components/ui-shadcn/badge";
import { Button } from "@/components/ui-shadcn/button";
import { Checkbox } from "@/components/ui-shadcn/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui-shadcn/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui-shadcn/dropdown-menu";
import { AlertTriangle, MoreHorizontal, Eye, Pencil, Calendar, FileText } from "lucide-react";
import type { EvolucaoTratamentoResponse } from "@/modules/evolucao-tratamento";

interface EvolucaoTableProps {
  evolucoes?: EvolucaoTratamentoResponse[];
  selectedIds?: number[];
  onSelectChange?: (ids: number[]) => void;
  onView?: (ev: EvolucaoTratamentoResponse) => void;
  onEdit?: (ev: EvolucaoTratamentoResponse) => void;
  onDelete?: (ev: EvolucaoTratamentoResponse) => void;
  onMarcarUrgente?: (ev: EvolucaoTratamentoResponse) => void;
  onAgendarRetorno?: (ev: EvolucaoTratamentoResponse) => void;
}

export function EvolucaoTable({
                                evolucoes = [],
                                selectedIds = [],
                                onSelectChange,
                                onView,
                                onEdit,
                                onDelete,
                                onMarcarUrgente,
                                onAgendarRetorno,
                              }: EvolucaoTableProps) {
  const fmtDate = (d?: string) => (d ? new Date(d).toLocaleDateString("pt-BR") : "-");

  const toggle = (id: number) => {
    if (!onSelectChange) return;
    selectedIds.includes(id)
        ? onSelectChange(selectedIds.filter((i) => i !== id))
        : onSelectChange([...selectedIds, id]);
  };

  const toggleAll = () => {
    if (!onSelectChange) return;
    selectedIds.length === evolucoes.length
        ? onSelectChange([])
        : onSelectChange(evolucoes.map((e) => e.id));
  };

  const vazia = evolucoes.length === 0;

  return (
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {onSelectChange && (
                  <TableHead className="w-12">
                    <Checkbox checked={!vazia && selectedIds.length === evolucoes.length} onCheckedChange={toggleAll} />
                  </TableHead>
              )}
              <TableHead>Título</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>Dentista</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tempo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {vazia ? (
                <TableRow>
                  <TableCell colSpan={onSelectChange ? 9 : 8} className="h-24 text-center text-muted-foreground">
                    Nenhuma evolução encontrada.
                  </TableCell>
                </TableRow>
            ) : (
                evolucoes.map((ev) => (
                    <TableRow key={ev.id}>
                      {onSelectChange && (
                          <TableCell>
                            <Checkbox checked={selectedIds.includes(ev.id)} onCheckedChange={() => toggle(ev.id)} />
                          </TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{ev.titulo}</span>
                          {ev.urgente && (
                              <Badge variant="destructive" className="h-5 gap-0.5 px-1.5">
                                <AlertTriangle className="h-3 w-3" />
                              </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{ev.pacienteNome}</TableCell>
                      <TableCell>Dr(a). {ev.dentistaNome}</TableCell>
                      <TableCell>
                        <EvolucaoStatusBadge tipo={ev.tipoEvolucao} />
                      </TableCell>
                      <TableCell>{fmtDate(ev.dataEvolucao)}</TableCell>
                      <TableCell>{ev.tempoConsultaMinutos || 0} min</TableCell>
                      <TableCell>
                        <Badge variant={ev.ativo ? "default" : "secondary"}>{ev.ativo ? "Ativo" : "Inativo"}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onView?.(ev)}>
                              <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit?.(ev)}>
                              <Pencil className="mr-2 h-4 w-4" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onMarcarUrgente?.(ev)}>
                              <AlertTriangle className="mr-2 h-4 w-4" /> Marcar Urgente
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onAgendarRetorno?.(ev)}>
                              <Calendar className="mr-2 h-4 w-4" /> Agendar Retorno
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onDelete?.(ev)} className="text-destructive">
                              <FileText className="mr-2 h-4 w-4" /> Excluir
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
  );
}