// API service para autenticação e registro

const API_BASE_URL = 'http://localhost:3333';

export interface LoginData {
  email: string;
  senha?: string; // opcional para a tipagem, mas required na API
}

export interface RegisterData {
  nome: string;
  email: string;
  senha?: string;
  cpf: string;
  whatsapp: string;
  curso: string;
  dataNascimento: string | Date;
}

export interface AuthResponse {
  token: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    curso: string;
  };
}

class AuthApi {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao fazer login');
    }

    return response.json();
  }

  async register(data: RegisterData): Promise<any> {
    const response = await fetch(`${this.baseUrl}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao registrar');
    }

    return response.json();
  }

  async updateUser(id: string, data: Partial<RegisterData>): Promise<any> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.baseUrl}/usuarios/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao atualizar dados');
    }

    return response.json();
  }
}

export const authApi = new AuthApi();
