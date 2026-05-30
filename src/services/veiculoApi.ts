const API_BASE_URL = 'http://localhost:3333';

export interface Veiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  cor: string;
  motoristaId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CriarVeiculoData {
  placa: string;
  marca: string;
  modelo: string;
  cor: string;
  motoristaId: string;
}

export interface AtualizarVeiculoData {
  placa?: string;
  marca?: string;
  modelo?: string;
  cor?: string;
}

class VeiculoApi {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  async criarVeiculo(data: CriarVeiculoData): Promise<Veiculo> {
    const response = await fetch(`${this.baseUrl}/veiculos`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Erro ao cadastrar veículo: ${response.status}`);
    }

    return response.json();
  }

  async listarVeiculos(): Promise<Veiculo[]> {
    const response = await fetch(`${this.baseUrl}/veiculos`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ao listar veículos: ${response.status}`);
    }

    return response.json();
  }

  async buscarVeiculoPorId(id: string): Promise<Veiculo> {
    const response = await fetch(`${this.baseUrl}/veiculos/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar veículo: ${response.status}`);
    }

    return response.json();
  }

  async buscarVeiculosPorMotorista(motoristaId: string): Promise<Veiculo[]> {
    const response = await fetch(`${this.baseUrl}/veiculos/motorista/${motoristaId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`Erro ao buscar veículos do motorista: ${response.status}`);
    }

    return response.json();
  }

  async atualizarVeiculo(id: string, data: AtualizarVeiculoData): Promise<Veiculo> {
    const response = await fetch(`${this.baseUrl}/veiculos/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Erro ao atualizar veículo: ${response.status}`);
    }

    return response.json();
  }

  async deletarVeiculo(id: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/veiculos/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar veículo: ${response.status}`);
    }

    return response.json();
  }
}

export const veiculoApi = new VeiculoApi();
