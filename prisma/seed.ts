import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MODALIDADES = [
  "Musculação",
  "Pilates",
  "CrossFit",
  "Yoga",
  "Funcional",
  "Natação",
  "Jiu-Jitsu",
  "Muay Thai",
  "Spinning",
  "Zumba",
];

type SeedAcademia = {
  nome: string;
  descricao: string;
  telefone: string;
  siteUrl?: string;
  instagram?: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cep?: string;
    latitude?: number;
    longitude?: number;
  };
  modalidades: string[];
};

const ACADEMIAS: SeedAcademia[] = [
  {
    nome: "Academia Força Livre",
    descricao: "Academia completa com foco em musculação e treino funcional, estrutura moderna no centro.",
    telefone: "(43) 3321-1001",
    siteUrl: "https://forcalivre.example.com",
    instagram: "@forcalivreacademia",
    endereco: { rua: "Rua Minas Gerais", numero: "450", bairro: "Centro", cep: "86010-907", latitude: -23.3103, longitude: -51.1628 },
    modalidades: ["Musculação", "Funcional", "Spinning"],
  },
  {
    nome: "Studio Pilates Movimento",
    descricao: "Estúdio especializado em Pilates clássico e contemporâneo, aulas individuais e em dupla.",
    telefone: "(43) 3322-2002",
    instagram: "@studiomovimentold",
    endereco: { rua: "Avenida Higienópolis", numero: "1200", bairro: "Higienópolis", cep: "86015-010", latitude: -23.3120, longitude: -51.1710 },
    modalidades: ["Pilates", "Yoga"],
  },
  {
    nome: "CrossFit Londrina Box",
    descricao: "Box oficial de CrossFit com treinadores certificados e turmas todos os dias.",
    telefone: "(43) 3323-3003",
    siteUrl: "https://crossfitlondrinabox.example.com",
    instagram: "@cflondrinabox",
    endereco: { rua: "Rua Pernambuco", numero: "980", bairro: "Centro", cep: "86020-121", latitude: -23.3095, longitude: -51.1655 },
    modalidades: ["CrossFit", "Funcional"],
  },
  {
    nome: "Academia Palhano Fit",
    descricao: "Academia premium na Gleba Palhano com piscina aquecida, musculação e aulas coletivas.",
    telefone: "(43) 3324-4004",
    siteUrl: "https://palhanofit.example.com",
    instagram: "@palhanofit",
    endereco: { rua: "Avenida Ayrton Senna da Silva", numero: "1500", bairro: "Gleba Palhano", cep: "86050-460", latitude: -23.3360, longitude: -51.1790 },
    modalidades: ["Musculação", "Natação", "Spinning", "Zumba"],
  },
  {
    nome: "Espaço Yoga Lumina",
    descricao: "Espaço dedicado a Yoga Hatha, Vinyasa e Ashtanga. Ambiente tranquilo e acolhedor.",
    telefone: "(43) 3325-5005",
    instagram: "@yogalumina",
    endereco: { rua: "Rua Belo Horizonte", numero: "325", bairro: "Centro", cep: "86020-060", latitude: -23.3110, longitude: -51.1640 },
    modalidades: ["Yoga", "Pilates"],
  },
  {
    nome: "Academia Kennedy Shape",
    descricao: "Academia de bairro com preço acessível, aulas coletivas e sala de musculação completa.",
    telefone: "(43) 3326-6006",
    instagram: "@kennedyshape",
    endereco: { rua: "Rua Serra do Cadeado", numero: "80", bairro: "Conjunto Kennedy", cep: "86072-680", latitude: -23.3540, longitude: -51.1845 },
    modalidades: ["Musculação", "Zumba", "Funcional"],
  },
  {
    nome: "Centro de Artes Marciais Samurai",
    descricao: "Academia especializada em artes marciais: Jiu-Jitsu, Muay Thai e defesa pessoal.",
    telefone: "(43) 3327-7007",
    instagram: "@samuraildb",
    endereco: { rua: "Rua São Salvador", numero: "200", bairro: "Shangri-lá", cep: "86070-050", latitude: -23.3482, longitude: -51.1950 },
    modalidades: ["Jiu-Jitsu", "Muay Thai", "Funcional"],
  },
  {
    nome: "Academia Igapó Fitness",
    descricao: "Academia com vista para o lago Igapó, piscina semi-olímpica e sala de musculação ampla.",
    telefone: "(43) 3328-8008",
    siteUrl: "https://igapofitness.example.com",
    instagram: "@igapofitness",
    endereco: { rua: "Avenida Higienópolis", numero: "2800", bairro: "Igapó", cep: "86015-400", latitude: -23.2970, longitude: -51.1545 },
    modalidades: ["Musculação", "Natação", "Yoga"],
  },
  {
    nome: "BoxFight Academia",
    descricao: "Academia de lutas com foco em boxe, muay thai e condicionamento físico.",
    telefone: "(43) 3329-9009",
    instagram: "@boxfightld",
    endereco: { rua: "Rua Goiás", numero: "1750", bairro: "Centro", cep: "86010-500", latitude: -23.3140, longitude: -51.1680 },
    modalidades: ["Muay Thai", "Funcional", "CrossFit"],
  },
  {
    nome: "Studio Corpore Pilates",
    descricao: "Studio boutique de Pilates aparelhos, com atendimento personalizado.",
    telefone: "(43) 3330-1010",
    instagram: "@studiocorpore",
    endereco: { rua: "Avenida Madre Leônia Milito", numero: "650", bairro: "Gleba Palhano", cep: "86055-670", latitude: -23.3345, longitude: -51.1772 },
    modalidades: ["Pilates"],
  },
  {
    nome: "Academia Vida Ativa",
    descricao: "Academia de bairro com ótimo custo-benefício e turmas de dança fitness.",
    telefone: "(43) 3331-1111",
    instagram: "@vidaativacad",
    endereco: { rua: "Rua Paranaguá", numero: "420", bairro: "Vila Nova", cep: "86020-770", latitude: -23.3055, longitude: -51.1590 },
    modalidades: ["Musculação", "Zumba", "Spinning"],
  },
  {
    nome: "Arena Funcional Londrina",
    descricao: "Centro de treinamento funcional ao ar livre com equipamentos modernos e turmas em grupo.",
    telefone: "(43) 3332-2222",
    siteUrl: "https://arenafuncional.example.com",
    instagram: "@arenafuncional",
    endereco: { rua: "Rua Pará", numero: "890", bairro: "Jardim Bancários", cep: "86030-380", latitude: -23.3220, longitude: -51.1860 },
    modalidades: ["Funcional", "CrossFit"],
  },
  {
    nome: "Studio Equilíbrio",
    descricao: "Espaço multidisciplinar: Pilates, Yoga e aulas de meditação guiada.",
    telefone: "(43) 3333-3333",
    instagram: "@studioequilibriold",
    endereco: { rua: "Rua Piauí", numero: "155", bairro: "Centro", cep: "86020-320", latitude: -23.3125, longitude: -51.1635 },
    modalidades: ["Pilates", "Yoga"],
  },
  {
    nome: "Academia TopFit Shangri-lá",
    descricao: "Academia moderna no Shangri-lá com musculação, funcional e spinning.",
    telefone: "(43) 3334-4444",
    instagram: "@topfitshangrila",
    endereco: { rua: "Rua Ibiporã", numero: "75", bairro: "Shangri-lá", cep: "86070-010", latitude: -23.3510, longitude: -51.1975 },
    modalidades: ["Musculação", "Spinning", "Funcional"],
  },
  {
    nome: "Natação Aqua Londrina",
    descricao: "Escola de natação com piscinas aquecidas e turmas para todas as idades.",
    telefone: "(43) 3335-5555",
    siteUrl: "https://aqualondrina.example.com",
    instagram: "@aqualondrina",
    endereco: { rua: "Rua Tocantins", numero: "1980", bairro: "Higienópolis", cep: "86060-290", latitude: -23.3135, longitude: -51.1725 },
    modalidades: ["Natação"],
  },
];

async function main() {
  console.log("🌱  Iniciando seed...");

  await prisma.academiaModalidade.deleteMany();
  await prisma.endereco.deleteMany();
  await prisma.modalidade.deleteMany();
  await prisma.academia.deleteMany();

  const modalidadesCriadas: Record<string, string> = {};
  for (const nome of MODALIDADES) {
    const m = await prisma.modalidade.create({ data: { nome } });
    modalidadesCriadas[nome] = m.id;
  }
  console.log(`✓ ${Object.keys(modalidadesCriadas).length} modalidades criadas`);

  let contador = 0;
  for (const a of ACADEMIAS) {
    const academia = await prisma.academia.create({
      data: {
        nome: a.nome,
        descricao: a.descricao,
        telefone: a.telefone,
        siteUrl: a.siteUrl,
        instagram: a.instagram,
        endereco: { create: a.endereco },
        modalidades: {
          create: a.modalidades.map((nomeMod) => ({
            modalidade: { connect: { id: modalidadesCriadas[nomeMod] } },
          })),
        },
      },
    });
    contador++;
    console.log(`✓ [${contador}/${ACADEMIAS.length}] ${academia.nome}`);
  }

  console.log(`\n✅  Seed concluído: ${contador} academias.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
