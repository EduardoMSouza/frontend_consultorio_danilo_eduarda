"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui-shadcn/button"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import {DentistaService} from "@/modules/dentista/infrastructure/services/DentistaService";
import {DentistaStatsCards} from "@/modules/dentista/presentation/components/dentista-stats-cards";
import {DentistaFilters} from "@/modules/dentista/presentation/components/dentista-filters";
import {DentistaTable} from "@/modules/dentista/presentation/components/dentista-table";
import {DentistaFormModal} from "@/modules/dentista/presentation/components/dentista-form-modal";
import {DentistaDetailsModal} from "@/modules/dentista/presentation/components/dentista-details-modal";
import {DentistaDeleteModal} from "@/modules/dentista/presentation/components/dentista-delete-modal";
import {DentistaRequest, DentistaResponse} from "@/modules/dentista/domain/types/dentista.types";
import {PageResponse} from "@/modules/evolucao-tratamento";

export default function DentistasPage() {
    const [dentistas, setDentistas] = useState<DentistaResponse[]>([])
    const [pageResponse, setPageResponse] = useState<PageResponse<DentistaResponse> | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [especialidade, setEspecialidade] = useState("")
    const [situacao, setSituacao] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedDentista, setSelectedDentista] = useState<DentistaResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const pageSize = 10

    // Buscar dentistas da API
    const fetchDentistas = async (page = 0, termo?: string, situacaoFilter?: string, especialidadeFilter?: string) => {
        setLoading(true)
        setError(null)
        try {
            let response: PageResponse<DentistaResponse>
            if (termo) {
                response = await DentistaService.buscarPorTermo(termo, page, pageSize)
            } else if (situacaoFilter === "ativo") {
                response = await DentistaService.listarAtivos(page, pageSize)
            } else if (situacaoFilter === "inativo") {
                //não tem um endpoint pra listagem ainda
                const todos = await DentistaService.listarTodos(page, pageSize)
                response = {
                    ...todos,
                    content: todos.content.filter((d: { ativo: any; }) => !d.ativo)
                }
            } else {
                response = await DentistaService.listarTodos(page, pageSize)
            }

            // Filtro por especialidade (se necessário) - também pode ser feito no backend
            if (especialidadeFilter && especialidadeFilter !== "todas") {
                response = {
                    ...response,
                    content: response.content.filter(d => d.especialidade === especialidadeFilter)
                }
            }

            setPageResponse(response)
            setDentistas(response.content)
        } catch (err) {
            setError("Erro ao carregar dentistas.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDentistas(currentPage, searchTerm, situacao, especialidade)
    }, [currentPage, searchTerm, situacao, especialidade])

    const totalAtivos = dentistas.filter((d) => d.ativo).length
    const totalInativos = dentistas.filter((d) => !d.ativo).length
    const especialidadesUnicas = [...new Set(dentistas.map((d) => d.especialidade))].length

    const handleClearFilters = () => {
        setSearchTerm("")
        setEspecialidade("")
        setSituacao("")
        setCurrentPage(0)
    }

    const handleView = (dentista: DentistaResponse) => {
        setSelectedDentista(dentista)
        setIsDetailsModalOpen(true)
    }

    const handleEdit = (dentista: DentistaResponse) => {
        setSelectedDentista(dentista)
        setIsFormModalOpen(true)
    }

    const handleToggleStatus = async (dentista: DentistaResponse) => {
        try {
            if (dentista.ativo) {
                await DentistaService.desativar(dentista.id)
            } else {
                await DentistaService.ativar(dentista.id)
            }
            // Atualizar a lista
            fetchDentistas(currentPage, searchTerm, situacao, especialidade)
        } catch (err) {
            setError("Erro ao alterar status do dentista.")
            console.error(err)
        }
    }

    const handleDelete = (dentista: DentistaResponse) => {
        setSelectedDentista(dentista)
        setIsDeleteModalOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (selectedDentista) {
            try {
                await DentistaService.deletar(selectedDentista.id)
                // Atualizar a lista
                fetchDentistas(currentPage, searchTerm, situacao, especialidade)
                setIsDeleteModalOpen(false)
                setSelectedDentista(null)
            } catch (err) {
                setError("Erro ao excluir dentista.")
                console.error(err)
            }
        }
    }

    const handleSave = async (data: DentistaRequest) => {
        try {
            if (selectedDentista) {
                // Editar
                await DentistaService.atualizar(selectedDentista.id, data)
            } else {
                // Criar
                await DentistaService.criar(data)
            }
            // Atualizar a lista
            fetchDentistas(currentPage, searchTerm, situacao, especialidade)
            setIsFormModalOpen(false)
            setSelectedDentista(null)
        } catch (err) {
            setError(selectedDentista ? "Erro ao atualizar dentista." : "Erro ao criar dentista.")
            console.error(err)
        }
    }

    const handleOpenNewForm = () => {
        setSelectedDentista(null)
        setIsFormModalOpen(true)
    }

    if (loading && !pageResponse) {
        return <div>Carregando...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Dentistas</h1>
                        <p className="text-muted-foreground">Gerencie o cadastro de dentistas da clínica</p>
                    </div>
                    <Button onClick={handleOpenNewForm} className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                        Novo Dentista
                    </Button>
                </div>

                {/* Stats Cards */}
                <DentistaStatsCards
                    total={pageResponse?.totalElements || 0}
                    ativos={totalAtivos}
                    inativos={totalInativos}
                    especialidades={especialidadesUnicas}
                />

                {/* Filters */}
                <DentistaFilters
                    searchTerm={searchTerm}
                    onSearchChange={(value) => {
                        setSearchTerm(value)
                        setCurrentPage(0)
                    }}
                    especialidade={especialidade}
                    onEspecialidadeChange={(value) => {
                        setEspecialidade(value)
                        setCurrentPage(0)
                    }}
                    situacao={situacao}
                    onSituacaoChange={(value) => {
                        setSituacao(value)
                        setCurrentPage(0)
                    }}
                    onClear={handleClearFilters}
                />

                {/* Table */}
                <DentistaTable
                    dentistas={dentistas}
                    onView={handleView}
                    onEdit={handleEdit}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDelete}
                />

                {/* Pagination */}
                {pageResponse && pageResponse.totalPages > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Mostrando {currentPage * pageSize + 1} a{" "}
                            {Math.min((currentPage + 1) * pageSize, pageResponse.totalElements)} de {pageResponse.totalElements} dentistas
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-muted-foreground">
                Página {currentPage + 1} de {pageResponse.totalPages}
              </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.min(pageResponse.totalPages - 1, prev + 1))}
                                disabled={currentPage >= pageResponse.totalPages - 1}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* Modals */}
                <DentistaFormModal
                    open={isFormModalOpen}
                    onClose={() => {
                        setIsFormModalOpen(false)
                        setSelectedDentista(null)
                    }}
                    onSave={handleSave}
                    dentista={selectedDentista}
                />

                <DentistaDetailsModal
                    open={isDetailsModalOpen}
                    onClose={() => {
                        setIsDetailsModalOpen(false)
                        setSelectedDentista(null)
                    }}
                    dentista={selectedDentista}
                />

                <DentistaDeleteModal
                    open={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false)
                        setSelectedDentista(null)
                    }}
                    onConfirm={handleConfirmDelete}
                    dentista={selectedDentista}
                />
            </div>
        </>
    )
}