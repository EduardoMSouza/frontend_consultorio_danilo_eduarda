"use client";
import { EvolucaoStatusBadge } from "./evolucao-status-badge";
import { Button } from "@/components/ui-shadcn/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui-shadcn/dialog";
import { Separator } from "@/components/ui-shadcn/separator";
import { Calendar, Clock, User, Stethoscope, FileText, AlertTriangle } from "lucide-react";
import type { EvolucaoTratamentoResponse } from "@/modules/evolucao-tratamento";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  evolucao: EvolucaoTratamentoResponse | null;
  onEdit?: () => void;
}

export function EvolucaoDetailModal({ open, onOpenChange, evolucao, onEdit }: Props) {
  if (!evolucao) return null;

  const fmt = (d?: string) =>
      d
          ? new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
          : "-";

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                {evolucao.titulo}
                {evolucao.urgente && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                  <AlertTriangle className="h-3 w-3" />
                  Urgente
                </span>
                )}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <EvolucaoStatusBadge tipo={evolucao.tipoEvolucao} />
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Paciente / Dentista */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Paciente</p>
                  <p className="font-medium">{evolucao.pacienteNome}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Stethoscope className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Dentista</p>
                  <p className="font-medium">Dr(a). {evolucao.dentistaNome}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Datas / Tempo */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Data da Evolução</p>
                  <p className="font-medium">{fmt(evolucao.dataEvolucao)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Tempo de Consulta</p>
                  <p className="font-medium">{evolucao.tempoConsultaMinutos || 0} min</p>
                </div>
              </div>
              {evolucao.proximaConsulta && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Próxima Consulta</p>
                      <p className="font-medium">{fmt(evolucao.proximaConsulta)}</p>
                    </div>
                  </div>
              )}
            </div>

            <Separator />

            {/* Descrição */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Descrição
              </h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{evolucao.descricao}</p>
            </div>

            {/* Seções opcionais */}
            {[
              ["Procedimentos Realizados", evolucao.procedimentosRealizados],
              ["Materiais Utilizados", evolucao.materiaisUtilizados],
              ["Medicamentos Prescritos", evolucao.medicamentosPrescritos],
              ["Observações", evolucao.observacoes],
              ["Recomendações", evolucao.recomendacoes],
              ["Dores e Queixas", evolucao.doresQueixas],
            ].map(([tit, cont]) =>
                cont ? (
                    <div key={tit}>
                      <Separator />
                      <div className="space-y-2">
                        <h4 className="font-medium">{tit}</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{cont}</p>
                      </div>
                    </div>
                ) : null
            )}

            {(evolucao.retornoNecessario || evolucao.proximaConsulta) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Informações de Retorno</h4>
                    <p className="text-sm">
                      <span className="font-medium">Retorno necessário:</span> {evolucao.retornoNecessario ? "Sim" : "Não"}
                    </p>
                    {evolucao.proximaConsulta && (
                        <p className="text-sm">
                          <span className="font-medium">Próxima consulta:</span> {fmt(evolucao.proximaConsulta)}
                        </p>
                    )}
                  </div>
                </>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
            <Button onClick={onEdit}>Editar</Button>
          </div>
        </DialogContent>
      </Dialog>
  );
}