import { Share } from 'react-native';
import type { Topic } from '../data/topics';

export async function shareTopic(topic: Topic): Promise<void> {
  const message = `${topic.title}\n\n${topic.expansion}\n\n— Na morte da bezerra`;
  try {
    await Share.share({ message });
  } catch {
    // Usuário cancelou ou houve erro no share sheet — não propaga
  }
}
