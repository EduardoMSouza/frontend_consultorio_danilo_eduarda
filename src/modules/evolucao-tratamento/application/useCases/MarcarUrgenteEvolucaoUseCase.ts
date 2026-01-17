import type { EvolucaoTratamentoResponse } from "../dto/EvolucaoTratamentoDTOs";
import { EvolucaoTratamentoService } from "@/modules/evolucao-tratamento";

export class MarcarUrgenteEvolucaoUseCase {
  async executar(id: number): Promise<EvolucaoTratamentoResponse> {
    return EvolucaoTratamentoService.marcarComoUrgente(id);
  }
}