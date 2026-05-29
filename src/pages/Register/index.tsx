import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../../services/authApi';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiBook, FiHash } from 'react-icons/fi';

type TipoConta = 'passageiro' | 'motorista';

const Cadastro: React.FC = () => {
  const [tipo, setTipo] = useState<TipoConta>('passageiro');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [universidade, setUniversidade] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [termos, setTermos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!nome.trim() || nome.trim().length < 3) e.nome = 'Nome deve ter pelo menos 3 caracteres';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido';
    if (!universidade.trim()) e.universidade = 'Universidade é obrigatória';
    if (!senha || senha.length < 6) e.senha = 'Senha deve ter no mínimo 6 caracteres';
    if (senha !== confirmarSenha) e.confirmarSenha = 'As senhas não coincidem';
    if (!termos) e.termos = 'Aceite os termos para continuar';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      // Mocking missing backend fields (CPF, WhatsApp, DataNascimento)
      const dataToSend = {
        nome,
        email,
        senha,
        curso: universidade || 'Não informado',
        cpf: Math.random().toString().substring(2, 13), // mock unique CPF
        whatsapp: '32999999999',
        dataNascimento: new Date('2000-01-01').toISOString(),
      };

      await authApi.register(dataToSend);
      
      // Auto-login
      const loginRes = await authApi.login({ email, senha });
      localStorage.setItem('token', loginRes.token);
      localStorage.setItem('userEmail', email);
      if (loginRes.usuario) {
        localStorage.setItem('user', JSON.stringify(loginRes.usuario));
      }
      
      alert('Cadastro realizado com sucesso!');
      window.location.href = '/caronas';
    } catch (error: any) {
      alert(error.message || 'Erro ao realizar cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass = (field: string, hasError?: boolean) =>
    `relative flex items-center border-2 rounded-2xl transition-all duration-200 bg-white ${hasError ? 'border-red-400' : focusedField === field ? 'border-[#0A44B1] shadow-[0_0_0_4px_rgba(10,68,177,0.08)]' : 'border-neutral-200 hover:border-neutral-300'}`;

  const iconClass = (field: string, hasError?: boolean) =>
    `absolute left-4 text-[17px] transition-colors flex-shrink-0 ${hasError ? 'text-red-400' : focusedField === field ? 'text-[#0A44B1]' : 'text-slate-400'}`;

  const inputClass = 'w-full pl-11 pr-4 py-3.5 bg-transparent text-[15px] text-slate-800 placeholder:text-slate-300 outline-none rounded-2xl font-medium disabled:opacity-60';

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#0A44B1] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-40px] w-[240px] h-[240px] rounded-full bg-[#E8EE3B]/10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <Link to="/" className="flex items-center gap-1 no-underline w-fit group">
          <span className="text-2xl font-extrabold text-white tracking-tight group-hover:scale-[1.02] transition-transform">UniCarona</span>
          <div className="w-2 h-2 rounded-full bg-[#E8EE3B] ml-0.5 mt-1 animate-pulse" />
        </Link>

        <div className="flex flex-col gap-6">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#E8EE3B]/20 border border-[#E8EE3B]/40 text-[#E8EE3B] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Crie sua conta
            </span>
            <h1 className="text-[2.4rem] font-extrabold text-white leading-[1.1] mt-4">
              Junte-se à maior<br />
              comunidade de<br />
              <span className="text-[#E8EE3B]">caronas uni</span>
            </h1>
            <p className="text-white/60 text-[0.95rem] mt-4 leading-relaxed max-w-[300px]">
              Grátis para estudantes. Sem taxas, sem complicações. Comece agora.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-4 mt-2">
            {['Crie sua conta em 2 minutos', 'Busque caronas na sua rota', 'Viaje com segurança'].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#E8EE3B] flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-900 text-[12px] font-extrabold">{i + 1}</span>
                </div>
                <span className="text-white/75 text-[14px] font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-[13px]">© {new Date().getFullYear()} UniCarona · Grátis para estudantes</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 py-10 overflow-y-auto relative">
        <Link to="/" className="self-start mb-6 inline-flex items-center gap-2 text-slate-500 hover:text-[#0A44B1] text-[14px] font-medium transition-colors no-underline group" id="register-back-button">
          <span className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center group-hover:border-[#0A44B1]/30 transition-colors shadow-sm">
            <FiArrowLeft size={15} />
          </span>
          Voltar
        </Link>

        <div className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:hidden flex items-center gap-1 mb-6 justify-center">
            <span className="text-2xl font-extrabold text-[#0A44B1] tracking-tight">UniCarona</span>
            <div className="w-2 h-2 rounded-full bg-[#E8EE3B] ml-0.5 mt-1 animate-pulse" />
          </div>

          <div className="mb-7">
            <h2 className="text-[1.9rem] font-extrabold text-slate-900 leading-tight">Criar conta grátis</h2>
            <p className="text-slate-500 text-[15px] mt-1">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-[#0A44B1] font-semibold hover:underline no-underline">Faça login</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Account type toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Tipo de conta</label>
              <div className="grid grid-cols-2 gap-3">
                {(['passageiro', 'motorista'] as TipoConta[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipo(t)}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 font-semibold text-[15px] transition-all duration-200 ${tipo === t ? 'border-[#0A44B1] bg-[#0A44B1]/5 text-[#0A44B1]' : 'border-neutral-200 text-slate-500 hover:border-neutral-300 bg-white'}`}
                    id={`register-tipo-${t}`}
                  >
                    {t === 'passageiro' ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1h8l2-1zM17 16V9l-3-3h-1" /></svg>
                    )}
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Nome */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-nome" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Nome completo</label>
              <div className={fieldClass('nome', !!errors.nome)}>
                <FiUser className={iconClass('nome', !!errors.nome)} />
                <input id="register-nome" type="text" placeholder="Seu nome completo" value={nome}
                  onChange={(e) => setNome(e.target.value)} onFocus={() => setFocusedField('nome')} onBlur={() => setFocusedField(null)}
                  disabled={isLoading} className={inputClass} />
              </div>
              {errors.nome && <span className="text-red-500 text-[12px] font-medium mt-0.5">{errors.nome}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-email" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">E-mail</label>
              <div className={fieldClass('email', !!errors.email)}>
                <FiMail className={iconClass('email', !!errors.email)} />
                <input id="register-email" type="email" placeholder="seu@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                  disabled={isLoading} className={inputClass} />
              </div>
              {errors.email && <span className="text-red-500 text-[12px] font-medium mt-0.5">{errors.email}</span>}
            </div>

            {/* Universidade + Matrícula lado a lado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="register-universidade" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Universidade</label>
                <div className={fieldClass('universidade', !!errors.universidade)}>
                  <FiBook className={iconClass('universidade', !!errors.universidade)} />
                  <input id="register-universidade" type="text" placeholder="Ex: USP, UNICAMP..." value={universidade}
                    onChange={(e) => setUniversidade(e.target.value)} onFocus={() => setFocusedField('universidade')} onBlur={() => setFocusedField(null)}
                    disabled={isLoading} className={inputClass} />
                </div>
                {errors.universidade && <span className="text-red-500 text-[12px] font-medium mt-0.5">{errors.universidade}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="register-matricula" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">
                  Matrícula <span className="text-slate-400 normal-case font-normal">(opcional)</span>
                </label>
                <div className={fieldClass('matricula')}>
                  <FiHash className={iconClass('matricula')} />
                  <input id="register-matricula" type="text" placeholder="Nº de matrícula" value={matricula}
                    onChange={(e) => setMatricula(e.target.value)} onFocus={() => setFocusedField('matricula')} onBlur={() => setFocusedField(null)}
                    disabled={isLoading} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Senha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="register-senha" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Senha</label>
                <div className={fieldClass('senha', !!errors.senha)}>
                  <FiLock className={iconClass('senha', !!errors.senha)} />
                  <input id="register-senha" type={mostrarSenha ? 'text' : 'password'} placeholder="Mín. 6 caracteres" value={senha}
                    onChange={(e) => setSenha(e.target.value)} onFocus={() => setFocusedField('senha')} onBlur={() => setFocusedField(null)}
                    disabled={isLoading} className={inputClass + ' pr-12'} />
                  <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="absolute right-4 text-slate-400 hover:text-[#0A44B1] transition-colors p-1">
                    {mostrarSenha ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                </div>
                {errors.senha && <span className="text-red-500 text-[12px] font-medium mt-0.5">{errors.senha}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="register-confirmar" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Confirmar senha</label>
                <div className={fieldClass('confirmar', !!errors.confirmarSenha)}>
                  <FiLock className={iconClass('confirmar', !!errors.confirmarSenha)} />
                  <input id="register-confirmar" type={mostrarConfirmar ? 'text' : 'password'} placeholder="Repita a senha" value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)} onFocus={() => setFocusedField('confirmar')} onBlur={() => setFocusedField(null)}
                    disabled={isLoading} className={inputClass + ' pr-12'} />
                  <button type="button" onClick={() => setMostrarConfirmar(!mostrarConfirmar)} className="absolute right-4 text-slate-400 hover:text-[#0A44B1] transition-colors p-1">
                    {mostrarConfirmar ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                </div>
                {errors.confirmarSenha && <span className="text-red-500 text-[12px] font-medium mt-0.5">{errors.confirmarSenha}</span>}
              </div>
            </div>

            {/* Termos */}
            <label className="flex items-start gap-3 cursor-pointer select-none group" htmlFor="register-termos">
              <div className="relative mt-0.5">
                <input type="checkbox" id="register-termos" className="sr-only peer" checked={termos} onChange={(e) => setTermos(e.target.checked)} />
                <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${termos ? 'border-[#0A44B1] bg-[#0A44B1]' : errors.termos ? 'border-red-400' : 'border-neutral-300'}`}>
                  {termos && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
              </div>
              <span className="text-[14px] text-slate-500 leading-snug">
                Li e aceito os{' '}
                <a href="#" className="text-[#0A44B1] font-semibold hover:underline">Termos de Uso</a>{' '}
                e a{' '}
                <a href="#" className="text-[#0A44B1] font-semibold hover:underline">Política de Privacidade</a>
              </span>
            </label>
            {errors.termos && <span className="text-red-500 text-[12px] font-medium -mt-2">{errors.termos}</span>}

            <button id="register-submit" type="submit" disabled={isLoading}
              className="mt-1 w-full bg-[#0A44B1] text-white py-4 rounded-2xl font-bold text-[16px] transition-all duration-300 hover:bg-[#08368d] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(10,68,177,0.28)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(10,68,177,0.22)]">
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Cadastrando...
                </>
              ) : 'Criar conta grátis'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;