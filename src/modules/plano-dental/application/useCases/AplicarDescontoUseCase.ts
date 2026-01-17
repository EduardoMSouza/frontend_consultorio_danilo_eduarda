import type { PlanoDentalResponse } from '../dto/PlanoDentalDTOs';
import { PlanoDentalService } from '../../infrastructure/services/PlanoDentalService';

export class AplicarDescontoUseCase {
    async executar(id: number, desconto: number): Promise<PlanoDentalResponse> {
        return PlanoDentalService.aplicarDesconto(id, desconto);
    }
}