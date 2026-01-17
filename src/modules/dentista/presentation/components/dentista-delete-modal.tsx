"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui-shadcn/alert-dialog"
import type { DentistaResponse } from "@/models/dentista.type"

interface DentistaDeleteModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    dentista: DentistaResponse | null
}

export function DentistaDeleteModal({ open, onClose, onConfirm, dentista }: DentistaDeleteModalProps) {
    if (!dentista) return null

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Excluir Dentista</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir o dentista <strong>{dentista.nome}</strong> (CRO: {dentista.cro})?
                        <br />
                        <br />
                        Esta ação não pode ser desfeita e todos os dados associados serão removidos permanentemente.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
