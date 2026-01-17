"use client";

import type React from "react";
import { useState } from "react";
import type { EvolucaoTratamentoRequest, TipoEvolucao } from "@/modules/evolucao-tratamento";
import { Button } from "@/components/ui-shadcn/button";
import { Input } from "@/components/ui-shadcn/input";
import { Label } from "@/components/ui-shadcn/label";
import { Textarea } from "@/components/ui-shadcn/textarea";
import { Checkbox } from "@/components/ui-shadcn/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui-shadcn/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-shadcn/select";

interface EvolucaoFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EvolucaoTratamentoRequest) => void;
  initialData?: Partial<EvolucaoTratamentoRequest>;
  isEditing?: boolean;
}

export function EvolucaoFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false,
}: EvolucaoFormModalProps) {
  const [formData, setFormData] = useState<Partial<EvolucaoTratamentoRequest>>(
    initialData || {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as EvolucaoTratamentoRequest);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Evolução" : "Nova Evolução"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize as informações da evolução."
              : "Registre uma nova evolução do tratamento."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Paciente, Dentista e Plano */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pacienteId">Paciente *</Label>
              <Select
                value={formData.pacienteId?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, pacienteId: Number.parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">João Silva</SelectItem>
                  <SelectItem value="2">Maria Santos</SelectItem>
                  <SelectItem value="3">Pedro Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dentistaId">Dentista *</Label>
              <Select
                value={formData.dentistaId?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, dentistaId: Number.parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o dentista" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Dr. Carlos Mendes</SelectItem>
                  <SelectItem value="2">Dra. Ana Paula</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="planoDentalId">Plano Dental *</Label>
              <Select
                value={formData.planoDentalId?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, planoDentalId: Number.parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Restauração dente 11</SelectItem>
                  <SelectItem value="2">Tratamento de canal 36</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tipo e Data */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipoEvolucao">Tipo de Evolução *</Label>
              <Select
                value={formData.tipoEvolucao || ""}
                onValueChange={(v) =>
                  setFormData({ ...formData, tipoEvolucao: v as TipoEvolucao })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ANAMNESE">Anamnese</SelectItem>
                  <SelectItem value="EVOLUCAO">Evolução</SelectItem>
                  <SelectItem value="CONCLUSAO">Conclusão</SelectItem>
                  <SelectItem value="RETORNO">Retorno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataEvolucao">Data da Evolução *</Label>
              <Input
                id="dataEvolucao"
                type="date"
                value={formData.dataEvolucao || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dataEvolucao: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tempoConsultaMinutos">Tempo de Consulta (min)</Label>
              <Input
                id="tempoConsultaMinutos"
                type="number"
                min="1"
                max="480"
                value={formData.tempoConsultaMinutos || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tempoConsultaMinutos: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* Título e Descrição */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              placeholder="Título da evolução"
              value={formData.titulo || ""}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              placeholder="Detalhes da evolução"
              rows={4}
              value={formData.descricao || ""}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
            />
          </div>

          {/* Campos Opcionais */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="procedimentosRealizados">Procedimentos Realizados</Label>
              <Textarea
                id="procedimentosRealizados"
                placeholder="Descreva os procedimentos"
                rows={3}
                value={formData.procedimentosRealizados || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    procedimentosRealizados: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="materiaisUtilizados">Materiais Utilizados</Label>
              <Textarea
                id="materiaisUtilizados"
                placeholder="Materiais utilizados"
                rows={3}
                value={formData.materiaisUtilizados || ""}
                onChange={(e) =>
                  setFormData({ ...formData, materiaisUtilizados: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medicamentosPrescritos">Medicamentos Prescritos</Label>
              <Textarea
                id="medicamentosPrescritos"
                placeholder="Medicamentos prescritos"
                rows={3}
                value={formData.medicamentosPrescritos || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicamentosPrescritos: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Observações adicionais"
                rows={3}
                value={formData.observacoes || ""}
                onChange={(e) =>
                  setFormData({ ...formData, observacoes: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recomendacoes">Recomendações</Label>
            <Textarea
              id="recomendacoes"
              placeholder="Recomendações ao paciente"
              rows={3}
              value={formData.recomendacoes || ""}
              onChange={(e) =>
                setFormData({ ...formData, recomendacoes: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doresQueixas">Dores e Queixas</Label>
            <Textarea
              id="doresQueixas"
              placeholder="Queixas do paciente"
              rows={3}
              value={formData.doresQueixas || ""}
              onChange={(e) =>
                setFormData({ ...formData, doresQueixas: e.target.value })
              }
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgente"
                checked={formData.urgente || false}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, urgente: checked === true })
                }
              />
              <Label htmlFor="urgente" className="font-normal cursor-pointer">
                Marcar como urgente
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="retornoNecessario"
                checked={formData.retornoNecessario || false}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    retornoNecessario: checked === true,
                  })
                }
              />
              <Label htmlFor="retornoNecessario" className="font-normal cursor-pointer">
                Retorno necessário
              </Label>
            </div>
          </div>

          {/* Próxima Consulta */}
          <div className="space-y-2">
            <Label htmlFor="proximaConsulta">Próxima Consulta</Label>
            <Input
              id="proximaConsulta"
              type="date"
              value={formData.proximaConsulta || ""}
              onChange={(e) =>
                setFormData({ ...formData, proximaConsulta: e.target.value })
              }
            />
          </div>

          {/* Assinatura */}
          <div className="space-y-2">
            <Label htmlFor="assinaturaDentista">Assinatura do Dentista</Label>
            <Input
              id="assinaturaDentista"
              placeholder="Nome do dentista responsável"
              value={formData.assinaturaDentista || ""}
              onChange={(e) =>
                setFormData({ ...formData, assinaturaDentista: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{isEditing ? "Salvar Alterações" : "Criar Evolução"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}