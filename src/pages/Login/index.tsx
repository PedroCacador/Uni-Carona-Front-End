import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../services/authApi';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiMapPin, FiUsers, FiShield } from 'react-icons/fi';

const highlights = [
  { icon: FiMapPin, text: '+500 caronas realizadas' },
  { icon: FiUsers, text: '20+ universidades conectadas' },
  { icon: FiShield, text: 'Motoristas 100% verificados' },
];

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    if (!email || !senha) { setErro('Por favor, preencha todos os campos.'); return; }
    if (!email.includes('@')) { setErro('Por favor, insira um e-mail válido.'); return; }
    setLoading(true);
    try {
      const response = await authApi.login({ email, senha });
      localStorage.setItem('token', response.token);
      localStorage.setItem('userEmail', email);
      if (response.usuario) {
        localStorage.setItem('user', JSON.stringify(response.usuario));
      }
      alert('Login realizado com sucesso!');
      window.location.href = '/caronas';
    } catch (error: any) {
      setErro(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field: string) =>
    `relative flex items-center border-2 rounded-2xl transition-all duration-200 bg-white ${focusedField === field ? 'border-[#0A44B1] shadow-[0_0_0_4px_rgba(10,68,177,0.08)]' : 'border-neutral-200 hover:border-neutral-300'}`;

  const iconClass = (field: string) =>
    `absolute left-4 text-[18px] transition-colors ${focusedField === field ? 'text-[#0A44B1]' : 'text-slate-400'}`;

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[48%] bg-[#0A44B1] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-80px] w-[380px] h-[380px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full bg-[#E8EE3B]/10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <Link to="/" className="flex items-center gap-1 no-underline w-fit group">
          <span className="text-2xl font-extrabold text-white tracking-tight group-hover:scale-[1.02] transition-transform">UniCarona</span>
          <div className="w-2 h-2 rounded-full bg-[#E8EE3B] ml-0.5 mt-1 animate-pulse" />
        </Link>

        <div className="flex flex-col gap-8">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 text-[#E8EE3B] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Bem-vindo de volta
            </span>
            <h1 className="text-[2.8rem] font-extrabold text-white leading-[1.1] mt-4">
              Sua próxima<br />
              <span className="text-[#E8EE3B]">carona</span> te espera
            </h1>
            <p className="text-white/60 text-[1rem] mt-4 leading-relaxed max-w-[340px]">
              Acesse sua conta e encontre a melhor carona universitária para o seu dia.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {highlights.map((h) => (
              <div key={h.text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <h.icon className="text-[#E8EE3B] text-[16px]" />
                </div>
                <span className="text-white/75 text-[14px] font-medium">{h.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-[13px]">© {new Date().getFullYear()} UniCarona</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <Link to="/" className="absolute top-6 left-6 inline-flex items-center gap-2 text-slate-500 hover:text-[#0A44B1] text-[14px] font-medium transition-colors no-underline group" id="login-back-button">
          <span className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center group-hover:border-[#0A44B1]/30 transition-colors shadow-sm">
            <FiArrowLeft size={15} />
          </span>
          Voltar
        </Link>

        <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:hidden flex items-center gap-1 mb-8 justify-center">
            <span className="text-2xl font-extrabold text-[#0A44B1] tracking-tight">UniCarona</span>
            <div className="w-2 h-2 rounded-full bg-[#E8EE3B] ml-0.5 mt-1 animate-pulse" />
          </div>

          <div className="mb-8">
            <h2 className="text-[2rem] font-extrabold text-slate-900 leading-tight">Entrar na conta</h2>
            <p className="text-slate-500 text-[15px] mt-1">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="text-[#0A44B1] font-semibold hover:underline no-underline">Cadastre-se grátis</Link>
            </p>
          </div>

          {erro && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 mb-6 text-[14px] font-medium" role="alert">
              <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-[12px] font-bold">!</span>
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">E-mail</label>
              <div className={fieldClass('email')}>
                <FiMail className={iconClass('email')} />
                <input id="login-email" type="email" autoComplete="email" placeholder="seu@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                  disabled={loading} className="w-full pl-11 pr-4 py-4 bg-transparent text-[15px] text-slate-800 placeholder:text-slate-300 outline-none rounded-2xl font-medium disabled:opacity-60" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-senha" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Senha</label>
                <a href="#" className="text-[13px] text-[#0A44B1] hover:underline font-medium">Esqueceu a senha?</a>
              </div>
              <div className={fieldClass('senha')}>
                <FiLock className={iconClass('senha')} />
                <input id="login-senha" type={mostrarSenha ? 'text' : 'password'} autoComplete="current-password" placeholder="Sua senha" value={senha}
                  onChange={(e) => setSenha(e.target.value)} onFocus={() => setFocusedField('senha')} onBlur={() => setFocusedField(null)}
                  disabled={loading} className="w-full pl-11 pr-12 py-4 bg-transparent text-[15px] text-slate-800 placeholder:text-slate-300 outline-none rounded-2xl font-medium disabled:opacity-60" />
                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} disabled={loading} aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'} className="absolute right-4 text-slate-400 hover:text-[#0A44B1] transition-colors p-1">
                  {mostrarSenha ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button id="login-submit" type="submit" disabled={loading}
              className="mt-2 w-full bg-[#0A44B1] text-white py-4 rounded-2xl font-bold text-[16px] transition-all duration-300 hover:bg-[#08368d] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(10,68,177,0.28)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(10,68,177,0.22)]">
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Entrando...
                </>
              ) : 'Entrar'}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-[13px] text-slate-400 font-medium">ou continue com</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button id="login-google" type="button" className="flex items-center justify-center gap-2.5 border-2 border-neutral-200 rounded-2xl py-3.5 text-[14px] font-semibold text-slate-600 hover:border-[#0A44B1]/30 hover:bg-slate-50 transition-all duration-200 bg-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google
            </button>
            <button id="login-facebook" type="button" className="flex items-center justify-center gap-2.5 border-2 border-neutral-200 rounded-2xl py-3.5 text-[14px] font-semibold text-slate-600 hover:border-[#0A44B1]/30 hover:bg-slate-50 transition-all duration-200 bg-white">
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
