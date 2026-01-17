"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-shadcn/card"
import { Button } from "@/components/ui-shadcn/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    getDay,
} from "date-fns"
import { ptBR } from "date-fns/locale"
import {AgendamentoResponse} from "@/models/agenda/agendamento.type";


interface AgendaCalendarProps {
    agendamentos: AgendamentoResponse[]
    selectedDate: Date
    onSelectDate: (date: Date) => void
}

export function AgendaCalendar({ agendamentos, selectedDate, onSelectDate }: AgendaCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

    const startDay = getDay(monthStart)
    const emptyDays = Array(startDay).fill(null)

    const getAgendamentosForDay = (date: Date) => {
        return agendamentos.filter((a) => {
            const agendamentoDate = new Date(a.dataConsulta)
            return isSameDay(agendamentoDate, date)
        })
    }

    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy", { locale: ptBR })}</CardTitle>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {emptyDays.map((_, i) => (
                        <div key={`empty-${i}`} className="h-10" />
                    ))}
                    {days.map((day) => {
                        const dayAgendamentos = getAgendamentosForDay(day)
                        const isSelected = isSameDay(day, selectedDate)
                        const hasAgendamentos = dayAgendamentos.length > 0

                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => onSelectDate(day)}
                                className={`
                  h-10 rounded-lg text-sm font-medium relative transition-colors
                  ${isToday(day) ? "bg-primary text-primary-foreground" : ""}
                  ${isSelected && !isToday(day) ? "bg-primary/10 text-primary" : ""}
                  ${!isSelected && !isToday(day) ? "hover:bg-muted" : ""}
                `}
                            >
                                {format(day, "d")}
                                {hasAgendamentos && (
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                                )}
                            </button>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
