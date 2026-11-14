import { Smartphone, Wrench, Star, MapPin, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RF360</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Entrar
            </a>
            <a
              href="/cadastro"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              Cadastrar
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-medium text-primary-700">
            Em Construção
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Encontre o melhor técnico para seus{" "}
            <span className="text-primary-600">eletrônicos</span>
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Conectamos você aos melhores técnicos especializados da sua região.
            Celulares, notebooks, TVs, videogames e mais. Orçamento rápido via WhatsApp,
            avaliações verificadas e acompanhamento em tempo real.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700">
              <MessageCircle className="h-5 w-5" />
              Solicitar Orçamento
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50">
              Sou Técnico
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-success-50">
              <Wrench className="h-6 w-6 text-success-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Técnicos Verificados
            </h3>
            <p className="text-gray-600">
              Todos os profissionais passam por validação de documentos e
              avaliação de qualidade.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-warning-50">
              <Star className="h-6 w-6 text-warning-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Avaliações Reais
            </h3>
            <p className="text-gray-600">
              Veja avaliações de clientes reais e escolha com confiança o melhor
              profissional.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
              <MapPin className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Perto de Você
            </h3>
            <p className="text-gray-600">
              Encontre técnicos na sua região que atendem em domicílio ou em
              loja.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-primary-600 p-8 text-center md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            É técnico de celular?
          </h2>
          <p className="mb-6 text-primary-100">
            Cadastre-se gratuitamente e comece a receber clientes ainda hoje.
            Sem taxa por lead, apenas comissão sobre serviços realizados.
          </p>
          <button className="rounded-lg bg-white px-6 py-3 font-medium text-primary-600 hover:bg-primary-50">
            Cadastrar como Técnico
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; 2026 RF360. Todos os direitos reservados.</p>
          <p className="mt-2">
            Marketplace de Técnicos de Celular - Em desenvolvimento
          </p>
        </div>
      </footer>
    </main>
  );
}
