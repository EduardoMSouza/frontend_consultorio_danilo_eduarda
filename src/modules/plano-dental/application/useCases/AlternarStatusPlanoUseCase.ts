import { PlanoDentalService } from '../../infrastructure/services/PlanoDentalService';

export class AlternarStatusPlanoUseCase {
    async executar(id: number, ativar: boolean): Promise<void> {
        return PlanoDentalService.alternarStatus(id, ativar);
    }
}