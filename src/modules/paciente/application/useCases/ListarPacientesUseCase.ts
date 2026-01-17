import { PageResponse, PacienteResumoResponse } from '../dto/PacienteDTO';
import { PacienteService } from '../../infrastructure/services/PacienteService';

export class ListarPacientesUseCase {
    async executar(
        page: number,
        size: number,
        filtros?: { nome?: string; cpf?: string; convenio?: string; ativo?: boolean }
    ): Promise<PageResponse<PacienteResumoResponse>> {
        if (filtros?.nome) return PacienteService.buscarPorNomePaginado(filtros.nome, page, size);
        if (filtros?.cpf)  return PacienteService.buscarPorCpfPaginado(filtros.cpf, page, size);
        if (filtros?.convenio) return PacienteService.buscarPorConvenioPaginado(filtros.convenio, page, size);
        if (filtros?.ativo === true) return PacienteService.listarAtivosPaginado(page, size);
        if (filtros?.ativo === false) {
            const todos = await PacienteService.listarPaginado(page, size);
            return { ...todos, content: todos.content.filter(p => !p.ativo) };
        }
        return PacienteService.listarPaginado(page, size);
    }
}