export interface DentistaRequest {
    nome: string;
    cro: string;
    especialidade: string;
    telefone: string;
    email: string;
}

export interface DentistaResponse {
    id: number;
    nome: string;
    cro: string;
    especialidade: string;
    telefone: string;
    email: string;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
}

export interface DentistaResumoResponse {
    id: number;
    nome: string;
    cro: string;
    especialidade: string;
    telefone: string;
    email: string;
    ativo: boolean;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}