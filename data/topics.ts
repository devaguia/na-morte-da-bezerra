export type Topic = {
  id: string;
  category: 'filosofico' | 'cientifico' | 'absurdo' | 'misto';
  title: string;
  expansion: string;
};

export const topics: Topic[] = [
  // --- filosofico (001–013) ---
  {
    id: '001',
    category: 'filosofico',
    title: 'A consciência',
    expansion: 'Se você não tivesse memória, você ainda seria você?',
  },
  {
    id: '002',
    category: 'filosofico',
    title: 'O livre-arbítrio',
    expansion:
      'Você já tomou uma decisão que não foi influenciada por nada nem ninguém?',
  },
  {
    id: '003',
    category: 'filosofico',
    title: 'A identidade',
    expansion:
      'Você é a mesma pessoa de dez anos atrás ou só usa o mesmo nome?',
  },
  {
    id: '004',
    category: 'filosofico',
    title: 'O tempo',
    expansion:
      'Por que o tempo parece passar mais rápido quando você está feliz e mais devagar quando está entediado?',
  },
  {
    id: '005',
    category: 'filosofico',
    title: 'A felicidade',
    expansion:
      'Você busca felicidade ou busca evitar sofrimento? A diferença importa mais do que parece.',
  },
  {
    id: '006',
    category: 'filosofico',
    title: 'O arrependimento',
    expansion:
      'Você se arrepende mais das coisas que fez ou das que nunca tentou?',
  },
  {
    id: '007',
    category: 'filosofico',
    title: 'O propósito',
    expansion:
      'Você escolheu o que quer da vida ou foi apenas aceitando o que apareceu?',
  },
  {
    id: '008',
    category: 'filosofico',
    title: 'A realidade',
    expansion:
      'Como você sabe que o que você percebe é o que realmente existe?',
  },
  {
    id: '009',
    category: 'filosofico',
    title: 'A morte',
    expansion:
      'Se você soubesse a data exata da sua morte, viveria de forma diferente?',
  },
  {
    id: '010',
    category: 'filosofico',
    title: 'A verdade',
    expansion: 'Existe alguma verdade que você prefere não saber?',
  },
  {
    id: '011',
    category: 'filosofico',
    title: 'O silêncio',
    expansion:
      'Quando foi a última vez que você ficou em silêncio sem precisar preencher o espaço?',
  },
  {
    id: '012',
    category: 'filosofico',
    title: 'A empatia',
    expansion:
      'Você consegue imaginar o mundo sendo exatamente como outra pessoa o vê — com as memórias, medos e referências dela?',
  },
  {
    id: '013',
    category: 'filosofico',
    title: 'O presente',
    expansion:
      'Quantas horas do seu dia você passa de fato no presente, sem revisitar o passado ou antecipar o futuro?',
  },

  // --- cientifico (014–026) ---
  {
    id: '014',
    category: 'cientifico',
    title: 'O sono',
    expansion:
      'Durante o sono, seu cérebro consolida memórias descartando informações irrelevantes. Ele sabe mais do que você sobre o que importa.',
  },
  {
    id: '015',
    category: 'cientifico',
    title: 'As formigas',
    expansion:
      'Formigas existem há 140 milhões de anos. Humanos, há 300 mil. Quem está de passagem aqui?',
  },
  {
    id: '016',
    category: 'cientifico',
    title: 'A memória',
    expansion:
      'Cada vez que você lembra de algo, está lembrando da última vez que lembrou — a memória original já foi alterada.',
  },
  {
    id: '017',
    category: 'cientifico',
    title: 'A luz do sol',
    expansion:
      'A luz que chega até você saiu do núcleo solar há cerca de 100 mil anos antes de escapar pela superfície. O calor de hoje é bem antigo.',
  },
  {
    id: '018',
    category: 'cientifico',
    title: 'O DNA',
    expansion:
      'Você compartilha 60% do seu DNA com uma banana. A questão é o que fazer com os outros 40%.',
  },
  {
    id: '019',
    category: 'cientifico',
    title: 'Os neurônios',
    expansion:
      'Seu cérebro tem cerca de 86 bilhões de neurônios. Nenhum deles sabe que existe.',
  },
  {
    id: '020',
    category: 'cientifico',
    title: 'O olfato',
    expansion:
      'O olfato é o único sentido que chega direto à amígdala, sem passar pelo tálamo. Por isso cheiros evocam memórias tão vividamente.',
  },
  {
    id: '021',
    category: 'cientifico',
    title: 'A gravidade',
    expansion:
      'A gravidade não é uma força — é a curvatura do espaço-tempo. Você não está sendo puxado para baixo; está seguindo a geometria do universo.',
  },
  {
    id: '022',
    category: 'cientifico',
    title: 'Os fungos',
    expansion:
      'Fungos se comunicam por redes subterrâneas de filamentos. As árvores de uma floresta estão trocando nutrientes agora mesmo.',
  },
  {
    id: '023',
    category: 'cientifico',
    title: 'A água',
    expansion:
      'A água que você bebeu hoje já passou por dinossauros, mares pré-históricos e provavelmente pela bexiga de alguém famoso.',
  },
  {
    id: '024',
    category: 'cientifico',
    title: 'O tempo geológico',
    expansion:
      'Se a história da Terra fosse um ano, os humanos aparecem nos últimos 23 minutos do dia 31 de dezembro.',
  },
  {
    id: '025',
    category: 'cientifico',
    title: 'Os polvos',
    expansion:
      'Polvos têm três corações, sangue azul e dois terços dos neurônios ficam nos tentáculos. Cada braço pensa meio que sozinho.',
  },
  {
    id: '026',
    category: 'cientifico',
    title: 'O universo observável',
    expansion:
      'O universo observável tem 93 bilhões de anos-luz de diâmetro. A parte que não conseguimos ver é provavelmente muito maior.',
  },

  // --- absurdo (027–039) ---
  {
    id: '027',
    category: 'absurdo',
    title: 'A fila',
    expansion:
      'Por que a fila ao lado sempre anda mais rápido? Porque você está na sua.',
  },
  {
    id: '028',
    category: 'absurdo',
    title: 'O espelho',
    expansion:
      'Você nunca se viu de verdade. O espelho inverte tudo e a câmera distorce. Todo mundo conhece seu rosto melhor do que você.',
  },
  {
    id: '029',
    category: 'absurdo',
    title: 'O nome',
    expansion:
      'Seu nome foi escolhido por pessoas que mal te conheciam. Você passa a vida inteira respondendo por ele.',
  },
  {
    id: '030',
    category: 'absurdo',
    title: 'O umbigo',
    expansion:
      'O umbigo não tem função depois de nascer. É só uma cicatriz que você carrega para sempre sem nenhuma utilidade prática.',
  },
  {
    id: '031',
    category: 'absurdo',
    title: 'O travesseiro',
    expansion:
      'Você passa um terço da vida deitado em cima de uma almofada. Ninguém questiona isso.',
  },
  {
    id: '032',
    category: 'absurdo',
    title: 'O Wi-Fi',
    expansion:
      'A humanidade sobreviveu 300 mil anos sem internet. Hoje, 30 segundos sem sinal causam ansiedade existencial.',
  },
  {
    id: '033',
    category: 'absurdo',
    title: 'A escada rolante',
    expansion:
      'A escada rolante é uma escada que funciona. Mas as pessoas ficam paradas nela como se fosse um elevador.',
  },
  {
    id: '034',
    category: 'absurdo',
    title: 'O aniversário',
    expansion:
      'Todo ano você comemora ter sobrevivido mais um ano no planeta. A festa é basicamente um ritual de alívio disfarçado de celebração.',
  },
  {
    id: '035',
    category: 'absurdo',
    title: 'O botão do elevador',
    expansion:
      'O botão de fechar a porta do elevador muitas vezes não faz nada. Existe só para dar sensação de controle.',
  },
  {
    id: '036',
    category: 'absurdo',
    title: 'A música na cabeça',
    expansion:
      'Às vezes uma música aparece na sua cabeça sem motivo. Você não sabe de onde veio e não consegue tirar.',
  },
  {
    id: '037',
    category: 'absurdo',
    title: 'O tropeço',
    expansion:
      'Você já tropeçou em um lugar completamente plano e olhou para o chão como se a culpa fosse do chão.',
  },
  {
    id: '038',
    category: 'absurdo',
    title: 'O sapato',
    expansion:
      'Em algum momento alguém inventou o sapato esquerdo e o direito. Antes disso, não fazia diferença nenhuma.',
  },
  {
    id: '039',
    category: 'absurdo',
    title: 'O banheiro público',
    expansion:
      'Independente de status, cargo ou fortuna, todo ser humano já ficou preso no banheiro na hora errada.',
  },

  // --- misto (040–052) ---
  {
    id: '040',
    category: 'misto',
    title: 'A saudade',
    expansion:
      'Saudade é sentir falta de algo que talvez nunca tenha existido do jeito que você lembra.',
  },
  {
    id: '041',
    category: 'misto',
    title: 'O tédio',
    expansion:
      'Tédio é o único estado mental que força o cérebro a procurar problemas para resolver. Às vezes é ele que gera suas melhores ideias.',
  },
  {
    id: '042',
    category: 'misto',
    title: 'O riso',
    expansion:
      'Rir é uma resposta neurológica primitiva que humanos evoluíram para fortalecer laços sociais. Piadas ruins também contam.',
  },
  {
    id: '043',
    category: 'misto',
    title: 'A língua materna',
    expansion:
      'A língua que você pensa molda como você percebe o mundo. Em russo, há duas palavras para azul. Eles veem duas cores onde você vê uma.',
  },
  {
    id: '044',
    category: 'misto',
    title: 'O hábito',
    expansion:
      'Aproximadamente 40% das suas ações diárias são hábitos — decisões que você parou de tomar e colocou no piloto automático.',
  },
  {
    id: '045',
    category: 'misto',
    title: 'A criatividade',
    expansion:
      'Toda ideia original é uma combinação de ideias que já existiam. Ninguém cria do nada — só recombina de formas novas.',
  },
  {
    id: '046',
    category: 'misto',
    title: 'O mapa',
    expansion:
      'Nenhum mapa é fiel ao território. A realidade é sempre mais complicada do que qualquer representação que fazemos dela.',
  },
  {
    id: '047',
    category: 'misto',
    title: 'O fracasso',
    expansion:
      'O cérebro aprende mais com erros do que com acertos. Do ponto de vista neurológico, fracassar é mais eficiente do que acertar.',
  },
  {
    id: '048',
    category: 'misto',
    title: 'O otimismo',
    expansion:
      'Otimismo é uma distorção cognitiva — o cérebro subestima riscos para manter você em movimento. Sem ele, talvez você não saísse da cama.',
  },
  {
    id: '049',
    category: 'misto',
    title: 'O dinheiro',
    expansion:
      'Dinheiro é um acordo coletivo de que aquele papel vale alguma coisa. Funciona enquanto todo mundo continua acreditando.',
  },
  {
    id: '050',
    category: 'misto',
    title: 'A cidade',
    expansion:
      'As cidades foram projetadas para carros, não para pessoas. Você adapta seu corpo ao espaço todos os dias sem perceber.',
  },
  {
    id: '051',
    category: 'misto',
    title: 'O trabalho',
    expansion:
      'A maioria das pessoas passa mais tempo com colegas de trabalho do que com a família. A escolha nem sempre foi consciente.',
  },
  {
    id: '052',
    category: 'misto',
    title: 'A infância',
    expansion:
      'Você não lembra dos primeiros três anos de vida, mas eles moldaram boa parte de quem você é hoje.',
  },
];
