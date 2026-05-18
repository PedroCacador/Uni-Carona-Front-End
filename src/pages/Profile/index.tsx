// index.tsx - Página de Perfil do Usuário
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiUser, 
  FiMail, 
  FiBook, 
  FiCreditCard, 
  FiLock, 
  FiSave, 
  FiEdit2,
  FiStar,
  FiTruck,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiPlus
} from 'react-icons/fi';
import { styles } from './styles';

interface UserProfile {
  id: string;
  nome: string;
  email: string;
  universidade: string;
  matricula: string;
  tipo: 'passageiro' | 'motorista';
  avaliacaoMedia: number;
  totalAvaliacoes: number;
  dataCadastro: string;
  telefone?: string;
  bio?: string;
  fotoPerfil?: string;
}

interface CaronaHistorico {
  id: string;
  origem: string;
  destino: string;
  data: string;
  horario: string;
  tipo: 'oferecida' | 'participante';
  status: 'completa' | 'cancelada' | 'pendente';
  vagas?: number;
  preco: number;
  motorista?: string;
}

const Perfil: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dados' | 'historico' | 'avaliacoes'>('dados');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: '', title: '', message: '' });
  
  // Dados do perfil
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    nome: 'João Silva Santos',
    email: 'joao.silva@universidade.edu.br',
    universidade: 'Universidade Federal do Rio de Janeiro - UFRJ',
    matricula: '2023123456',
    tipo: 'motorista',
    avaliacaoMedia: 4.8,
    totalAvaliacoes: 24,
    dataCadastro: '2024-01-15',
    telefone: '(21) 98765-4321',
    bio: 'Estudante de Engenharia Civil, apaixonado por caronas compartilhadas e sustentabilidade. Sempre busco oferecer viagens seguras e agradáveis! 🚗✨'
  });

  const [editData, setEditData] = useState({
    nome: profile.nome,
    telefone: profile.telefone || '',
    bio: profile.bio || '',
    universidade: profile.universidade,
    matricula: profile.matricula
  });

  // Histórico de caronas
  const [historico] = useState<CaronaHistorico[]>([
    {
      id: '1',
      origem: 'Copacabana',
      destino: 'UFRJ - Cidade Universitária',
      data: '2024-01-20',
      horario: '07:30',
      tipo: 'oferecida',
      status: 'completa',
      vagas: 3,
      preco: 12
    },
    {
      id: '2',
      origem: 'Barra da Tijuca',
      destino: 'UFRJ - Praia Vermelha',
      data: '2024-01-18',
      horario: '08:00',
      tipo: 'participante',
      status: 'completa',
      preco: 15,
      motorista: 'Maria Oliveira'
    },
    {
      id: '3',
      origem: 'Centro',
      destino: 'UFRJ - Cidade Universitária',
      data: '2024-01-25',
      horario: '13:00',
      tipo: 'oferecida',
      status: 'pendente',
      vagas: 2,
      preco: 10
    }
  ]);

  // Avaliações recebidas
  const [avaliacoes] = useState([
    {
      id: 1,
      autor: 'Ana Beatriz',
      nota: 5,
      comentario: 'Motorista super pontual e educado! Recomendo demais 🚗✨',
      data: '2024-01-20',
      tipo: 'passageiro'
    },
    {
      id: 2,
      autor: 'Carlos Eduardo',
      nota: 4.5,
      comentario: 'Ótima viagem, carro confortável e conversa agradável.',
      data: '2024-01-15',
      tipo: 'passageiro'
    },
    {
      id: 3,
      autor: 'Fernanda Lima',
      nota: 5,
      comentario: 'Excelente motorista, muito atencioso com os passageiros!',
      data: '2024-01-10',
      tipo: 'passageiro'
    }
  ]);

  useEffect(() => {
    // Simular carregamento de dados da API
    const loadProfile = async () => {
      setIsLoading(true);
      // Aqui viria a chamada real para a API
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    loadProfile();
  }, []);

  const handleEdit = () => {
    setEditData({
      nome: profile.nome,
      telefone: profile.telefone || '',
      bio: profile.bio || '',
      universidade: profile.universidade,
      matricula: profile.matricula
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simular salvamento
    setTimeout(() => {
      setProfile({
        ...profile,
        nome: editData.nome,
        telefone: editData.telefone,
        bio: editData.bio,
        universidade: editData.universidade,
        matricula: editData.matricula
      });
      setIsEditing(false);
      setIsLoading(false);
      
      setModalMessage({
        type: 'success',
        title: 'Perfil atualizado!',
        message: 'Suas informações foram salvas com sucesso.'
      });
      setShowModal(true);
      
      setTimeout(() => setShowModal(false), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'completa':
        return { icon: <FiCheckCircle size={16} />, color: '#10b981', text: 'Completa' };
      case 'cancelada':
        return { icon: <FiX size={16} />, color: '#ef4444', text: 'Cancelada' };
      default:
        return { icon: <FiAlertCircle size={16} />, color: '#f59e0b', text: 'Pendente' };
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} style={{ fill: '#fbbf24', stroke: '#fbbf24' }} />);
    }
    if (hasHalfStar) {
      stars.push(<FiStar key="half" style={{ fill: 'url(#halfGrad)', stroke: '#fbbf24' }} />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} style={{ color: '#d1d5db', stroke: '#d1d5db' }} />);
    }
    return stars;
  };

  return (
    <>
      <div style={styles.wrapper}>
        {/* Modal de Notificação */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={{
                ...styles.modalIcon,
                background: modalMessage.type === 'success' ? '#10b98120' : '#ef444420'
              }}>
                {modalMessage.type === 'success' ? 
                  <FiCheckCircle style={{ color: '#10b981' }} size={24} /> : 
                  <FiAlertCircle style={{ color: '#ef4444' }} size={24} />
                }
              </div>
              <h3 style={styles.modalTitle}>{modalMessage.title}</h3>
              <p style={styles.modalMessage}>{modalMessage.message}</p>
            </div>
          </div>
        )}

        <div style={styles.container}>
          {/* Botão Voltar */}
          <Link to="/" style={styles.backButton}>
            <FiArrowLeft size={20} />
            <span>Voltar</span>
          </Link>

          {/* Header do Perfil */}
          <div style={styles.profileHeader}>
            <div style={styles.avatarWrapper}>
              {profile.fotoPerfil ? (
                <img src={profile.fotoPerfil} alt={profile.nome} style={styles.avatar} />
              ) : (
                <div style={styles.avatarPlaceholder}>
                  <FiUser size={48} />
                </div>
              )}
              <button style={styles.changePhotoBtn}>
                <FiEdit2 size={14} />
              </button>
            </div>
            
            <div style={styles.profileInfo}>
              {!isEditing ? (
                <>
                  <div style={styles.nameRow}>
                    <h1 style={styles.name}>{profile.nome}</h1>
                    <button onClick={handleEdit} style={styles.editButton}>
                      <FiEdit2 size={16} />
                      Editar
                    </button>
                  </div>
                  <div style={styles.badgeGroup}>
                    <span style={{
                      ...styles.badge,
                      background: profile.tipo === 'motorista' 
                        ? 'linear-gradient(135deg, #4361ee, #7209b7)'
                        : 'linear-gradient(135deg, #06d6a0, #059669)'
                    }}>
                      {profile.tipo === 'motorista' ? <FiTruck size={14} /> : <FiUser size={14} />}
                      {profile.tipo === 'motorista' ? 'Motorista' : 'Passageiro'}
                    </span>
                    <span style={styles.badge}>
                      <FiCalendar size={14} />
                      Desde {new Date(profile.dataCadastro).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div style={styles.ratingWrapper}>
                    {renderStars(profile.avaliacaoMedia)}
                    <span style={styles.ratingValue}>{profile.avaliacaoMedia}</span>
                    <span style={styles.ratingCount}>({profile.totalAvaliacoes} avaliações)</span>
                  </div>
                  {profile.bio && <p style={styles.bio}>{profile.bio}</p>}
                </>
              ) : (
                <div style={styles.editForm}>
                  <div style={styles.formRow}>
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Nome completo</label>
                      <input
                        type="text"
                        value={editData.nome}
                        onChange={(e) => setEditData({...editData, nome: e.target.value})}
                        style={styles.formInput}
                      />
                    </div>
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Telefone</label>
                      <input
                        type="tel"
                        value={editData.telefone}
                        onChange={(e) => setEditData({...editData, telefone: e.target.value})}
                        style={styles.formInput}
                      />
                    </div>
                  </div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Universidade</label>
                    <input
                      type="text"
                      value={editData.universidade}
                      onChange={(e) => setEditData({...editData, universidade: e.target.value})}
                      style={styles.formInput}
                    />
                  </div>
                  <div style={styles.formRow}>
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Matrícula</label>
                      <input
                        type="text"
                        value={editData.matricula}
                        onChange={(e) => setEditData({...editData, matricula: e.target.value})}
                        style={styles.formInput}
                      />
                    </div>
                  </div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Biografia</label>
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      style={styles.formTextarea}
                      rows={3}
                      placeholder="Conte um pouco sobre você..."
                    />
                  </div>
                  <div style={styles.editActions}>
                    <button onClick={handleSave} style={styles.saveButton} disabled={isLoading}>
                      {isLoading ? 'Salvando...' : (
                        <>
                          <FiSave size={16} />
                          Salvar
                        </>
                      )}
                    </button>
                    <button onClick={handleCancel} style={styles.cancelButton}>
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs de Navegação */}
          <div style={styles.tabsContainer}>
            <button
              onClick={() => setActiveTab('dados')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'dados' ? styles.tabButtonActive : {})
              }}
            >
              <FiUser size={18} />
              Dados Pessoais
            </button>
            <button
              onClick={() => setActiveTab('historico')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'historico' ? styles.tabButtonActive : {})
              }}
            >
              <FiCalendar size={18} />
              Histórico de Caronas
            </button>
            <button
              onClick={() => setActiveTab('avaliacoes')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'avaliacoes' ? styles.tabButtonActive : {})
              }}
            >
              <FiStar size={18} />
              Avaliações
            </button>
          </div>

          {/* Conteúdo das Tabs */}
          <div style={styles.tabContent}>
            {/* Tab: Dados Pessoais */}
            {activeTab === 'dados' && !isEditing && (
              <div style={styles.infoGrid}>
                <div style={styles.infoCard}>
                  <div style={styles.infoIcon}>
                    <FiMail />
                  </div>
                  <div style={styles.infoContent}>
                    <label>E-mail</label>
                    <p>{profile.email}</p>
                  </div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoIcon}>
                    <FiBook />
                  </div>
                  <div style={styles.infoContent}>
                    <label>Universidade</label>
                    <p>{profile.universidade}</p>
                  </div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoIcon}>
                    <FiCreditCard />
                  </div>
                  <div style={styles.infoContent}>
                    <label>Matrícula</label>
                    <p>{profile.matricula}</p>
                  </div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoIcon}>
                    <FiLock />
                  </div>
                  <div style={styles.infoContent}>
                    <label>Senha</label>
                    <p>********</p>
                    <button style={styles.changePasswordBtn}>Alterar senha</button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Histórico de Caronas */}
            {activeTab === 'historico' && (
              <div style={styles.historicoContainer}>
                {historico.length === 0 ? (
                  <div style={styles.emptyState}>
                    <FiTruck size={48} style={{ color: '#cbd5e1' }} />
                    <h3>Nenhuma carona encontrada</h3>
                    <p>Você ainda não participou de nenhuma carona</p>
                  </div>
                ) : (
                  <>
                    {historico.map(carona => (
                      <div key={carona.id} style={styles.historicoCard}>
                        <div style={styles.historicoHeader}>
                          <span style={{
                            ...styles.historicoType,
                            background: carona.tipo === 'oferecida' ? '#4361ee10' : '#06d6a010',
                            color: carona.tipo === 'oferecida' ? '#4361ee' : '#06d6a0'
                          }}>
                            {carona.tipo === 'oferecida' ? <FiTruck size={14} /> : <FiUsers size={14} />}
                            {carona.tipo === 'oferecida' ? 'Oferecida' : 'Participante'}
                          </span>
                          <span style={{
                            ...styles.historicoStatus,
                            color: getStatusConfig(carona.status).color
                          }}>
                            {getStatusConfig(carona.status).icon}
                            {getStatusConfig(carona.status).text}
                          </span>
                        </div>
                        
                        <div style={styles.historicoBody}>
                          <div style={styles.historicoRoute}>
                            <div style={styles.routePoint}>
                              <div style={styles.routeDotOrigin}></div>
                              <div>
                                <span style={styles.routeLabel}>Origem</span>
                                <p style={styles.routeText}>{carona.origem}</p>
                              </div>
                            </div>
                            <div style={styles.routeLine}></div>
                            <div style={styles.routePoint}>
                              <div style={styles.routeDotDestiny}></div>
                              <div>
                                <span style={styles.routeLabel}>Destino</span>
                                <p style={styles.routeText}>{carona.destino}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div style={styles.historicoDetails}>
                            <div>
                              <FiCalendar size={14} />
                              <span>{new Date(carona.data).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div>
                              <FiMapPin size={14} />
                              <span>{carona.horario}</span>
                            </div>
                            <div>
                              <span style={{ fontWeight: 600 }}>R$ {carona.preco}</span>
                            </div>
                          </div>
                          
                          {carona.tipo === 'participante' && carona.motorista && (
                            <div style={styles.historicoMotorista}>
                              <FiUser size={14} />
                              <span>Motorista: {carona.motorista}</span>
                            </div>
                          )}
                          
                          {carona.tipo === 'oferecida' && carona.vagas && (
                            <div style={styles.historicoVagas}>
                              <FiUsers size={14} />
                              <span>{carona.vagas} vagas disponíveis</span>
                            </div>
                          )}
                        </div>
                        
                        <button style={styles.historicoButton}>
                          Ver detalhes
                        </button>
                      </div>
                    ))}
                    
                    <button style={styles.verMaisButton}>
                      <FiPlus size={16} />
                      Carregar mais
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Tab: Avaliações */}
            {activeTab === 'avaliacoes' && (
              <div style={styles.avaliacoesContainer}>
                <div style={styles.avaliacoesSummary}>
                  <div style={styles.summaryScore}>
                    <div style={styles.summaryScoreNumber}>{profile.avaliacaoMedia}</div>
                    <div style={styles.summaryStars}>
                      {renderStars(profile.avaliacaoMedia)}
                    </div>
                    <div style={styles.summaryTotal}>
                      {profile.totalAvaliacoes} avaliações
                    </div>
                  </div>
                  <div style={styles.summaryBreakdown}>
                    {[5,4,3,2,1].map(star => {
                      const count = avaliacoes.filter(a => Math.floor(a.nota) === star).length;
                      const percentage = (count / profile.totalAvaliacoes) * 100;
                      return (
                        <div key={star} style={styles.breakdownRow}>
                          <span>{star} estrelas</span>
                          <div style={styles.breakdownBar}>
                            <div style={{ ...styles.breakdownFill, width: `${percentage}%` }}></div>
                          </div>
                          <span>{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div style={styles.avaliacoesList}>
                  {avaliacoes.map(avaliacao => (
                    <div key={avaliacao.id} style={styles.avaliacaoCard}>
                      <div style={styles.avaliacaoHeader}>
                        <div style={styles.avaliacaoAutor}>
                          <div style={styles.avaliacaoAvatar}>
                            {avaliacao.autor.charAt(0)}
                          </div>
                          <div>
                            <strong>{avaliacao.autor}</strong>
                            <div style={styles.avaliacaoStars}>
                              {renderStars(avaliacao.nota)}
                            </div>
                          </div>
                        </div>
                        <span style={styles.avaliacaoData}>
                          {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p style={styles.avaliacaoComentario}>"{avaliacao.comentario}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
