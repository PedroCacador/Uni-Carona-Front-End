import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../services/authApi';
import { FiArrowLeft, FiHash } from 'react-icons/fi';
import AuthBrandingPanel from '../../components/AuthBrandingPanel';
import Toast, { type ToastType } from '../../components/Toast';

const RESEND_SECONDS = 60;
const MAX_CODE_LENGTH = 80;

const VerificarCodigo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { email?: string; flash?: boolean } | null;
  const email = state?.email ?? '';

  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState('');
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(RESEND_SECONDS);
  const [reenviando, setReenviando] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(
    state?.flash ? { message: 'Código de verificação enviado para seu e-mail', type: 'success' } : null
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!email) {
      navigate('/recuperar-senha', { replace: true });
      return;
    }
    inputRef.current?.focus();
  }, [email, navigate]);

  useEffect(() => {
    if (counter <= 0) return;
    const timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErro('');
    const code = codigo.trim();
    if (!code) {
      setErro('Informe o código enviado para o seu e-mail.');
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    try {
      // Validação REAL no backend: só avança se o código existir,
      // pertencer ao e-mail e não estiver expirado.
      await authApi.validarCodigo({ email, codigo: code });
      navigate('/nova-senha', { state: { email, codigo: code } });
    } catch (error: any) {
      setErro(error.message || 'Código inválido ou expirado.');
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleReenviar = async () => {
    if (counter > 0 || reenviando || !email) return;
    setReenviando(true);
    try {
      await authApi.recuperarSenha({ email });
      setCounter(RESEND_SECONDS);
      setToast({ message: 'Enviamos um novo código para seu e-mail', type: 'success' });
    } catch (error: any) {
      setToast({ message: error.message || 'Erro ao reenviar o código.', type: 'error' });
    } finally {
      setReenviando(false);
    }
  };

  const fieldClass = `relative flex items-center border-2 rounded-2xl transition-all duration-200 bg-white ${erro ? 'border-red-400' : focused ? 'border-[#0A44B1] shadow-[0_0_0_4px_rgba(10,68,177,0.08)]' : 'border-neutral-200 hover:border-neutral-300'}`;
  const iconClass = `absolute left-4 text-[18px] transition-colors ${erro ? 'text-red-400' : focused ? 'text-[#0A44B1]' : 'text-slate-400'}`;

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AuthBrandingPanel
        badge="Verificação"
        title={<>Tudo pronto para<br />voltar à sua próxima <span className="text-[#E8EE3B]">carona</span></>}
        subtitle="Confirme que é você inserindo o código de segurança enviado para o seu e-mail."
      />

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <Link to="/recuperar-senha" className="absolute top-6 left-6 inline-flex items-center gap-2 text-slate-500 hover:text-[#0A44B1] text-[14px] font-medium transition-colors no-underline group" id="verificar-back-button">
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
            <h2 className="text-[2rem] font-extrabold text-slate-900 leading-tight">Verificação</h2>
            <p className="text-slate-500 text-[15px] mt-1">
              Digite o código enviado para
              {email ? <span className="text-slate-700 font-semibold"> {email}</span> : ' seu e-mail'}.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="verificar-codigo" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Código de verificação</label>
              <div className={fieldClass}>
                <FiHash className={iconClass} />
                <input
                  ref={inputRef}
                  id="verificar-codigo"
                  type="text"
                  autoComplete="one-time-code"
                  maxLength={MAX_CODE_LENGTH}
                  placeholder="Cole ou digite o código"
                  value={codigo}
                  onChange={(e) => { setCodigo(e.target.value); if (erro) setErro(''); }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  disabled={loading}
                  aria-invalid={!!erro}
                  aria-describedby={erro ? 'verificar-erro' : undefined}
                  className="w-full pl-11 pr-4 py-4 bg-transparent text-[15px] text-slate-800 placeholder:text-slate-300 outline-none rounded-2xl font-medium tracking-[0.15em] disabled:opacity-60"
                />
              </div>
              {erro && <span id="verificar-erro" className="text-red-500 text-[12px] font-medium mt-0.5">{erro}</span>}
            </div>

            <button id="verificar-submit" type="submit" disabled={loading}
              className="mt-1 w-full bg-[#0A44B1] text-white py-4 rounded-2xl font-bold text-[16px] transition-all duration-300 hover:bg-[#08368d] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(10,68,177,0.28)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(10,68,177,0.22)]">
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Verificando...
                </>
              ) : 'Continuar'}
            </button>
          </form>

          <div className="flex items-center justify-center gap-1.5 mt-6 text-[14px]">
            <span className="text-slate-500">Não recebeu?</span>
            {counter > 0 ? (
              <span className="text-slate-400 font-medium" aria-live="polite">Reenviar em {counter}s</span>
            ) : (
              <button id="verificar-reenviar" type="button" onClick={handleReenviar} disabled={reenviando}
                className="text-[#0A44B1] font-semibold hover:underline disabled:opacity-60 disabled:cursor-not-allowed">
                {reenviando ? 'Reenviando...' : 'Reenviar código'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificarCodigo;
