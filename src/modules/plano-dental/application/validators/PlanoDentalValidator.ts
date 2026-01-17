import type { PlanoDentalRequest } from '../dto/PlanoDentalDTOs';

export class PlanoDentalValidator {
    static validate(req: PlanoDentalRequest): Record<string, string[]> | null {
        const e: Record<string, string[]> = {};

        if (!req.pacienteId) (e.pacienteId ||= []).push('Paciente é obrigatório');
        if (!req.dentistaId) (e.dentistaId ||= []).push('Dentista é obrigatório');
        if (!req.dente.trim()) (e.dente ||= []).push('Dente é obrigatório');
        if (!req.procedimento.trim()) (e.procedimento ||= []).push('Procedimento é obrigatório');
        if (req.valor <= 0) (e.valor ||= []).push('Valor deve ser maior que zero');

        return Object.keys(e).length ? e : null;
    }
}