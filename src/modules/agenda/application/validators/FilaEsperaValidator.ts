import type { FilaEsperaRequest } from '../dto/FilaEsperaDTOs';

export class FilaEsperaValidator {
    static validate(req: FilaEsperaRequest): Record<string, string[]> | null {
        const e: Record<string, string[]> = {};

        if (!req.pacienteId || req.pacienteId <= 0) {
            (e.pacienteId ||= []).push('Paciente é obrigatório');
        }

        if (req.prioridade !== undefined && (req.prioridade < 0 || req.prioridade > 10)) {
            (e.prioridade ||= []).push('Prioridade deve estar entre 0 e 10');
        }

        return Object.keys(e).length ? e : null;
    }
}


