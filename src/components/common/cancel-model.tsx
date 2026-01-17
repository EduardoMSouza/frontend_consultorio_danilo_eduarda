"use client"

import { useState } from "react"
import { Button } from "@/components/ui-shadcn/button"
import { Textarea } from "@/components/ui-shadcn/textarea"
import { Label } from "@/components/ui-shadcn/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui-shadcn/dialog"
import { AlertTriangle } from "lucide-react"

interface CancelModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (motivo: string) => void
    procedimentoNome?: string
}

export function CancelModal({ open, onOpenChange, onConfirm, procedimentoNome }: CancelModalProps) {
    const [motivo, setMotivo] = useState("")

    const handleConfirm = () => {
        if (motivo.trim()) {
            onConfirm(motivo)
            setMotivo("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Cancelar Plano
                    </DialogTitle>
                    <DialogDescription>
                        Você está prestes a cancelar o plano <strong>{procedimentoNome}</strong>. Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                    <Label htmlFor="motivo">Motivo do cancelamento *</Label>
                    <Textarea
                        id="motivo"
                        placeholder="Descreva o motivo do cancelamento..."
                        rows={3}
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Voltar
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm} disabled={!motivo.trim()}>
                        Confirmar Cancelamento
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
