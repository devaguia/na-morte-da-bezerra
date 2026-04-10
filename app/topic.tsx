import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import type { Topic } from '../data/topics';
import { getNextTopic } from '../utils/randomizer';
import { getRandomColor } from '../utils/colors';
import { shareTopic, copyTopic } from '../utils/share';

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

export default function TopicScreen() {
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [currentColor, setCurrentColor] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loaderMessage, setLoaderMessage] = useState<string>(LOADER_MESSAGES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const messageIndexRef = useRef<number>(0);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadNextTopic = useCallback(async () => {
    setIsLoading(true);
    const [next, nextColor] = await Promise.all([
      getNextTopic(),
      Promise.resolve(getRandomColor(currentColor)),
    ]);
    setCurrentTopic(next);
    setCurrentColor(nextColor);
    setIsLoading(false);
  }, [currentColor]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadNextTopic(); }, []);

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

  const handleShare = useCallback(async () => {
    if (currentTopic) {
      await shareTopic(currentTopic);
    }
  }, [currentTopic]);

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
    <SafeAreaView style={[styles.safe, { backgroundColor: currentColor }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Na Morte da Bezerra</Text>
      </View>

      <Pressable
        style={styles.content}
        disabled={isLoading}
        onPress={loadNextTopic}
      >
        {isLoading ? (
          <Text style={styles.loaderText}>{loaderMessage}</Text>
        ) : (
          <View style={styles.topicContainer}>
            {currentTopic && (
              <Text style={styles.category}>
                {CATEGORY_LABELS[currentTopic.category]}
              </Text>
            )}
            <Text style={styles.title}>{currentTopic?.title}</Text>
            <Text style={styles.expansion}>{currentTopic?.expansion}</Text>
          </View>
        )}
      </Pressable>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    textTransform: 'uppercase'
  },
  content: {
    flex: 1,
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
});
