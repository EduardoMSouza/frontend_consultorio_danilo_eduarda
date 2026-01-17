import {DentistaRequest} from "@/models/dentista.type";

export class DentistaValidator {
    static validate(req: DentistaRequest): Record<string, string[]> | null {
        const e: Record<string, string[]> = {};

        if (!req.nome.trim()) (e.nome ||= []).push('Nome é obrigatório');
        if (!req.cro.trim())   (e.cro   ||= []).push('CRO é obrigatório');
        if (!req.especialidade.trim()) (e.especialidade ||= []).push('Especialidade é obrigatória');

        const email = req.email.trim();
        if (!email) (e.email ||= []).push('Email é obrigatório');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            (e.email ||= []).push('Email inválido');
        }

        const fone = req.telefone.replace(/\D/g, '');
        if (fone.length < 10) (e.telefone ||= []).push('Telefone incompleto');

        return Object.keys(e).length ? e : null;
    }
}