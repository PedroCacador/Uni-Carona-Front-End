import React, { useState } from 'react';
import { FiLock, FiMail, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { styles } from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    // Validação básica
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setErro('Por favor, insira um email válido');
      setLoading(false);
      return;
    }

    try {
      // Simulação de login - aqui você faria a chamada real para o backend
      console.log('Login:', { email, senha });
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Implementar integração real com backend
      // const response = await authService.login({ email, senha });
      
      // Simulação de sucesso
      alert('Login realizado com sucesso!');
      
      // TODO: Redirecionar para página principal
      // navigate('/caronas');
      
    } catch (error: any) {
      setErro(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Botão voltar */}
        <Link to="/" style={styles.backButton}>
          <FiArrowLeft />
        </Link>
        
        <div style={styles.header}>
          <h1 style={styles.titulo}>Seja bem-vindo!</h1>
          <p style={styles.subtitulo}>Faça login para acessar as caronas</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {erro && (
            <div style={styles.erroMessage}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
              {erro}
            </div>
          )}

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <FiMail style={styles.inputIcon} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <FiLock style={styles.inputIcon} />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={styles.input}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                style={styles.togglePassword}
                disabled={loading}
              >
                {mostrarSenha ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} />
              <span>Lembrar-me</span>
            </label>
            <a href="#" style={styles.forgotPassword}>
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            style={{
              ...styles.submitButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>ou</span>
        </div>

        <div style={styles.socialLogin}>
          <button style={styles.socialButton}>
            <i className="fab fa-google" style={{ marginRight: '8px', color: '#4285f4' }}></i>
            Entrar com Google
          </button>
          <button style={styles.socialButton}>
            <i className="fab fa-facebook" style={{ marginRight: '8px', color: '#1877f2' }}></i>
            Entrar com Facebook
          </button>
        </div>

        <div style={styles.signup}>
          <span style={styles.signupText}>
            Não tem uma conta?{' '}
            <a href="/cadastro" style={styles.signupLink}>
              Cadastre-se gratuitamente
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
