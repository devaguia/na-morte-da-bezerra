import AsyncStorage from '@react-native-async-storage/async-storage';
import { topics } from '../data/topics';
import type { Topic } from '../data/topics';

const HISTORY_KEY = '@nadmb:seen_topics';

export async function resetHistory(): Promise<void> {
  await AsyncStorage.removeItem(HISTORY_KEY);
}

export async function getNextTopic(): Promise<Topic> {
  if (topics.length === 0) {
    throw new Error('A lista de assuntos está vazia.');
  }

  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  let seen: string[];
  try {
    seen = raw !== null ? (JSON.parse(raw) as string[]) : [];
  } catch {
    seen = [];
  }

  let available = topics.filter((t) => !seen.includes(t.id));

  if (available.length === 0) {
    await AsyncStorage.removeItem(HISTORY_KEY);
    seen = [];
    available = topics;
  }

  const index = Math.floor(Math.random() * available.length);
  const next = available[index];

  const updated = [...seen, next.id];
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

  return next;
}
