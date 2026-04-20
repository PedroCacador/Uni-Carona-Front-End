export const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    padding: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '2.5rem',
    textAlign: 'center' as const,
  },
  titulo: {
    fontSize: '2.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #1e293b, #2563eb)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    marginBottom: '0.75rem',
    lineHeight: '1.2',
  },
  subtitulo: {
    fontSize: '1.125rem',
    color: '#64748b',
    fontWeight: 500,
  },
  filtros: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2.5rem',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    padding: '1.5rem',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
  },
  filtroInput: {
    flex: 1,
    minWidth: '200px',
    padding: '0.875rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: '#fafbfc',
    ':focus': {
      borderColor: '#2563eb',
      background: 'white',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '2rem',
  },
  loading: {
    textAlign: 'center' as const,
    padding: '4rem',
    fontSize: '1.1rem',
    color: '#64748b',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '4rem',
    background: 'white',
    borderRadius: '16px',
    color: '#64748b',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  emptyIcon: {
    fontSize: '4.5rem',
    marginBottom: '1.5rem',
    color: '#cbd5e1',
  },
  '@media (max-width: 1024px)': {
    grid: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem',
    },
  },
  '@media (max-width: 768px)': {
    wrapper: {
      padding: '1rem',
    },
    header: {
      marginBottom: '2rem',
    },
    titulo: {
      fontSize: '2rem',
    },
    subtitulo: {
      fontSize: '1rem',
    },
    filtros: {
      flexDirection: 'column',
      padding: '1rem',
      gap: '0.75rem',
    },
    filtroInput: {
      width: '100%',
      minWidth: 'unset',
    },
    grid: {
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
    },
    loading: {
      padding: '3rem',
    },
    emptyState: {
      padding: '3rem',
    },
  },
  '@media (max-width: 480px)': {
    wrapper: {
      padding: '0.75rem',
    },
    titulo: {
      fontSize: '1.75rem',
    },
    filtros: {
      padding: '0.75rem',
    },
    filtroInput: {
      padding: '0.75rem',
    },
  },
};