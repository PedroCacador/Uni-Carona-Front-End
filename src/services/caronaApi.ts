// API service para integração com backend de caronas

const API_BASE_URL = 'http://localhost:3333'; // Backend rodando na porta 3333

export interface CaronaResponse {
  id: string;
  motoristaId: string;
  motorista: {
    id: string;
    nome: string;
    universidade: string;
    avaliacao?: number;
  };
  origem: string;
  destino: string;
  data: string;
  horario?: string;
  vagas: number;
  preco: number;
  observacoes?: string;
  status: 'ATIVA' | 'CANCELADA' | 'COMPLETA';
}

export interface CaronaFilters {
  origem?: string;
  destino?: string;
  status?: 'ATIVA' | 'CANCELADA' | 'COMPLETA';
}

class CaronaApi {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Buscar caronas com filtros
  async buscarCaronas(filters: CaronaFilters): Promise<CaronaResponse[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters.origem) params.append('origem', filters.origem);
      if (filters.destino) params.append('destino', filters.destino);
      if (filters.status) params.append('status', filters.status);

      const url = filters.origem || filters.destino || filters.status 
        ? `${this.baseUrl}/caronas?${params.toString()}`
        : `${this.baseUrl}/caronas`;
      console.log('Fazendo requisição para:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Status da resposta:', response.status);
      console.log('Headers da resposta:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na requisição:', response.status, errorText);
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados recebidos:', data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar caronas:', error);
      throw error;
    }
  }

  // Buscar apenas caronas ativas
  async buscarCaronasAtivas(): Promise<CaronaResponse[]> {
    try {
      const response = await fetch(`${this.baseUrl}/caronas/ativas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar caronas ativas:', error);
      throw error;
    }
  }

  // Buscar carona por ID
  async buscarCaronaPorId(id: string): Promise<CaronaResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/caronas/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar carona por ID:', error);
      throw error;
    }
  }

  // Buscar caronas por motorista
  async buscarCaronasPorMotorista(motoristaId: string): Promise<CaronaResponse[]> {
    try {
      const response = await fetch(`${this.baseUrl}/caronas/motorista/${motoristaId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar caronas do motorista:', error);
      throw error;
    }
  }
}

export const caronaApi = new CaronaApi();
