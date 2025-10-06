import React, { useState, useEffect } from 'react';
import { MessageCircle, TrendingUp, Target, Users, BarChart3, Zap, CheckCircle, Star, Menu, X, ArrowRight, Phone, Mail, MapPin, Award, Rocket, Shield, ChevronLeft, ChevronRight, Clock, DollarSign, LineChart } from 'lucide-react';

const GTXLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentClient, setCurrentClient] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Placeholder for client logos - replace with actual images
  const clients = [
    { name: "Sneaker Society", logo: "/images/clients/sneaker-society.png" },
    { name: "Frasco Life", logo: "/images/clients/frasco-life.png" },
    { name: "Jsete Store", logo: "/images/clients/jsete-store.png" },
    { name: "Cliente 4", logo: "/images/clients/client-4.png" },
    { name: "Cliente 5", logo: "/images/clients/client-5.png" },
    { name: "Cliente 6", logo: "/images/clients/client-6.png" },
    { name: "Cliente 7", logo: "/images/clients/client-7.png" },
    { name: "Cliente 8", logo: "/images/clients/client-8.png" }
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
      number: "350%", 
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

  const whatsappMessage = encodeURIComponent("Olá! Vim do site e gostaria de conhecer mais sobre a consultoria gratuita da GTX.");
  const whatsappLink = `https://wa.me/5519990122773?text=${whatsappMessage}`;

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
  };

  const handleConsultoriaClick = () => {
    trackConsultoriaClick();
  };

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
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={handleConsultoriaClick} className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg font-semibold">
                Consultoria Grátis
              </a>
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
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={handleConsultoriaClick} className="block bg-green-500 text-white px-6 py-3 rounded-full text-center hover:bg-green-600 font-semibold">
                Consultoria Grátis
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 inline-block animate-fadeIn">
              <span className="bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
                🚀 Consultoria Gratuita • Resultados Comprovados
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fadeInUp">
              Transforme Visitas em
              <span className="text-green-400 block mt-2">Vendas Reais</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
              Somos especialistas em <strong>tráfego pago</strong> e <strong>transformação digital</strong> para restaurantes e e-commerce. 
              Resultados mensuráveis, crescimento escalável e ROI comprovado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-400">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={handleConsultoriaClick} className="group bg-green-500 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-green-600 transition-all transform hover:scale-105 flex items-center gap-3 shadow-2xl">
                Quero Crescer Meu Negócio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#servicos" className="border-2 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-gray-900 transition-all shadow-xl">
                Ver Nossos Serviços
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="text-green-500 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
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
              <div className="relative">
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
      <section id="servicos" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">O Que Fazemos</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-2">
              Nossos <span className="text-green-500">Serviços</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções completas de marketing digital e transformação tecnológica para alavancar seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-green-500 group hover:-translate-y-2 duration-300">
                <div className="text-green-500 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Consultoria */}
      <section className="py-24 bg-gradient-to-r from-green-500 via-green-600 to-green-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQyIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAgMCBMIDAgMCAwIDEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZDIpIi8+PC9zdmc+')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Zap className="w-16 h-16" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Consultoria 100% Gratuita
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed">
              Análise completa do seu negócio, time comercial e anúncios ativos. 
              Identifique oportunidades de crescimento sem nenhum compromisso.
            </p>
            <div className="bg-white text-gray-900 p-10 rounded-3xl shadow-2xl max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">O que você vai receber:</h3>
              <ul className="text-left space-y-5 mb-10">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Análise Detalhada de Anúncios</div>
                    <div className="text-gray-600">Auditoria completa das suas campanhas atuais com identificação de oportunidades</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Diagnóstico Comercial</div>
                    <div className="text-gray-600">Avaliação do seu time e processos comerciais com sugestões práticas</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Plano Estratégico</div>
                    <div className="text-gray-600">Roadmap personalizado com ações prioritárias para seu crescimento</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Projeção de Resultados</div>
                    <div className="text-gray-600">Estimativa de ROI e potencial de crescimento baseado em dados reais</div>
                  </div>
                </li>
              </ul>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={handleConsultoriaClick} className="group bg-green-500 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-green-600 transition-all inline-flex items-center gap-3 shadow-xl transform hover:scale-105">
                <Phone className="w-6 h-6" />
                Agendar Minha Consultoria Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-sm text-gray-500 mt-6">⚡ Resposta em até 2 horas • 100% Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section with Carousel */}
      <section id="clientes" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Nossos Clientes</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-2">
              Empresas que <span className="text-green-500">Confiam na GTX</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Marcas de diversos segmentos que alcançaram resultados extraordinários
            </p>
          </div>

          <div className="max-w-6xl mx-auto relative">
            {/* Carousel Navigation */}
            <button 
              onClick={prevClient}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={nextClient}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Clients Grid */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentClient * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(clients.length / 4) }).map((_, groupIndex) => (
                  <div key={groupIndex} className="min-w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
                      {clients.slice(groupIndex * 4, groupIndex * 4 + 4).map((client, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-8 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all group border border-gray-100">
                          <img 
                            src={client.logo} 
                            alt={client.name}
                            className="max-w-full h-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div style={{display: 'none'}} className="text-gray-400 font-semibold text-center">
                            {client.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(clients.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentClient(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentClient === index ? 'w-8 bg-green-500' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg">
              <strong>Adicione sua logo aqui:</strong> Coloque os arquivos em <code className="bg-gray-100 px-2 py-1 rounded text-sm">/public/images/clients/</code>
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Casos de Sucesso</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-2">
              Resultados <span className="text-green-500">Comprovados</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Veja o que nossos clientes alcançaram com a GTX
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
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

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQzIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAgMCBMIDAgMCAwIDEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZDMpIi8+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Pronto para Multiplicar Seus Resultados?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
              Agende agora uma consultoria gratuita e descubra como podemos transformar seu negócio
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={handleConsultoriaClick} className="group inline-flex items-center gap-3 bg-green-500 text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-2xl">
              <Phone className="w-7 h-7" />
              Falar com Especialista Agora
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-sm opacity-75 mt-6">⚡ Atendimento imediato via WhatsApp</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Entre em Contato</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-2">
                Vamos <span className="text-green-500">Conversar</span>
              </h2>
              <p className="text-xl text-gray-600">
                Estamos prontos para acelerar o crescimento do seu negócio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">WhatsApp</h3>
                <p className="opacity-90 mb-4">Atendimento rápido e direto</p>
                <p className="font-semibold text-lg">+55 19 99012-2773</p>
              </a>

              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-200">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-green-600">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">E-mail</h3>
                <p className="text-gray-600 mb-4">Envie sua mensagem</p>
                <p className="font-semibold text-lg text-gray-900">contato@agenciagtx.com.br</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-200">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <img 
                src="/images/logo.png" 
                alt="GTX Marketing e Vendas" 
                className="h-12 w-auto mb-6 brightness-0 invert"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{display: 'none'}} className="text-3xl font-bold mb-6">
                <span className="text-green-500">GTX</span> Marketing
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Especialistas em tráfego pago e transformação digital. Transformamos visitas em vendas com estratégias inteligentes e resultados mensuráveis.
              </p>
              <div className="flex gap-4">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><a href="#inicio" className="text-gray-400 hover:text-green-500 transition-colors">Início</a></li>
                <li><a href="#sobre" className="text-gray-400 hover:text-green-500 transition-colors">Quem Somos</a></li>
                <li><a href="#servicos" className="text-gray-400 hover:text-green-500 transition-colors">Serviços</a></li>
                <li><a href="#clientes" className="text-gray-400 hover:text-green-500 transition-colors">Clientes</a></li>
                <li><a href="#depoimentos" className="text-gray-400 hover:text-green-500 transition-colors">Casos de Sucesso</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Contato</h3>
              <ul className="space-y-4">
                <li>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors flex items-center gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>+55 19 99012-2773</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:contato@agenciagtx.com.br" className="text-gray-400 hover:text-green-500 transition-colors flex items-center gap-3">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span>contato@agenciagtx.com.br</span>
                  </a>
                </li>
                <li className="text-gray-400 flex items-start gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Atendimento 100% Online<br/>Todo o Brasil</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left">
                &copy; 2025 GTX Marketing e Vendas. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-sm">
                CNPJ: 41.768.146/0001-69
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-5 rounded-full shadow-2xl hover:bg-green-600 transition-all z-50 hover:scale-110 group"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></span>
      </a>

      {/* Tracking Scripts Placeholder */}
      <div id="tracking-scripts">
        {/* Meta Pixel, GTM, and GA4 will be loaded via _document.js */}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
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