"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui-shadcn/button";
import { toast } from "sonner";
import {
    EvolucaoDetailModal,
    EvolucaoFilters,
    EvolucaoFormModal,
    EvolucaoStatsCards,
    EvolucaoTable,
    EvolucaoTratamentoFiltros,
    EvolucaoTratamentoRequest,
    EvolucaoTratamentoResponse, EvolucaoTratamentoStats,
    EvolucaoTratamentoValidator,
    useEvolucaoTratamento,
} from "@/modules/evolucao-tratamento";

export default function EvolucaoTratamentoPage() {
    const {
        listar,
        criar,
        atualizar,
        deletar,
        marcarUrgente,
        agendarRetorno,
        estatisticas,
        loading,
        erro,
    } = useEvolucaoTratamento();

    const [evolucoes, setEvolucoes] = useState<EvolucaoTratamentoResponse[]>([]);
    const [stats, setStats] = useState<EvolucaoTratamentoStats | null>(null);
    const [filtros, setFiltros] = useState<EvolucaoTratamentoFiltros>({});
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    /* ---------- modal states ---------- */
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [editingEvolucao, setEditingEvolucao] =
        useState<EvolucaoTratamentoResponse | null>(null);
    const [viewingEvolucao, setViewingEvolucao] =
        useState<EvolucaoTratamentoResponse | null>(null);

    /* ---------- limpar filtros ---------- */
    const limparFiltros = useCallback(() => {
        setFiltros({});
        setSelectedIds([]);
    }, []);

    /* ---------- carregamento ---------- */
    const carregarDados = useCallback(async () => {
        try {
            const [result, statsData] = await Promise.all([
                listar(0, 20, filtros),
                estatisticas(),
            ]);
            setEvolucoes(result.content);
            setStats(statsData);
        } catch {
            toast.error("Erro ao carregar dados");
        }
    }, [listar, estatisticas, filtros]);

    // 🟢 PATCH 1: dispara só uma vez – ignorando strict-mode
    useEffect(() => {
        carregarDados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 🟢 PATCH 2: notifica erros
    useEffect(() => {
        if (erro) toast.error(erro);
    }, [erro]);

    /* ---------- actions ---------- */
    const handleSubmit = useCallback(
        async (data: EvolucaoTratamentoRequest) => {
            try {
                const errors = EvolucaoTratamentoValidator.validate(data);
                if (errors) {
                    Object.values(errors).forEach((arr) => arr.forEach((m) => toast.error(m)));
                    return;
                }

                if (editingEvolucao) {
                    await atualizar(editingEvolucao.id, data);
                    toast.success("Evolução atualizada com sucesso!");
                } else {
                    await criar(data);
                    toast.success("Evolução criada com sucesso!");
                }

                setFormModalOpen(false);
                setEditingEvolucao(null);
                carregarDados();
            } catch (e: any) {
                toast.error(e.message || "Erro ao salvar evolução");
            }
        },
        [editingEvolucao, atualizar, criar, carregarDados]
    );

    const handleEdit = useCallback((ev: EvolucaoTratamentoResponse) => {
        setEditingEvolucao(ev);
        setFormModalOpen(true);
    }, []);

    const handleView = useCallback((ev: EvolucaoTratamentoResponse) => {
        setViewingEvolucao(ev);
        setDetailModalOpen(true);
    }, []);

    const handleDelete = useCallback(
        async (ev: EvolucaoTratamentoResponse) => {
            if (!confirm(`Tem certeza que deseja excluir "${ev.titulo}"?`)) return;
            try {
                await deletar(ev.id);
                toast.success("Evolução excluída com sucesso!");
                carregarDados();
            } catch (e: any) {
                toast.error(e.message || "Erro ao excluir");
            }
        },
        [deletar, carregarDados]
    );

    const handleMarcarUrgente = useCallback(
        async (ev: EvolucaoTratamentoResponse) => {
            try {
                await marcarUrgente(ev.id);
                toast.success("Marcado como urgente!");
                carregarDados();
            } catch (e: any) {
                toast.error(e.message || "Erro ao marcar urgente");
            }
        },
        [marcarUrgente, carregarDados]
    );

    const handleAgendarRetorno = useCallback(
        async (ev: EvolucaoTratamentoResponse) => {
            const data = prompt("Data do retorno (YYYY-MM-DD):");
            const motivo = prompt("Motivo do retorno:");
            if (!data || !motivo) return;
            try {
                await agendarRetorno(ev.id, data, motivo);
                toast.success("Retorno agendado!");
                carregarDados();
            } catch (e: any) {
                toast.error(e.message || "Erro ao agendar retorno");
            }
        },
        [agendarRetorno, carregarDados]
    );

    const handleEditFromDetail = useCallback(() => {
        setDetailModalOpen(false);
        if (viewingEvolucao) handleEdit(viewingEvolucao);
    }, [viewingEvolucao, handleEdit]);

    /* ---------- render ---------- */
    return (
        <div className="container mx-auto py-8 px-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Evoluções de Tratamento</h1>
                    <p className="text-muted-foreground">Gerencie as evoluções e acompanhamentos dos pacientes</p>
                </div>
                <Button onClick={() => setFormModalOpen(true)}>Nova Evolução</Button>
            </div>

            <EvolucaoStatsCards stats={stats} />

            <EvolucaoFilters
                filtros={filtros}
                onFiltrosChange={setFiltros}
                onLimparFiltros={limparFiltros}
                onBuscar={carregarDados}
            />

            <EvolucaoTable
                evolucoes={evolucoes}
                selectedIds={selectedIds}
                onSelectChange={setSelectedIds}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onMarcarUrgente={handleMarcarUrgente}
                onAgendarRetorno={handleAgendarRetorno}
            />

            {loading && (
                <div className="flex items-center justify-center py-8">
                    <p className="text-muted-foreground">Carregando...</p>
                </div>
            )}

            <EvolucaoFormModal
                open={formModalOpen}
                onOpenChange={(open) => {
                    setFormModalOpen(open);
                    if (!open) setEditingEvolucao(null);
                }}
                onSubmit={handleSubmit}
                initialData={editingEvolucao ?? undefined}
                isEditing={!!editingEvolucao}
            />

            <EvolucaoDetailModal
                open={detailModalOpen}
                onOpenChange={setDetailModalOpen}
                evolucao={viewingEvolucao}
                onEdit={handleEditFromDetail}
            />
        </div>
    );
}