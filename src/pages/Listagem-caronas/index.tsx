import React, { useState, useEffect } from 'react';
import CardCarona, { type Carona } from '../../components/CardCarona';
import { styles } from './styles';

// Dados mockados
const mockCaronas: Carona[] = [
  {
    id: '1',
    motorista: {
      nome: 'Ana Silva',
      universidade: 'USP - Campus São Paulo',
      avaliacao: 4.8,
    },
    origem: 'Metrô Vila Mariana',
    destino: 'USP - Cidade Universitária',
    data: '2026-04-25',
    horario: '08:00',
    vagas: 3,
    preco: 8.50,
    observacoes: 'Carona com ar condicionado e música ambiente',
  },
  {
    id: '2',
    motorista: {
      nome: 'Carlos Santos',
      universidade: 'UNICAMP',
      avaliacao: 4.5,
    },
    origem: 'Campinas - Centro',
    destino: 'UNICAMP - Barão Geraldo',
    data: '2026-04-25',
    horario: '07:30',
    vagas: 2,
    preco: 6.00,
    observacoes: 'Só aceito mochila pequena',
  },
  {
    id: '3',
    motorista: {
      nome: 'Mariana Costa',
      universidade: 'PUC - Rio',
      avaliacao: 5.0,
    },
    origem: 'Botafogo',
    destino: 'PUC - Gávea',
    data: '2026-04-25',
    horario: '09:15',
    vagas: 0, // Sem vagas
    preco: 7.50,
    observacoes: 'Carona feminina',
  },
  {
    id: '4',
    motorista: {
      nome: 'Rafael Oliveira',
      universidade: 'UFMG',
      avaliacao: 4.2,
    },
    origem: 'Savassi',
    destino: 'UFMG - Pampulha',
    data: '2026-04-26',
    horario: '13:00',
    vagas: 1,
    preco: 5.00,
    observacoes: 'Preciso estar na UFMG até 13:30',
  },
  {
    id: '5',
    motorista: {
      nome: 'Fernanda Lima',
      universidade: 'UFRJ',
      avaliacao: 4.7,
    },
    origem: 'Copacabana',
    destino: 'UFRJ - Fundão',
    data: '2026-04-26',
    horario: '10:30',
    vagas: 2,
    preco: 9.00,
    observacoes: 'Carona com boa música e bom papo',
  },
  {
    id: '6',
    motorista: {
      nome: 'Thiago Souza',
      universidade: 'UnB',
      avaliacao: 4.3,
    },
    origem: 'Asa Sul',
    destino: 'UnB - Darcy Ribeiro',
    data: '2026-04-27',
    horario: '07:45',
    vagas: 3,
    preco: 4.50,
    observacoes: '',
  },
];

const ListagemCaronas: React.FC = () => {
  const [caronasFiltradas, setCaronasFiltradas] = useState<Carona[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros que condizem com o endpoint
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [apenasComVagas, setApenasComVagas] = useState(false); // Filtro de vagas disponíveis

  // Simula chamada para o endpoint GET /caronas/buscar
  const buscarCaronas = async () => {
    setLoading(true);
    
    // Monta a query string conforme o endpoint
    const params = new URLSearchParams();
    if (origem) params.append('origem', origem);
    if (destino) params.append('destino', destino);
    if (data) params.append('data', data);
    
    // Simula requisição para o backend
    // const response = await fetch(`http://localhost:3000/caronas/buscar?${params.toString()}`);
    // const data = await response.json();
    
    // Simulação com dados mockados
    setTimeout(() => {
      let resultados = [...mockCaronas];
      
      // Filtro por origem
      if (origem) {
        resultados = resultados.filter(carona =>
          carona.origem.toLowerCase().includes(origem.toLowerCase())
        );
      }
      
      // Filtro por destino
      if (destino) {
        resultados = resultados.filter(carona =>
          carona.destino.toLowerCase().includes(destino.toLowerCase())
        );
      }
      
      // Filtro por data
      if (data) {
        resultados = resultados.filter(carona => carona.data === data);
      }
      
      // Filtro por vagas disponíveis (somente caronas com vagas > 0)
      if (apenasComVagas) {
        resultados = resultados.filter(carona => carona.vagas > 0);
      }
      
      setCaronasFiltradas(resultados);
      setLoading(false);
    }, 500);
  };

  // Busca caronas quando os filtros mudarem
  useEffect(() => {
    buscarCaronas();
  }, [origem, destino, data, apenasComVagas]);

  const handleVerDetalhes = (id: string) => {
    console.log('Ver detalhes da carona:', id);
    alert(`Detalhes da carona ${id} - Em breve!`);
  };

  const limparFiltros = () => {
    setOrigem('');
    setDestino('');
    setData('');
    setApenasComVagas(false);
  };

  const limparFiltrosStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    background: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s',
  };

  const checkboxStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    background: 'white',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
    cursor: 'pointer',
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.titulo}>Caronas disponíveis</h1>
          <p style={styles.subtitulo}>Encontre uma carona para sua universidade</p>
        </div>

        <div style={styles.filtros}>
          <input
            type="text"
            placeholder="📍 Origem..."
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            style={styles.filtroInput}
          />
          <input
            type="text"
            placeholder="🎯 Destino..."
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            style={styles.filtroInput}
          />
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={styles.filtroInput}
          />
          
          {/* Filtro de vagas disponíveis */}
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              checked={apenasComVagas}
              onChange={(e) => setApenasComVagas(e.target.checked)}
            />
            <span>🚗 Apenas com vagas disponíveis</span>
          </label>
          
          {(origem || destino || data || apenasComVagas) && (
            <button onClick={limparFiltros} style={limparFiltrosStyle}>
              Limpar filtros
            </button>
          )}
        </div>

        {loading ? (
          <div style={styles.loading}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
            <div>Buscando caronas...</div>
          </div>
        ) : caronasFiltradas.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <i className="fas fa-car-side"></i>
            </div>
            <h3>Nenhuma carona encontrada</h3>
            <p>Tente ajustar os filtros ou volte mais tarde</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {caronasFiltradas.map((carona) => (
              <CardCarona
                key={carona.id}
                carona={carona}
                onVerDetalhes={handleVerDetalhes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListagemCaronas;