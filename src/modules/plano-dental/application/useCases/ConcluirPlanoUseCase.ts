import type { PlanoDentalResponse } from '../dto/PlanoDentalDTOs';
import { PlanoDentalService } from '../../infrastructure/services/PlanoDentalService';

export class ConcluirPlanoUseCase {
    async executar(id: number): Promise<PlanoDentalResponse> {
        return PlanoDentalService.concluir(id);
    }
}