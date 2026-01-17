'use client';
import { Card, CardContent } from '@/components/ui-shadcn/card';
import { Users, UserCheck, UserX, Shield } from 'lucide-react';
import type { UserStats } from '../../application/dto/UserDTOs';

interface Props {
    stats: UserStats;
}

export function UserStatsCards({ stats }: Props) {
    const cards = [
        { label: 'Total', value: stats.total, icon: Users, color: 'text-sky-600', bg: 'bg-sky-50' },
        { label: 'Ativos', value: stats.ativos, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Inativos', value: stats.inativos, icon: UserX, color: 'text-slate-600', bg: 'bg-slate-100' },
        { label: 'Admin', value: stats.porRole?.ADMIN || 0, icon: Shield, color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'Dentista', value: stats.porRole?.DENTISTA || 0, icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Secretária', value: stats.porRole?.SECRETARIA || 0, icon: Shield, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {cards.map((c) => (
                <Card key={c.label} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className={`rounded-lg p-2 ${c.bg}`}>
                                <c.icon className={`h-5 w-5 ${c.color}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{c.value}</p>
                                <p className="text-xs text-muted-foreground">{c.label}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}