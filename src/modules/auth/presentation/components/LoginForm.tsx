// modules/auth/presentation/components/LoginForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { login: handleLogin, isLoading, error, fieldErrors } = useLogin();

    // Carrega login salvo
    useEffect(() => {
        const saved = localStorage.getItem('rememberedLogin');
        if (saved) {
            setLogin(saved);
            setRememberMe(true);
        }
    }, []);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin({ login, password, rememberMe });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {error && (
                <div className="p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>
            )}

            <div>
                <label className="block text-sm font-medium mb-1">Email ou Usuário</label>
                <input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className={`w-full input ${fieldErrors?.login ? 'border-red-500' : ''}`}
                    placeholder="usuario@empresa.com"
                    required
                />
                {fieldErrors?.login && <p className="text-xs text-red-500">{fieldErrors.login[0]}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full input ${fieldErrors?.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                    required
                />
                {fieldErrors?.password && <p className="text-xs text-red-500">{fieldErrors.password[0]}</p>}
            </div>

            <div className="flex items-center">
                <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                />
                <label htmlFor="remember" className="text-sm">Lembrar de mim</label>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary"
            >
                {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    );
}