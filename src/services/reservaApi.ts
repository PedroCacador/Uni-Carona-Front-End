const API_BASE_URL = 'http://localhost:3333';

export interface Reserva {
  id: string;
  status: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA';
  quantidadePessoas: number;
  caronaId: string;
  usuarioId: string;
  carona?: any;
  usuario?: any;
  createdAt: string;
}

export interface Avaliacao {
  id: string;
  nota: number;
  comentario?: string;
  caronaId: string;
  avaliadorId: string;
  avaliadoId: string;
  avaliador?: { id: string; nome: string };
  carona?: { origem: string; destino: string; dataHoraSaida: string };
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

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`Erro ao buscar reservas: ${response.status}`);
    }

    return response.json();
  }

  async findByCaronaId(caronaId: string): Promise<Reserva[]> {
    const response = await fetch(`${this.baseUrl}/reservas/carona/${caronaId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`Erro ao buscar reservas da carona: ${response.status}`);
    }

    return response.json();
  }

  async atualizarStatus(reservaId: string, status: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA'): Promise<Reserva> {
    const response = await fetch(`${this.baseUrl}/reservas/${reservaId}/status`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Erro ao atualizar reserva: ${response.status}`);
    }

    return response.json();
  }

  async cancelarReserva(reservaId: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/reservas/${reservaId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Erro ao cancelar reserva: ${response.status}`);
    }

    return response.json();
  }

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

  async buscarAvaliacoes(usuarioId: string): Promise<Avaliacao[]> {
    const response = await fetch(`${this.baseUrl}/avaliacoes/usuario/${usuarioId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar avaliações: ${response.status}`);
    }

    return response.json();
  }
}

export const reservaApi = new ReservaApi();
