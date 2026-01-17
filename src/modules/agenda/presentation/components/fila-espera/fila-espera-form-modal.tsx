"use client"

import type React from "react"
import {useState} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui-shadcn/dialog"
import {Button} from "@/components/ui-shadcn/button"
import {Input} from "@/components/ui-shadcn/input"
import {Label} from "@/components/ui-shadcn/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui-shadcn/select"
import {Textarea} from "@/components/ui-shadcn/textarea"
import {Checkbox} from "@/components/ui-shadcn/checkbox"
import {FilaEsperaRequest, PeriodoPreferencial} from "@/models/agenda/fila-espera.type"
import {TipoProcedimento} from "@/models/agenda/agendamento.type"

interface FilaEsperaFormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: FilaEsperaRequest) => void
}

const procedimentos: { value: TipoProcedimento; label: string }[] = [
    { value: TipoProcedimento.CONSULTA, label: "Consulta" },
    { value: TipoProcedimento.RETORNO, label: "Retorno" },
    { value: TipoProcedimento.AVALIACAO, label: "Avaliação" },
    { value: TipoProcedimento.LIMPEZA, label: "Limpeza" },
    { value: TipoProcedimento.EXTRACAO, label: "Extração" },
    { value: TipoProcedimento.RESTAURACAO, label: "Restauração" },
    { value: TipoProcedimento.CANAL, label: "Canal" },
    { value: TipoProcedimento.PROTESE, label: "Prótese" },
    { value: TipoProcedimento.ORTODONTIA, label: "Ortodontia" },
    { value: TipoProcedimento.URGENCIA, label: "Urgência" },
    { value: TipoProcedimento.OUTROS, label: "Outros" },
]

const periodos: { value: PeriodoPreferencial; label: string }[] = [
    { value: PeriodoPreferencial.MANHA, label: "Manhã" },
    { value: PeriodoPreferencial.TARDE, label: "Tarde" },
    { value: PeriodoPreferencial.NOITE, label: "Noite" },
    { value: PeriodoPreferencial.QUALQUER, label: "Qualquer" },
]

export function FilaEsperaFormModal({ open, onOpenChange, onSubmit }: FilaEsperaFormModalProps) {
    const [formData, setFormData] = useState<FilaEsperaRequest>({
        pacienteId: 0,
        periodoPreferencial: PeriodoPreferencial.QUALQUER,
        prioridade: 1,
        aceitaQualquerHorario: true,
        aceitaQualquerDentista: true,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Adicionar à Fila de Espera</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tipoProcedimento">Procedimento</Label>
                                <Select
                                    value={formData.tipoProcedimento || ""}
                                    onValueChange={(value) => setFormData({ ...formData, tipoProcedimento: value as TipoProcedimento })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
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
                                <Label htmlFor="periodoPreferencial">Período Preferencial</Label>
                                <Select
                                    value={formData.periodoPreferencial || "QUALQUER"}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, periodoPreferencial: value as PeriodoPreferencial })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {periodos.map((p) => (
                                            <SelectItem key={p.value} value={p.value}>
                                                {p.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dentistaId">Dentista (opcional)</Label>
                                <Select
                                    value={formData.dentistaId?.toString() || ""}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, dentistaId: value ? Number.parseInt(value) : undefined })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Qualquer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Dr. Carlos Mendes</SelectItem>
                                        <SelectItem value="2">Dra. Ana Paula</SelectItem>
                                        <SelectItem value="3">Dr. Roberto Lima</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="prioridade">Prioridade</Label>
                                <Select
                                    value={formData.prioridade?.toString() || "1"}
                                    onValueChange={(value) => setFormData({ ...formData, prioridade: Number.parseInt(value) })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Normal</SelectItem>
                                        <SelectItem value="2">Alta</SelectItem>
                                        <SelectItem value="3">Urgente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dataPreferencial">Data Preferencial (opcional)</Label>
                            <Input
                                id="dataPreferencial"
                                type="date"
                                value={formData.dataPreferencial || ""}
                                onChange={(e) => setFormData({ ...formData, dataPreferencial: e.target.value })}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="aceitaQualquerHorario"
                                    checked={formData.aceitaQualquerHorario}
                                    onCheckedChange={(checked) => setFormData({ ...formData, aceitaQualquerHorario: !!checked })}
                                />
                                <Label htmlFor="aceitaQualquerHorario" className="font-normal">
                                    Aceita qualquer horário disponível
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="aceitaQualquerDentista"
                                    checked={formData.aceitaQualquerDentista}
                                    onCheckedChange={(checked) => setFormData({ ...formData, aceitaQualquerDentista: !!checked })}
                                />
                                <Label htmlFor="aceitaQualquerDentista" className="font-normal">
                                    Aceita qualquer dentista disponível
                                </Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="observacoes">Observações</Label>
                            <Textarea
                                id="observacoes"
                                value={formData.observacoes || ""}
                                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                                placeholder="Observações adicionais..."
                                rows={2}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Adicionar à Fila</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
