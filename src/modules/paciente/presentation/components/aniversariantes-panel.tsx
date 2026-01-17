"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-shadcn/card"
import { Badge } from "@/components/ui-shadcn/badge"
import { Cake, Phone } from "lucide-react"
import type { PacienteResponse } from "@/models/paciente.types"

interface AniversariantesPanelProps {
    pacientes: PacienteResponse[]
}

export function AniversariantesPanel({ pacientes }: AniversariantesPanelProps) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
    }

    const isToday = (dateStr: string) => {
        const today = new Date()
        const date = new Date(dateStr)
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth()
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Cake className="h-5 w-5 text-pink-500" />
                    Aniversariantes do Mês
                </CardTitle>
            </CardHeader>
            <CardContent>
                {pacientes.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Nenhum aniversariante neste mês</p>
                ) : (
                    <div className="space-y-3">
                        {pacientes.map((paciente) => (
                            <div
                                key={paciente.id}
                                className={`flex items-center justify-between p-3 rounded-lg ${
                                    isToday(paciente.dadosBasicos.dataNascimento) ? "bg-pink-50 border border-pink-200" : "bg-muted/50"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                            isToday(paciente.dadosBasicos.dataNascimento) ? "bg-pink-100" : "bg-background"
                                        }`}
                                    >
                                        <Cake
                                            className={`h-5 w-5 ${
                                                isToday(paciente.dadosBasicos.dataNascimento) ? "text-pink-500" : "text-muted-foreground"
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{paciente.dadosBasicos.nome}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{formatDate(paciente.dadosBasicos.dataNascimento)}</span>
                                            {paciente.idade && <span>• {paciente.idade} anos</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isToday(paciente.dadosBasicos.dataNascimento) && (
                                        <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">Hoje!</Badge>
                                    )}
                                    {paciente.dadosBasicos.telefone && (
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Phone className="h-3 w-3" />
                                            {paciente.dadosBasicos.telefone}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
