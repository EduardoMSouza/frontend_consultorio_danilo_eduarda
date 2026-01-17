import type { EvolucaoTratamentoResponse } from "../dto/EvolucaoTratamentoDTOs";
import { EvolucaoTratamentoService } from "@/modules/evolucao-tratamento";

export class AgendarRetornoEvolucaoUseCase {
  async executar(
    id: number,
    dataRetorno: string,
    motivo: string
  ): Promise<EvolucaoTratamentoResponse> {
    return EvolucaoTratamentoService.agendarRetorno(id, dataRetorno, motivo);
  }
}