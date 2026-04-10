import { Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import type { RefObject } from 'react';
import type { View } from 'react-native';
import type { Topic } from '../data/topics';

type NullableViewRef = RefObject<View | null>;

const DOWNLOAD_URL = 'https://nadmb.app';

export async function shareTopicAsImage(ref: NullableViewRef): Promise<void> {
  try {
    // Aguarda o próximo frame nativo antes de capturar — garante que a View
    // está completamente commitada no canvas (necessário no Android)
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    const uri = await captureRef(ref, {
      format: 'png',
      result: 'tmpfile',
    });
    await Sharing.shareAsync(uri, {
      mimeType: 'image/png',
      dialogTitle: 'Compartilhar assunto',
    });
  } catch {
    // Usuário cancelou ou houve erro na captura/share — não propaga
  }
}

export async function copyTopic(topic: Topic): Promise<void> {
  const text = `${topic.title}\n\n${topic.expansion}\n\nTá pensando em quê? — Na morte da bezerra.`;
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
