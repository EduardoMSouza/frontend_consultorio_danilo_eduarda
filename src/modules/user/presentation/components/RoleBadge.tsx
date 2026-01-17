'use client';
import { Badge } from '@/components/ui-shadcn/badge';

const ROLE_STYLES: Record<string, string> = {
    ADMIN: 'bg-red-100 text-red-700',
    DENTISTA: 'bg-blue-100 text-blue-700',
    SECRETARIA: 'bg-green-100 text-green-700',
};

export function RoleBadge({ role }: { role: string }) {
    return <Badge className={ROLE_STYLES[role] || ''}>{role}</Badge>;
}