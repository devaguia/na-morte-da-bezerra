import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import type { Topic } from '../data/topics';
import { getNextTopic } from '../utils/randomizer';
import { getRandomColor } from '../utils/colors';
import { shareTopic } from '../utils/share';

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

export default function TopicScreen() {
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [currentColor, setCurrentColor] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loaderMessage, setLoaderMessage] = useState<string>(LOADER_MESSAGES[0]);
  const messageIndexRef = useRef<number>(0);

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

  useEffect(() => {
    loadNextTopic();
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      messageIndexRef.current = (messageIndexRef.current + 1) % LOADER_MESSAGES.length;
      setLoaderMessage(LOADER_MESSAGES[messageIndexRef.current]);
    }, LOADER_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleShare = useCallback(async () => {
    if (currentTopic) {
      await shareTopic(currentTopic);
    }
  }, [currentTopic]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: currentColor }]}>
      <Pressable
        style={styles.content}
        disabled={isLoading}
        onPress={loadNextTopic}
      >
        {isLoading ? (
          <Text style={styles.loaderText}>{loaderMessage}</Text>
        ) : (
          <View style={styles.topicContainer}>
            <Text style={styles.title}>{currentTopic?.title}</Text>
            <Text style={styles.expansion}>{currentTopic?.expansion}</Text>
          </View>
        )}
      </Pressable>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleShare} disabled={isLoading || !currentTopic}>
          <Text style={styles.footerButton}>Compartilhar</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  loaderText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '400',
  },
  topicContainer: {
    gap: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  expansion: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
  footer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    gap: 12,
    alignItems: 'center',
  },
  footerButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.75,
    textDecorationLine: 'underline',
  },
});
