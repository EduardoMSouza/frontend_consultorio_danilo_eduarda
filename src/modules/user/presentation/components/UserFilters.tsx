'use client';
import { useState } from 'react';
import { Button } from '@/components/ui-shadcn/button';
import { Input } from '@/components/ui-shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-shadcn/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui-shadcn/sheet';
import { SlidersHorizontal, X } from 'lucide-react';
import type { UserFiltros } from '../../application/dto/UserDTOs';

interface Props {
    filtros: UserFiltros;
    onFiltrosChange: (f: UserFiltros) => void;
    onLimparFiltros: () => void;
}

export function UserFilters({ filtros, onFiltrosChange, onLimparFiltros }: Props) {
    const [open, setOpen] = useState(false);

    const handleChange = <K extends keyof UserFiltros>(key: K, value: UserFiltros[K]) => {
        onFiltrosChange({ ...filtros, [key]: value });
    };

    const hasActive = Object.values(filtros).some((v) => v !== undefined && v !== '');

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
                <Input
                    placeholder="Buscar por nome, username ou email..."
                    value={filtros.termo || ''}
                    onChange={(e) => handleChange('termo', e.target.value)}
                    className="pl-10"
                />
                <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-2">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            Filtros
                            {hasActive && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs text-white">!</span>}
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Filtros de Usuários</SheetTitle>
                            <SheetDescription>Refine a lista de usuários</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 flex flex-col gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <Select value={filtros.ativo === undefined ? 'all' : String(filtros.ativo)} onValueChange={(v) => handleChange('ativo', v === 'all' ? undefined : v === 'true')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todos" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todos</SelectItem>
                                        <SelectItem value="true">Ativo</SelectItem>
                                        <SelectItem value="false">Inativo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <Select value={filtros.role || 'all'} onValueChange={(v) => handleChange('role', v === 'all' ? undefined : v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todas</SelectItem>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="DENTISTA">Dentista</SelectItem>
                                        <SelectItem value="SECRETARIA">Secretária</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button variant="outline" className="flex-1" onClick={() => { onLimparFiltros(); setOpen(false); }}>
                                    <X className="mr-2 h-4 w-4" /> Limpar
                                </Button>
                                <Button className="flex-1" onClick={() => setOpen(false)}>Aplicar</Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                {hasActive && (
                    <Button variant="ghost" size="sm" onClick={onLimparFiltros}>
                        <X className="mr-1 h-4 w-4" /> Limpar filtros
                    </Button>
                )}
            </div>
        </div>
    );
}