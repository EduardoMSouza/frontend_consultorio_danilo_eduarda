import { PacienteRequest } from '../dto/PacienteDTO';

export class PacienteValidator {
    static validate(req: PacienteRequest): Record<string, string[]> | null {
        const e: Record<string, string[]> = {};

        const db = req.dadosBasicos;
        if (!db.prontuarioNumero?.trim()) (e.prontuarioNumero ||= []).push('Obrigatório');
        if (!db.nome?.trim()) (e.nome ||= []).push('Obrigatório');
        if (!db.dataNascimento) (e.dataNascimento ||= []).push('Obrigatório');

        if (db.cpf && !/^\d{11}$/.test(db.cpf.replace(/\D/g, '')))
            (e.cpf ||= []).push('CPF inválido');

        if (db.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(db.email))
            (e.email ||= []).push('Email inválido');

        return Object.keys(e).length ? e : null;
    }
}