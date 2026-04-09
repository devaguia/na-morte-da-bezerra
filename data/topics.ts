export type Topic = {
  id: string;
  category: 'filosofico' | 'cientifico' | 'absurdo' | 'misto';
  title: string;
  expansion: string;
};

export const topics: Topic[] = [];
