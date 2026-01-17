'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui-shadcn/dialog';
import { Badge } from '@/components/ui-shadcn/badge';
import { Separator } from '@/components/ui-shadcn/separator';
import { User, Mail, Calendar, Shield, Clock } from 'lucide-react';
import type { UserResponse } from '../../application/dto/UserDTOs';

interface Props {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    user: UserResponse | null;
}

export function UserDetailsModal({ open, onOpenChange, user }: Props) {
    if (!user) return null;

    const formatDate = (d?: string) => (d ? new Date(d).toLocaleString('pt-BR') : '-');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Detalhes do Usuário</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* avatar + nome */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-sky-600 text-xl font-bold">
                            {user.nome.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{user.nome}</p>
                            <Badge variant={user.ativo ? 'default' : 'secondary'}>{user.ativo ? 'Ativo' : 'Inativo'}</Badge>
                        </div>
                    </div>

                    <Separator />

                    {/* grid de dados */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                                <p className="text-xs text-muted-foreground">Username</p>
                                <p className="text-sm font-medium">{user.username}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="text-sm font-medium">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                                <p className="text-xs text-muted-foreground">Role</p>
                                <Badge className="text-xs">{user.role}</Badge>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                                <p className="text-xs text-muted-foreground">Último login</p>
                                <p className="text-sm font-medium">{formatDate(user.ultimoLogin)}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                            <p className="text-xs text-muted-foreground">Criado em</p>
                            <p className="text-sm font-medium">{formatDate(user.criadoEm)}</p>
                            {user.criadoPor && (
                                <p className="text-xs text-muted-foreground">por {user.criadoPor}</p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}