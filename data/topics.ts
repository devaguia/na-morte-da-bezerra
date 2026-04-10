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

  // --- filosofico (053–065) ---
  {
    id: '053',
    category: 'filosofico',
    title: 'O medo',
    expansion:
      'O medo protege ou limita? Na maior parte das vezes, aquilo que você mais teme nunca acontece — e mesmo assim moldou suas escolhas.',
  },
  {
    id: '054',
    category: 'filosofico',
    title: 'A solidão',
    expansion:
      'Você consegue estar sozinho sem se sentir sozinho? A diferença entre solidão e isolamento é toda interna.',
  },
  {
    id: '055',
    category: 'filosofico',
    title: 'A inveja',
    expansion:
      'A inveja revela o que você realmente quer, não o que você diz que quer. É um mapa honesto dos seus desejos mais escondidos.',
  },
  {
    id: '056',
    category: 'filosofico',
    title: 'O perdão',
    expansion:
      'Perdoar alguém é mais sobre você do que sobre a outra pessoa. Carregar mágoa custa mais para quem carrega.',
  },
  {
    id: '057',
    category: 'filosofico',
    title: 'A esperança',
    expansion:
      'A esperança é racional? Apostar que o futuro será melhor sem nenhuma evidência concreta pode ser otimismo — ou ilusão necessária.',
  },
  {
    id: '058',
    category: 'filosofico',
    title: 'A beleza',
    expansion:
      'O que você considera belo foi decidido por cultura, experiência e acaso. Beleza universal pode não existir.',
  },
  {
    id: '059',
    category: 'filosofico',
    title: 'O destino',
    expansion:
      'Se tudo que aconteceu tinha que acontecer, o arrependimento faz sentido? Ou é só uma forma de processar o que não podemos mudar?',
  },
  {
    id: '060',
    category: 'filosofico',
    title: 'A justiça',
    expansion:
      'Você quer que o mundo seja justo ou só quer que seja justo com você? A resposta honesta pode surpreender.',
  },
  {
    id: '061',
    category: 'filosofico',
    title: 'O amor',
    expansion:
      'Amor é sentimento ou decisão? Com o tempo, quase todo amor duradouro virou uma escolha repetida todos os dias.',
  },
  {
    id: '062',
    category: 'filosofico',
    title: 'A gratidão',
    expansion:
      'Você agradece mais pelo que tem ou reclama mais do que falta? A proporção diz bastante sobre como você vê sua própria vida.',
  },
  {
    id: '063',
    category: 'filosofico',
    title: 'A coragem',
    expansion:
      'Coragem não é ausência de medo — é agir mesmo com ele. Alguém sem medo não precisa de coragem.',
  },
  {
    id: '064',
    category: 'filosofico',
    title: 'O poder',
    expansion:
      'O poder corrompe ou apenas revela quem a pessoa já era? Quando alguém muda no poder, o que exatamente mudou?',
  },
  {
    id: '065',
    category: 'filosofico',
    title: 'A escolha',
    expansion:
      'Quantas das suas escolhas de hoje foram realmente suas? Hábito, pressão social e contexto respondem por boa parte delas.',
  },

  // --- cientifico (066–077) ---
  {
    id: '066',
    category: 'cientifico',
    title: 'As estrelas',
    expansion:
      'A maioria das estrelas que você vê no céu já não existe. Você está olhando para o passado — alguns milhões de anos atrás.',
  },
  {
    id: '067',
    category: 'cientifico',
    title: 'O coração',
    expansion:
      'O coração bate cerca de 100 mil vezes por dia sem nenhuma instrução consciente sua. Você não controla nem a coisa mais vital que tem.',
  },
  {
    id: '068',
    category: 'cientifico',
    title: 'As bactérias',
    expansion:
      'Seu corpo tem mais células bacterianas do que humanas. Em termos numéricos, você é mais bactéria do que gente.',
  },
  {
    id: '069',
    category: 'cientifico',
    title: 'O fogo',
    expansion:
      'Fogo não é matéria — é um processo químico, uma reação em cadeia de oxidação. A chama que você vê não tem massa.',
  },
  {
    id: '070',
    category: 'cientifico',
    title: 'As abelhas',
    expansion:
      'Abelhas tomam decisões coletivas sem nenhum líder central. A colmeia decide para onde migrar por uma espécie de votação em dança.',
  },
  {
    id: '071',
    category: 'cientifico',
    title: 'A evolução',
    expansion:
      'O apêndice, a cóccix e os pelos do braço são resquícios de ancestrais que viviam de forma completamente diferente. Você carrega partes do passado evolutivo que não servem mais.',
  },
  {
    id: '072',
    category: 'cientifico',
    title: 'O vácuo',
    expansion:
      'O vácuo absoluto não existe. O que chamamos de vácuo está cheio de partículas virtuais que aparecem e desaparecem constantemente.',
  },
  {
    id: '073',
    category: 'cientifico',
    title: 'Os buracos negros',
    expansion:
      'No horizonte de eventos de um buraco negro, o tempo para. Um observador de fora veria você congelar para sempre no momento em que entrou.',
  },
  {
    id: '074',
    category: 'cientifico',
    title: 'A pele',
    expansion:
      'Você troca completamente a camada externa da pele a cada duas a quatro semanas. O que você toca hoje não é o que tocou há um mês.',
  },
  {
    id: '075',
    category: 'cientifico',
    title: 'A temperatura',
    expansion:
      'O frio não existe fisicamente — é apenas a ausência de calor. Você não sente frio; sente a retirada de energia térmica do seu corpo.',
  },
  {
    id: '076',
    category: 'cientifico',
    title: 'Os corvos',
    expansion:
      'Corvos reconhecem rostos humanos, guardam rancor e ensinam filhotes a evitar pessoas específicas. Podem estar falando de você agora.',
  },
  {
    id: '077',
    category: 'cientifico',
    title: 'O cérebro dormindo',
    expansion:
      'O cérebro consome quase a mesma quantidade de energia dormindo e acordado. O que ele faz enquanto você dorme ainda não é completamente entendido.',
  },

  // --- absurdo (078–090) ---
  {
    id: '078',
    category: 'absurdo',
    title: 'O despertador',
    expansion:
      'O despertador foi inventado para te tirar do único momento do dia em que você estava completamente em paz.',
  },
  {
    id: '079',
    category: 'absurdo',
    title: 'O guarda-chuva',
    expansion:
      'O guarda-chuva só é útil quando você o leva. No dia que você leva, não chove. No dia que esquece, dilúvia.',
  },
  {
    id: '080',
    category: 'absurdo',
    title: 'A senha',
    expansion:
      'Você tem dezenas de senhas para provar que é você mesmo. E às vezes erra. O sistema desconfia de você mais do que de qualquer invasor.',
  },
  {
    id: '081',
    category: 'absurdo',
    title: 'O celular',
    expansion:
      'Você checa o celular em média 96 vezes por dia. Em algum momento isso parou de ser um hábito e virou um reflexo involuntário.',
  },
  {
    id: '082',
    category: 'absurdo',
    title: 'As notificações',
    expansion:
      'Você configurou notificações para te avisar de tudo. Agora passa o dia sendo interrompido por atualizações que você mesmo pediu.',
  },
  {
    id: '083',
    category: 'absurdo',
    title: 'O pijama',
    expansion:
      'O pijama existe exclusivamente para ser usado em casa, visto por ninguém, e trocado por uma roupa parecida no dia seguinte.',
  },
  {
    id: '084',
    category: 'absurdo',
    title: 'O metrô',
    expansion:
      'No metrô, dezenas de pessoas fingem que as outras não existem enquanto estão a 20 centímetros de distância. É o único lugar onde isso é considerado educado.',
  },
  {
    id: '085',
    category: 'absurdo',
    title: 'A reunião',
    expansion:
      'A maioria das reuniões poderia ter sido um e-mail. A maioria dos e-mails poderia ter sido uma mensagem. A maioria das mensagens não precisava existir.',
  },
  {
    id: '086',
    category: 'absurdo',
    title: 'O café',
    expansion:
      'Café é uma droga psicoativa consumida socialmente antes das 9h da manhã por pessoas que ficariam inoperantes sem ela. Ninguém acha isso estranho.',
  },
  {
    id: '087',
    category: 'absurdo',
    title: 'A lista de compras',
    expansion:
      'Você vai ao supermercado com uma lista e volta com o dobro do que precisava e sem metade do que foi buscar.',
  },
  {
    id: '088',
    category: 'absurdo',
    title: 'O autocorreto',
    expansion:
      'O autocorreto foi criado para corrigir seus erros. Às vezes ele cria erros novos com tanta confiança que você não percebe até enviar.',
  },
  {
    id: '089',
    category: 'absurdo',
    title: 'O relógio',
    expansion:
      'Você olha para o relógio, não registra a hora, e olha de novo. Isso acontece com todo mundo e ninguém sabe exatamente por quê.',
  },
  {
    id: '090',
    category: 'absurdo',
    title: 'O carregador',
    expansion:
      'O carregador do celular está sempre no único cômodo da casa que você não está. Sem exceção.',
  },

  // --- misto (091–102) ---
  {
    id: '091',
    category: 'misto',
    title: 'A amizade',
    expansion:
      'Amizades adultas raramente são escolhidas — são resíduos de circunstâncias: trabalho, vizinhança, acaso. E mesmo assim algumas duram a vida toda.',
  },
  {
    id: '092',
    category: 'misto',
    title: 'A rotina',
    expansion:
      'A rotina libera o cérebro de decisões repetitivas, mas pode fazer anos inteiros parecerem uma semana. Ela protege e aprisiona ao mesmo tempo.',
  },
  {
    id: '093',
    category: 'misto',
    title: 'A tecnologia',
    expansion:
      'Cada ferramenta que facilita sua vida cria uma nova dependência. Você não pode mais se perder — e também não pode mais se encontrar por acidente.',
  },
  {
    id: '094',
    category: 'misto',
    title: 'O envelhecimento',
    expansion:
      'Com o tempo, os anos passam mais rápido porque cada ano representa uma fração menor da sua vida total. Aos 10 anos, um ano é 10% de tudo. Aos 50, é 2%.',
  },
  {
    id: '095',
    category: 'misto',
    title: 'A confiança',
    expansion:
      'Confiar em alguém é uma aposta sem garantia. Mas desconfiar de todo mundo tem um custo que poucas pessoas conseguem calcular.',
  },
  {
    id: '096',
    category: 'misto',
    title: 'A mudança',
    expansion:
      'Mudar de ideia não é fraqueza — é sinal de que você aprendeu algo novo. A rigidez de opinião costuma ser confundida com integridade.',
  },
  {
    id: '097',
    category: 'misto',
    title: 'O limite',
    expansion:
      'Você não sabe qual é seu limite até chegar nele. E quando chega, frequentemente descobre que ele estava além do que imaginava.',
  },
  {
    id: '098',
    category: 'misto',
    title: 'A distância',
    expansion:
      'A distância física não desfaz vínculos verdadeiros, mas a distância emocional pode acabar com quem está no mesmo quarto.',
  },
  {
    id: '099',
    category: 'misto',
    title: 'O conflito',
    expansion:
      'Todo conflito tem pelo menos duas narrativas igualmente verdadeiras para quem as vive. O problema começa quando só uma delas é contada.',
  },
  {
    id: '100',
    category: 'misto',
    title: 'A aprendizagem',
    expansion:
      'Você aprende mais rápido quando erra do que quando acerta. O cérebro presta mais atenção ao que não funcionou do que ao que funcionou.',
  },
  {
    id: '101',
    category: 'misto',
    title: 'A solidariedade',
    expansion:
      'Humanos são a única espécie que ajuda desconhecidos sem nenhuma vantagem direta. E também a única que constrói sistemas para evitar ter que fazer isso.',
  },
  {
    id: '102',
    category: 'misto',
    title: 'O legado',
    expansion:
      'O que você quer deixar quando não estiver mais aqui? A maioria das pessoas nunca para para responder essa pergunta — e a vida vai respondendo por elas.',
  },
];
