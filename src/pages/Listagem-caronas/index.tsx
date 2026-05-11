import React, { useState, useEffect } from 'react';
import CardCarona, { type Carona } from '../../components/CardCarona';
import { styles } from './styles';
import { caronaApi, type CaronaFilters } from '../../services/caronaApi';

const ListagemCaronas: React.FC = () => {
  const [caronasFiltradas, setCaronasFiltradas] = useState<Carona[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros que condizem com o endpoint
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [apenasComVagas, setApenasComVagas] = useState(false); // Filtro de vagas disponíveis

  // Chamada real para o backend
  const buscarCaronas = async () => {
    setLoading(true);
    
    try {
      const filters: CaronaFilters = {};
      
      if (origem) filters.origem = origem;
      if (destino) filters.destino = destino;
      if (apenasComVagas) {
        filters.status = 'ATIVA';
      }

      const caronasApi = await caronaApi.buscarCaronas(filters);
      
      // Converter CaronaResponse para Carona (interface do componente)
      const caronasConvertidas: Carona[] = caronasApi.map(caronaApi => ({
        id: caronaApi.id,
        motorista: {
          nome: caronaApi.motorista.nome,
          universidade: caronaApi.motorista.universidade,
          avaliacao: caronaApi.motorista.avaliacao,
        },
        origem: caronaApi.origem,
        destino: caronaApi.destino,
        data: caronaApi.data,
        horario: caronaApi.horario,
        vagas: caronaApi.vagas,
        preco: caronaApi.preco,
        observacoes: caronaApi.observacoes,
        status: caronaApi.status.toLowerCase() as 'ativa' | 'completa' | 'cancelada',
      }));
      
      // Aplicar filtro de data localmente se necessário
      let resultados = caronasConvertidas;
      if (data) {
        resultados = resultados.filter(carona => carona.data === data);
      }
      
      // Filtro adicional de vagas (backend não tem esse filtro específico)
      if (apenasComVagas) {
        resultados = resultados.filter(carona => carona.vagas > 0);
      }
      
      setCaronasFiltradas(resultados);
    } catch (error: any) {
      console.error('Erro ao buscar caronas:', error);
      // Em caso de erro, exibe mensagem de erro e array vazio
      setCaronasFiltradas([]);
    } finally {
      setLoading(false);
    }
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