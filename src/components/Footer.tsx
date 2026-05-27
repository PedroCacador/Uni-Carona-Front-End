import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiMail, FiArrowUpRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const footerLinks = [
  {
    title: 'Serviços',
    items: [
      { label: 'Buscar Caronas', href: '/caronas' },
      { label: 'Oferecer Carona', href: '/cadastro' },
      { label: 'Rotas Frequentes', href: '#' },
    ],
  },
  {
    title: 'Segurança',
    items: [
      { label: 'Verificação de Estudantes', href: '#' },
      { label: 'Diretrizes da Comunidade', href: '#' },
      { label: 'Central de Ajuda', href: '#' },
    ],
  },
  {
    title: 'Empresa',
    items: [
      { label: 'Sobre nós', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Carreiras', href: '#' },
    ],
  },
];

const socials = [
  { icon: FaWhatsapp, label: 'WhatsApp', href: '#' },
  { icon: FiInstagram, label: 'Instagram', href: '#' },
  { icon: FiMail, label: 'E-mail', href: '#' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0A44B1] rounded-t-[48px] mt-0 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-14">

          {/* Brand column */}
          <div className="flex flex-col gap-5 max-w-[320px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 group no-underline w-fit">
              <span className="text-2xl font-extrabold text-white tracking-tight transition-transform group-hover:scale-[1.02]">
                UniCarona
              </span>
              <div className="w-2 h-2 rounded-full bg-[#E8EE3B] ml-0.5 mt-1 animate-pulse" />
            </Link>
            <p className="text-white/60 text-[14px] leading-relaxed">
              Conectando estudantes para viagens mais seguras, econômicas e sustentáveis. Sua comunidade universitária em movimento.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:bg-[#E8EE3B] hover:text-slate-900 hover:border-[#E8EE3B] hover:scale-110 transition-all duration-300"
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {footerLinks.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h4 className="text-white text-[15px] font-bold tracking-wide">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className="text-white/55 text-[14px] no-underline hover:text-[#E8EE3B] transition-colors duration-200 inline-flex items-center gap-1 group"
                      >
                        {item.label}
                        <FiArrowUpRight
                          size={12}
                          className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-[13px]">
          <span>© {new Date().getFullYear()} UniCarona. Todos os direitos reservados.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white/70 transition-colors no-underline">Privacidade</a>
            <a href="#" className="hover:text-white/70 transition-colors no-underline">Termos de uso</a>
            <a href="#" className="hover:text-white/70 transition-colors no-underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
