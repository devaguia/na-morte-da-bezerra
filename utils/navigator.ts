import { getNextTopic } from './randomizer';
import { getRandomColor } from './colors';
import type { Topic } from '../data/topics';

export type NavEntry = {
  topic: Topic;
  color: string;
};

let history: NavEntry[] = [];
let cursor: number = -1;

export async function navigateForward(): Promise<NavEntry> {
  if (cursor < history.length - 1) {
    cursor += 1;
    return history[cursor];
  }

  const topic = await getNextTopic();
  const color = getRandomColor(history[cursor]?.color);
  const entry: NavEntry = { topic, color };
  history.push(entry);
  cursor += 1;
  return entry;
}

export function navigateBack(): NavEntry | null {
  if (cursor <= 0) {
    return null;
  }
  cursor -= 1;
  return history[cursor];
}

export function resetNavigator(): void {
  history = [];
  cursor = -1;
}
