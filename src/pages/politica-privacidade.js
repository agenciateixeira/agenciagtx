import React, { useState } from 'react';
import { ChevronDown, ArrowLeft, Mail, Phone, MapPin, MessageCircle, Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';

const PoliticaPrivacidade = () => {
  const [openFaq, setOpenFaq] = useState(null);
  
  const consultoriaLink = 'https://forms.agenciagtx.com.br';
  const whatsappMessage = encodeURIComponent("Olá! Tenho dúvidas sobre a política de privacidade.");
  const whatsappLink = `https://wa.me/5519990122773?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Fixo */}
      <header className="fixed w-full z-50 bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-gray-600 hover:text-green-500 transition-colors flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Voltar</span>
              </a>
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
            </div>
            <a href={consultoriaLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all flex items-center gap-2 font-semibold">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contato</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Navegação Interna */}
      <div className="bg-gray-50 border-b sticky top-[80px] z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <a href="#privacidade" className="text-gray-700 hover:text-green-500 font-medium transition-colors px-3 py-1 rounded-full hover:bg-gray-100">
              Política de Privacidade
            </a>
            <span className="text-gray-400">•</span>
            <a href="#termos" className="text-gray-700 hover:text-green-500 font-medium transition-colors px-3 py-1 rounded-full hover:bg-gray-100">
              Termos de Uso
            </a>
            <span className="text-gray-400">•</span>
            <a href="#cookies" className="text-gray-700 hover:text-green-500 font-medium transition-colors px-3 py-1 rounded-full hover:bg-gray-100">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-12 max-w-4xl" style={{ paddingTop: '140px' }}>
        
        {/* Política de Privacidade */}
        <section id="privacidade" className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Política de Privacidade</h1>
          </div>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            <strong>Última atualização:</strong> Janeiro de 2025
          </p>

          <div className="space-y-10">
            {/* Seção 1 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">1.</span> Introdução
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                O objetivo desta Política de Privacidade é esclarecer quais dados são coletados no site <strong>www.agenciagtx.com.br</strong>, que pertence à empresa <strong>Agencia GTX Marketing e Vendas LTDA</strong>, inscrita no CNPJ <strong>41.768.146/0001-69</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Além de esclarecer como os dados são coletados, esta Política de Privacidade também informa como eles são utilizados, compartilhados e armazenados por meio do nosso site e dos respectivos serviços.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A aceitação desta Política ocorre quando você se cadastra neste site para utilizar nossos serviços, incluindo os gratuitos. Dessa forma, entendemos que você está ciente e de acordo com a forma que utilizaremos os seus dados coletados.
              </p>
            </div>

            {/* Seção 2 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">2.</span> Quais Dados Pessoais São Coletados
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                2.1 Formulários de Contato e Consultoria
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sempre que você preencher os formulários contidos neste site, os seus dados pessoais são coletados e armazenados por nós com o objetivo de prestarmos o devido atendimento solicitado.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
                <p className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  Dados coletados incluem:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                  <li>Nome completo</li>
                  <li>E-mail profissional</li>
                  <li>Número de telefone/WhatsApp</li>
                  <li>Nome da empresa</li>
                  <li>Faturamento mensal aproximado</li>
                  <li>Principal desafio do negócio</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-500" />
                2.2 Cookies e Tecnologias de Rastreamento
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Este site coleta dados utilizando cookies. Cookies são pequenos arquivos de dados que ficam armazenados no disco rígido do seu computador ou no browser do seu dispositivo móvel.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Utilizamos dois tipos de cookies:</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Cookies Próprios</h4>
                  <p className="text-gray-700 text-sm">Inseridos por este site para reconhecer quando você retorna</p>
                </div>
                <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Cookies de Terceiros</h4>
                  <p className="text-gray-700 text-sm">Google Analytics, Facebook Pixel, Google Tag Manager</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Google Analytics</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Coletamos informações como: endereço IP, localização geográfica, fonte de referência, tipo de navegador, duração da visita e páginas visitadas. Os dados não identificam nenhuma pessoa em particular.
              </p>
            </div>

            {/* Seção 3 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">3.</span> Como Utilizamos Seus Dados
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Prestar atendimento e responder suas solicitações</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Agendar e realizar consultorias gratuitas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Enviar newsletters e conteúdos relevantes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Realizar análises e melhorar nossos serviços</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Enviar propostas comerciais personalizadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Cumprir obrigações legais e contratuais</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Seção 4 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-7 h-7 text-green-500" />
                <span><span className="text-green-500">4.</span> Seus Direitos (LGPD)</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                De acordo com a Lei Geral de Proteção de Dados, você tem os seguintes direitos:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-gray-200 p-5 rounded-xl hover:border-green-500 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    Acesso aos Dados
                  </h4>
                  <p className="text-gray-600 text-sm">Você pode ter acesso aos seus dados a qualquer momento</p>
                </div>
                <div className="bg-white border-2 border-gray-200 p-5 rounded-xl hover:border-green-500 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    Alteração dos Dados
                  </h4>
                  <p className="text-gray-600 text-sm">Solicite atualização ou correção de informações</p>
                </div>
                <div className="bg-white border-2 border-gray-200 p-5 rounded-xl hover:border-green-500 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    Eliminação dos Dados
                  </h4>
                  <p className="text-gray-600 text-sm">Peça para excluir seus dados do nosso sistema</p>
                </div>
                <div className="bg-white border-2 border-gray-200 p-5 rounded-xl hover:border-green-500 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    Sair da Lista
                  </h4>
                  <p className="text-gray-600 text-sm">Descadastre-se da lista de e-mails e contatos</p>
                </div>
              </div>
            </div>

            {/* Seção 5 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-7 h-7 text-green-500" />
                <span><span className="text-green-500">5.</span> Segurança dos Dados</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                A GTX Marketing e Vendas utiliza medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda, destruição ou alteração.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Caso algum incidente aconteça, você será devidamente informado sobre o que estamos fazendo para corrigir o problema.
              </p>
            </div>

            {/* Box de Contato */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-7 h-7" />
                Contato e Dúvidas
              </h2>
              <p className="mb-6 opacity-95">
                Qualquer dúvida, discordância ou solicitação relacionada a esta Política de Privacidade pode ser comunicada em nossos canais:
              </p>
              <div className="space-y-3 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>contato@agenciagtx.com.br</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>(19) 99012-2773</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Agencia GTX Marketing e Vendas LTDA</div>
                    <div className="text-sm opacity-90">CNPJ: 41.768.146/0001-69</div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a href={consultoriaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
                  <Mail className="w-5 h-5" />
                  Entrar em Contato
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Termos de Uso */}
        <section id="termos" className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-10 h-10 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Termos de Uso</h1>
          </div>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            <strong>Última atualização:</strong> Janeiro de 2025
          </p>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">1.</span> Aceitação dos Termos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ao acessar e usar o site www.agenciagtx.com.br, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve usar nosso site ou serviços.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">2.</span> Descrição dos Serviços
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                A GTX Marketing e Vendas oferece serviços de marketing digital, incluindo:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">•</span>
                  <span>Gestão de tráfego pago</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">•</span>
                  <span>Consultoria estratégica</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">•</span>
                  <span>Transformação digital</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">•</span>
                  <span>Business Intelligence</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">•</span>
                  <span>Desenvolvimento de e-commerce</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">•</span>
                  <span>Consultoria comercial</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">3.</span> Uso do Site
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos de terceiros.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="font-semibold text-gray-900 mb-2">É proibido:</p>
                <ul className="space-y-2 text-gray-700 text-sm ml-2">
                  <li>• Usar o site para qualquer propósito ilegal</li>
                  <li>• Transmitir vírus ou malware</li>
                  <li>• Coletar informações de outros usuários sem permissão</li>
                  <li>• Copiar ou distribuir conteúdo sem autorização</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">4.</span> Propriedade Intelectual
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Todo o conteúdo presente neste site é propriedade da GTX Marketing e Vendas e está protegido pelas leis brasileiras e internacionais de direitos autorais. É proibida a reprodução sem autorização prévia por escrito.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-500">5.</span> Lei Aplicável
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro da comarca de <strong>Campinas/SP</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Política de Cookies */}
        <section id="cookies" className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-10 h-10 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Política de Cookies</h1>
          </div>
          
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">O Que São Cookies?</h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente e fornecer informações aos proprietários.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tipos de Cookies Utilizados</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 bg-green-50 pl-6 pr-4 py-4 rounded-r-xl flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Cookies Essenciais</h3>
                    <p className="text-gray-700">Necessários para o funcionamento básico do site. Sem eles, o site não funcionaria corretamente.</p>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 pl-6 pr-4 py-4 rounded-r-xl flex items-start gap-3">
                  <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Cookies de Análise</h3>
                    <p className="text-gray-700">Usados para entender como os visitantes interagem com o site (Google Analytics). Nos ajudam a melhorar a experiência do usuário.</p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 bg-purple-50 pl-6 pr-4 py-4 rounded-r-xl flex items-start gap-3">
                  <Eye className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Cookies de Marketing</h3>
                    <p className="text-gray-700">Utilizados para rastrear visitantes em diferentes sites (Facebook Pixel, Google Ads). Usados para exibir anúncios relevantes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Gerenciar Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Você pode controlar e/ou excluir cookies como desejar. Pode excluir todos os cookies que já estão no seu computador e pode configurar a maioria dos navegadores para impedir que eles sejam colocados.
              </p>
              <p className="text-gray-700 leading-relaxed">
                No entanto, se você fizer isso, pode ter que ajustar manualmente algumas preferências sempre que visitar um site, e alguns serviços e funcionalidades podem não funcionar.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer - Igual ao da página principal */}
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
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
              <h3 className="text-lg font-bold mb-6">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><a href="/#inicio" className="text-gray-400 hover:text-green-500 transition-colors">Início</a></li>
                <li><a href="/#sobre" className="text-gray-400 hover:text-green-500 transition-colors">Quem Somos</a></li>
                <li><a href="/#servicos" className="text-gray-400 hover:text-green-500 transition-colors">Serviços</a></li>
                <li><a href="/#clientes" className="text-gray-400 hover:text-green-500 transition-colors">Clientes</a></li>
                <li><a href="/#depoimentos" className="text-gray-400 hover:text-green-500 transition-colors">Casos de Sucesso</a></li>
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
              <p className="text-gray-400 text-center md:text-left">
                &copy; 2025 GTX Marketing e Vendas. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-sm">
                CNPJ: 41.768.146/0001-69
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
              <a href="/politica-privacidade" className="hover:text-green-500 transition-colors">
                Política de Privacidade
              </a>
              <span>•</span>
              <a href="/politica-privacidade#termos" className="hover:text-green-500 transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-5 rounded-full shadow-2xl hover:bg-green-600 transition-all z-50 hover:scale-110 group"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></span>
      </a>

      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PoliticaPrivacidade;