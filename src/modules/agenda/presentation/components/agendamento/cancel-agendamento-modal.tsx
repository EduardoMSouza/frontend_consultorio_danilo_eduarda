"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui-shadcn/dialog"
import { Button } from "@/components/ui-shadcn/button"
import { Textarea } from "@/components/ui-shadcn/textarea"
import { Label } from "@/components/ui-shadcn/label"
import { AlertTriangle } from "lucide-react"

interface CancelAgendamentoModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (motivo: string) => void
    pacienteNome?: string
}

export function CancelAgendamentoModal({ open, onOpenChange, onConfirm, pacienteNome }: CancelAgendamentoModalProps) {
    const [motivo, setMotivo] = useState("")

    const handleConfirm = () => {
        if (motivo.trim()) {
            onConfirm(motivo)
            setMotivo("")
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Cancelar Agendamento
                    </DialogTitle>
                    <DialogDescription>
                        {pacienteNome
                            ? `Tem certeza que deseja cancelar o agendamento de ${pacienteNome}?`
                            : "Tem certeza que deseja cancelar este agendamento?"}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="motivo">Motivo do Cancelamento *</Label>
                        <Textarea
                            id="motivo"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            placeholder="Descreva o motivo do cancelamento..."
                            rows={3}
                            required
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Voltar
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleConfirm} disabled={!motivo.trim()}>
                        Confirmar Cancelamento
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
