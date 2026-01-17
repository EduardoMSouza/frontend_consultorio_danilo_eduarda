'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui-shadcn/dialog';
import { Button } from '@/components/ui-shadcn/button';
import { Input } from '@/components/ui-shadcn/input';
import { Label } from '@/components/ui-shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-shadcn/select';
import type { UserRequest, UserResponse } from '../../application/dto/UserDTOs';

interface Props {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    user?: UserResponse | null;
    onSave: (data: UserRequest) => void;
}

export function UserFormModal({ open, onOpenChange, user, onSave }: Props) {
    const [form, setForm] = useState<UserRequest>({
        nome: '',
        username: '',
        email: '',
        password: '',
        role: 'SECRETARIA',
    });

    useEffect(() => {
        if (user) {
            setForm({
                nome: user.nome,
                username: user.username,
                email: user.email,
                password: '', // não preenche senha no edit
                role: user.role,
            });
        } else {
            setForm({
                nome: '',
                username: '',
                email: '',
                password: '',
                role: 'SECRETARIA',
            });
        }
    }, [user, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{user ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nome *</Label>
                            <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Username *</Label>
                            <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>

                    {!user && (
                        <div className="space-y-2">
                            <Label>Senha *</Label>
                            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Role *</Label>
                        <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as any })}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="DENTISTA">Dentista</SelectItem>
                                <SelectItem value="SECRETARIA">Secretária</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">{user ? 'Salvar' : 'Criar'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}