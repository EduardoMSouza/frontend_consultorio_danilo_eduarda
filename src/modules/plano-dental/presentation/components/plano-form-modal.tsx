"use client"

import type React from "react"

import { useState } from "react"
import type { PlanoDentalRequest, StatusPlano } from "@/models/plano-dental.model"
import { Button } from "@/components/ui-shadcn/button"
import { Input } from "@/components/ui-shadcn/input"
import { Label } from "@/components/ui-shadcn/label"
import { Textarea } from "@/components/ui-shadcn/textarea"
import { Checkbox } from "@/components/ui-shadcn/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui-shadcn/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-shadcn/select"

interface PlanoFormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: PlanoDentalRequest) => void
    initialData?: Partial<PlanoDentalRequest>
    isEditing?: boolean
}

export function PlanoFormModal({ open, onOpenChange, onSubmit, initialData, isEditing = false }: PlanoFormModalProps) {
    const [formData, setFormData] = useState<Partial<PlanoDentalRequest>>(initialData || {})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData as PlanoDentalRequest)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar Plano Dental" : "Novo Plano Dental"}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Atualize as informações do plano dental."
                            : "Preencha as informações para criar um novo plano dental."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Patient and Dentist */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pacienteId">Paciente *</Label>
                            <Select
                                value={formData.pacienteId?.toString()}
                                onValueChange={(value) => setFormData({ ...formData, pacienteId: Number.parseInt(value) })}
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
                                onValueChange={(value) => setFormData({ ...formData, dentistaId: Number.parseInt(value) })}
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
                    </div>

                    {/* Procedure info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="procedimento">Procedimento *</Label>
                            <Input
                                id="procedimento"
                                placeholder="Ex: Restauração Classe II"
                                value={formData.procedimento || ""}
                                onChange={(e) => setFormData({ ...formData, procedimento: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="codigoProcedimento">Código do Procedimento</Label>
                            <Input
                                id="codigoProcedimento"
                                placeholder="Ex: 81000-015"
                                value={formData.codigoProcedimento || ""}
                                onChange={(e) => setFormData({ ...formData, codigoProcedimento: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Tooth info */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dente">Dente *</Label>
                            <Input
                                id="dente"
                                placeholder="Ex: 11, 21, 36"
                                value={formData.dente || ""}
                                onChange={(e) => setFormData({ ...formData, dente: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="faceDente">Face do Dente</Label>
                            <Select
                                value={formData.faceDente || ""}
                                onValueChange={(value) => setFormData({ ...formData, faceDente: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">Mesial (M)</SelectItem>
                                    <SelectItem value="D">Distal (D)</SelectItem>
                                    <SelectItem value="O">Oclusal (O)</SelectItem>
                                    <SelectItem value="V">Vestibular (V)</SelectItem>
                                    <SelectItem value="L">Lingual (L)</SelectItem>
                                    <SelectItem value="P">Palatina (P)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="prioridade">Prioridade</Label>
                            <Select
                                value={formData.prioridade || ""}
                                onValueChange={(value) => setFormData({ ...formData, prioridade: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BAIXA">Baixa</SelectItem>
                                    <SelectItem value="MEDIA">Média</SelectItem>
                                    <SelectItem value="ALTA">Alta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="valor">Valor *</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input
                                    id="valor"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="pl-10"
                                    placeholder="0,00"
                                    value={formData.valor || ""}
                                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="valorDesconto">Desconto</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                                <Input
                                    id="valorDesconto"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="pl-10"
                                    placeholder="0,00"
                                    value={formData.valorDesconto || ""}
                                    onChange={(e) => setFormData({ ...formData, valorDesconto: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Date and Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dataPrevista">Data Prevista</Label>
                            <Input
                                id="dataPrevista"
                                type="datetime-local"
                                value={formData.dataPrevista || ""}
                                onChange={(e) => setFormData({ ...formData, dataPrevista: e.target.value })}
                            />
                        </div>

                        {isEditing && (
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value as StatusPlano })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PENDENTE">Pendente</SelectItem>
                                        <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                                        <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                                        <SelectItem value="CANCELADO">Cancelado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {/* Urgency */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="urgente"
                            checked={formData.urgente || false}
                            onCheckedChange={(checked) => setFormData({ ...formData, urgente: checked === true })}
                        />
                        <Label htmlFor="urgente" className="font-normal cursor-pointer">
                            Marcar como urgente
                        </Label>
                    </div>

                    {/* Observations */}
                    <div className="space-y-2">
                        <Label htmlFor="observacoes">Observações</Label>
                        <Textarea
                            id="observacoes"
                            placeholder="Informações adicionais sobre o procedimento..."
                            rows={3}
                            value={formData.observacoes || ""}
                            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">{isEditing ? "Salvar Alterações" : "Criar Plano"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
