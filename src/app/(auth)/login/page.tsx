// app/login/page.tsx
'use client';

import LoginForm from '@/modules/auth/presentation/components/LoginForm';
import { RedirectIfAuthenticated } from '@/modules/auth/presentation/components/RedirectIfAuthenticated';

export default function LoginPage() {
    return (
        <RedirectIfAuthenticated>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h1 className="text-2xl font-bold text-center mb-6">Acessar Sistema</h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </RedirectIfAuthenticated>
    );
}