import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
} from 'chart.js';
import { initialData } from './mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const THEME = {
    primary: '#2563eb',      
    primaryLight: '#dbeafe',  
    accent: '#1e40af',        
    textMain: '#1f2937',      
    textSecondary: '#6b7280', 
    border: '#e5e7eb',        
    background: '#f3f4f6',    
    cardBg: '#ffffff'         
};

const SalesChart = () => {
  const [data] = useState(initialData);
  const [selectedCategory, setSelectedCategory] = useState(data[0]?.categoria || '');
  const [selectedProduct, setSelectedProduct] = useState(data[0]?.produtos[0]?.produto || '');
  const [selectedBrand, setSelectedBrand] = useState(data[0]?.produtos[0]?.marcas[0]?.marca || '');

  const currentCategory = useMemo(() => data.find(c => c.categoria === selectedCategory), [selectedCategory, data]);
  const productOptions = useMemo(() => currentCategory ? currentCategory.produtos : [], [currentCategory]);
  
  const brandOptions = useMemo(() => {
    const p = productOptions.find(p => p.produto === selectedProduct);
    return p ? p.marcas : [];
  }, [productOptions, selectedProduct]);

  const salesData = useMemo(() => {
    const p = productOptions.find(p => p.produto === selectedProduct);
    const b = p ? p.marcas.find(m => m.marca === selectedBrand) : null;
    return b ? b.vendas : [];
  }, [productOptions, selectedProduct, selectedBrand]);

  useEffect(() => {
    if (productOptions.length > 0) {
        if (!productOptions.find(p => p.produto === selectedProduct)) setSelectedProduct(productOptions[0].produto);
    } else setSelectedProduct('');
  }, [productOptions, selectedProduct]);

  useEffect(() => {
    if (brandOptions.length > 0) {
        if (!brandOptions.find(m => m.marca === selectedBrand)) setSelectedBrand(brandOptions[0].marca);
    } else setSelectedBrand('');
  }, [brandOptions, selectedBrand]);

  const chartData = {
    labels: salesData.map(d => d.mes),
    datasets: [
      {
        label: selectedBrand, 
        data: salesData.map(d => d.valor),
        borderColor: THEME.primary,
        backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(37, 99, 235, 0.2)'); 
            gradient.addColorStop(1, 'rgba(37, 99, 235, 0.0)'); 
            return gradient;
        },
        pointBackgroundColor: '#fff',
        pointBorderColor: THEME.primary,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35, 
        borderWidth: 2.5,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        backgroundColor: THEME.textMain,
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
            label: (context) => `Vendas: ${context.parsed.y} un.`,
            title: (context) => `${context[0].label} - ${selectedBrand}`
        }
      }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: '#f3f4f6', 
                drawBorder: false,
            },
            ticks: {
                color: THEME.textSecondary,
                font: { size: 11 },
                padding: 10
            },
            border: { display: false } 
        },
        x: {
            grid: { display: false }, 
            ticks: {
                color: THEME.textSecondary,
                font: { size: 12 },
                padding: 10
            },
            border: { display: false } 
        }
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.dashboardCard}>
        
        <header style={styles.header}>
            <div>
                <h1 style={styles.title}>Performance de Vendas</h1>
                <p style={styles.subtitle}>
                    Visão geral mensal por categoria e produto
                </p>
            </div>
        </header>

        <div style={styles.separator}></div>

        <div style={styles.toolbar}>
            {['Categoria', 'Produto', 'Marca'].map((label) => {
                const id = label.toLowerCase();
                const value = id === 'categoria' ? selectedCategory : id === 'produto' ? selectedProduct : selectedBrand;
                const options = id === 'categoria' ? data : id === 'produto' ? productOptions : brandOptions;
                const setter = id === 'categoria' ? setSelectedCategory : id === 'produto' ? setSelectedProduct : setSelectedBrand;

                return (
                    <div key={id} style={styles.filterWrapper}>
                        <label htmlFor={id} style={styles.filterLabel}>{label}</label>
                        <div style={styles.selectContainer}>
                            <select
                                id={id}
                                value={value}
                                onChange={(e) => setter(e.target.value)}
                                disabled={options.length === 0}
                                style={styles.selectInput}
                            >
                                {options.map((opt, idx) => {
                                    const val = id === 'categoria' ? opt.categoria : id === 'produto' ? opt.produto : opt.marca;
                                    return <option key={idx} value={val}>{val}</option>;
                                })}
                            </select>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Área Principal do Gráfico */}
        <div style={styles.chartContainer}>
            <div style={styles.chartHeader}>
                <h2 style={styles.chartTitle}>{selectedBrand}</h2>
                <span style={styles.chartSubtitle}>Volume de vendas (Jan - Abr)</span>
            </div>
            
            <div style={styles.canvasWrapper}>
                {salesData.length > 0 ? (
                    <Line data={chartData} options={chartOptions} />
                ) : (
                    <div style={styles.emptyState}>Sem dados disponíveis para a seleção.</div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
    pageBackground: {
        backgroundColor: THEME.background,
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: THEME.textMain,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    dashboardCard: {
        backgroundColor: THEME.cardBg,
        width: '100%',
        maxWidth: '1000px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${THEME.border}`,
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: '24px',
        fontWeight: '700',
        margin: '0 0 4px 0',
        color: THEME.textMain,
        letterSpacing: '-0.025em'
    },
    subtitle: {
        fontSize: '14px',
        color: THEME.textSecondary,
        margin: 0
    },
    statusBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        fontWeight: '500',
        color: '#059669', 
        backgroundColor: '#ecfdf5',
        padding: '4px 10px',
        borderRadius: '9999px'
    },
    statusDot: {
        width: '6px',
        height: '6px',
        backgroundColor: '#059669',
        borderRadius: '50%'
    },
    separator: {
        height: '1px',
        backgroundColor: THEME.border,
        width: '100%'
    },
    toolbar: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        paddingBottom: '10px'
    },
    filterWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flex: '1 1 200px' 
    },
    filterLabel: {
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        color: THEME.textSecondary,
        letterSpacing: '0.05em'
    },
    selectContainer: {
        position: 'relative'
    },
    selectInput: {
        width: '100%',
        padding: '10px 12px',
        fontSize: '14px',
        color: THEME.textMain,
        backgroundColor: '#fff',
        border: `1px solid ${THEME.border}`,
        borderRadius: '6px',
        outline: 'none',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    chartContainer: {
        marginTop: '20px',
        backgroundColor: '#ffffff',
        border: `1px solid ${THEME.border}`,
        borderRadius: '8px',
        padding: '24px',
    },
    chartHeader: {
        marginBottom: '20px'
    },
    chartTitle: {
        fontSize: '18px',
        fontWeight: '600',
        margin: '0 0 2px 0',
        color: THEME.textMain
    },
    chartSubtitle: {
        fontSize: '13px',
        color: THEME.textSecondary
    },
    canvasWrapper: {
        position: 'relative',
        height: '350px',
        width: '100%'
    },
    emptyState: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: THEME.textSecondary
    }
};

export default SalesChart;