"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui-shadcn/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui-shadcn/tabs"
import { Plus, Users, CalendarIcon, List } from "lucide-react"
import { isSameDay, format, subDays } from "date-fns"
import { AgendaStatsCards } from "@/components/core/agenda/agenda-stats-cards"
import { AgendaCalendar } from "@/components/core/agenda/agenda-calendar"
import { AgendaDayView } from "@/components/core/agenda/agenda-day-view"
import { FilaEsperaPanel } from "@/components/core/agenda/fila-espera/fila-espera-panel"
import { HistoricoPanel } from "@/components/core/agenda/historico-panel"
import { AgendamentoFormModal } from "@/components/core/agenda/agendamento/agendamento-form-modal"
import { AgendamentoDetailsModal } from "@/components/core/agenda/agendamento/agendamento-details-modal"
import { CancelAgendamentoModal } from "@/components/core/agenda/agendamento/cancel-agendamento-modal"
import { FilaEsperaFormModal } from "@/components/core/agenda/fila-espera/fila-espera-form-modal"
import type { AgendamentoResponse, AgendamentoRequest } from "@/models/agenda/agendamento.type"
import type { FilaEsperaResponse, FilaEsperaRequest } from "@/models/agenda/fila-espera.type"
import type { AgendamentoHistoricoResponse } from "@/models/agenda/agendamento-historico.type"
import {AgendamentoService} from "@/services/agenda/agendamento.service";
import {FilaEsperaService} from "@/services/agenda/fila-espera.service";
import {AgendamentoHistoricoService} from "@/services/agenda/agendamento-historico.service";

export default function AgendaPage() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [agendamentos, setAgendamentos] = useState<AgendamentoResponse[]>([])
    const [filaEspera, setFilaEspera] = useState<FilaEsperaResponse[]>([])
    const [historico, setHistorico] = useState<AgendamentoHistoricoResponse[]>([])
    const [loading, setLoading] = useState(false)

    // Modal states
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
    const [isFilaFormModalOpen, setIsFilaFormModalOpen] = useState(false)
    const [selectedAgendamento, setSelectedAgendamento] = useState<AgendamentoResponse | null>(null)

    // Carregar dados iniciais
    useEffect(() => {
        async function carregarDados() {
            setLoading(true)
            try {
                // Buscar agendamentos para a data selecionada
                const dataFormatada = format(selectedDate, 'yyyy-MM-dd')
                const agendamentosData = await AgendamentoService.listarPorData(dataFormatada)
                setAgendamentos(agendamentosData)

                // Buscar fila de espera ativa
                const filaData = await FilaEsperaService.listarAtivas()
                setFilaEspera(filaData)

                // Buscar histórico recente (últimos 7 dias)
                const hoje = new Date()
                const umaSemanaAtras = subDays(hoje, 7)
                const historicoData = await AgendamentoHistoricoService.buscarPorPeriodo(
                    format(umaSemanaAtras, 'yyyy-MM-dd'),
                    format(hoje, 'yyyy-MM-dd')
                )
                setHistorico(historicoData)
            } catch (error) {
                console.error('Erro ao carregar dados:', error)
            } finally {
                setLoading(false)
            }
        }

        carregarDados()
    }, [selectedDate])

    // Filter agendamentos for selected date (já estamos buscando por data, então não precisa filtrar, mas mantemos para compatibilidade)
    const agendamentosHoje = agendamentos.filter((a) => {
        const agendamentoDate = new Date(a.dataConsulta)
        return isSameDay(agendamentoDate, selectedDate)
    })

    // Stats
    const stats = {
        totalHoje: agendamentosHoje.length,
        confirmados: agendamentosHoje.filter((a) => a.status === "CONFIRMADO").length,
        pendentes: agendamentosHoje.filter((a) => a.status === "PENDENTE").length,
        concluidos: agendamentosHoje.filter((a) => a.status === "CONCLUIDO").length,
        cancelados: agendamentosHoje.filter((a) => a.status === "CANCELADO").length,
        filaEspera: filaEspera.filter((f) => f.status === "AGUARDANDO" || f.status === "NOTIFICADO").length,
    }

    // Handlers
    const handleConfirmar = async (id: number) => {
        try {
            const usuario = "Usuário Teste" // Substituir por usuário logado
            await AgendamentoService.confirmar(id, usuario)
            // Recarregar agendamentos
            const dataFormatada = format(selectedDate, 'yyyy-MM-dd')
            const agendamentosData = await AgendamentoService.listarPorData(dataFormatada)
            setAgendamentos(agendamentosData)
        } catch (error) {
            console.error('Erro ao confirmar agendamento:', error)
        }
    }

    const handleIniciar = async (id: number) => {
        try {
            const usuario = "Usuário Teste"
            await AgendamentoService.iniciarAtendimento(id, usuario)
            const dataFormatada = format(selectedDate, 'yyyy-MM-dd')
            const agendamentosData = await AgendamentoService.listarPorData(dataFormatada)
            setAgendamentos(agendamentosData)
        } catch (error) {
            console.error('Erro ao iniciar atendimento:', error)
        }
    }

    const handleConcluir = async (id: number) => {
        try {
            const usuario = "Usuário Teste"
            await AgendamentoService.concluir(id, usuario)
            const dataFormatada = format(selectedDate, 'yyyy-MM-dd')
            const agendamentosData = await AgendamentoService.listarPorData(dataFormatada)
            setAgendamentos(agendamentosData)
        } catch (error) {
            console.error('Erro ao concluir agendamento:', error)
        }
    }

    const handleCancelar = (id: number) => {
        const agendamento = agendamentos.find((a) => a.id === id)
        if (agendamento) {
            setSelectedAgendamento(agendamento)
            setIsCancelModalOpen(true)
        }
    }

    const handleMarcarFalta = async (id: number) => {
        try {
            const usuario = "Usuário Teste"
            await AgendamentoService.marcarFalta(id, usuario)
            const dataFormatada = format(selectedDate, 'yyyy-MM-dd')
            const agendamentosData = await AgendamentoService.listarPorData(dataFormatada)
            setAgendamentos(agendamentosData)
        } catch (error) {
            console.error('Erro ao marcar falta:', error)
        }
    }

    const handleVerDetalhes = (agendamento: AgendamentoResponse) => {
        setSelectedAgendamento(agendamento)
        setIsDetailsModalOpen(true)
    }

    const handleEditar = (agendamento: AgendamentoResponse) => {
        setSelectedAgendamento(agendamento)
        setIsFormModalOpen(true)
    }

    const handleSubmitAgendamento = async (data: AgendamentoRequest) => {
        try {
            if (selectedAgendamento) {
                await AgendamentoService.atualizar(selectedAgendamento.id, data)
            } else {
                await AgendamentoService.criar(data)
            }
            // Recarregar agendamentos
            const dataFormatada = format(selectedDate, 'yyyy-MM-dd')
            const agendamentosData = await AgendamentoService.listarPorData(dataFormatada)
            setAgendamentos(agendamentosData)
            setSelectedAgendamento(null)
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error)
        }
    }

    const handleConfirmCancel = async (motivo: string) => {
        if (!selectedAgendamento) return
        try {
            const usuario = "Usuário Teste"
            await AgendamentoService.cancelar(selectedAgendamento.id, motivo, usuario)
            // Recarregar agendamentos
            const dataFormatada = format(selectedDate, 'yyyy-MM-dd')
            const agendamentosData = await AgendamentoService.listarPorData(dataFormatada)
            setAgendamentos(agendamentosData)
            setSelectedAgendamento(null)
        } catch (error) {
            console.error('Erro ao cancelar agendamento:', error)
        }
    }

    const handleNotificarFila = async (id: number) => {
        try {
            await FilaEsperaService.notificar(id)
            // Recarregar fila de espera
            const filaData = await FilaEsperaService.listarAtivas()
            setFilaEspera(filaData)
        } catch (error) {
            console.error('Erro ao notificar fila:', error)
        }
    }

    const handleConverterEmAgendamento = (item: FilaEsperaResponse) => {
        console.log("Converter em agendamento:", item)
        setIsFormModalOpen(true)
        // Aqui podemos preencher o formulário de agendamento com os dados da fila?
        // Vamos deixar para implementar depois.
    }

    const handleCancelarFila = async (id: number) => {
        try {
            await FilaEsperaService.cancelar(id)
            const filaData = await FilaEsperaService.listarAtivas()
            setFilaEspera(filaData)
        } catch (error) {
            console.error('Erro ao cancelar fila:', error)
        }
    }

    const handleSubmitFila = async (data: FilaEsperaRequest) => {
        try {
            await FilaEsperaService.criar(data)
            const filaData = await FilaEsperaService.listarAtivas()
            setFilaEspera(filaData)
        } catch (error) {
            console.error('Erro ao criar fila:', error)
        }
    }

    if (loading) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
                        <p className="text-muted-foreground">Gerencie os agendamentos e fila de espera</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsFilaFormModalOpen(true)}>
                            <Users className="h-4 w-4 mr-2" />
                            Adicionar à Fila
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedAgendamento(null)
                                setIsFormModalOpen(true)
                            }}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Novo Agendamento
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <AgendaStatsCards {...stats} />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Calendar + Day View */}
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs defaultValue="dia" className="w-full">
                            <TabsList>
                                <TabsTrigger value="dia" className="gap-2">
                                    <List className="h-4 w-4" />
                                    Dia
                                </TabsTrigger>

                                <TabsTrigger value="semana" className="gap-2">
                                    <CalendarIcon className="h-4 w-4" />
                                    Semana
                                </TabsTrigger>

                                <TabsTrigger value="calendario" className="gap-2">
                                    <CalendarIcon className="h-4 w-4" />
                                    Calendário
                                </TabsTrigger>


                            </TabsList>
                            <TabsContent value="dia" className="mt-4 space-y-4">
                                <AgendaCalendar
                                    agendamentos={agendamentos}
                                    selectedDate={selectedDate}
                                    onSelectDate={setSelectedDate}
                                />
                                <AgendaDayView
                                    agendamentos={agendamentosHoje}
                                    selectedDate={selectedDate}
                                    onConfirmar={handleConfirmar}
                                    onIniciar={handleIniciar}
                                    onConcluir={handleConcluir}
                                    onCancelar={handleCancelar}
                                    onMarcarFalta={handleMarcarFalta}
                                    onVerDetalhes={handleVerDetalhes}
                                    onEditar={handleEditar}
                                />
                            </TabsContent>



                            <TabsContent value="calendario" className="mt-4">
                                <AgendaCalendar
                                    agendamentos={agendamentos}
                                    selectedDate={selectedDate}
                                    onSelectDate={setSelectedDate}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right: Fila de Espera + Histórico */}
                    <div className="space-y-6">
                        <FilaEsperaPanel
                            filaEspera={filaEspera}
                            onNotificar={handleNotificarFila}
                            onConverterEmAgendamento={handleConverterEmAgendamento}
                            onCancelar={handleCancelarFila}
                        />
                        <HistoricoPanel historico={historico} />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AgendamentoFormModal
                open={isFormModalOpen}
                onOpenChange={setIsFormModalOpen}
                agendamento={selectedAgendamento}
                onSubmit={handleSubmitAgendamento}
                selectedDate={selectedDate}
            />

            <AgendamentoDetailsModal
                open={isDetailsModalOpen}
                onOpenChange={setIsDetailsModalOpen}
                agendamento={selectedAgendamento}
            />

            <CancelAgendamentoModal
                open={isCancelModalOpen}
                onOpenChange={setIsCancelModalOpen}
                onConfirm={handleConfirmCancel}
                pacienteNome={selectedAgendamento?.nomePaciente}
            />

            <FilaEsperaFormModal
                open={isFilaFormModalOpen}
                onOpenChange={setIsFilaFormModalOpen}
                onSubmit={handleSubmitFila}
            />
        </>
    )
}