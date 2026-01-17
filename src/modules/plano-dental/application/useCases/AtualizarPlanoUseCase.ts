import type { PlanoDentalRequest, PlanoDentalResponse } from '../dto/PlanoDentalDTOs';
import { PlanoDentalValidator } from '../validators/PlanoDentalValidator';
import { PlanoDentalService } from '../../infrastructure/services/PlanoDentalService';

export class AtualizarPlanoUseCase {
    async executar(id: number, request: PlanoDentalRequest): Promise<PlanoDentalResponse> {
        const errors = PlanoDentalValidator.validate(request);
        if (errors) throw { fieldErrors: errors };
        return PlanoDentalService.atualizar(id, request);
    }
}