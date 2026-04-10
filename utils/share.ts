import { Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import type { Topic } from '../data/topics';

const DOWNLOAD_URL = 'https://nadmb.app';

export async function shareTopic(topic: Topic): Promise<void> {
  const message = `${topic.title}\n\n${topic.expansion}\n\n— Na morte da bezerra`;
  try {
    await Share.share({ message });
  } catch {
    // Usuário cancelou ou houve erro no share sheet — não propaga
  }
}

export async function copyTopic(topic: Topic): Promise<void> {
  const text = `${topic.title}\n\n${topic.expansion}`;
  try {
    await Clipboard.setStringAsync(text);
  } catch {
    // Falha silenciosa — clipboard indisponível ou permissão negada
  }
}

export async function shareDownloadLink(): Promise<void> {
  const message = `Conheça o Na morte da bezerra — um app que te dá assuntos pra pensar.\n\n${DOWNLOAD_URL}`;
  try {
    await Share.share({ message });
  } catch {
    // Usuário cancelou ou houve erro no share sheet — não propaga
  }
}
