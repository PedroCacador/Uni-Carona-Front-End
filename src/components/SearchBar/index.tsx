import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from 'react-icons/fi';

export const SearchBar: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="w-full px-4 mb-12">
      <div 
        className="max-w-[1100px] mx-auto bg-white/95 backdrop-blur-sm rounded-[32px] shadow-premium border border-neutral-200/60 p-2 flex flex-col md:flex-row items-stretch md:items-center transition-all duration-500 animate-in fade-in slide-in-from-bottom-6 group/container"
      >
        {/* Origem */}
        <div 
          className={`relative flex-[1.2] px-6 py-3 md:py-4 flex items-center gap-4 cursor-pointer group transition-all duration-300 rounded-[24px] md:rounded-none ${focusedField === 'origem' ? 'bg-white shadow-glow' : 'hover:bg-neutral-50/80'}`}
          onClick={() => document.getElementById('input-origem')?.focus()}
        >
          <FiMapPin className={`text-xl transition-colors duration-300 ${focusedField === 'origem' ? 'text-primary' : 'text-neutral-400 group-hover:text-primary'}`} />
          <div className="flex flex-col flex-1">
            <label className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${focusedField === 'origem' ? 'text-primary' : 'text-neutral-400 group-hover:text-primary/70'}`}>
              Origem
            </label>
            <input 
              id="input-origem"
              type="text" 
              placeholder="De onde você sai?" 
              className="bg-transparent border-none outline-none text-[15px] font-medium text-neutral-800 placeholder:text-neutral-300 placeholder:font-normal w-full"
              onFocus={() => setFocusedField('origem')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-neutral-200/60" />

        {/* Destino */}
        <div 
          className={`relative flex-[1.2] px-6 py-3 md:py-4 flex items-center gap-4 cursor-pointer group transition-all duration-300 rounded-[24px] md:rounded-none ${focusedField === 'destino' ? 'bg-white shadow-glow' : 'hover:bg-neutral-50/80'}`}
          onClick={() => document.getElementById('input-destino')?.focus()}
        >
          <FiMapPin className={`text-xl transition-colors duration-300 ${focusedField === 'destino' ? 'text-primary' : 'text-neutral-400 group-hover:text-primary'}`} />
          <div className="flex flex-col flex-1">
            <label className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${focusedField === 'destino' ? 'text-primary' : 'text-neutral-400 group-hover:text-primary/70'}`}>
              Destino
            </label>
            <input 
              id="input-destino"
              type="text" 
              placeholder="Para onde você vai?" 
              className="bg-transparent border-none outline-none text-[15px] font-medium text-neutral-800 placeholder:text-neutral-300 placeholder:font-normal w-full"
              onFocus={() => setFocusedField('destino')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-neutral-200/60" />

        {/* Data */}
        <div 
          className={`relative flex-1 px-6 py-3 md:py-4 flex items-center gap-4 cursor-pointer group transition-all duration-300 rounded-[24px] md:rounded-none ${focusedField === 'data' ? 'bg-white shadow-glow' : 'hover:bg-neutral-50/80'}`}
          onClick={() => document.getElementById('input-data')?.focus()}
        >
          <FiCalendar className={`text-xl transition-colors duration-300 ${focusedField === 'data' ? 'text-primary' : 'text-neutral-400 group-hover:text-primary'}`} />
          <div className="flex flex-col flex-1">
            <label className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${focusedField === 'data' ? 'text-primary' : 'text-neutral-400 group-hover:text-primary/70'}`}>
              Data
            </label>
            <input 
              id="input-data"
              type="text" 
              placeholder="Quando?" 
              className="bg-transparent border-none outline-none text-[15px] font-medium text-neutral-800 placeholder:text-neutral-300 placeholder:font-normal w-full"
              onFocus={() => setFocusedField('data')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-neutral-200/60" />

        {/* Vagas */}
        <div 
          className={`relative flex-1 px-6 py-3 md:py-4 flex items-center gap-4 cursor-pointer group transition-all duration-300 rounded-[24px] md:rounded-none ${focusedField === 'vagas' ? 'bg-white shadow-glow' : 'hover:bg-neutral-50/80'}`}
          onClick={() => document.getElementById('input-vagas')?.focus()}
        >
          <FiUsers className={`text-xl transition-colors duration-300 ${focusedField === 'vagas' ? 'text-primary' : 'text-neutral-400 group-hover:text-primary'}`} />
          <div className="flex flex-col flex-1">
            <label className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${focusedField === 'vagas' ? 'text-primary' : 'text-neutral-400 group-hover:text-primary/70'}`}>
              Vagas
            </label>
            <input 
              id="input-vagas"
              type="number" 
              min="1"
              placeholder="Quantas?" 
              className="bg-transparent border-none outline-none text-[15px] font-medium text-neutral-800 placeholder:text-neutral-300 placeholder:font-normal w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onFocus={() => setFocusedField('vagas')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        {/* Botão Procurar */}
        <Link to="/caronas" className="md:ml-2 mt-4 md:mt-0 flex-shrink-0 no-underline">
          <button 
            type="button" 
            className="w-full md:w-auto min-w-[160px] bg-primary text-white rounded-[22px] px-8 py-5 md:py-4 flex items-center justify-center gap-3 font-bold text-[16px] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-button-hover hover:brightness-110 active:scale-95 group shadow-lg shadow-primary/20"
          >
            <FiSearch className="text-xl transition-transform duration-300 group-hover:scale-110" />
            <span>Procurar</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

