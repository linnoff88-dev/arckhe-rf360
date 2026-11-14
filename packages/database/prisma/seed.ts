import { PrismaClient, BadgeTipo } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Criar Especialidades - Categorias de Eletrônicos
  const especialidades = await Promise.all([
    // Celulares e Tablets
    prisma.especialidade.upsert({
      where: { nome: "Celulares e Tablets" },
      update: {},
      create: {
        nome: "Celulares e Tablets",
        descricao: "Reparo de smartphones, iPhones, tablets e iPads",
        icone: "smartphone",
        ordem: 1,
      },
    }),
    // Notebooks e Computadores
    prisma.especialidade.upsert({
      where: { nome: "Notebooks" },
      update: {},
      create: {
        nome: "Notebooks",
        descricao: "Reparo de notebooks, ultrabooks e MacBooks",
        icone: "laptop",
        ordem: 2,
      },
    }),
    prisma.especialidade.upsert({
      where: { nome: "Computadores" },
      update: {},
      create: {
        nome: "Computadores",
        descricao: "Montagem, manutenção e reparo de desktops e PCs",
        icone: "monitor",
        ordem: 3,
      },
    }),
    // TVs e Monitores
    prisma.especialidade.upsert({
      where: { nome: "TVs e Monitores" },
      update: {},
      create: {
        nome: "TVs e Monitores",
        descricao: "Reparo de Smart TVs, LED, LCD, OLED e monitores",
        icone: "tv",
        ordem: 4,
      },
    }),
    // Videogames
    prisma.especialidade.upsert({
      where: { nome: "Videogames" },
      update: {},
      create: {
        nome: "Videogames",
        descricao: "Reparo de PlayStation, Xbox, Nintendo Switch e consoles",
        icone: "gamepad-2",
        ordem: 5,
      },
    }),
    // Áudio
    prisma.especialidade.upsert({
      where: { nome: "Áudio e Som" },
      update: {},
      create: {
        nome: "Áudio e Som",
        descricao: "Reparo de fones, caixas de som, soundbars e equipamentos de áudio",
        icone: "headphones",
        ordem: 6,
      },
    }),
    // Eletrodomésticos
    prisma.especialidade.upsert({
      where: { nome: "Eletrodomésticos" },
      update: {},
      create: {
        nome: "Eletrodomésticos",
        descricao: "Reparo de micro-ondas, aspiradores, cafeteiras e pequenos eletros",
        icone: "plug",
        ordem: 7,
      },
    }),
    // Impressoras
    prisma.especialidade.upsert({
      where: { nome: "Impressoras" },
      update: {},
      create: {
        nome: "Impressoras",
        descricao: "Reparo de impressoras, multifuncionais e scanners",
        icone: "printer",
        ordem: 8,
      },
    }),
  ]);

  console.log(`Created ${especialidades.length} especialidades`);

  // Criar Serviços no Catálogo
  const catalogoServicos = await Promise.all([
    // Celulares e Tablets
    prisma.catalogoServico.upsert({
      where: { id: "troca-tela-celular" },
      update: {},
      create: {
        id: "troca-tela-celular",
        especialidadeId: especialidades[0].id,
        nome: "Troca de Tela de Celular",
        descricao: "Substituição completa do display",
        precoMinimo: 150,
        precoMaximo: 600,
        tempoEstimado: 60,
        marcas: ["Apple", "Samsung", "Xiaomi", "Motorola", "Outros"],
      },
    }),
    prisma.catalogoServico.upsert({
      where: { id: "troca-bateria-celular" },
      update: {},
      create: {
        id: "troca-bateria-celular",
        especialidadeId: especialidades[0].id,
        nome: "Troca de Bateria de Celular",
        descricao: "Substituição de bateria com garantia",
        precoMinimo: 80,
        precoMaximo: 250,
        tempoEstimado: 30,
        marcas: ["Apple", "Samsung", "Xiaomi", "Motorola", "Outros"],
      },
    }),
    // Notebooks
    prisma.catalogoServico.upsert({
      where: { id: "troca-tela-notebook" },
      update: {},
      create: {
        id: "troca-tela-notebook",
        especialidadeId: especialidades[1].id,
        nome: "Troca de Tela de Notebook",
        descricao: "Substituição de display LCD/LED",
        precoMinimo: 300,
        precoMaximo: 800,
        tempoEstimado: 90,
        marcas: ["Dell", "HP", "Lenovo", "Apple", "Acer", "Outros"],
      },
    }),
    prisma.catalogoServico.upsert({
      where: { id: "troca-teclado-notebook" },
      update: {},
      create: {
        id: "troca-teclado-notebook",
        especialidadeId: especialidades[1].id,
        nome: "Troca de Teclado de Notebook",
        descricao: "Substituição de teclado completo",
        precoMinimo: 150,
        precoMaximo: 400,
        tempoEstimado: 60,
        marcas: ["Dell", "HP", "Lenovo", "Apple", "Acer", "Outros"],
      },
    }),
    // Computadores
    prisma.catalogoServico.upsert({
      where: { id: "formatacao-pc" },
      update: {},
      create: {
        id: "formatacao-pc",
        especialidadeId: especialidades[2].id,
        nome: "Formatação e Instalação de Sistema",
        descricao: "Formatação, instalação de Windows/Linux e drivers",
        precoMinimo: 80,
        precoMaximo: 200,
        tempoEstimado: 120,
        marcas: ["Todos"],
      },
    }),
    prisma.catalogoServico.upsert({
      where: { id: "limpeza-pc" },
      update: {},
      create: {
        id: "limpeza-pc",
        especialidadeId: especialidades[2].id,
        nome: "Limpeza e Manutenção de PC",
        descricao: "Limpeza interna, troca de pasta térmica",
        precoMinimo: 60,
        precoMaximo: 150,
        tempoEstimado: 60,
        marcas: ["Todos"],
      },
    }),
    // TVs
    prisma.catalogoServico.upsert({
      where: { id: "reparo-tv-led" },
      update: {},
      create: {
        id: "reparo-tv-led",
        especialidadeId: especialidades[3].id,
        nome: "Reparo de TV LED/LCD",
        descricao: "Diagnóstico e reparo de placas e componentes",
        precoMinimo: 150,
        precoMaximo: 500,
        tempoEstimado: 120,
        marcas: ["Samsung", "LG", "Sony", "TCL", "Outros"],
      },
    }),
    // Videogames
    prisma.catalogoServico.upsert({
      where: { id: "reparo-ps5" },
      update: {},
      create: {
        id: "reparo-ps5",
        especialidadeId: especialidades[4].id,
        nome: "Reparo de PlayStation",
        descricao: "Reparo de PS4, PS5, troca de HD/SSD, limpeza",
        precoMinimo: 100,
        precoMaximo: 400,
        tempoEstimado: 90,
        marcas: ["Sony"],
      },
    }),
    prisma.catalogoServico.upsert({
      where: { id: "reparo-xbox" },
      update: {},
      create: {
        id: "reparo-xbox",
        especialidadeId: especialidades[4].id,
        nome: "Reparo de Xbox",
        descricao: "Reparo de Xbox One, Series X/S, limpeza",
        precoMinimo: 100,
        precoMaximo: 400,
        tempoEstimado: 90,
        marcas: ["Microsoft"],
      },
    }),
  ]);

  console.log(`Created ${catalogoServicos.length} catalogo servicos`);

  // Criar Badges
  const badges = await Promise.all([
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.NOVATO },
      update: {},
      create: {
        tipo: BadgeTipo.NOVATO,
        nome: "Novato",
        descricao: "Completou seu primeiro atendimento",
        icone: "🌱",
        criterio: "Realizar 1 atendimento",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.CONFIAVEL },
      update: {},
      create: {
        tipo: BadgeTipo.CONFIAVEL,
        nome: "Confiável",
        descricao: "10+ atendimentos realizados",
        icone: "🤝",
        criterio: "Realizar 10 atendimentos",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.EXPERT },
      update: {},
      create: {
        tipo: BadgeTipo.EXPERT,
        nome: "Expert",
        descricao: "50+ atendimentos realizados",
        icone: "🎯",
        criterio: "Realizar 50 atendimentos",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.MESTRE },
      update: {},
      create: {
        tipo: BadgeTipo.MESTRE,
        nome: "Mestre",
        descricao: "100+ atendimentos realizados",
        icone: "👑",
        criterio: "Realizar 100 atendimentos",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.CINCO_ESTRELAS },
      update: {},
      create: {
        tipo: BadgeTipo.CINCO_ESTRELAS,
        nome: "5 Estrelas",
        descricao: "Avaliação média acima de 4.8",
        icone: "⭐",
        criterio: "Manter média 4.8+ com pelo menos 20 avaliações",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.RESPOSTA_RAPIDA },
      update: {},
      create: {
        tipo: BadgeTipo.RESPOSTA_RAPIDA,
        nome: "Resposta Rápida",
        descricao: "Tempo médio de resposta menor que 30 minutos",
        icone: "⚡",
        criterio: "Manter tempo médio de resposta < 30 minutos",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.ESPECIALISTA_CELULAR },
      update: {},
      create: {
        tipo: BadgeTipo.ESPECIALISTA_CELULAR,
        nome: "Especialista em Celulares",
        descricao: "20+ reparos em celulares e tablets",
        icone: "📱",
        criterio: "Realizar 20 reparos em celulares/tablets",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.ESPECIALISTA_NOTEBOOK },
      update: {},
      create: {
        tipo: BadgeTipo.ESPECIALISTA_NOTEBOOK,
        nome: "Especialista em Notebooks",
        descricao: "20+ reparos em notebooks",
        icone: "💻",
        criterio: "Realizar 20 reparos em notebooks",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.ESPECIALISTA_TV },
      update: {},
      create: {
        tipo: BadgeTipo.ESPECIALISTA_TV,
        nome: "Especialista em TVs",
        descricao: "20+ reparos em TVs e monitores",
        icone: "📺",
        criterio: "Realizar 20 reparos em TVs/monitores",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.ESPECIALISTA_VIDEOGAME },
      update: {},
      create: {
        tipo: BadgeTipo.ESPECIALISTA_VIDEOGAME,
        nome: "Especialista em Games",
        descricao: "20+ reparos em videogames",
        icone: "🎮",
        criterio: "Realizar 20 reparos em consoles",
      },
    }),
    prisma.badge.upsert({
      where: { tipo: BadgeTipo.ESPECIALISTA_COMPUTADOR },
      update: {},
      create: {
        tipo: BadgeTipo.ESPECIALISTA_COMPUTADOR,
        nome: "Especialista em PCs",
        descricao: "20+ reparos em computadores",
        icone: "🖥️",
        criterio: "Realizar 20 reparos/manutenções em PCs",
      },
    }),
  ]);

  console.log(`Created ${badges.length} badges`);

  // Criar configurações padrão
  await prisma.configuracao.upsert({
    where: { chave: "comissao_plataforma" },
    update: {},
    create: {
      chave: "comissao_plataforma",
      valor: { gratuito: 15, pro: 10, premium: 5 },
      descricao: "Percentual de comissão por plano (%)",
    },
  });

  await prisma.configuracao.upsert({
    where: { chave: "planos_precos" },
    update: {},
    create: {
      chave: "planos_precos",
      valor: { gratuito: 0, pro: 79, premium: 149 },
      descricao: "Preço mensal dos planos (R$)",
    },
  });

  await prisma.configuracao.upsert({
    where: { chave: "timeout_conversa_minutos" },
    update: {},
    create: {
      chave: "timeout_conversa_minutos",
      valor: 30,
      descricao: "Tempo de inatividade para resetar conversa WhatsApp",
    },
  });

  console.log("Created configuracoes");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
