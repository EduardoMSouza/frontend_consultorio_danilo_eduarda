import type { UserRequest, UserResponse } from '../dto/UserDTOs';
import { UserValidator } from '../validators/UserValidator';
import { UserService } from '../../infrastructure/services/UserService';

export class CriarUserUseCase {
    async executar(request: UserRequest): Promise<UserResponse> {
        const errors = UserValidator.validate(request);
        if (errors) throw { fieldErrors: errors };
        return UserService.criar(request);
    }
}