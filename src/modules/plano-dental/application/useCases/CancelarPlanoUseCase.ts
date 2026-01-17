import type { PlanoDentalResponse } from '../dto/PlanoDentalDTOs';
import { PlanoDentalService } from '../../infrastructure/services/PlanoDentalService';

export class CancelarPlanoUseCase {
    async executar(id: number, motivo: string): Promise<PlanoDentalResponse> {
        return PlanoDentalService.cancelar(id, motivo);
    }
}