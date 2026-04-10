const PALETTE = [
  '#F4A261', // laranja
  '#E76F51', // coral
  '#2A9D8F', // verde-azulado
  '#E9C46A', // amarelo
  '#264653', // azul escuro
  '#A8DADC', // azul claro
  '#C77DFF', // roxo
  '#80B918', // verde
];

export function getRandomColor(excludeCurrent?: string): string {
  const available = PALETTE.filter((c) => c !== excludeCurrent);
  const pool = available.length > 0 ? available : PALETTE;
  return pool[Math.floor(Math.random() * pool.length)];
}
