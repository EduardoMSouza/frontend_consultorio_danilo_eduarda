"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui-shadcn/dialog"
import {Button} from "@/components/ui-shadcn/button"
import {Input} from "@/components/ui-shadcn/input"
import {Label} from "@/components/ui-shadcn/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui-shadcn/select"
import {Textarea} from "@/components/ui-shadcn/textarea"
import {AgendamentoRequest, AgendamentoResponse, TipoProcedimento} from "@/models/agenda/agendamento.type"

interface AgendamentoFormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    agendamento?: AgendamentoResponse | null
    onSubmit: (data: AgendamentoRequest) => void
    selectedDate?: Date
}

const procedimentos: { value: TipoProcedimento; label: string }[] = [
    { value: TipoProcedimento.CONSULTA, label: "Consulta" },
    { value: TipoProcedimento.RETORNO, label: "Retorno" },
    { value: TipoProcedimento.RETORNO, label: "Avaliação" },
    { value: TipoProcedimento.LIMPEZA, label: "Limpeza" },
    { value: TipoProcedimento.EXTRACAO, label: "Extração" },
    { value: TipoProcedimento.RESTAURACAO, label: "Restauração" },
    { value: TipoProcedimento.CANAL, label: "Canal" },
    { value: TipoProcedimento.PROTESE, label: "Prótese" },
    { value: TipoProcedimento.ORTODONTIA, label: "Ortodontia" },
    { value: TipoProcedimento.URGENCIA, label: "Urgência" },
    { value: TipoProcedimento.OUTROS, label: "Outros" },
]

export function AgendamentoFormModal({
                                         open,
                                         onOpenChange,
                                         agendamento,
                                         onSubmit,
                                         selectedDate,
                                     }: AgendamentoFormModalProps) {
    const [formData, setFormData] = useState<AgendamentoRequest>({
        dentistaId: 0,
        pacienteId: 0,
        dataConsulta: "",
        horaInicio: "",
        horaFim: "",
        tipoProcedimento: TipoProcedimento.CONSULTA,
        observacoes: "",
        valorConsulta: 0,
    })

    useEffect(() => {
        if (agendamento) {
            setFormData({
                dentistaId: agendamento.dentistaId,
                pacienteId: agendamento.pacienteId,
                dataConsulta: agendamento.dataConsulta,
                horaInicio: agendamento.horaInicio,
                horaFim: agendamento.horaFim,
                tipoProcedimento: agendamento.tipoProcedimento,
                observacoes: agendamento.observacoes || "",
                valorConsulta: agendamento.valorConsulta || 0,
            })
        } else if (selectedDate) {
            setFormData((prev) => ({
                ...prev,
                dataConsulta: selectedDate.toISOString().split("T")[0],
            }))
        }
    }, [agendamento, selectedDate])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{agendamento ? "Editar Agendamento" : "Novo Agendamento"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pacienteId">Paciente</Label>
                                <Select
                                    value={formData.pacienteId?.toString() || ""}
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
                                <Label htmlFor="dentistaId">Dentista</Label>
                                <Select
                                    value={formData.dentistaId?.toString() || ""}
                                    onValueChange={(value) => setFormData({ ...formData, dentistaId: Number.parseInt(value) })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o dentista" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Dr. Carlos Mendes</SelectItem>
                                        <SelectItem value="2">Dra. Ana Paula</SelectItem>
                                        <SelectItem value="3">Dr. Roberto Lima</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dataConsulta">Data</Label>
                                <Input
                                    id="dataConsulta"
                                    type="date"
                                    value={formData.dataConsulta}
                                    onChange={(e) => setFormData({ ...formData, dataConsulta: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="horaInicio">Hora Início</Label>
                                <Input
                                    id="horaInicio"
                                    type="time"
                                    value={formData.horaInicio}
                                    onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="horaFim">Hora Fim</Label>
                                <Input
                                    id="horaFim"
                                    type="time"
                                    value={formData.horaFim}
                                    onChange={(e) => setFormData({ ...formData, horaFim: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tipoProcedimento">Tipo de Procedimento</Label>
                                <Select
                                    value={formData.tipoProcedimento || ""}
                                    onValueChange={(value) => setFormData({ ...formData, tipoProcedimento: value as TipoProcedimento })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {procedimentos.map((p) => (
                                            <SelectItem key={p.value} value={p.value}>
                                                {p.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="valorConsulta">Valor (R$)</Label>
                                <Input
                                    id="valorConsulta"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.valorConsulta || ""}
                                    onChange={(e) => setFormData({ ...formData, valorConsulta: Number.parseFloat(e.target.value) || 0 })}
                                    placeholder="0,00"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="observacoes">Observações</Label>
                            <Textarea
                                id="observacoes"
                                value={formData.observacoes || ""}
                                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                                placeholder="Observações sobre o agendamento..."
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">{agendamento ? "Salvar Alterações" : "Criar Agendamento"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
