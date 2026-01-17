export interface UserRequest {
    nome: string;
    username: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'DENTISTA' | 'SECRETARIA';
}

export interface UserResponse {
    id: number;
    nome: string;
    username: string;
    email: string;
    role: 'ADMIN' | 'DENTISTA' | 'SECRETARIA';
    ativo: boolean;
    ultimoLogin?: string;
    criadoEm: string;
    atualizadoEm: string;
    criadoPor?: string;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface UserFiltros {
    termo?: string;
    ativo?: boolean;
    role?: 'ADMIN' | 'DENTISTA' | 'SECRETARIA';
}

export interface UserStats {
    total: number;
    ativos: number;
    inativos: number;
    porRole: Record<string, number>;
}