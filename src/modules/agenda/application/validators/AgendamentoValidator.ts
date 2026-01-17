import type { AgendamentoRequest } from '../dto/AgendamentoDTOs';

export class AgendamentoValidator {
    static validate(req: AgendamentoRequest): Record<string, string[]> | null {
        const e: Record<string, string[]> = {};

        if (!req.dentistaId || req.dentistaId <= 0) {
            (e.dentistaId ||= []).push('Dentista é obrigatório');
        }

        if (!req.pacienteId || req.pacienteId <= 0) {
            (e.pacienteId ||= []).push('Paciente é obrigatório');
        }

        if (!req.dataConsulta?.trim()) {
            (e.dataConsulta ||= []).push('Data é obrigatória');
        }

        if (!req.horaInicio?.trim()) {
            (e.horaInicio ||= []).push('Hora início é obrigatória');
        }

        if (!req.horaFim?.trim()) {
            (e.horaFim ||= []).push('Hora fim é obrigatória');
        }

        if (req.horaInicio && req.horaFim && req.horaInicio >= req.horaFim) {
            (e.horaFim ||= []).push('Hora fim deve ser posterior à hora início');
        }

        if (req.valorConsulta && req.valorConsulta < 0) {
            (e.valorConsulta ||= []).push('Valor não pode ser negativo');
        }

        return Object.keys(e).length ? e : null;
    }
}
