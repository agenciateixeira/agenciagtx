import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle, Shield, Lock, Eye, Database, UserCheck, FileText, X } from 'lucide-react';

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

const PoliticaPrivacidade = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('Olá! Tenho dúvidas sobre a política de privacidade.');
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  const whatsappNumber = '5519990122773';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => setCursor({ x: e.clientX, y: e.clientY });
    const handleEnter = () => setCursorHover(true);
    const handleLeave = () => setCursorHover(false);
    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('button, a, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem('gtx_cookie_consent');
    if (!consent) setShowCookieBanner(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowWhatsAppModal(false);
      setIsClosingModal(false);
    }, 250);
  };

  const handleWhatsAppClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (showWhatsAppModal) {
      closeModal();
    } else {
      setShowWhatsAppModal(true);
    }
  };

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    closeModal();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease',
        }}
      >
        <div
          className="rounded-full border-2 border-green-500 transition-all duration-200"
          style={{
            width: cursorHover ? 40 : 20,
            height: cursorHover ? 40 : 20,
            opacity: cursorHover ? 0.8 : 0.5,
            backgroundColor: cursorHover ? 'rgba(154, 205, 50, 0.1)' : 'transparent',
          }}
        />
      </div>

      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <a href="/" className="text-gray-600 hover:text-green-500 transition-colors flex items-center gap-2 font-medium">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Voltar</span>
              </a>
              <div className="w-px h-6 bg-gray-200" />
              <a href="/" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="GTX Marketing e Vendas"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </a>
            </div>
            <div className="hidden md:flex items-center gap-1 text-sm">
              <a href="#privacidade" className="text-gray-500 hover:text-green-600 transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100">Privacidade</a>
              <span className="text-gray-300">·</span>
              <a href="#termos" className="text-gray-500 hover:text-green-600 transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100">Termos</a>
              <span className="text-gray-300">·</span>
              <a href="#cookies" className="text-gray-500 hover:text-green-600 transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100">Cookies</a>
            </div>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 text-white px-5 py-2.5 rounded-full hover:bg-green-600 transition-all flex items-center gap-2 font-semibold shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={WA_PATH} /></svg>
              <span className="hidden sm:inline">Fale Conosco</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-green-500 text-white pt-36 pb-14">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Sua privacidade é nossa prioridade
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Políticas e Termos</h1>
          <p className="text-green-100 max-w-xl mx-auto text-sm">
            Agencia GTX Marketing e Vendas LTDA — CNPJ 41.768.146/0001-69
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">

        {/* Política de Privacidade */}
        <div
          data-animate
          data-id="privacidade"
          id="privacidade"
          className={`bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-8 border border-gray-100 transition-all duration-700 ${
            visibleSections['privacidade'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-2xl"><Shield className="w-8 h-8 text-green-600" /></div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Política de Privacidade</h2>
              <p className="text-gray-500 text-sm mt-1">Última atualização: Janeiro de 2025</p>
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-green-500 text-2xl font-black">1.</span> Introdução</h3>
              <p className="text-gray-700 leading-relaxed mb-4">O objetivo desta Política de Privacidade é esclarecer quais dados são coletados no site <strong>www.agenciagtx.com.br</strong>, que pertence à empresa <strong>Agencia GTX Marketing e Vendas LTDA</strong>, inscrita no CNPJ <strong>41.768.146/0001-69</strong>.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Além de esclarecer como os dados são coletados, esta Política também informa como eles são utilizados, compartilhados e armazenados por meio do nosso site e dos respectivos serviços.</p>
              <p className="text-gray-700 leading-relaxed">A aceitação desta Política ocorre quando você se cadastra neste site para utilizar nossos serviços. Dessa forma, entendemos que você está ciente e de acordo com a forma que utilizaremos os seus dados.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-green-500 text-2xl font-black">2.</span> Quais Dados Pessoais São Coletados</h3>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 mt-6 flex items-center gap-2"><FileText className="w-5 h-5 text-green-500" /> 2.1 Formulários de Contato e Consultoria</h4>
              <p className="text-gray-700 leading-relaxed mb-4">Sempre que você preencher os formulários contidos neste site, os seus dados pessoais são coletados e armazenados por nós com o objetivo de prestarmos o devido atendimento solicitado.</p>
              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-xl mb-4">
                <p className="text-gray-800 font-semibold mb-3 flex items-center gap-2"><Database className="w-5 h-5 text-green-600" /> Dados coletados incluem:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                  <li>Nome completo</li><li>E-mail profissional</li><li>Número de telefone/WhatsApp</li>
                  <li>Nome da empresa</li><li>Faturamento mensal aproximado</li><li>Principal desafio do negócio</li>
                </ul>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 mt-6 flex items-center gap-2"><Eye className="w-5 h-5 text-green-500" /> 2.2 Cookies e Tecnologias de Rastreamento</h4>
              <p className="text-gray-700 leading-relaxed mb-4">Este site coleta dados utilizando cookies. Cookies são pequenos arquivos de dados que ficam armazenados no disco rígido do seu computador ou no browser do seu dispositivo móvel.</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-xl"><h5 className="font-semibold text-gray-800 mb-1">Cookies Próprios</h5><p className="text-gray-600 text-sm">Inseridos por este site para reconhecer quando você retorna</p></div>
                <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-xl"><h5 className="font-semibold text-gray-800 mb-1">Cookies de Terceiros</h5><p className="text-gray-600 text-sm">Google Analytics, Facebook Pixel, Google Tag Manager</p></div>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 mt-6">2.3 Google Analytics</h4>
              <p className="text-gray-700 leading-relaxed">Coletamos informações como: endereço IP, localização geográfica, fonte de referência, tipo de navegador, duração da visita e páginas visitadas. Os dados não identificam nenhuma pessoa em particular.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-green-500 text-2xl font-black">3.</span> Como Utilizamos Seus Dados</h3>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <ul className="space-y-3 text-gray-700">
                  {['Prestar atendimento e responder suas solicitações','Agendar e realizar consultorias estratégicas','Enviar newsletters e conteúdos relevantes','Realizar análises e melhorar nossos serviços','Enviar propostas comerciais personalizadas','Cumprir obrigações legais e contratuais'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3"><span className="text-green-500 mt-0.5 font-bold">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><UserCheck className="w-6 h-6 text-green-500" /><span><span className="text-green-500 text-2xl font-black">4.</span> Seus Direitos (LGPD)</span></h3>
              <p className="text-gray-700 leading-relaxed mb-4">De acordo com a Lei Geral de Proteção de Dados, você tem os seguintes direitos:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[{title:'Acesso aos Dados',desc:'Você pode ter acesso aos seus dados a qualquer momento'},{title:'Alteração dos Dados',desc:'Solicite atualização ou correção de informações'},{title:'Eliminação dos Dados',desc:'Peça para excluir seus dados do nosso sistema'},{title:'Sair da Lista',desc:'Descadastre-se da lista de e-mails e contatos'}].map((item, i) => (
                  <div key={i} className="bg-white border-2 border-gray-100 p-5 rounded-2xl hover:border-green-400 transition-colors">
                    <h5 className="font-bold text-gray-900 mb-1 flex items-center gap-2"><FileText className="w-4 h-4 text-green-500" />{item.title}</h5>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><Lock className="w-6 h-6 text-green-500" /><span><span className="text-green-500 text-2xl font-black">5.</span> Segurança dos Dados</span></h3>
              <p className="text-gray-700 leading-relaxed mb-4">A GTX Marketing e Vendas utiliza medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda, destruição ou alteração.</p>
              <p className="text-gray-700 leading-relaxed">Caso algum incidente aconteça, você será devidamente informado sobre o que estamos fazendo para corrigir o problema.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2"><Mail className="w-6 h-6" /> Contato e Dúvidas</h3>
              <p className="mb-5 opacity-95">Qualquer dúvida, discordância ou solicitação relacionada a esta Política pode ser comunicada em nossos canais:</p>
              <div className="space-y-3 bg-white/10 backdrop-blur-sm p-5 rounded-xl mb-5">
                <div className="flex items-center gap-3"><Mail className="w-5 h-5 flex-shrink-0" /><span>contato@agenciagtx.com.br</span></div>
                <div className="flex items-center gap-3"><Phone className="w-5 h-5 flex-shrink-0" /><span>(19) 99012-2773</span></div>
                <div className="flex items-start gap-3"><MapPin className="w-5 h-5 flex-shrink-0 mt-1" /><div><div className="font-semibold">Agencia GTX Marketing e Vendas LTDA</div><div className="text-sm opacity-90">CNPJ: 41.768.146/0001-69</div></div></div>
              </div>
              <button onClick={handleWhatsAppClick} className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={WA_PATH} /></svg>
                Entrar em Contato
              </button>
            </div>
          </div>
        </div>

        {/* Termos de Uso */}
        <div
          data-animate
          data-id="termos"
          id="termos"
          className={`bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-8 border border-gray-100 transition-all duration-700 delay-100 ${
            visibleSections['termos'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-2xl"><FileText className="w-8 h-8 text-green-600" /></div>
            <div><h2 className="text-3xl md:text-4xl font-bold text-gray-900">Termos de Uso</h2><p className="text-gray-500 text-sm mt-1">Última atualização: Janeiro de 2025</p></div>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-green-500 text-2xl font-black">1.</span> Aceitação dos Termos</h3>
              <p className="text-gray-700 leading-relaxed">Ao acessar e usar o site www.agenciagtx.com.br, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve usar nosso site ou serviços.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-green-500 text-2xl font-black">2.</span> Descrição dos Serviços</h3>
              <p className="text-gray-700 leading-relaxed mb-4">A GTX Marketing e Vendas oferece serviços de marketing digital, incluindo:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {['Gestão de tráfego pago','Consultoria estratégica','Transformação digital','Business Intelligence','Desenvolvimento de e-commerce','Consultoria comercial'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-xl px-4 py-3"><span className="text-green-500 font-bold">•</span><span>{item}</span></div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-green-500 text-2xl font-black">3.</span> Uso do Site</h3>
              <p className="text-gray-700 leading-relaxed mb-4">Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos de terceiros.</p>
              <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl">
                <p className="font-semibold text-gray-900 mb-3">É proibido:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center gap-2"><span className="text-red-400">•</span> Usar o site para qualquer propósito ilegal</li>
                  <li className="flex items-center gap-2"><span className="text-red-400">•</span> Transmitir vírus ou malware</li>
                  <li className="flex items-center gap-2"><span className="text-red-400">•</span> Coletar informações de outros usuários sem permissão</li>
                  <li className="flex items-center gap-2"><span className="text-red-400">•</span> Copiar ou distribuir conteúdo sem autorização</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-green-500 text-2xl font-black">4.</span> Propriedade Intelectual</h3>
              <p className="text-gray-700 leading-relaxed">Todo o conteúdo presente neste site é propriedade da GTX Marketing e Vendas e está protegido pelas leis brasileiras e internacionais de direitos autorais. É proibida a reprodução sem autorização prévia por escrito.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2"><span className="text-green-500 text-2xl font-black">5.</span> Lei Aplicável</h3>
              <p className="text-gray-700 leading-relaxed">Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro da comarca de <strong>Campinas/SP</strong>.</p>
            </div>
          </div>
        </div>

        {/* Política de Cookies */}
        <div
          data-animate
          data-id="cookies"
          id="cookies"
          className={`bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-8 border border-gray-100 transition-all duration-700 delay-200 ${
            visibleSections['cookies'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-2xl"><Eye className="w-8 h-8 text-green-600" /></div>
            <div><h2 className="text-3xl md:text-4xl font-bold text-gray-900">Política de Cookies</h2><p className="text-gray-500 text-sm mt-1">Como utilizamos cookies neste site</p></div>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">O Que São Cookies?</h3>
              <p className="text-gray-700 leading-relaxed">Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente e fornecer informações aos proprietários.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tipos de Cookies Utilizados</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 bg-green-50 pl-6 pr-4 py-4 rounded-r-2xl flex items-start gap-3"><Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /><div><h4 className="text-lg font-bold text-gray-900 mb-1">Cookies Essenciais</h4><p className="text-gray-700">Necessários para o funcionamento básico do site.</p></div></div>
                <div className="border-l-4 border-blue-500 bg-blue-50 pl-6 pr-4 py-4 rounded-r-2xl flex items-start gap-3"><Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" /><div><h4 className="text-lg font-bold text-gray-900 mb-1">Cookies de Análise</h4><p className="text-gray-700">Usados para entender como os visitantes interagem com o site (Google Analytics).</p></div></div>
                <div className="border-l-4 border-purple-500 bg-purple-50 pl-6 pr-4 py-4 rounded-r-2xl flex items-start gap-3"><Eye className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" /><div><h4 className="text-lg font-bold text-gray-900 mb-1">Cookies de Marketing</h4><p className="text-gray-700">Utilizados para rastrear visitantes em diferentes sites (Facebook Pixel, Google Ads).</p></div></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Como Gerenciar Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">Você pode controlar e/ou excluir cookies como desejar. Pode excluir todos os cookies que já estão no seu computador e configurar a maioria dos navegadores para impedir que eles sejam colocados.</p>
              <p className="text-gray-700 leading-relaxed">No entanto, se você fizer isso, pode ter que ajustar manualmente algumas preferências sempre que visitar um site, e alguns serviços e funcionalidades podem não funcionar.</p>
            </div>
          </div>
        </div>

      </main>

      {/* Transition Gradient to Footer */}
      <div className="h-32 bg-gradient-to-b from-white via-gray-50 to-gray-100"></div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="md:col-span-2">
              <Image
                src="/images/logo.png"
                alt="GTX Marketing e Vendas"
                width={160}
                height={48}
                className="h-12 w-auto mb-6"
              />
              <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
                Especialistas em tráfego pago e transformação digital. Transformamos visitas em vendas com estratégias inteligentes e resultados mensuráveis.
              </p>
              <div className="flex gap-4">
                <button onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={WA_PATH} /></svg>
                </button>
                <a href="https://www.instagram.com/agenciagtx" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-pink-600 text-gray-700 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://linkedin.com/company/agenciagtx" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-blue-600 text-gray-700 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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
                  <span>Atendimento 100% Online<br />Todo o Brasil</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <p className="text-gray-600 text-center md:text-left text-sm">
                GTX Gestão e Implementações Digitais. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-sm">CNPJ: 41.768.146/0001-69</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
              <a href="/politica-privacidade" className="hover:text-green-600 transition-colors">Política de Privacidade</a>
              <span>•</span>
              <a href="/politica-privacidade#termos" className="hover:text-green-600 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button — igual ao da landing */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all z-50 hover:scale-110 group"
        aria-label="WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d={WA_PATH} /></svg>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></span>
      </button>

      {/* LGPD Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6" style={{ animation: 'modalSlideUp 0.4s ease-out' }}>
          <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold mb-1">🍪 Utilizamos cookies</p>
              <p className="text-xs text-gray-300">Usamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. Ao continuar, você concorda com nossa <a href="/politica-privacidade" className="underline text-green-400 hover:text-green-300">Política de Privacidade</a>.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => { localStorage.setItem('gtx_cookie_consent', 'rejected'); setShowCookieBanner(false); }} className="text-xs text-gray-400 hover:text-white transition-colors px-4 py-2">Recusar</button>
              <button onClick={() => { localStorage.setItem('gtx_cookie_consent', 'accepted'); setShowCookieBanner(false); }} className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all">Aceitar todos</button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Modal — idêntico ao da landing */}
      {showWhatsAppModal && (
        <>
          <div
            className="fixed inset-0 bg-black/10 z-40"
            style={{ animation: isClosingModal ? 'fadeOut 0.4s ease-out' : 'fadeIn 0.3s ease-out' }}
            onClick={closeModal}
          />
          <div
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-96 z-50"
            style={{
              animation: isClosingModal
                ? 'modalSlideDown 0.25s ease-in forwards'
                : 'modalSlideUp 0.3s ease-out forwards',
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="bg-white/20 p-2 rounded-full"><MessageCircle className="w-5 h-5 text-white" /></div>
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">GTX Marketing</h3>
                      <p className="text-white/90 text-xs flex items-center gap-1"><span className="w-2 h-2 bg-green-300 rounded-full"></span> Online agora</p>
                    </div>
                  </div>
                  <button onClick={closeModal} className="text-white/80 hover:text-white transition-colors p-1"><X className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                  <p className="text-sm text-gray-600 mb-2">Olá! 👋 Como podemos ajudar você hoje?</p>
                </div>
                <textarea
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none text-sm text-gray-700"
                  placeholder="Digite sua mensagem aqui..."
                />
                <p className="text-xs text-gray-500 mt-2">Pressione enviar para continuar no WhatsApp</p>
              </div>
              <div className="p-4 bg-white border-t border-gray-100">
                <button onClick={handleSendWhatsApp} className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={WA_PATH} /></svg>
                  Continuar no WhatsApp
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        html { scroll-behavior: smooth; }

        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; } to { opacity: 0; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalSlideDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(16px); }
        }

        @media (min-width: 768px) {
          * { cursor: none !important; }
        }
      `}</style>
    </div>
  );
};

export default PoliticaPrivacidade;
