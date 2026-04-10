import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import type { Topic } from '../data/topics';
import { navigateForward, navigateBack } from '../utils/navigator';
import { shareTopicAsImage, copyTopic } from '../utils/share';

const LOADER_MESSAGES = [
  'pensando...',
  'procurando assunto...',
  'consultando a bezerra...',
  'sorteando...',
  'organizando os neurônios...',
  'buscando algo interessante...',
  'deixa eu ver aqui...',
  'um segundo...',
];

const LOADER_INTERVAL_MS = 700;

const CATEGORY_LABELS: Record<Topic['category'], string> = {
  filosofico: 'filosófico',
  cientifico: 'científico',
  absurdo: 'absurdo',
  misto: 'misto',
};

// Largura do card de captura — igual ao card exibido no preview (margens de 32 cada lado)
const CARD_WIDTH = Dimensions.get('window').width - 64;

type ShareCardProps = {
  topic: Topic;
  color: string;
  categoryLabel: string;
};

function ShareCard({ topic, color, categoryLabel }: ShareCardProps) {
  return (
    <View style={[styles.shareCard, { backgroundColor: color }]}>
      <Text style={styles.shareCategory}>{categoryLabel}</Text>
      <Text style={styles.shareTitle}>{topic.title}</Text>
      <Text style={styles.shareExpansion}>{topic.expansion}</Text>
      <Text style={styles.shareSignature}>
        Tá pensando em quê? — Na morte da bezerra.
      </Text>
    </View>
  );
}

export default function TopicScreen() {
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [currentColor, setCurrentColor] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loaderMessage, setLoaderMessage] = useState<string>(LOADER_MESSAGES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSharePreviewVisible, setIsSharePreviewVisible] = useState<boolean>(false);
  const messageIndexRef = useRef<number>(0);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const captureWrapperRef = useRef<View | null>(null);

  const handleNext = useCallback(async () => {
    setIsLoading(true);
    const entry = await navigateForward();
    setCurrentTopic(entry.topic);
    setCurrentColor(entry.color);
    setIsLoading(false);
  }, []);

  const handlePrevious = useCallback(async () => {
    setIsLoading(true);
    const prev = navigateBack();
    const entry = prev ?? await navigateForward();
    setCurrentTopic(entry.topic);
    setCurrentColor(entry.color);
    setIsLoading(false);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleNext(); }, []);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      messageIndexRef.current = (messageIndexRef.current + 1) % LOADER_MESSAGES.length;
      setLoaderMessage(LOADER_MESSAGES[messageIndexRef.current]);
    }, LOADER_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleShare = useCallback(() => {
    setIsSharePreviewVisible(true);
  }, []);

  const handleConfirmShare = useCallback(() => {
    shareTopicAsImage(captureWrapperRef).finally(() => {
      setIsSharePreviewVisible(false);
    });
  }, []);

  const handleCancelShare = useCallback(() => {
    setIsSharePreviewVisible(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!currentTopic) return;
    await copyTopic(currentTopic);
    setCopied(true);
    if (copyTimeoutRef.current !== null) {
      clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [currentTopic]);

  return (
    /*
     * Root View com overflow: 'visible' — permite que o captureWrapper seja
     * posicionado fora dos limites visíveis sem ser recortado pelo layout,
     * e garante que o captureRef consiga ler seus pixels mesmo fora da tela.
     */
    <View style={styles.root}>
      {/*
       * View de captura: irmã do SafeAreaView, posicionada fora da tela
       * à esquerda. Fica fora do SafeAreaView para nunca ser confundida
       * com o conteúdo visível. O ref aponta para cá — captureRef captura
       * este View independentemente da posição na tela.
       */}
      {currentTopic && (
        <View
          ref={captureWrapperRef}
          collapsable={false}
          pointerEvents="none"
          style={[styles.captureWrapper, { width: CARD_WIDTH }]}
        >
          <ShareCard
            topic={currentTopic}
            color={currentColor}
            categoryLabel={CATEGORY_LABELS[currentTopic.category]}
          />
        </View>
      )}

      <SafeAreaView style={[styles.safe, { backgroundColor: currentColor }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Na Morte da Bezerra</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.touchRow}>
            <Pressable
              style={styles.touchZone}
              disabled={isLoading}
              onPress={handlePrevious}
            />
            <Pressable
              style={styles.touchZone}
              disabled={isLoading}
              onPress={handleNext}
            />
          </View>
          <View style={styles.contentDisplay} pointerEvents="none">
            {isLoading ? (
              <Text style={styles.loaderText}>{loaderMessage}</Text>
            ) : (
              <View style={styles.topicContainer}>
                {currentTopic && (
                  <Text style={styles.category}>
                    {CATEGORY_LABELS[currentTopic.category]}
                  </Text>
                )}
                <Text
                  style={styles.title}
                  adjustsFontSizeToFit
                  numberOfLines={3}
                  minimumFontScale={0.65}
                  android_hyphenationFrequency="full"
                >
                  {currentTopic?.title}
                </Text>
                <Text style={styles.expansion}>{currentTopic?.expansion}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerActions}>
            <TouchableOpacity
              onPress={handleShare}
              disabled={isLoading || !currentTopic}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons
                name="share-social-outline"
                size={26}
                color="#FFFFFF"
                style={[styles.actionIcon, (isLoading || !currentTopic) && styles.actionIconDisabled]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCopy}
              disabled={isLoading || !currentTopic}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons
                name={copied ? 'checkmark-outline' : 'copy-outline'}
                size={26}
                color="#FFFFFF"
                style={[styles.actionIcon, (isLoading || !currentTopic) && styles.actionIconDisabled]}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.push('/suggest')}>
            <Text style={styles.footerLink}>Sugerir novos assuntos</Text>
          </TouchableOpacity>
        </View>

        {isSharePreviewVisible && currentTopic && (
          <View style={styles.previewOverlay}>
            <BlurView style={StyleSheet.absoluteFill} intensity={30} tint="dark" />
            <Pressable style={StyleSheet.absoluteFill} onPress={handleCancelShare} />
            <View style={styles.previewContent} pointerEvents="box-none">
              <ShareCard
                topic={currentTopic}
                color={currentColor}
                categoryLabel={CATEGORY_LABELS[currentTopic.category]}
              />
              <View style={styles.previewActions}>
                <TouchableOpacity
                  style={[styles.previewButtonShare, { backgroundColor: '#FFFFFF' }]}
                  onPress={handleConfirmShare}
                >
                  <Text style={[styles.previewButtonShareText, { color: currentColor }]}>
                    Compartilhar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.previewButtonCancel}
                  onPress={handleCancelShare}
                >
                  <Text style={styles.previewButtonCancelText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Wrapper raiz: overflow visible para não recortar o captureWrapper fora da tela
  root: {
    flex: 1,
    overflow: 'visible',
  },
  // View de captura: posicionada fora da tela à esquerda, irmã do SafeAreaView
  captureWrapper: {
    position: 'absolute',
    left: -(CARD_WIDTH + 100),
    top: 0,
  },
  safe: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'BJCree-Bold',
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.9,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  contentContainer: {
    flex: 1,
  },
  touchRow: {
    flexDirection: 'row',
    flex: 1,
  },
  touchZone: {
    flex: 1,
  },
  contentDisplay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  loaderText: {
    fontFamily: 'BJCree-Regular',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  topicContainer: {
    gap: 16,
    alignItems: 'center',
  },
  category: {
    fontFamily: 'BJCree-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: {
    fontFamily: 'BJCree-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  expansion: {
    fontFamily: 'BJCree-Regular',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    gap: 12,
    alignItems: 'center',
  },
  footerActions: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  actionIcon: {
    opacity: 0.9,
  },
  actionIconDisabled: {
    opacity: 0.35,
  },
  footerLink: {
    fontFamily: 'BJCree-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.75,
    textDecorationLine: 'underline',
  },
  // Share preview overlay
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  previewContent: {
    marginHorizontal: 32,
    alignSelf: 'stretch',
    gap: 16,
  },
  // ShareCard — sem borderRadius: a imagem gerada é retangular (sem cantos arredondados)
  shareCard: {
    paddingHorizontal: 28,
    paddingVertical: 32,
  },
  shareCategory: {
    fontFamily: 'BJCree-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'left',
    marginBottom: 12,
  },
  shareTitle: {
    fontFamily: 'BJCree-Bold',
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 16,
  },
  shareExpansion: {
    fontFamily: 'BJCree-Regular',
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'left',
    lineHeight: 26,
    marginBottom: 24,
  },
  shareSignature: {
    fontFamily: 'BJCree-Medium',
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  // Preview action buttons
  previewActions: {
    gap: 8,
    alignItems: 'center',
  },
  previewButtonShare: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  previewButtonShareText: {
    fontFamily: 'BJCree-Bold',
    fontSize: 16,
  },
  previewButtonCancel: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  previewButtonCancelText: {
    fontFamily: 'BJCree-Medium',
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.75,
  },
});
