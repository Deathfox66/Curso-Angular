export interface LoginRequest{
    email: string;
    password: string;
}

export interface LoginResponse{
    [x: string]: any;
    token: string;
}