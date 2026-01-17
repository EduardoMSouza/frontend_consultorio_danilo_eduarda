// app/(dashboard)/planos-dentais/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui-shadcn/button';
import { usePlanoDental } from '@/modules/plano-dental/presentation/hooks/usePlanoDental';
import type {
    PlanoDentalFiltros,
    PlanoDentalRequest,
    PlanoDentalResponse,
    PlanoDentalStats,
} from '@/modules/plano-dental/application/dto/PlanoDentalDTOs';
import { PlanoTable } from '@/modules/plano-dental/presentation/components/plano-table';
import { PlanoDentalStatsCards } from '@/modules/plano-dental/presentation/components/plano-stats-cards';
import { PlanoDentalFilters } from '@/modules/plano-dental/presentation/components/plano-filter';
import { PlanoCards } from '@/modules/plano-dental/presentation/components/plano-cards';
import { PlanoFormModal } from '@/modules/plano-dental/presentation/components/plano-form-modal';
import { PlanoDetailModal } from '@/modules/plano-dental/presentation/components/plano-detail-modal';

export default function PlanosDentaisPage() {
    const {
        listar,
        criar,
        atualizar,
        concluir,
        cancelar,
        aplicarDesconto,
        deletar,
        estatisticas,
        loading,
        erro,
    } = usePlanoDental();

    /* ---------- estado local ---------- */
    const [planos, setPlanos] = useState<PlanoDentalResponse[]>([]);
    const [stats, setStats] = useState<PlanoDentalStats>({
        total: 0,
        porStatus: { PENDENTE: 0, EM_ANDAMENTO: 0, CONCLUIDO: 0, CANCELADO: 0 },
        urgente: 0,
        ativos: 0,
        inativos: 0,
    });

    const [page, setPage] = useState(0);
    const [size] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    const [filtros, setFiltros] = useState<PlanoDentalFiltros>({});
    const [formOpen, setFormOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selected, setSelected] = useState<PlanoDentalResponse | null>(null);
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

    /* ---------- buscas ---------- */
    const fetchStats = async () => {
        try {
            const data = await estatisticas();
            setStats(data);
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
            // Mantém o estado padrão já definido
        }
    };

    const fetchPlanos = async () => {
        try {
            const res = await listar(page, size, filtros);

            // Garante que sempre temos um objeto válido
            if (res?.content) {
                setPlanos(res.content);
                setTotalPages(res.totalPages);
            } else {
                setPlanos([]);
                setTotalPages(0);
            }
        } catch (error) {
            console.error('Erro ao buscar planos:', error);
            setPlanos([]);
            setTotalPages(0);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchPlanos();
    }, [page, filtros]);

    /* ---------- handlers ---------- */
    const limparFiltros = () => {
        setFiltros({});
        setPage(0);
    };

    const salvar = async (data: PlanoDentalRequest) => {
        try {
            if (selected) {
                await atualizar(selected.id, data);
            } else {
                await criar(data);
            }
            await fetchPlanos();
            await fetchStats();
            setFormOpen(false);
            setSelected(null);
        } catch (error) {
            console.error('Erro ao salvar plano:', error);
            // O hook já define o erro no estado 'erro'
        }
    };

    const iniciarTratamento = async (p: PlanoDentalResponse) => {
        try {
            await atualizar(p.id, { ...p, status: 'EM_ANDAMENTO' });
            await fetchPlanos();
            await fetchStats();
        } catch (error) {
            console.error('Erro ao iniciar tratamento:', error);
        }
    };

    const handleConcluir = async (p: PlanoDentalResponse) => {
        try {
            await concluir(p.id);
            await fetchPlanos();
            await fetchStats();
        } catch (error) {
            console.error('Erro ao concluir plano:', error);
        }
    };

    const handleCancelar = async (p: PlanoDentalResponse) => {
        const motivo = prompt('Motivo do cancelamento:');
        if (!motivo) return;

        try {
            await cancelar(p.id, motivo);
            await fetchPlanos();
            await fetchStats();
        } catch (error) {
            console.error('Erro ao cancelar plano:', error);
        }
    };

    const handleDelete = async (p: PlanoDentalResponse) => {
        if (!confirm(`Confirma exclusão do plano "${p.procedimento}"?`)) return;

        try {
            await deletar(p.id);
            await fetchPlanos();
            await fetchStats();
        } catch (error) {
            console.error('Erro ao excluir plano:', error);
        }
    };

    const handleView = (p: PlanoDentalResponse) => {
        setSelected(p);
        setDetailOpen(true);
    };

    const handleEdit = (p: PlanoDentalResponse) => {
        setSelected(p);
        setFormOpen(true);
    };

    return (
        <div className="p-6 space-y-6">
            {/* cabeçalho */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-bold">Planos Dentais</h1>

                <div className="flex items-center gap-2">
                    <Button
                        variant={viewMode === 'table' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                    >
                        Tabela
                    </Button>
                    <Button
                        variant={viewMode === 'card' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('card')}
                    >
                        Cards
                    </Button>

                    <Button onClick={() => { setSelected(null); setFormOpen(true); }}>
                        <Plus className="mr-2 h-4 w-4" /> Novo Plano
                    </Button>
                </div>
            </div>

            {/* estatísticas */}
            <PlanoDentalStatsCards stats={stats} />

            {/* filtros */}
            <PlanoDentalFilters
                filtros={filtros}
                onFiltrosChange={setFiltros}
                onLimparFiltros={limparFiltros}
            />

            {/* listagem */}
            {viewMode === 'table' ? (
                <PlanoTable
                    planos={planos}
                    onView={handleView}
                    onEdit={handleEdit}
                    onIniciar={iniciarTratamento}
                    onConcluir={handleConcluir}
                    onCancelar={handleCancelar}
                />
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {planos.map((p) => (
                        <PlanoCards
                            key={p.id}
                            plano={p}
                            onView={handleView}
                            onEdit={handleEdit}
                            onIniciar={iniciarTratamento}
                            onConcluir={handleConcluir}
                            onCancelar={handleCancelar}
                        />
                    ))}
                </div>
            )}

            {/* paginação simples */}
            {totalPages > 1 && (
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Próxima
                    </Button>
                </div>
            )}

            {/* modais */}
            <PlanoFormModal
                open={formOpen}
                onOpenChange={setFormOpen}
                initialData={selected || undefined}
                isEditing={!!selected}
                onSubmit={salvar}
            />

            <PlanoDetailModal
                open={detailOpen}
                onOpenChange={setDetailOpen}
                plano={selected}
                onEdit={() => {
                    setDetailOpen(false);
                    setFormOpen(true);
                }}
            />
        </div>
    );
}