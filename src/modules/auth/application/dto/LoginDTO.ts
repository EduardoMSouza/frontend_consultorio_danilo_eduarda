//contrato de entrada

// modules/auth/application/dto/LoginDTO.ts
export interface LoginDTO {
    login: string; // email ou username
    password: string;
    rememberMe: boolean;
}