//validação pura

// modules/auth/application/validators/LoginValidator.ts
import { LoginDTO } from '../dto/LoginDTO';

export class LoginValidator {
    static validate(data: LoginDTO): Record<string, string[]> | null {
        const errors: Record<string, string[]> = {};

        if (!data.login.trim()) {
            (errors.login ||= []).push('Informe email ou usuário.');
        }

        if (!data.password.trim()) {
            (errors.password ||= []).push('Informe a senha.');
        } else if (data.password.length < 4) {
            (errors.password ||= []).push('Senha muito curta.');
        }

        return Object.keys(errors).length ? errors : null;
    }
}