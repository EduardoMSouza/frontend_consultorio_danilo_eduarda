import { EvolucaoTratamentoService } from "@/modules/evolucao-tratamento";

export class AlternarStatusEvolucaoUseCase {
  async executar(id: number, ativar: boolean): Promise<void> {
    return EvolucaoTratamentoService.alternarStatus(id, ativar);
  }
}