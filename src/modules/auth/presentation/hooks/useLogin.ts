// modules/auth/presentation/hooks/useLogin.ts
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoginUseCase } from '../../application/useCases/LoginUseCase';
import { LoginDTO } from '../../application/dto/LoginDTO';
import { AuthError } from '@/models/auth.type';

export function useLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/dashboard';
    const { login: authLogin } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);

    const loginUseCase = new LoginUseCase();

    const login = async (dto: LoginDTO) => {
        setError('');
        setFieldErrors(null);
        setIsLoading(true);

        try {
            await loginUseCase.execute(dto);
            await authLogin(dto.login, dto.password); // atualiza contexto
            router.push(redirect);
        } catch (err: any) {
            if (err.fieldErrors) {
                setFieldErrors(err.fieldErrors);
                return;
            }
            // Mapeia erros HTTP amigáveis
            if (err.status === 401) setError('Credenciais inválidas.');
            else if (err.status === 403) setError('Conta inativa ou sem permissão.');
            else if (err.status === 429) setError('Muitas tentativas. Aguarde.');
            else if (err.message?.includes('conexão')) setError('Erro de conexão.');
            else setError(err.message || 'Erro ao entrar.');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error, fieldErrors };
}