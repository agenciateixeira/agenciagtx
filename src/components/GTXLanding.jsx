import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, TrendingUp, Target, Users, BarChart3, Zap, CheckCircle, Star, Menu, X, ArrowRight, Phone, Mail, MapPin, Award, Rocket, Shield, ChevronLeft, ChevronRight, Clock, DollarSign, LineChart } from 'lucide-react';

const GTXLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentClient, setCurrentClient] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('Olá! Gostaria de saber mais sobre os serviços da GTX.');
  const neuralCanvasRef = useRef(null);

  // Tracking Functions
  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', { contact_method: 'whatsapp' });
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact', { method: 'whatsapp' });
    }
  };

  const trackConsultoriaClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', { content_name: 'Consultoria Gratuita' });
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', { event_label: 'Consultoria Gratuita' });
    }
  };

  // WhatsApp Modal Functions
  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowWhatsAppModal(false);
      setIsClosingModal(false);
    }, 250);
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    if (showWhatsAppModal) {
      closeModal();
    } else {
      setShowWhatsAppModal(true);
      trackWhatsAppClick();
    }
  };

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/5519990122773?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    closeModal();
  };

  const handleConsultoriaClick = (e) => {
    e.preventDefault();
    setShowWhatsAppModal(true);
    trackConsultoriaClick();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Neural Network Canvas Animation
  useEffect(() => {
    const canvas = neuralCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NODE_COUNT = 55;
    const CONNECTION_DISTANCE = 160;
    const colors = ['#9ACD32', '#7BA428', '#bae648', '#5c7b1e'];

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1,
      depth: Math.random(),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Lightning bolts system
    const lightnings = [];
    const MAX_LIGHTNINGS = 6;

    const spawnLightning = () => {
      if (lightnings.length >= MAX_LIGHTNINGS) return;
      const i = Math.floor(Math.random() * nodes.length);
      let j = Math.floor(Math.random() * nodes.length);
      while (j === i) j = Math.floor(Math.random() * nodes.length);
      lightnings.push({
        from: i,
        to: j,
        life: 1.0,
        decay: 0.025 + Math.random() * 0.025, // estrela cadente: vida ~40-80 frames
        progress: 0, // 0 a 1: cabeça do raio viajando do nó A ao B
      });
    };

    const drawShootingStar = (x1, y1, x2, y2, progress, alpha) => {
      // Apenas desenha a parte já percorrida (trail)
      const tailLength = 0.35;
      const head = progress;
      const tail = Math.max(0, progress - tailLength);
      const hx = x1 + (x2 - x1) * head;
      const hy = y1 + (y2 - y1) * head;
      const tx = x1 + (x2 - x1) * tail;
      const ty = y1 + (y2 - y1) * tail;

      const grad = ctx.createLinearGradient(tx, ty, hx, hy);
      grad.addColorStop(0, `rgba(154, 205, 50, 0)`);
      grad.addColorStop(0.6, `rgba(186, 230, 72, ${alpha * 0.5})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#9ACD32';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Brilho na cabeça
      ctx.beginPath();
      ctx.arc(hx, hy, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
      ctx.fill();
    };

    let frameCount = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // Spawn novas estrelas cadentes
      if (frameCount % 20 === 0 && Math.random() < 0.6) spawnLightning();

      // Update positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw proximity connections (subtle)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(154, 205, 50, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw shooting stars
      for (let k = lightnings.length - 1; k >= 0; k--) {
        const bolt = lightnings[k];
        const a = nodes[bolt.from];
        const b = nodes[bolt.to];

        bolt.progress = Math.min(1, bolt.progress + bolt.decay * 1.8);
        drawShootingStar(a.x, a.y, b.x, b.y, bolt.progress, bolt.life);

        bolt.life -= bolt.decay;
        if (bolt.life <= 0) lightnings.splice(k, 1);
      }

      // Draw nodes
      nodes.forEach(node => {
        const opacity = 0.3 + node.depth * 0.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (0.5 + node.depth * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = node.color + Math.round(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Glow effect for deeper nodes
        if (node.depth > 0.7) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(154, 205, 50, 0.05)`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Auto-rotate clients carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClient((prev) => (prev + 1) % Math.ceil(clients.length / 4));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Tráfego Pago Especializado",
      description: "Estratégias avançadas de Meta Ads e Google Ads focadas em resultados tangíveis para restaurantes e e-commerce. Aumente suas vendas com campanhas otimizadas e segmentadas.",
      features: ["Meta Ads & Instagram", "Google Ads", "Remarketing Avançado"]
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Gestão Completa de Campanhas",
      description: "Otimização contínua com foco em ROI e crescimento escalável. Monitoramento 24/7 das suas campanhas para garantir máxima performance e conversão.",
      features: ["Otimização Diária", "Testes A/B", "Análise de Concorrência"]
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Business Intelligence",
      description: "Relatórios detalhados e dashboards personalizados para tomada de decisão estratégica baseada em dados reais e métricas de performance.",
      features: ["Dashboards Customizados", "Relatórios Semanais", "KPIs em Tempo Real"]
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Transformação Digital",
      description: "Implementação completa de infraestrutura digital para seu negócio. Do e-commerce à automação de processos comerciais e marketing.",
      features: ["E-commerce Setup", "Automações", "Integrações"]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Consultoria Estratégica",
      description: "Análise profunda do seu negócio, time comercial e processos. Identificamos gargalos e oportunidades para acelerar seus resultados.",
      features: ["Diagnóstico Completo", "Plano de Ação", "Mentoria Comercial"]
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Suporte Premium",
      description: "Atendimento personalizado com equipe dedicada. Respondemos rápido e estamos sempre disponíveis para ajustar estratégias conforme necessário.",
      features: ["Suporte Prioritário", "Gerente Dedicado", "WhatsApp Direto"]
    }
  ];

  const testimonials = [
    {
      name: "Leonardo Utida",
      company: "Sneaker Society",
      role: "Fundador",
      text: "Triplicamos nosso faturamento do ecommerce com a estratégia da GTX, saímos de um faturamento de 19 mil reais pra + de 60 mil reais por mês, com o mesmo custo de ads que já usávamos.",
      image: "👟",
      results: {
        before: "R$ 19k/mês",
        after: "R$ 60k/mês",
        growth: "+215%"
      }
    },
    {
      name: "Robert D. & José Mauro",
      company: "Frasco Life",
      role: "Diretores",
      text: "Fizemos uma implementação digital da empresa, levamos o setor industrial para dentro dos canais digitais graças a GTX.",
      image: "🏭",
      results: {
        achievement: "Transformação Digital Completa",
        impact: "Indústria no Digital"
      }
    },
    {
      name: "Juliana M. Galli",
      company: "Jsete Store",
      role: "Fundadora",
      text: "Levamos a nossa loja física para o mundo digital, a GTX nos ajudou a construir nosso ecommerce e a deixar nossa empresa pronta para receber os anúncios online.",
      image: "🛍️",
      results: {
        achievement: "E-commerce do Zero",
        impact: "Presença Digital Completa"
      }
    }
  ];

  // Client logos - empresas do portfólio GTX
  const clients = [
    { name: "FrascoLife", logo: "/images/clients/logofl.png" },
    { name: "Depósito Zona Sul", logo: "/images/clients/LOGODZS.png" },
    { name: "Sneaker Society", logo: "/images/clients/logosneakers.png" },
    { name: "Jsete", logo: "/images/clients/logojsete.png" },
    { name: "Route Cred", logo: "/images/clients/logoroute.png" },
    { name: "FlyPro", logo: "/images/clients/logoflypro.png" },
    { name: "Podologia", logo: "/images/clients/LOGO PODOLOGIA (1).png" }
  ];

  const stats = [
    { 
      number: "200+", 
      label: "Clientes Atendidos",
      icon: <Users className="w-8 h-8" />
    },
    { 
      number: "R$ 5M+", 
      label: "Investimento Gerenciado",
      icon: <DollarSign className="w-8 h-8" />
    },
    { 
      number: "4x%", 
      label: "ROI Médio",
      icon: <TrendingUp className="w-8 h-8" />
    },
    { 
      number: "98%", 
      label: "Taxa de Satisfação",
      icon: <Award className="w-8 h-8" />
    }
  ];

  const differentials = [
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Agilidade",
      description: "Implementação rápida e resultados em até 30 dias"
    },
    {
      icon: <LineChart className="w-10 h-10" />,
      title: "Dados Reais",
      description: "Decisões baseadas em métricas e performance"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Transparência",
      description: "Acesso total aos dashboards e relatórios"
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Expertise",
      description: "Time especializado com cases comprovados"
    }
  ];

  const nextClient = () => {
    setCurrentClient((prev) => (prev + 1) % Math.ceil(clients.length / 4));
  };

  const prevClient = () => {
    setCurrentClient((prev) => (prev - 1 + Math.ceil(clients.length / 4)) % Math.ceil(clients.length / 4));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'}`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Replace with actual image */}
            <div className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="GTX Marketing e Vendas" 
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{display: 'none'}} className="text-2xl font-bold">
                <span className="text-green-500">GTX</span>
                <span className="text-gray-800">.</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-green-500 transition-colors font-medium">Início</a>
              <a href="#sobre" className="text-gray-700 hover:text-green-500 transition-colors font-medium">Quem Somos</a>
              <a href="#servicos" className="text-gray-700 hover:text-green-500 transition-colors font-medium">Serviços</a>
              <a href="#clientes" className="text-gray-700 hover:text-green-500 transition-colors font-medium">Clientes</a>
              <a href="#depoimentos" className="text-gray-700 hover:text-green-500 transition-colors font-medium">Casos de Sucesso</a>
              <a href="#contato" className="text-gray-700 hover:text-green-500 transition-colors font-medium">Contato</a>
              <button onClick={handleWhatsAppClick} className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg font-semibold">
                Entrar em Contato
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
              {isMenuOpen ? <X className="text-gray-800" size={28} /> : <Menu className="text-gray-800" size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-4 bg-white rounded-lg shadow-xl p-6 animate-fadeIn">
              <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-green-500 font-medium py-2">Início</a>
              <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-green-500 font-medium py-2">Quem Somos</a>
              <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-green-500 font-medium py-2">Serviços</a>
              <a href="#clientes" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-green-500 font-medium py-2">Clientes</a>
              <a href="#depoimentos" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-green-500 font-medium py-2">Casos de Sucesso</a>
              <a href="#contato" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-green-500 font-medium py-2">Contato</a>
              <button onClick={(e) => { setIsMenuOpen(false); handleWhatsAppClick(e); }} className="block bg-green-500 text-white px-6 py-3 rounded-full text-center hover:bg-green-600 font-semibold w-full">
                Entrar em Contato
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section - Claro e Refinado */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Neural Network Canvas */}
        <canvas
          ref={neuralCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.7 }}
        />
        {/* Subtle animated background elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-green-500/5 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-400/5 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 inline-block animate-fadeIn">
              <span className="bg-green-50 border border-green-100 text-green-700 px-8 py-3 rounded-full text-sm font-medium">
                Transformação Digital Empresarial • Desde 2017
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.05] text-gray-900 animate-fadeInUp">
              Escale Sua Operação Digital com
              <span className="block mt-3 text-green-500">Inteligência Estratégica</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
              Implementação completa de <strong className="text-gray-900">infraestrutura digital</strong>, <strong className="text-gray-900">gestão de performance</strong> e <strong className="text-gray-900">inteligência de mercado</strong> para empresas que buscam crescimento sustentável e resultados mensuráveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-400 mb-16">
              <button onClick={handleWhatsAppClick} className="group bg-green-500 text-white px-12 py-6 rounded-full text-lg font-semibold hover:bg-green-600 hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3">
                Agendar Reunião Estratégica
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#servicos" className="border-2 border-gray-200 text-gray-700 px-12 py-6 rounded-full text-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all">
                Conhecer Soluções
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 animate-fadeInUp animation-delay-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>ROI Comprovado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Implementação Rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Suporte Dedicado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-lg border border-gray-200 hover:border-green-500 transition-all hover:shadow-lg">
                <div className="text-green-500 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementações Omnichannel Section */}
      <section id="implementacoes" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.implementacoes ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
              <span className="text-green-500 font-medium text-sm uppercase tracking-widest">Especialidade GTX</span>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 mt-3">
                Implementações <span className="text-green-500">Omnichannel</span>
              </h2>
              <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transforme sua operação em uma máquina de vendas multicanal integrada
              </p>
            </div>

            <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${visibleSections.implementacoes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* E-commerce */}
              <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-green-500 transition-all hover:shadow-2xl">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">E-commerce Próprio</h3>
                <p className="text-gray-600 mb-6">
                  Plataformas completas com integração de pagamentos, logística e gestão de estoque
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Shopify, WooCommerce, Nuvemshop</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Integração com ERPs e sistemas</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Checkout otimizado para conversão</span>
                  </li>
                </ul>
              </div>

              {/* Marketplaces */}
              <div className="group bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-200 hover:border-green-500 transition-all hover:shadow-2xl transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketplaces</h3>
                <p className="text-gray-600 mb-6 font-semibold">
                  Implementação e gestão em todas as principais plataformas do mercado
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Mercado Livre & Amazon</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Magalu, Shopee, B2W</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Catálogo + precificação dinâmica</span>
                  </li>
                </ul>
              </div>

              {/* Integração */}
              <div className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-green-500 transition-all hover:shadow-2xl">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrações</h3>
                <p className="text-gray-600 mb-6">
                  Conectamos todos os canais em uma operação única e sincronizada
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Estoque unificado em tempo real</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Pedidos centralizados</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Relatórios consolidados</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <div className="inline-block bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
                <p className="text-lg text-gray-700 mb-4">
                  <strong className="text-gray-900">Do zero ao omnichannel</strong> em menos de 90 dias
                </p>
                <button onClick={handleWhatsAppClick} className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-all">
                  Solicitar Implementação
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 ${visibleSections.sobre ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Quem Somos</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-2">
                  Especialistas em <span className="text-green-500">Performance Digital</span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  A GTX Marketing e Vendas é uma agência especializada em <strong>tráfego pago</strong> e <strong>transformação digital</strong>, com foco em resultados mensuráveis e crescimento escalável para nossos clientes.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Nossa missão é levar empresas para o próximo nível através de estratégias inteligentes de marketing digital, implementação tecnológica e consultoria comercial de alta performance.
                </p>
                <div className="space-y-4">
                  {differentials.map((diff, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-green-500 flex-shrink-0">
                        {diff.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{diff.title}</h3>
                        <p className="text-gray-600">{diff.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`relative transition-all duration-1000 delay-200 ${visibleSections.sobre ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 shadow-2xl">
                  <div className="bg-white rounded-xl p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Rocket className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Nossa Visão</div>
                          <div className="text-gray-600 text-sm">Ser referência em performance digital</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Target className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Nossa Missão</div>
                          <div className="text-gray-600 text-sm">Transformar negócios através do digital</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Award className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Nossos Valores</div>
                          <div className="text-gray-600 text-sm">Resultados, transparência e inovação</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.servicos ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <span className="text-green-500 font-medium text-sm uppercase tracking-wider">O Que Fazemos</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-2">
              Nossos Serviços
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções completas de marketing digital e transformação tecnológica para alavancar seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl border-2 border-gray-200 hover:border-green-500 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 overflow-hidden ${visibleSections.servicos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms`, transitionDuration: '800ms' }}
              >
                {/* Background Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/5 group-hover:to-green-600/5 transition-all duration-500"></div>

                {/* Large Icon Container */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-green-500/30">
                    <div className="scale-150">
                      {service.icon}
                    </div>
                  </div>
                  {/* Decorative corner accent */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6 text-base">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1.5 group-hover:scale-125 transition-transform"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section - Redesigned Premium */}
      <section id="clientes" className="py-32 bg-white relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-200/50 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-24 transition-all duration-1000 ${visibleSections.clientes ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider mb-4 inline-block">Portfólio de Clientes</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Empresas que Crescem <br />
              <span className="text-green-500">Conosco</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Parceiros de diversos segmentos que confiam na GTX para impulsionar suas vendas e presença digital
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Premium Grid Layout - All Logos Visible */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-800 ${visibleSections.clientes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Card with Premium Hover Effect */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 md:p-12 flex items-center justify-center border border-gray-200 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 group-hover:-translate-y-2 min-h-[200px] md:min-h-[240px]">
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/5 group-hover:to-green-600/5 rounded-2xl transition-all duration-500"></div>

                    {/* Logo */}
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="relative z-10 max-w-full h-24 md:h-32 object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div style={{display: 'none'}} className="relative z-10 text-gray-500 font-bold text-center text-lg group-hover:text-green-600">
                      {client.name}
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-500/0 to-green-500/10 group-hover:from-green-500/20 group-hover:to-green-500/30 rounded-bl-full rounded-tr-2xl transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Statement */}
            <div className="mt-20 text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200 rounded-full px-8 py-4 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      7
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      +
                    </div>
                  </div>
                  <div className="h-6 w-px bg-gray-300 mx-2"></div>
                  <span className="text-gray-700 font-semibold">
                    Clientes Ativos
                  </span>
                </div>
                <div className="text-gray-500">|</div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 font-semibold">
                    Resultados Comprovados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.depoimentos ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Casos de Sucesso</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-2">
              Resultados <span className="text-green-500">Comprovados</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Veja o que nossos clientes alcançaram com a GTX
            </p>
          </div>

          <div className={`max-w-5xl mx-auto relative transition-all duration-1000 delay-300 ${visibleSections.depoimentos ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Testimonial Navigation */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-white rounded-full p-4 shadow-xl hover:bg-gray-50 transition-all hover:scale-110 hidden lg:block"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-white rounded-full p-4 shadow-xl hover:bg-gray-50 transition-all hover:scale-110 hidden lg:block"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Active Testimonial */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-2">
                {/* Left Side - Quote */}
                <div className="p-10 md:p-12 flex flex-col justify-center">
                  <div className="text-6xl text-green-500 mb-6 font-serif">"</div>
                  <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
                    {testimonials[currentTestimonial].text}
                  </p>
                  <div className="border-t pt-6">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{testimonials[currentTestimonial].image}</div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                        <div className="text-green-600 font-semibold">{testimonials[currentTestimonial].role}</div>
                        <div className="text-gray-600">{testimonials[currentTestimonial].company}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Results */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-10 md:p-12 text-white flex items-center">
                  <div className="w-full">
                    <h3 className="text-2xl font-bold mb-8">Resultados Alcançados</h3>
                    <div className="space-y-6">
                      {testimonials[currentTestimonial].results.before && (
                        <>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-sm opacity-90 mb-2">Faturamento Anterior</div>
                            <div className="text-3xl font-bold">{testimonials[currentTestimonial].results.before}</div>
                          </div>
                          <div className="text-center">
                            <ArrowRight className="w-8 h-8 mx-auto rotate-90" />
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/50">
                            <div className="text-sm opacity-90 mb-2">Faturamento Atual</div>
                            <div className="text-4xl font-bold">{testimonials[currentTestimonial].results.after}</div>
                            <div className="text-xl font-semibold mt-2">{testimonials[currentTestimonial].results.growth}</div>
                          </div>
                        </>
                      )}
                      {testimonials[currentTestimonial].results.achievement && (
                        <>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-sm opacity-90 mb-2">Conquista</div>
                            <div className="text-2xl font-bold">{testimonials[currentTestimonial].results.achievement}</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-sm opacity-90 mb-2">Impacto</div>
                            <div className="text-2xl font-bold">{testimonials[currentTestimonial].results.impact}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 rounded-full transition-all ${
                    currentTestimonial === index ? 'w-12 bg-green-500' : 'w-3 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center gap-4 mt-8 lg:hidden">
              <button 
                onClick={prevTestimonial}
                className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Clean Card */}
      <section id="cta" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${visibleSections.cta ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Card with Hover Effect */}
            <div className="group relative bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-12 md:p-16 text-center overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl transform translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full filter blur-3xl transform -translate-x-32 translate-y-32"></div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  Pronto para Multiplicar Seus Resultados?
                </h2>
                <p className="text-xl md:text-2xl mb-10 text-white/95 leading-relaxed max-w-3xl mx-auto">
                  Agende agora uma consultoria gratuita e descubra como podemos transformar seu negócio
                </p>
                <button
                  onClick={handleConsultoriaClick}
                  className="inline-flex items-center gap-3 bg-white text-green-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl"
                >
                  <Phone className="w-6 h-6" />
                  Falar com Especialista Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-sm text-white/90 mt-6">⚡ Atendimento imediato via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.contato ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
              <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Entre em Contato</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-2">
                Vamos <span className="text-green-500">Conversar</span>
              </h2>
              <p className="text-xl text-gray-600">
                Estamos prontos para acelerar o crescimento do seu negócio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <button
                onClick={handleWhatsAppClick}
                className={`bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white hover:shadow-2xl transition-all hover:-translate-y-2 group text-left w-full ${visibleSections.contato ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDuration: '800ms', transitionDelay: '200ms' }}
              >
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">WhatsApp</h3>
                <p className="opacity-90 mb-4">Atendimento rápido e direto</p>
                <p className="font-semibold text-lg">+55 19 99012-2773</p>
              </button>

              <div
                className={`bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-200 ${visibleSections.contato ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDuration: '800ms', transitionDelay: '350ms' }}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-green-600">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">E-mail</h3>
                <p className="text-gray-600 mb-4">Envie sua mensagem</p>
                <p className="font-semibold text-lg text-gray-900">contato@agenciagtx.com.br</p>
              </div>

              <div
                className={`bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-200 ${visibleSections.contato ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDuration: '800ms', transitionDelay: '500ms' }}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-green-600">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Localização</h3>
                <p className="text-gray-600 mb-4">Atendemos todo Brasil</p>
                <p className="font-semibold text-lg text-gray-900">100% Online</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Gradient to Footer */}
      <div className="h-32 bg-gradient-to-b from-white via-gray-50 to-gray-100"></div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="md:col-span-2">
              <img
                src="/images/logo.png"
                alt="GTX Marketing e Vendas"
                className="h-12 w-auto mb-6"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{display: 'none'}} className="text-3xl font-bold mb-6">
                <span className="text-green-500">GTX</span> Marketing
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
                Especialistas em tráfego pago e transformação digital. Transformamos visitas em vendas com estratégias inteligentes e resultados mensuráveis.
              </p>
              <div className="flex gap-4">
                <button onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>
                <a href="https://www.instagram.com/agenciagtx" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-pink-600 text-gray-700 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/agenciagtx" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-blue-600 text-gray-700 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-900">Contato</h3>
              <ul className="space-y-4">
                <li>
                  <button onClick={handleWhatsAppClick} className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>+55 19 99012-2773</span>
                  </button>
                </li>
                <li>
                  <a href="mailto:contato@agenciagtx.com.br" className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-3">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span>contato@agenciagtx.com.br</span>
                  </a>
                </li>
                <li className="text-gray-600 flex items-start gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Atendimento 100% Online<br/>Todo o Brasil</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <p className="text-gray-600 text-center md:text-left text-sm">
                GTX Gestão e Implementações Digitais. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-sm">
                CNPJ: 41.768.146/0001-69
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
              <a href="/politica-privacidade" className="hover:text-green-600 transition-colors">
                Política de Privacidade
              </a>
              <span>•</span>
              <a href="/politica-privacidade#termos" className="hover:text-green-600 transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all z-50 hover:scale-110 group"
        aria-label="WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></span>
      </button>

      {/* WhatsApp Chat Widget Modal */}
      {showWhatsAppModal && (
        <>
          {/* Backdrop muito sutil */}
          <div
            className="fixed inset-0 bg-black/10 z-40"
            style={{
              animation: isClosingModal ? 'fadeOut 0.4s ease-out' : 'fadeIn 0.3s ease-out'
            }}
            onClick={closeModal}
          ></div>

          {/* Modal estilo chat widget com efeito Genie suave e rápido */}
          <div
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-96 z-50"
            style={{
              animation: isClosingModal
                ? 'modalSlideDown 0.25s ease-in forwards'
                : 'modalSlideUp 0.3s ease-out forwards'
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="bg-white/20 p-2 rounded-full">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">GTX Marketing</h3>
                      <p className="text-white/90 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                        Online agora
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white/80 hover:text-white transition-colors p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 bg-gray-50">
                <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                  <p className="text-sm text-gray-600 mb-2">
                    Olá! 👋 Como podemos ajudar você hoje?
                  </p>
                </div>

                <textarea
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none text-sm text-gray-700"
                  placeholder="Digite sua mensagem aqui..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  Pressione enviar para continuar no WhatsApp
                </p>
              </div>

              {/* Footer */}
              <div className="p-4 bg-white border-t border-gray-100">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Continuar no WhatsApp
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tracking Scripts Placeholder */}
      <div id="tracking-scripts">
        {/* Meta Pixel, GTM, and GA4 will be loaded via _document.js */}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(12px); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(16px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GTXLanding;
