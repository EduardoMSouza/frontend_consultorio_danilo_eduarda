import { EvolucaoTratamentoService } from "@/modules/evolucao-tratamento";

export class DeletarEvolucaoUseCase {
  async executar(id: number): Promise<void> {
    return EvolucaoTratamentoService.deletar(id);
  }
}