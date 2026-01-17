import type { UserRequest } from '../dto/UserDTOs';

export class UserValidator {
    static validate(req: UserRequest): Record<string, string[]> | null {
        const e: Record<string, string[]> = {};

        if (!req.nome.trim()) (e.nome ||= []).push('Nome é obrigatório');
        if (!req.username.trim()) (e.username ||= []).push('Username é obrigatório');
        if (req.username.length < 3) (e.username ||= []).push('Mínimo 3 caracteres');

        if (!req.email.trim()) (e.email ||= []).push('Email é obrigatório');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email))
            (e.email ||= []).push('Email inválido');

        if (!req.password || req.password.length < 6)
            (e.password ||= []).push('Mínimo 6 caracteres');

        if (!req.role) (e.role ||= []).push('Role é obrigatória');

        return Object.keys(e).length ? e : null;
    }
}