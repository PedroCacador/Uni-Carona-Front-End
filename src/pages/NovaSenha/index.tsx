import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '../../services/authApi';
import { FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck } from 'react-icons/fi';
import AuthBrandingPanel from '../../components/AuthBrandingPanel';
import Toast, { type ToastType } from '../../components/Toast';

const NovaSenha: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const state = location.state as { email?: string; codigo?: string } | null;
  const email = state?.email ?? '';
  // O token vem da etapa de verificação (state) ou do link do e-mail (?token=).
  const token = (state?.codigo ?? searchParams.get('token') ?? '').trim();

  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    if (!token) navigate('/recuperar-senha', { replace: true });
  }, [token, navigate]);

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!senha || senha.length < 6) e.senha = 'A senha deve ter no mínimo 6 caracteres';
    if (senha !== confirmarSenha) e.confirmarSenha = 'As senhas não coincidem';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await authApi.redefinirSenha({ token, senha });
      setToast({ message: 'Senha redefinida com sucesso!', type: 'success' });
      setSucesso(true);
    } catch (error: any) {
      setErrors({ form: error.message || 'Erro ao redefinir a senha. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sucesso) return;
    const timer = setTimeout(() => navigate('/login'), 2200);
    return () => clearTimeout(timer);
  }, [sucesso, navigate]);

  const fieldClass = (field: string, hasError?: boolean) =>
    `relative flex items-center border-2 rounded-2xl transition-all duration-200 bg-white ${hasError ? 'border-red-400' : focusedField === field ? 'border-[#0A44B1] shadow-[0_0_0_4px_rgba(10,68,177,0.08)]' : 'border-neutral-200 hover:border-neutral-300'}`;

  const iconClass = (field: string, hasError?: boolean) =>
    `absolute left-4 text-[17px] transition-colors flex-shrink-0 ${hasError ? 'text-red-400' : focusedField === field ? 'text-[#0A44B1]' : 'text-slate-400'}`;

  const inputClass = 'w-full pl-11 pr-12 py-3.5 bg-transparent text-[15px] text-slate-800 placeholder:text-slate-300 outline-none rounded-2xl font-medium disabled:opacity-60';

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AuthBrandingPanel
        badge="Defina uma nova senha"
        title={<>Tudo pronto para<br />voltar à sua próxima <span className="text-[#E8EE3B]">carona</span></>}
        subtitle="Crie uma senha forte e única para manter sua conta sempre protegida."
      />

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <Link to="/verificar-codigo" state={{ email }} className="absolute top-6 left-6 inline-flex items-center gap-2 text-slate-500 hover:text-[#0A44B1] text-[14px] font-medium transition-colors no-underline group" id="nova-senha-back-button">
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

          {sucesso ? (
            <div className="flex flex-col items-center text-center" role="status" aria-live="polite">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6" aria-hidden="true">
                <span className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center text-white">
                  <FiCheck size={24} />
                </span>
              </div>
              <h2 className="text-[2rem] font-extrabold text-slate-900 leading-tight">Senha redefinida!</h2>
              <p className="text-slate-500 text-[15px] mt-2 max-w-[340px]">
                Sua senha foi alterada com sucesso. Redirecionando para o login...
              </p>
              <Link to="/login" className="mt-8 w-full bg-[#0A44B1] text-white py-4 rounded-2xl font-bold text-[16px] transition-all duration-300 hover:bg-[#08368d] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(10,68,177,0.28)] active:scale-95 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(10,68,177,0.22)] no-underline">
                Ir para o login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-[2rem] font-extrabold text-slate-900 leading-tight">Redefinir senha</h2>
                <p className="text-slate-500 text-[15px] mt-1">
                  Escolha uma nova senha para a sua conta.
                </p>
              </div>

              {errors.form && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 mb-6 text-[14px] font-medium" role="alert">
                  <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-[12px] font-bold">!</span>
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                {/* Nova senha */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nova-senha-senha" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Nova senha</label>
                  <div className={fieldClass('senha', !!errors.senha)}>
                    <FiLock className={iconClass('senha', !!errors.senha)} />
                    <input id="nova-senha-senha" type={mostrarSenha ? 'text' : 'password'} autoComplete="new-password" placeholder="Mín. 6 caracteres" value={senha}
                      onChange={(e) => setSenha(e.target.value)} onFocus={() => setFocusedField('senha')} onBlur={() => setFocusedField(null)}
                      disabled={loading} aria-invalid={!!errors.senha} className={inputClass} />
                    <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} disabled={loading} aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'} className="absolute right-4 text-slate-400 hover:text-[#0A44B1] transition-colors p-1">
                      {mostrarSenha ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                    </button>
                  </div>
                  {errors.senha && <span className="text-red-500 text-[12px] font-medium mt-0.5">{errors.senha}</span>}
                </div>

                {/* Confirmar senha */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nova-senha-confirmar" className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">Confirmar nova senha</label>
                  <div className={fieldClass('confirmar', !!errors.confirmarSenha)}>
                    <FiLock className={iconClass('confirmar', !!errors.confirmarSenha)} />
                    <input id="nova-senha-confirmar" type={mostrarConfirmar ? 'text' : 'password'} autoComplete="new-password" placeholder="Repita a nova senha" value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)} onFocus={() => setFocusedField('confirmar')} onBlur={() => setFocusedField(null)}
                      disabled={loading} aria-invalid={!!errors.confirmarSenha} className={inputClass} />
                    <button type="button" onClick={() => setMostrarConfirmar(!mostrarConfirmar)} disabled={loading} aria-label={mostrarConfirmar ? 'Ocultar senha' : 'Mostrar senha'} className="absolute right-4 text-slate-400 hover:text-[#0A44B1] transition-colors p-1">
                      {mostrarConfirmar ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                    </button>
                  </div>
                  {errors.confirmarSenha && <span className="text-red-500 text-[12px] font-medium mt-0.5">{errors.confirmarSenha}</span>}
                </div>

                <button id="nova-senha-submit" type="submit" disabled={loading}
                  className="mt-2 w-full bg-[#0A44B1] text-white py-4 rounded-2xl font-bold text-[16px] transition-all duration-300 hover:bg-[#08368d] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(10,68,177,0.28)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(10,68,177,0.22)]">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Redefinindo...
                    </>
                  ) : 'Redefinir senha'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NovaSenha;
