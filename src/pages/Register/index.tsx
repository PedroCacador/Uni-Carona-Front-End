import React, { useState } from 'react';
import { styles } from './styles';

const Cadastro: React.FC = () => {
  const [tipo, setTipo] = useState<'passageiro' | 'motorista'>('passageiro');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [universidade, setUniversidade] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [termos, setTermos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório';
    else if (nome.trim().length < 3) newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';

    if (!email.trim()) newErrors.email = 'E-mail é obrigatório';
    else if (!validateEmail(email)) newErrors.email = 'E-mail inválido';

    if (!universidade.trim()) newErrors.universidade = 'Universidade é obrigatória';

    if (!senha) newErrors.senha = 'Senha é obrigatória';
    else if (senha.length < 6) newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';

    if (senha !== confirmarSenha) newErrors.confirmarSenha = 'As senhas não coincidem';

    if (!termos) newErrors.termos = 'Aceite os termos para continuar';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simula envio para API
    setTimeout(() => {
      console.log('Dados do cadastro:', {
        tipo,
        nome,
        email,
        universidade,
        matricula,
        senha,
      });
      alert('Cadastro realizado com sucesso!');
      setIsLoading(false);
    }, 1500);
  };

  // Estilos inline em React
  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '10px 12px 10px 40px',
    border: `2px solid ${hasError ? '#ef476f' : '#e9ecef'}`,
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s',
    fontFamily: 'inherit',
    outline: 'none',
  });

  const radioOptionStyle = (isActive: boolean): React.CSSProperties => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    border: `2px solid ${isActive ? '#4361ee' : '#e9ecef'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    backgroundColor: isActive ? 'rgba(67, 97, 238, 0.05)' : 'transparent',
  });

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #4361ee, #7209b7)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'transform 0.2s',
    opacity: isLoading ? 0.7 : 1,
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.logo}>UniCarona</h1>
        <p style={styles.subtitle}>Crie sua conta e comece a compartilhar caronas</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tipo de conta</label>
            <div style={styles.radioGroup}>
              <label style={radioOptionStyle(tipo === 'passageiro')}>
                <input
                  type="radio"
                  name="tipo"
                  value="passageiro"
                  checked={tipo === 'passageiro'}
                  onChange={() => setTipo('passageiro')}
                />
                <i className="fas fa-user"></i> Passageiro
              </label>
              <label style={radioOptionStyle(tipo === 'motorista')}>
                <input
                  type="radio"
                  name="tipo"
                  value="motorista"
                  checked={tipo === 'motorista'}
                  onChange={() => setTipo('motorista')}
                />
                <i className="fas fa-car"></i> Motorista
              </label>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Nome completo</label>
            <div style={styles.inputWrapper}>
              <i style={styles.inputIcon} className="fas fa-user"></i>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={inputStyle(!!errors.nome)}
                placeholder="Digite seu nome completo"
              />
            </div>
            {errors.nome && <span style={styles.errorText}>{errors.nome}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>E-mail</label>
            <div style={styles.inputWrapper}>
              <i style={styles.inputIcon} className="fas fa-envelope"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle(!!errors.email)}
                placeholder="seu@email.com"
              />
            </div>
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Universidade</label>
            <div style={styles.inputWrapper}>
              <i style={styles.inputIcon} className="fas fa-university"></i>
              <input
                type="text"
                value={universidade}
                onChange={(e) => setUniversidade(e.target.value)}
                style={inputStyle(!!errors.universidade)}
                placeholder="Nome da sua universidade"
              />
            </div>
            {errors.universidade && <span style={styles.errorText}>{errors.universidade}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Matrícula <span style={styles.optional}>(opcional)</span></label>
            <div style={styles.inputWrapper}>
              <i style={styles.inputIcon} className="fas fa-id-card"></i>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                style={inputStyle(false)}
                placeholder="Número de matrícula"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Senha</label>
            <div style={styles.inputWrapper}>
              <i style={styles.inputIcon} className="fas fa-lock"></i>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={inputStyle(!!errors.senha)}
                placeholder="Crie uma senha forte"
              />
            </div>
            {errors.senha && <span style={styles.errorText}>{errors.senha}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirmar senha</label>
            <div style={styles.inputWrapper}>
              <i style={styles.inputIcon} className="fas fa-check-circle"></i>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                style={inputStyle(!!errors.confirmarSenha)}
                placeholder="Digite a senha novamente"
              />
            </div>
            {errors.confirmarSenha && <span style={styles.errorText}>{errors.confirmarSenha}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxGroup}>
              <input
                type="checkbox"
                checked={termos}
                onChange={(e) => setTermos(e.target.checked)}
                style={styles.checkbox}
              />
              <span style={styles.checkboxLabel}>
                Li e aceito os <a href="#" style={styles.link}>Termos de Uso</a> e a <a href="#" style={styles.link}>Política de Privacidade</a>
              </span>
            </label>
            {errors.termos && <span style={styles.errorText}>{errors.termos}</span>}
          </div>

          <button 
            type="submit" 
            style={buttonStyle}
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <div style={styles.loginRedirect}>
            Já tem uma conta? <a href="#" style={styles.link}>Faça login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;