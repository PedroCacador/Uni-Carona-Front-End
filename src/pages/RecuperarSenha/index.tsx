import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../services/authApi';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import AuthBrandingPanel from '../../components/AuthBrandingPanel';

const RecuperarSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    if (!email.trim()) { setErro('Por favor, informe seu e-mail.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErro('Por favor, insira um e-mail válido.'); return; }
    setLoading(true);
    try {
      await authApi.recuperarSenha({ email });
      navigate('/verificar-codigo', { state: { email, flash: true } });
    } catch (error: any) {
      setErro(error.message || 'Erro ao enviar o código. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field: string, hasError?: boolean) =>
    `relative flex items-center border-2 rounded-2xl transition-all duration-200 bg-white ${hasError ? 'border-red-400' : focusedField === field ? 'border-[#0A44B1] shadow-[0_0_0_4px_rgba(10,68,177,0.08)]' : 'border-neutral-200 hover:border-neutral-300'}`;

  const iconClass = (field: string) =>
    `absolute left-4 text-[18px] transition-colors ${focusedField === field ? 'text-[#0A44B1]' : 'text-slate-400'}`;

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex">
      <AuthBrandingPanel
        badge="Recuperação de conta"
        title={<>Tudo pronto para<br />voltar à sua próxima <span className="text-[#E8EE3B]">carona</span></>}
        subtitle="Recupere o acesso à sua conta de forma rápida e segura, sem complicações."
      />

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <Link to="/login" className="absolute top-6 left-6 inline-flex items-center gap-2 text-slate-500 hover:text-[#0A44B1] text-[14px] font-medium transition-colors no-underline group" id="recuperar-back-button">
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
            <h2 className="text-[2rem] font-extrabold text-slate-900 leading-tight">Recuperar senha</h2>
            <p className="text-slate-500 text-[15px] mt-1">
              Informe seu e-mail para receber as instruções de recuperação.
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
              <label htmlFor="recuperar-email" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">E-mail</label>
              <div className={fieldClass('email', !!erro)}>
                <FiMail className={iconClass('email')} />
                <input id="recuperar-email" type="email" autoComplete="email" placeholder="seu@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                  disabled={loading} aria-invalid={!!erro} aria-describedby={erro ? 'recuperar-erro' : undefined}
                  className="w-full pl-11 pr-4 py-4 bg-transparent text-[15px] text-slate-800 placeholder:text-slate-300 outline-none rounded-2xl font-medium disabled:opacity-60" />
              </div>
            </div>

            <button id="recuperar-submit" type="submit" disabled={loading}
              className="mt-2 w-full bg-[#0A44B1] text-white py-4 rounded-2xl font-bold text-[16px] transition-all duration-300 hover:bg-[#08368d] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(10,68,177,0.28)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(10,68,177,0.22)]">
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Enviando...
                </>
              ) : 'Enviar código'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-[14px] mt-6">
            Lembrou a senha?{' '}
            <Link to="/login" className="text-[#0A44B1] font-semibold hover:underline no-underline">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;
