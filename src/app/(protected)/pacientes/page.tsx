'use client';

import { useEffect, useState } from 'react';
import { usePaciente } from '@/modules/paciente/presentation/hooks/usePaciente';
import { PacienteStatsCards } from '@/modules/paciente/presentation/components/paciente-stats-cards';
import { Button } from '@/components/ui-shadcn/button';
import { UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui-shadcn/alert-dialog';
import type {
    PacienteRequest,
    PacienteResponse,
    PacienteResumoResponse,
    PacienteFiltros,
    EstatisticasContagem,
} from '@/modules/paciente/application/dto/PacienteDTO';
import {PacienteTable} from "@/modules/paciente/presentation/components/paciente-table";
import {PacienteFilters} from "@/modules/paciente/presentation/components/paciente-filters";
import {AniversariantesPanel} from "@/modules/paciente/presentation/components/aniversariantes-panel";
import {PacienteFormModal} from "@/modules/paciente/presentation/components/paciente-form-modal";
import {PacienteDetailsModal} from "@/modules/paciente/presentation/components/paciente-details-modal";

export default function PacientesPage() {
    /* ---------- hooks ---------- */
    const { listar, criar, atualizar, alternarStatus, deletar, loading, erro } = usePaciente();

    /* ---------- estado ---------- */
    const [pacientes, setPacientes] = useState<PacienteResumoResponse[]>([]);
    const [aniversariantes, setAniversariantes] = useState<PacienteResponse[]>([]);
    const [convenios, setConvenios] = useState<string[]>([]);
    const [estatisticas, setEstatisticas] = useState<EstatisticasContagem>({
        total: 0,
        ativos: 0,
        inativos: 0,
        comConvenio: 0,
        semConvenio: 0,
    });

    const [page, setPage] = useState(0);
    const [size] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    const [filtros, setFiltros] = useState<PacienteFiltros>({});

    const [modals, setModals] = useState({ form: false, detail: false, delete: false });
    const [selected, setSelected] = useState<PacienteResumoResponse | null>(null);
    const [selectedFull, setSelectedFull] = useState<PacienteResponse | null>(null);

    /* ---------- buscas ---------- */
    const fetchPacientes = async (p = 0) => {
        try {
            const res = await listar(p, size, filtros);
            setPacientes(res.content);
            setTotalPages(res.totalPages);
        } catch {
            /* erro já foi setado no hook */
        }
    };

    const fetchConvenios = async () => {
        try {
            const res = await fetch('/api/pacientes/convenios').then((r) => r.json());
            setConvenios(res);
        } catch {
            setConvenios([]);
        }
    };

    const fetchEstatisticas = async () => {
        try {
            const res = await fetch('/api/pacientes/estatisticas/contagem').then((r) => r.json());
            setEstatisticas(res);
        } catch {
            /* silencioso */
        }
    };

    const fetchAniversariantes = async () => {
        const mes = new Date().getMonth() + 1;
        try {
            const res = await fetch(`/api/pacientes/aniversariantes/mes/${mes}`).then((r) => r.json());
            setAniversariantes(res);
        } catch {
            setAniversariantes([]);
        }
    };

    const fetchFull = async (id: number) => {
        try {
            const res = await fetch(`/api/pacientes/${id}`).then((r) => r.json());
            setSelectedFull(res);
        } catch {
            setSelectedFull(null);
        }
    };

    /* ---------- efeitos ---------- */
    useEffect(() => {
        fetchConvenios();
        fetchEstatisticas();
        fetchAniversariantes();
    }, []);

    useEffect(() => {
        fetchPacientes(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtros]);

    /* ---------- handlers ---------- */
    const handleSave = async (data: PacienteRequest) => {
        try {
            if (selected) await atualizar(selected.id, data);
            else await criar(data);
            setModals((m) => ({ ...m, form: false }));
            fetchPacientes(page);
            fetchEstatisticas();
        } catch {
            /* erro já tratado no hook */
        }
    };

    const handleToggleStatus = async (p: PacienteResumoResponse) => {
        try {
            await alternarStatus(p.id, !p.ativo);
            fetchPacientes(page);
            fetchEstatisticas();
        } catch {
            /* erro já tratado no hook */
        }
    };

    const handleDelete = async () => {
        if (!selected) return;
        try {
            await deletar(selected.id);
            setModals((m) => ({ ...m, delete: false }));
            fetchPacientes(page);
            fetchEstatisticas();
        } catch {
            /* erro já tratado no hook */
        }
    };

    const handleVisualizar = async (p: PacienteResumoResponse) => {
        setSelected(p);
        await fetchFull(p.id);
        setModals((m) => ({ ...m, detail: true }));
    };

    const handleEditar = async (p: PacienteResumoResponse) => {
        setSelected(p);
        await fetchFull(p.id);
        setModals((m) => ({ ...m, form: true }));
    };

    const handleLimparFiltros = () => setFiltros({});

    /* ---------- render ---------- */
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Pacientes</h1>
                    <p className="text-muted-foreground">Gerencie os pacientes do consultório</p>
                </div>
                <Button onClick={() => { setSelected(null); setModals((m) => ({ ...m, form: true })); }}>
                    <UserPlus className="mr-2 h-4 w-4" /> Novo Paciente
                </Button>
            </div>

            {/* stats */}
            <PacienteStatsCards estatisticas={estatisticas} />

            {/* main grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                {/* table section */}
                <div className="lg:col-span-3 space-y-4">
                    <PacienteFilters
                        filtros={filtros}
                        convenios={convenios}
                        onFiltrosChange={setFiltros}
                        onLimparFiltros={handleLimparFiltros}
                    />

                    {erro && <p className="text-red-600">{erro}</p>}

                    <PacienteTable
                        pacientes={pacientes}
                        onVisualizar={handleVisualizar}
                        onEditar={handleEditar}
                        onAtivar={handleToggleStatus}
                        onInativar={handleToggleStatus}
                        onExcluir={(p) => {
                            setSelected(p);
                            setModals((m) => ({ ...m, delete: true }));
                        }}
                    />

                    {/* pagination */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Mostrando {page * size + 1}-
                            {Math.min((page + 1) * size, estatisticas.total)} de {estatisticas.total} pacientes
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 0}
                                onClick={() => {
                                    const p = page - 1;
                                    setPage(p);
                                    fetchPacientes(p);
                                }}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm">
                Página {page + 1} de {totalPages}
              </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page >= totalPages - 1}
                                onClick={() => {
                                    const p = page + 1;
                                    setPage(p);
                                    fetchPacientes(p);
                                }}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* sidebar */}
                <div className="lg:col-span-1">
                    <AniversariantesPanel pacientes={aniversariantes} />
                </div>
            </div>

            {/* modals */}
            <PacienteFormModal
                open={modals.form}
                onOpenChange={(v) => setModals((m) => ({ ...m, form: v }))}
                paciente={selectedFull}
                onSave={handleSave}
            />

            <PacienteDetailsModal
                open={modals.detail}
                onOpenChange={(v) => setModals((m) => ({ ...m, detail: v }))}
                paciente={selectedFull}
            />

            <AlertDialog open={modals.delete} onOpenChange={() => setModals((m) => ({ ...m, delete: false }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Excluir paciente</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir o paciente <strong>{selected?.nome}</strong>? Esta ação não pode ser
                            desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}