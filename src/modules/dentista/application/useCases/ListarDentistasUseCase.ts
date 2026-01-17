import { PageResponse, DentistaResponse } from '../dto/DentistaDTOs';
import { DentistaService } from '../../infrastructure/services/DentistaService';

export class ListarDentistasUseCase {
    // ❌ Removemos a instância
    // constructor(private service: DentistaService = DentistaService) {}

    async executar(
        page: number,
        size: number,
        termo?: string,
        situacao?: 'ativo' | 'inativo' | 'todos',
        especialidade?: string
    ): Promise<PageResponse<DentistaResponse>> {
        let resp: PageResponse<DentistaResponse>;

        if (termo) {
            resp = await DentistaService.buscarPorTermo(termo, page, size);
        } else if (situacao === 'ativo') {
            resp = await DentistaService.listarAtivos(page, size);
        } else {
            resp = await DentistaService.listarTodos(page, size);
        }

        if (especialidade && especialidade !== 'todas') {
            resp = { ...resp, content: resp.content.filter(d => d.especialidade === especialidade) };
        }

        if (situacao === 'inativo') {
            resp = { ...resp, content: resp.content.filter(d => !d.ativo) };
        }

        return resp;
    }
}