'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/modules/user/presentation/hooks/useUser';
import { UserStatsCards } from '@/modules/user/presentation/components/UserStatsCards';
import { UserFilters } from '@/modules/user/presentation/components/UserFilters';
import { UserTable } from '@/modules/user/presentation/components/UserTable';
import { UserFormModal } from '@/modules/user/presentation/components/UserFormModal';
import { UserDetailsModal } from '@/modules/user/presentation/components/UserDetailsModal';
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
import type { UserRequest, UserResponse, UserFiltros, UserStats } from '@/modules/user/application/dto/UserDTOs';

export default function UsersPage() {
    const { listar, criar, atualizar, alternarStatus, deletar, estatisticas, loading, erro } = useUser();

    /* ---------- estado ---------- */
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [stats, setStats] = useState<UserStats>({ total: 0, ativos: 0, inativos: 0, porRole: {} });
    const [page, setPage] = useState(0);
    const [size] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [filtros, setFiltros] = useState<UserFiltros>({});

    const [modals, setModals] = useState({ form: false, detail: false, delete: false });
    const [selected, setSelected] = useState<UserResponse | null>(null);

    /* ---------- buscas ---------- */
    const fetchUsers = async (p = 0) => {
        try {
            const res = await listar(p, size, filtros);
            setUsers(res.content);
            setTotalPages(res.totalPages);
        } catch {
            /* erro já foi setado no hook */
        }
    };

    const fetchStats = async () => {
        const s = await estatisticas();
        if (s) setStats(s);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchUsers(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtros]);

    /* ---------- handlers ---------- */
    const handleSave = async (data: UserRequest) => {
        try {
            if (selected) await atualizar(selected.id, data);
            else await criar(data);
            setModals((m) => ({ ...m, form: false }));
            fetchUsers(page);
            fetchStats();
        } catch {}
    };

    const handleToggle = async (u: UserResponse) => {
        try {
            await alternarStatus(u.id, !u.ativo);
            fetchUsers(page);
            fetchStats();
        } catch {}
    };

    const handleDelete = async () => {
        if (!selected) return;
        try {
            await deletar(selected.id);
            setModals((m) => ({ ...m, delete: false }));
            fetchUsers(page);
            fetchStats();
        } catch {}
    };

    /* ---------- render ---------- */
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Usuários</h1>
                    <p className="text-muted-foreground">Gerencie os usuários do sistema</p>
                </div>
                <Button onClick={() => { setSelected(null); setModals((m) => ({ ...m, form: true })); }}>
                    <UserPlus className="mr-2 h-4 w-4" /> Novo Usuário
                </Button>
            </div>

            {/* stats */}
            <UserStatsCards stats={stats} />

            {/* filters + table */}
            <div className="space-y-4">
                <UserFilters filtros={filtros} onFiltrosChange={setFiltros} onLimparFiltros={() => setFiltros({})} />

                {erro && <p className="text-red-600">{erro}</p>}

                <UserTable
                    users={users}
                    onView={(u) => {
                        setSelected(u);
                        setModals((m) => ({ ...m, detail: true }));
                    }}
                    onEdit={(u) => {
                        setSelected(u);
                        setModals((m) => ({ ...m, form: true }));
                    }}
                    onToggle={handleToggle}
                    onDelete={(u) => {
                        setSelected(u);
                        setModals((m) => ({ ...m, delete: true }));
                    }}
                />

                {/* pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {page * size + 1}-{Math.min((page + 1) * size, stats.total)} de {stats.total} usuários
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 0}
                            onClick={() => {
                                const p = page - 1;
                                setPage(p);
                                fetchUsers(p);
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
                                fetchUsers(p);
                            }}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* modals */}
            <UserFormModal
                open={modals.form}
                onOpenChange={(v) => setModals((m) => ({ ...m, form: v }))}
                user={selected}
                onSave={handleSave}
            />

            <UserDetailsModal
                open={modals.detail}
                onOpenChange={(v) => setModals((m) => ({ ...m, detail: v }))}
                user={selected}
            />

            <AlertDialog open={modals.delete} onOpenChange={() => setModals((m) => ({ ...m, delete: false }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Excluir usuário</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir o usuário <strong>{selected?.nome}</strong>? Esta ação não pode ser
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