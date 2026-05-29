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

export interface RecuperarSenhaData {
  email: string;
}

export interface RedefinirSenhaData {
  token: string;
  senha: string;
}

export interface ValidarCodigoData {
  email?: string;
  codigo: string;
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

  async recuperarSenha(data: RecuperarSenhaData): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/esqueci-senha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao enviar código de recuperação');
    }

    return response.json().catch(() => ({ message: 'Código enviado' }));
  }

  async validarCodigo(data: ValidarCodigoData): Promise<{ valid: boolean }> {
    const response = await fetch(`${this.baseUrl}/auth/validar-codigo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, codigo: data.codigo }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Código inválido ou expirado');
    }

    return response.json().catch(() => ({ valid: true }));
  }

  async redefinirSenha(data: RedefinirSenhaData): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/redefinir-senha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: data.token, novaSenha: data.senha }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao redefinir senha');
    }

    return response.json().catch(() => ({ message: 'Senha redefinida' }));
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
