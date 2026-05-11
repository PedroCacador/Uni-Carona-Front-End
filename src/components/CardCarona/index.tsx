import React from 'react';
import { cardStyles } from './styles';

// Interface que condiz com o retorno esperado do backend
export interface Carona {
  id: string;
  motorista: {
    id?: string;
    nome: string;
    universidade: string;
    avaliacao?: number;
    avaliacaoMedia?: number; // campo alternativo
  };
  origem: string;
  destino: string;
  data: string;
  horario?: string;
  horarioPartida?: string; // campo alternativo
  vagas?: number;
  vagasDisponiveis?: number; // campo alternativo
  preco: number;
  observacoes?: string;
  status?: 'ativa' | 'completa' | 'cancelada';
}

interface CardCaronaProps {
  carona: Carona;
  onVerDetalhes: (id: string) => void;
}

const CardCarona: React.FC<CardCaronaProps> = ({ carona, onVerDetalhes }) => {
  // Função para pegar o número de vagas (qualquer que seja o nome do campo)
  const getVagas = () => {
    return carona.vagas ?? carona.vagasDisponiveis ?? 0;
  };

  // Função para pegar a avaliação (qualquer que seja o nome do campo)
  const getAvaliacao = () => {
    return carona.motorista.avaliacao ?? carona.motorista.avaliacaoMedia ?? 0;
  };

  // Função para pegar o horário (qualquer que seja o nome do campo)
  const getHorario = () => {
    return carona.horario ?? carona.horarioPartida ?? '';
  };

  const formatarData = (data: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  const renderEstrelas = (avaliacao: number) => {
    const estrelasCheias = Math.floor(avaliacao);
    const estrelasVazias = 5 - estrelasCheias;
    
    return (
      <>
        {[...Array(estrelasCheias)].map((_, i) => (
          <i key={`cheia-${i}`} className="fas fa-star" style={cardStyles.estrelaCheia}></i>
        ))}
        {[...Array(estrelasVazias)].map((_, i) => (
          <i key={`vazia-${i}`} className="far fa-star" style={cardStyles.estrelaVazia}></i>
        ))}
      </>
    );
  };

  // Verifica se a carona está disponível (não cancelada e com vagas)
  const isDisponivel = () => {
    if (carona.status === 'cancelada') return false;
    if (carona.status === 'completa') return false;
    return getVagas() > 0;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
    e.currentTarget.style.borderColor = '#2563eb';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    e.currentTarget.style.borderColor = '#f1f5f9';
  };

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
    e.currentTarget.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.3)';
    e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8, #1e40af)';
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.25)';
    e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
  };

  const vagas = getVagas();
  const avaliacao = getAvaliacao();
  const horario = getHorario();

  return (
    <div 
      style={cardStyles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={cardStyles.header}>
        <div style={cardStyles.motoristaInfo}>
          <div style={cardStyles.motoristaNome}>{carona.motorista.nome}</div>
          <div style={cardStyles.universidade}>{carona.motorista.universidade}</div>
          {avaliacao > 0 && (
            <div style={cardStyles.avaliacao}>
              {renderEstrelas(avaliacao)}
              <span style={cardStyles.avaliacaoTexto}>({avaliacao.toFixed(1)})</span>
            </div>
          )}
        </div>
        <div style={{
          ...cardStyles.vagasBadge,
          background: vagas > 0 ? '#e8f5e9' : '#ffebee',
          color: vagas > 0 ? '#2e7d32' : '#c62828',
        }}>
          {vagas > 0 ? vagas : '0'}
        </div>
      </div>

      <div style={cardStyles.rota}>
        <div style={cardStyles.rotaItem}>
          <i className="fas fa-circle" style={{ ...cardStyles.iconStyle, fontSize: '10px', color: '#28a745' }}></i>
          <span><strong>Origem:</strong> {carona.origem}</span>
        </div>
        <div style={{ ...cardStyles.rotaItem, marginLeft: '10px' }}>
          <i className="fas fa-arrow-down" style={{ ...cardStyles.iconStyle, fontSize: '12px', color: '#6c757d' }}></i>
          <div style={cardStyles.linhaDivisor}></div>
        </div>
        <div style={cardStyles.rotaItem}>
          <i className="fas fa-map-marker-alt" style={{ ...cardStyles.iconStyle, color: '#dc3545' }}></i>
          <span><strong>Destino:</strong> {carona.destino}</span>
        </div>
      </div>

      <div style={cardStyles.dataHora}>
        <div>
          <i className="far fa-calendar-alt" style={{ marginRight: '8px', color: '#4361ee' }}></i>
          {formatarData(carona.data)}
        </div>
        {horario && (
          <div>
            <i className="far fa-clock" style={{ marginRight: '8px', color: '#4361ee' }}></i>
            {horario}
          </div>
        )}
      </div>

      {carona.observacoes && (
        <div style={cardStyles.observacoes}>
          <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
          {carona.observacoes}
        </div>
      )}

      {carona.status === 'cancelada' && (
        <div style={{ ...cardStyles.observacoes, background: '#ffebee', color: '#c62828', padding: '8px', borderRadius: '8px' }}>
          <i className="fas fa-ban" style={{ marginRight: '8px' }}></i>
          Carona cancelada
        </div>
      )}

      <div style={cardStyles.precoVagas}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>Preço por pessoa</span>
          <div style={cardStyles.preco}>R$ {carona.preco.toFixed(2)}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>Vagas restantes</span>
          <div style={cardStyles.vagasRestantes}>{vagas}</div>
        </div>
      </div>

      <button
        style={{
          ...cardStyles.button,
          opacity: !isDisponivel() ? 0.5 : 1,
          cursor: !isDisponivel() ? 'not-allowed' : 'pointer',
        }}
        onClick={() => isDisponivel() && onVerDetalhes(carona.id)}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
        disabled={!isDisponivel()}
      >
        {!isDisponivel() ? 'Indisponível' : 'Ver detalhes'}
      </button>
    </div>
  );
};

export default CardCarona;