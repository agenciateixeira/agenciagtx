import React, { useState } from 'react';
import { Crown, Shield, Users, TrendingUp, Award, ArrowRight, CheckCircle, Phone, Mail, Calendar, Target, Zap, BarChart3, Sparkles, MessageCircle, MapPin, X, AlertCircle } from 'lucide-react';

const GTXExclusive = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    empresa: '',
    telefone: '',
    faturamento: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const diferenciais = [
    {
      icon: <Users className="w-10 h-10" />,
      titulo: "Time Dedicado",
      descricao: "Equipe exclusiva focada 100% no crescimento do seu negócio"
    },
    {
      icon: <Target className="w-10 h-10" />,
      titulo: "Estratégia Customizada",
      descricao: "Planejamento sob medida para empresas de alto faturamento"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      titulo: "Atendimento VIP",
      descricao: "Suporte prioritário com resposta em até 2 horas"
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      titulo: "Relatórios Avançados",
      descricao: "Análises profundas e insights estratégicos semanais"
    }
  ];

  const servicos = [
    {
      titulo: "Marketing de Performance",
      itens: ["Gestão avançada de tráfego pago", "Otimização contínua de campanhas", "Análise preditiva de ROI", "Estratégias de escala sustentável"]
    },
    {
      titulo: "Inteligência de Mercado",
      itens: ["Estudos de concorrência", "Análise de tendências", "Posicionamento estratégico", "Pesquisas de mercado exclusivas"]
    },
    {
      titulo: "Growth & Automação",
      itens: ["Funis de vendas otimizados", "CRM e automação avançada", "Lead scoring e qualificação", "Integração de sistemas"]
    }
  ];

  const resultados = [
    { numero: "+387%", label: "Aumento médio em vendas" },
    { numero: "R$ 50M+", label: "Faturamento gerado" },
    { numero: "4.8x", label: "ROI médio dos clientes" },
    { numero: "98%", label: "Taxa de satisfação" }
  ];

  const whatsappLink = "https://wa.me/5519990122773?text=" + encodeURIComponent("Olá! Tenho interesse no GTX Exclusive para empresas que faturam acima de 2 milhões/mês.");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.email || !formData.empresa || !formData.telefone) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      setSubmitError(true);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      const response = await fetch('/api/submit-exclusive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitSuccess(true);
        setFormData({ nome: '', email: '', empresa: '', telefone: '', faturamento: '', mensagem: '' });
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setErrorMessage(data.message || 'Erro ao enviar solicitação. Tente novamente.');
        setSubmitError(true);
      }
    } catch (error) {
      console.error('Erro:', error);
      setErrorMessage('Erro ao conectar com o servidor. Tente novamente.');
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header Luxo */}
      <header className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/20">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo.png" 
                alt="GTX Exclusive" 
                className="h-10 w-auto brightness-0 invert opacity-90"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{display: 'none'}} className="flex items-center gap-2">
                <span className="text-3xl font-bold text-amber-500">GTX</span>
                <span className="text-2xl font-bold text-white">Exclusive</span>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/30">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="text-amber-500 text-sm font-semibold">Premium</span>
              </div>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-3 rounded-full hover:from-amber-400 hover:to-amber-500 transition-all font-bold flex items-center gap-2 shadow-xl shadow-amber-500/20">
              <MessageCircle className="w-5 h-5" />
              Agendar Consultoria
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Premium */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMjAyYyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-amber-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-500/30 mb-8">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-amber-500 font-semibold">Exclusivo para empresas que faturam acima de R$ 2 milhões/mês</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="text-white">Marketing de Alto</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500">Desempenho Premium</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                Estratégias sofisticadas, time dedicado e resultados extraordinários para empresas que buscam escalar com excelência
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contato" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-10 py-5 rounded-full text-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-2xl shadow-amber-500/30">
                  <Calendar className="w-6 h-6" />
                  Agendar Reunião Estratégica
                </a>
                <a href="#diferenciais" className="inline-flex items-center justify-center gap-2 bg-slate-800/50 backdrop-blur-sm text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-slate-700/50 transition-all border border-amber-500/30">
                  Conhecer o Programa
                  <ArrowRight className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Resultados em Destaque */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              {resultados.map((item, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 text-center hover:border-amber-500/50 transition-all">
                  <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">{item.numero}</div>
                  <div className="text-slate-300 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="py-24 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Por Que <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">GTX Exclusive</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Atendimento diferenciado para empresas que exigem excelência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {diferenciais.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-amber-500/20 p-8 rounded-2xl hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/10 group">
                <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.titulo}</h3>
                <p className="text-slate-400">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Serviços <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">Premium</span>
            </h2>
            <p className="text-xl text-slate-300">
              Soluções completas para empresas de alto desempenho
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicos.map((servico, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 hover:border-amber-500/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  {servico.titulo}
                </h3>
                <ul className="space-y-4">
                  {servico.itens.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Premium */}
      <section className="py-24 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5 border-y border-amber-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Crown className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto Para Crescer com Excelência?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Vagas limitadas. Agende uma reunião estratégica com nosso time e descubra como podemos acelerar seus resultados.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-12 py-6 rounded-full text-xl font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-2xl shadow-amber-500/30">
              <Phone className="w-6 h-6" />
              Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section id="contato" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-amber-500/30 rounded-3xl p-10 shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Solicite uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">Proposta Personalizada</span>
                </h2>
                <p className="text-slate-300">
                  Preencha o formulário e nossa equipe entrará em contato em até 24 horas
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Nome Completo *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/30 rounded-lg text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/30 rounded-lg text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Empresa *</label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/30 rounded-lg text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="Nome da empresa"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Telefone *</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/30 rounded-lg text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Faturamento Mensal</label>
                  <select
                    name="faturamento"
                    value={formData.faturamento}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/30 rounded-lg text-white focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    <option value="">Selecione</option>
                    <option value="2-5m">R$ 2M - R$ 5M</option>
                    <option value="5-10m">R$ 5M - R$ 10M</option>
                    <option value="10-20m">R$ 10M - R$ 20M</option>
                    <option value="20m+">Acima de R$ 20M</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Mensagem</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/30 rounded-lg text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Conte-nos sobre seus objetivos e desafios..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 py-5 rounded-lg text-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Mail className="w-6 h-6" />
                      Solicitar Proposta Premium
                    </>
                  )}
                </button>

                <p className="text-center text-slate-400 text-sm">
                  Seus dados estão seguros. Não compartilhamos informações com terceiros.
                </p>
              </div>

              {/* Modal de Sucesso */}
              {submitSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
                    <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle className="w-12 h-12 text-amber-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Solicitação Enviada!</h3>
                    <p className="text-xl text-slate-300 mb-2">Nossa equipe exclusiva entrará em contato em breve.</p>
                    <p className="text-sm text-slate-400">Aguarde até 24 horas úteis.</p>
                  </div>
                </div>
              )}

              {/* Modal de Erro */}
              {submitError && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-red-500/30 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertCircle className="w-12 h-12 text-red-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Ops! Algo deu errado</h3>
                    <p className="text-xl text-slate-300 mb-6">{errorMessage}</p>
                    <button onClick={() => setSubmitError(false)} className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-8 py-3 rounded-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all">
                      Tentar Novamente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-amber-500/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <img 
                src="/images/logo.png" 
                alt="GTX Marketing e Vendas" 
                className="h-12 w-auto mb-6 brightness-0 invert opacity-90"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{display: 'none'}} className="text-3xl font-bold mb-6">
                <span className="text-amber-500">GTX</span>
                <span className="text-white"> Exclusive</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Soluções premium em marketing digital para empresas de alto faturamento. Estratégias sofisticadas, time dedicado e resultados extraordinários.
              </p>
              <div className="flex gap-4">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-amber-500 hover:bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/agenciagtx" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/agenciagtx" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-amber-500">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><a href="/#inicio" className="text-gray-400 hover:text-amber-500 transition-colors">Início</a></li>
                <li><a href="/#sobre" className="text-gray-400 hover:text-amber-500 transition-colors">Quem Somos</a></li>
                <li><a href="/#servicos" className="text-gray-400 hover:text-amber-500 transition-colors">Serviços</a></li>
                <li><a href="/carreiras" className="text-gray-400 hover:text-amber-500 transition-colors">Trabalhe Conosco</a></li>
                <li><a href="/exclusive" className="text-gray-400 hover:text-amber-500 transition-colors">GTX Exclusive</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 text-amber-500">Contato Premium</h3>
              <ul className="space-y-4">
                <li>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>+55 19 99012-2773</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:contato@agenciagtx.com.br" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-3">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span>contato@agenciagtx.com.br</span>
                  </a>
                </li>
                <li className="text-gray-400 flex items-start gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Atendimento VIP<br/>Todo o Brasil</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <p className="text-gray-400 text-center md:text-left">
                &copy; 2025 GTX Marketing e Vendas. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-sm">
                CNPJ: 41.768.146/0001-69
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
              <a href="/politica-privacidade" className="hover:text-amber-500 transition-colors">
                Política de Privacidade
              </a>
              <span>•</span>
              <a href="/politica-privacidade#termos" className="hover:text-amber-500 transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GTXExclusive;