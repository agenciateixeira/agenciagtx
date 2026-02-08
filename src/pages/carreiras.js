import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, TrendingUp, Users, Zap, Award, ArrowRight, CheckCircle, Upload, Phone, Linkedin, MessageCircle, X, ChevronRight, ChevronLeft, Target, Mail } from 'lucide-react';

const Carreiras = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', cargo: '', linkedin: '', curriculo: '', mensagem: '', arquivoCurriculo: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const vagas = [
    {
      id: 1,
      titulo: "Gestor de Tráfego Pago",
      tipo: "Full-time",
      localizacao: "Remoto",
      nivel: "Pleno/Sênior",
      descricao: "Buscamos profissional experiente em Meta Ads e Google Ads para gerenciar campanhas de alto investimento.",
      requisitos: ["Experiência mínima de 2 anos com tráfego pago", "Domínio de Meta Ads e Google Ads", "Conhecimento em análise de dados e KPIs", "Experiência com e-commerce"],
      diferenciais: ["Certificações Google e Meta", "Experiência com ferramentas de BI", "Conhecimento em CRO"]
    },
    {
      id: 2,
      titulo: "Designer Gráfico",
      tipo: "Full-time",
      localizacao: "Remoto",
      nivel: "Júnior/Pleno",
      descricao: "Procuramos designer criativo para criar peças visuais impactantes para campanhas de marketing digital.",
      requisitos: ["Domínio de Figma e Adobe Creative Suite", "Portfolio com trabalhos de marketing digital", "Experiência com criação de anúncios", "Conhecimento de motion design"],
      diferenciais: ["Experiência com vídeos para redes sociais", "Conhecimento de UX/UI", "Habilidades em copywriting"]
    },
    {
      id: 3,
      titulo: "Analista de BI",
      tipo: "Full-time",
      localizacao: "Remoto",
      nivel: "Pleno",
      descricao: "Profissional para criar dashboards e relatórios estratégicos para nossos clientes.",
      requisitos: ["Experiência com Google Data Studio/Looker", "Conhecimento em SQL", "Experiência com Google Analytics e Meta Pixel", "Habilidade em storytelling com dados"],
      diferenciais: ["Conhecimento em Python/R", "Experiência com Power BI", "Certificação Google Analytics"]
    },
    {
      id: 4,
      titulo: "Vendedor Externo - Prospecção Ativa",
      tipo: "Full-time",
      localizacao: "Presencial/Híbrido",
      nivel: "Pleno/Sênior",
      destaque: true,
      descricao: "Buscamos profissional hunter para prospecção ativa de clientes no mercado B2B, com foco em vendas consultivas de serviços de marketing digital.",
      requisitos: [
        "Experiência mínima de 2 anos em vendas de serviços",
        "Experiência comprovada em prospecção ativa e venda direta",
        "Habilidade em vendas consultivas B2B",
        "Capacidade de prospectar e fechar negócios de forma autônoma"
      ],
      diferenciais: [
        "Experiência com vendas de marketing digital",
        "Network estabelecido no mercado",
        "Conhecimento em CRM e ferramentas de vendas"
      ]
    }
  ];

  const beneficios = [
    { icon: <TrendingUp className="w-8 h-8" />, titulo: "Crescimento Profissional", descricao: "Plano de carreira estruturado e treinamentos constantes" },
    { icon: <Users className="w-8 h-8" />, titulo: "Time Colaborativo", descricao: "Trabalhe com profissionais apaixonados por resultados" },
    { icon: <Zap className="w-8 h-8" />, titulo: "Flexibilidade", descricao: "Trabalho 100% remoto com horário flexível" },
    { icon: <Award className="w-8 h-8" />, titulo: "Bonificações", descricao: "Sistema de metas e bonificações por performance" }
  ];

  const whatsappLink = "https://wa.me/5519990122773?text=" + encodeURIComponent("Olá! Tenho interesse nas vagas da GTX.");

  const handleOpenModal = (vaga) => {
    setSelectedVaga(vaga);
    setFormData({ ...formData, cargo: vaga.titulo });
    setCurrentStep(1);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVaga(null);
    setSubmitSuccess(false);
    setSubmitError(false);
    setCurrentStep(1);
    setFormData({ nome: '', email: '', telefone: '', cargo: '', linkedin: '', curriculo: '', mensagem: '', arquivoCurriculo: null });
    document.body.style.overflow = 'unset';
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrorMessage('Por favor, envie apenas arquivos PDF.');
        setSubmitError(true);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('O arquivo deve ter no máximo 5MB.');
        setSubmitError(true);
        return;
      }
      setFormData({ ...formData, arquivoCurriculo: file, curriculo: '' });
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && (!formData.nome || !formData.email)) {
      setErrorMessage('Por favor, preencha nome e email.');
      setSubmitError(true);
      return;
    }
    if (currentStep === 2) {
      if (!formData.telefone) {
        setErrorMessage('Por favor, preencha o telefone.');
        setSubmitError(true);
        return;
      }
      if (!formData.curriculo && !formData.arquivoCurriculo) {
        setErrorMessage('Por favor, envie o link do currículo ou faça upload do arquivo PDF.');
        setSubmitError(true);
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      let curriculoInfo = formData.curriculo;
      
      if (formData.arquivoCurriculo) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', formData.arquivoCurriculo);
        
        const uploadResponse = await fetch('/api/upload-curriculo', {
          method: 'POST',
          body: formDataUpload,
        });
        
        const uploadData = await uploadResponse.json();
        
        if (uploadData.success) {
          curriculoInfo = `ARQUIVO ENVIADO: ${uploadData.fileName} (${(uploadData.fileSize / 1024).toFixed(2)} KB)`;
        } else {
          throw new Error('Erro ao fazer upload do currículo');
        }
      }
      
      const response = await fetch('/api/submit-candidatura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          cargo: formData.cargo,
          linkedin: formData.linkedin,
          curriculo: curriculoInfo,
          mensagem: formData.mensagem,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitSuccess(true);
        setTimeout(() => handleCloseModal(), 3000);
      } else {
        setErrorMessage(data.message || 'Erro ao enviar candidatura. Tente novamente.');
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
    <div className="min-h-screen bg-white">
      <header className="fixed w-full z-50 bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src="/images/logo.png" alt="GTX Marketing e Vendas" className="h-12 w-auto" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
              <div style={{display: 'none'}} className="text-2xl font-bold"><span className="text-green-500">GTX</span><span className="text-gray-800">.</span></div>
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all font-semibold flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Fale Conosco
            </a>
          </div>
        </nav>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/30">
              <span className="text-green-400 font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5" />Faça Parte do Time GTX</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Trabalhe em uma Agência que <span className="text-green-400">Transforma Resultados</span></h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed">Junte-se a nós e faça parte de uma equipe que está revolucionando o marketing digital no Brasil</p>
            <a href="#vagas" className="inline-flex items-center gap-2 bg-green-500 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-green-600 transition-all shadow-2xl">Ver Vagas Disponíveis<ArrowRight className="w-5 h-5" /></a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Por Que Trabalhar na <span className="text-green-500">GTX</span></h2>
            <p className="text-xl text-gray-600">Oferecemos um ambiente incrível para você crescer</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
                <div className="text-green-500 mb-4">{beneficio.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{beneficio.titulo}</h3>
                <p className="text-gray-600">{beneficio.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vagas" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Vagas <span className="text-green-500">Abertas</span></h2>
            <p className="text-xl text-gray-600">Encontre a oportunidade perfeita para você</p>
          </div>
          <div className="max-w-5xl mx-auto space-y-6">
            {vagas.map((vaga) => (
              <div key={vaga.id} className={`bg-white border-2 rounded-2xl p-8 hover:shadow-xl transition-all ${vaga.destaque ? 'border-green-500 shadow-lg' : 'border-gray-200 hover:border-green-500'}`}>
                {vaga.destaque && (
                  <div className="mb-4 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    <Target className="w-4 h-4" />
                    VAGA EM DESTAQUE
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{vaga.titulo}</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1 text-gray-600 text-sm"><Briefcase className="w-4 h-4" />{vaga.tipo}</span>
                      <span className="flex items-center gap-1 text-gray-600 text-sm"><MapPin className="w-4 h-4" />{vaga.localizacao}</span>
                      <span className="flex items-center gap-1 text-gray-600 text-sm"><Clock className="w-4 h-4" />{vaga.nivel}</span>
                    </div>
                  </div>
                  <button onClick={() => handleOpenModal(vaga)} className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-all font-semibold whitespace-nowrap flex items-center gap-2">
                    Candidatar-se<ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-700 mb-6">{vaga.descricao}</p>
                {vaga.destaque && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex flex-col gap-2 text-green-800 font-semibold">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span>Comissão alta + Bônus por meta</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-green-600" />
                        <span>Auxílio combustível</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-green-600" />
                        <span>Celular corporativo</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Requisitos</h4>
                    <ul className="space-y-2">
                      {vaga.requisitos.map((req, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start gap-2"><span className="text-green-500 mt-1">•</span><span>{req}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Award className="w-5 h-5 text-green-500" />Diferenciais</h4>
                    <ul className="space-y-2">
                      {vaga.diferenciais.map((dif, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-start gap-2"><span className="text-green-500 mt-1">•</span><span>{dif}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Não Encontrou a Vaga Ideal?</h2>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto">Envie seu currículo para nosso banco de talentos e entraremos em contato quando surgir uma oportunidade!</p>
          <button onClick={() => handleOpenModal({ titulo: 'Cadastro no Banco de Talentos' })} className="bg-white text-green-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-2xl inline-flex items-center gap-2">
            <Upload className="w-6 h-6" />Enviar Currículo
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div onClick={handleBackdropClick} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <div>
                <h3 className="text-2xl font-bold">Candidate-se Agora</h3>
                <p className="text-green-100 mt-1 text-sm">{selectedVaga?.titulo}</p>
              </div>
              <button onClick={handleCloseModal} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 pt-6">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className={`flex-1 h-2 rounded-full mx-1 transition-all duration-300 ${currentStep >= step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 font-semibold">Etapa {currentStep} de 3</p>
            </div>

            <div className="p-8">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Candidatura Enviada!</h3>
                  <p className="text-xl text-gray-600">Recebemos seu currículo e entraremos em contato em breve.</p>
                </div>
              ) : submitError ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <X className="w-12 h-12 text-red-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Ops! Algo deu errado</h3>
                  <p className="text-xl text-gray-600 mb-6">{errorMessage}</p>
                  <button onClick={() => setSubmitError(false)} className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-all">
                    Tentar Novamente
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo *</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none" placeholder="Seu nome completo" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none" placeholder="seu@email.com" />
                      </div>
                      <button onClick={handleNext} className="w-full bg-green-500 text-white py-4 rounded-lg font-bold hover:bg-green-600 flex items-center justify-center gap-2">
                        Próxima Etapa<ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"><Phone className="w-4 h-4" />Telefone/WhatsApp *</label>
                        <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none" placeholder="(00) 00000-0000" />
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                        <p className="text-center text-sm font-semibold text-gray-700 mb-4">Escolha uma opção para enviar seu currículo:</p>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <Upload className="w-4 h-4" />
                              Opção 1: Upload do Arquivo PDF
                            </label>
                            <input 
                              type="file" 
                              accept="application/pdf"
                              onChange={handleFileChange}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                            {formData.arquivoCurriculo && (
                              <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                {formData.arquivoCurriculo.name}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">Máximo 5MB</p>
                          </div>
                          
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-gray-50 text-gray-500">OU</span>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <Upload className="w-4 h-4" />
                              Opção 2: Link do Currículo
                            </label>
                            <input 
                              type="url" 
                              name="curriculo" 
                              value={formData.curriculo} 
                              onChange={(e) => {
                                handleChange(e);
                                if (e.target.value) {
                                  setFormData({ ...formData, curriculo: e.target.value, arquivoCurriculo: null });
                                }
                              }}
                              disabled={!!formData.arquivoCurriculo}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none disabled:bg-gray-100" 
                              placeholder="Link do Google Drive, Dropbox..." 
                            />
                            <p className="text-xs text-gray-500 mt-2">Cole o link público do seu currículo (PDF)</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button onClick={() => setCurrentStep(1)} className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300 flex items-center justify-center gap-2">
                          <ChevronLeft className="w-5 h-5" />Voltar
                        </button>
                        <button onClick={handleNext} className="flex-1 bg-green-500 text-white py-4 rounded-lg font-bold hover:bg-green-600 flex items-center justify-center gap-2">
                          Próxima<ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"><Linkedin className="w-4 h-4" />LinkedIn (opcional)</label>
                        <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none" placeholder="https://linkedin.com/in/seu-perfil" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem (opcional)</label>
                        <textarea name="mensagem" value={formData.mensagem} onChange={handleChange} rows="4" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none" placeholder="Conte um pouco sobre você..."></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Vaga de Interesse</label>
                        <input type="text" name="cargo" value={formData.cargo} readOnly className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-600" />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setCurrentStep(2)} className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300 flex items-center justify-center gap-2">
                          <ChevronLeft className="w-5 h-5" />Voltar
                        </button>
                        <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 bg-green-500 text-white py-4 rounded-lg font-bold hover:bg-green-600 flex items-center justify-center gap-2 disabled:opacity-50">
                          {isSubmitting ? 'Enviando...' : <><Upload className="w-5 h-5" />Enviar</>}
                        </button>
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-4">Seus dados estão seguros conosco</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <img src="/images/logo.png" alt="GTX Marketing" className="h-12 w-auto mb-6 brightness-0 invert" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
              <div style={{display: 'none'}} className="text-3xl font-bold mb-6"><span className="text-green-500">GTX</span> Marketing</div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">Especialistas em tráfego pago e transformação digital. Transformamos visitas em vendas com estratégias inteligentes e resultados mensuráveis.</p>
              <div className="flex gap-4">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href="https://www.instagram.com/agenciagtx" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://linkedin.com/company/agenciagtx" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><a href="/#inicio" className="text-gray-400 hover:text-green-500 transition-colors">Início</a></li>
                <li><a href="/#sobre" className="text-gray-400 hover:text-green-500 transition-colors">Quem Somos</a></li>
                <li><a href="/#servicos" className="text-gray-400 hover:text-green-500 transition-colors">Serviços</a></li>
                <li><a href="/carreiras" className="text-gray-400 hover:text-green-500 transition-colors">Trabalhe Conosco</a></li>
                <li><a href="/exclusive" className="text-gray-400 hover:text-green-500 transition-colors">GTX Exclusive</a></li>
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <p className="text-gray-400 text-center md:text-left">&copy; 2025 GTX Marketing e Vendas. Todos os direitos reservados.</p>
              <p className="text-gray-500 text-sm">CNPJ: 41.768.146/0001-69</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
              <a href="/politica-privacidade" className="hover:text-green-500 transition-colors">Política de Privacidade</a>
              <span>•</span>
              <a href="/politica-privacidade#termos" className="hover:text-green-500 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Carreiras;