const API_BASE_URL = 'http://localhost:3333';

export interface Reserva {
  id: string;
  status: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA';
  quantidadePessoas: number;
  caronaId: string;
  usuarioId: string;
  carona?: any; // To be populated se backend retornar a carona junta
  createdAt: string;
}

class ReservaApi {
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

  async criarReserva(caronaId: string, usuarioId: string, quantidadePessoas: number = 1): Promise<Reserva> {
    const response = await fetch(`${this.baseUrl}/reservas`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ caronaId, usuarioId, quantidadePessoas }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Erro ao criar reserva: ${response.status}`);
    }

    return response.json();
  }

  async findByUsuarioId(usuarioId: string): Promise<Reserva[]> {
    const response = await fetch(`${this.baseUrl}/reservas/usuario/${usuarioId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar reservas: ${response.status}`);
    }

    return response.json();
  }

  // A API de Avaliações
  async avaliarMotorista(caronaId: string, avaliadorId: string, avaliadoId: string, nota: number, comentario?: string) {
    const response = await fetch(`${this.baseUrl}/avaliacoes`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ caronaId, avaliadorId, avaliadoId, nota, comentario }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao avaliar: ${response.status}`);
    }

    return response.json();
  }
}

export const reservaApi = new ReservaApi();
