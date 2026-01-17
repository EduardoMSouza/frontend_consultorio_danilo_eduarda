"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui-shadcn/dialog"
import { Button } from "@/components/ui-shadcn/button"
import { Input } from "@/components/ui-shadcn/input"
import { Label } from "@/components/ui-shadcn/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-shadcn/select"
import type { DentistaRequest, DentistaResponse } from "@/models/dentista.type"

const ESPECIALIDADES = [
    "Clínico Geral",
    "Ortodontia",
    "Endodontia",
    "Periodontia",
    "Implantodontia",
    "Odontopediatria",
    "Cirurgia Bucomaxilofacial",
    "Prótese Dentária",
    "Estética Dental",
    "Radiologia Odontológica",
]

interface DentistaFormModalProps {
    open: boolean
    onClose: () => void
    onSave: (data: DentistaRequest) => void
    dentista?: DentistaResponse | null
}

export function DentistaFormModal({ open, onClose, onSave, dentista }: DentistaFormModalProps) {
    const [formData, setFormData] = useState<DentistaRequest>({
        nome: "",
        cro: "",
        especialidade: "",
        telefone: "",
        email: "",
    })

    useEffect(() => {
        if (dentista) {
            setFormData({
                nome: dentista.nome,
                cro: dentista.cro,
                especialidade: dentista.especialidade,
                telefone: dentista.telefone,
                email: dentista.email,
            })
        } else {
            setFormData({
                nome: "",
                cro: "",
                especialidade: "",
                telefone: "",
                email: "",
            })
        }
    }, [dentista, open])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, "")
        if (numbers.length <= 11) {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        }
        return value
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{dentista ? "Editar Dentista" : "Novo Dentista"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            placeholder="Dr. João Silva"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cro">CRO *</Label>
                            <Input
                                id="cro"
                                value={formData.cro}
                                onChange={(e) => setFormData({ ...formData, cro: e.target.value.toUpperCase() })}
                                placeholder="SP-12345"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="especialidade">Especialidade *</Label>
                            <Select
                                value={formData.especialidade}
                                onValueChange={(value) => setFormData({ ...formData, especialidade: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ESPECIALIDADES.map((esp) => (
                                        <SelectItem key={esp} value={esp}>
                                            {esp}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone *</Label>
                            <Input
                                id="telefone"
                                value={formData.telefone}
                                onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                                placeholder="(11) 99999-9999"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@exemplo.com"
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            {dentista ? "Salvar Alterações" : "Cadastrar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
