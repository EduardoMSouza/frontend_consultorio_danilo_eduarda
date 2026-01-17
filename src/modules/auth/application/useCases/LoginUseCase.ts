//logica de negocio


// modules/auth/application/useCases/LoginUseCase.ts
import { authService } from '@/services/auth.service';
import { LoginDTO } from '../dto/LoginDTO';
import { LoginValidator } from '../validators/LoginValidator';
import { AuthError } from '@/models/auth.type';

export class LoginUseCase {
    async execute(dto: LoginDTO): Promise<void> {
        const errors = LoginValidator.validate(dto);
        if (errors) {
            const err = new Error('ValidationError') as AuthError;
            err.fieldErrors = errors;
            throw err;
        }

        // Persiste login se "lembrar" estiver marcado
        if (dto.rememberMe && typeof window !== 'undefined') {
            localStorage.setItem('rememberedLogin', dto.login);
        } else {
            localStorage.removeItem('rememberedLogin');
        }

        // Chama serviço real
        await authService.login({ login: dto.login, password: dto.password });
    }
}