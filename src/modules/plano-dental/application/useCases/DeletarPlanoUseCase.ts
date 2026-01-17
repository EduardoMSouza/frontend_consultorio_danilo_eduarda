import { PlanoDentalService } from '../../infrastructure/services/PlanoDentalService';

export class DeletarPlanoUseCase {
    async executar(id: number): Promise<void> {
        return PlanoDentalService.deletar(id);
    }
}