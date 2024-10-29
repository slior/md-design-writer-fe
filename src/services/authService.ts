
import { API_BASE_URL } from "./DocumentAPI";

interface LoginResponse
{
    access_token: string;
}
  
interface UserCredentials
{
    email: string;
    password: string;
}
  

export interface User
{
    email : string
}

export function userFromUserID(userID : string | null) : User 
{
    return userID ? { email : userID} : { email : ''}
}

export class AuthService
{
    private static TOKEN_KEY = 'auth_token';
    private static USER_KEY = 'user';

    static async login(credentials: UserCredentials): Promise<boolean>
    {
        try
        {
            const response = await fetch(`${API_BASE_URL}/auth/login`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(credentials),
            });

            if (!response.ok)
            {
                throw new Error('Login failed');
            }

            const data: LoginResponse = await response.json();
            localStorage.setItem(this.TOKEN_KEY, data.access_token);
            localStorage.setItem(this.USER_KEY,AuthService.userIdentity(credentials))
            return true;
        }
        catch (error)
        {
            console.error('Login error:', error);
            return false;
        }
    }

    static async register(credentials: UserCredentials): Promise<boolean>
    {
        try 
        {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(credentials),
            });

            if (!response.ok)
            {
                throw new Error('Registration failed');
            }

            return true;
        }
        catch (error)
        {
            console.error('Registration error:', error);
            return false;
        }
    }

    static getToken(): string | null
    {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static getUser() : string | null
    {
        return localStorage.getItem(this.USER_KEY);
    }

    static logout(): void
    {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    static isAuthenticated(): boolean
    {
        return !!this.getToken();
    }


    private static userIdentity(uc : UserCredentials) : string
    {
        return uc.email
    }
}