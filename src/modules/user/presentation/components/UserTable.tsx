'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui-shadcn/table';
import { Button } from '@/components/ui-shadcn/button';
import { Badge } from '@/components/ui-shadcn/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui-shadcn/dropdown-menu';
import { MoreHorizontal, Eye, Pencil, UserCheck, UserX, Trash2 } from 'lucide-react';
import type { UserResponse } from '../../application/dto/UserDTOs';

interface Props {
    users: UserResponse[];
    onView: (u: UserResponse) => void;
    onEdit: (u: UserResponse) => void;
    onToggle: (u: UserResponse) => void;
    onDelete: (u: UserResponse) => void;
}

export function UserTable({ users, onView, onEdit, onToggle, onDelete }: Props) {
    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell className="font-medium">{u.nome}</TableCell>
                            <TableCell>{u.username}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell><RoleBadge role={u.role} /></TableCell>
                            <TableCell>
                                <Badge variant={u.ativo ? 'default' : 'secondary'}>{u.ativo ? 'Ativo' : 'Inativo'}</Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => onView(u)}>
                                            <Eye className="mr-2 h-4 w-4" /> Visualizar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onEdit(u)}>
                                            <Pencil className="mr-2 h-4 w-4" /> Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => onToggle(u)}>
                                            {u.ativo ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                                            {u.ativo ? 'Inativar' : 'Ativar'}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive" onClick={() => onDelete(u)}>
                                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

/* badge colorido por role */
function RoleBadge({ role }: { role: string }) {
    const map: Record<string, string> = {
        ADMIN: 'bg-red-100 text-red-700',
        DENTISTA: 'bg-blue-100 text-blue-700',
        SECRETARIA: 'bg-green-100 text-green-700',
    };
    return <Badge className={map[role] || ''}>{role}</Badge>;
}