import Head from 'next/head';
import Image from 'next/image';
import { ArrowRight, Shield, Lock, Headphones } from 'lucide-react';

const loginUrl = 'https://app.agenciagtx.com.br';
const whatsappMessage = encodeURIComponent('Olá! Preciso de ajuda para acessar minha conta.');
const whatsappLink = `https://wa.me/5519990122773?text=${whatsappMessage}`;

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Área de Login | GTX Marketing e Vendas</title>
        <meta
          name="description"
          content="Acesse o painel exclusivo da GTX Marketing e Vendas com segurança e suporte personalizado."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 text-gray-900">
        <div className="container mx-auto px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="relative w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center">
                  <Image src="/images/logo.png" alt="GTX" width={72} height={24} priority />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-green-600">GTX</p>
                  <p className="text-2xl font-semibold text-gray-900">Marketing e Vendas</p>
                </div>
              </div>

              <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Área Restrita</span>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mt-4 mb-6">
                Bem-vindo ao Portal do Cliente GTX
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
                Aqui você acompanha métricas, relatórios e o andamento das suas campanhas em um ambiente seguro,
                com a mesma identidade visual da nossa landing page. Tudo criado para oferecer clareza, velocidade e confiança.
              </p>

              <div className="space-y-6">
                {[{
                  icon: Shield,
                  title: 'Segurança e transparência',
                  description: 'Acesso protegido e informações sempre atualizadas para o seu time.'
                }, {
                  icon: Lock,
                  title: 'Autenticação simples',
                  description: 'Use seu e-mail corporativo e senha cadastrada para entrar sem complicações.'
                }, {
                  icon: Headphones,
                  title: 'Suporte dedicado',
                  description: 'Especialistas disponíveis para ajudar com qualquer dúvida no acesso.'
                }].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-green-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-gray-100 shadow-2xl p-10">
                <div className="text-center mb-10">
                  <p className="text-sm font-semibold text-green-600 uppercase tracking-[0.3em]">Login</p>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Acesse o aplicativo GTX</h2>
                  <p className="text-gray-600">Clique no botão abaixo para abrir o painel oficial em uma nova aba.</p>
                </div>

                <a
                  href={loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-4 rounded-2xl transition-all shadow-lg"
                >
                  Ir para o app
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="mt-10 p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-sm text-gray-600 mb-3">Está com dificuldades para acessar?</p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-semibold"
                  >
                    Fale com nosso atendimento no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
