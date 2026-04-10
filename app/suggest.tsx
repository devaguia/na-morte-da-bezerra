import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { sendSuggestion } from '../utils/suggestions';

const FADE_DURATION = 320;

export default function SuggestScreen() {
  const [text, setText] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const handleSend = async () => {
    if (text.trim().length === 0) return;
    setIsSending(true);
    try {
      await sendSuggestion(text.trim());
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleRetry = () => {
    setError(false);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.overlay}
    >
      <BlurView style={StyleSheet.absoluteFill} intensity={25} tint="dark" />
      <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />

      <Animated.View style={[styles.sheet, { opacity }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Sugerir assunto</Text>
          <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.closeButton}>Fechar</Text>
          </TouchableOpacity>
        </View>

        {sent ? (
          <View style={styles.successContainer}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>Sugestão enviada!</Text>
            <Text style={styles.successDescription}>
              Obrigado! A vamos analisar sua sugestão com cuidado.
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={handleClose}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        ) : error ? (
          <View style={styles.successContainer}>
            <Text style={styles.successEmoji}>😕</Text>
            <Text style={styles.successTitle}>Não foi possível enviar</Text>
            <Text style={styles.successDescription}>
              Verifique sua conexão e tente novamente.
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={handleRetry}>
              <Text style={styles.backButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Qual assunto você quer sugerir?</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Por que sonhamos com pessoas que nunca vimos?"
              placeholderTextColor="#B0A090"
              value={text}
              onChangeText={setText}
              multiline
              maxLength={300}
              textAlignVertical="top"
              autoFocus
            />
            <Text style={styles.counter}>{text.length}/300</Text>
            <TouchableOpacity
              style={[styles.sendButton, (isSending || text.trim().length === 0) && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={isSending || text.trim().length === 0}
            >
              <Text style={styles.sendButtonText}>
                {isSending ? 'Enviando...' : 'Enviar sugestão'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingBottom: 32,
    maxWidth: 400,
    alignSelf: 'stretch',
    marginHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'BJCree-Bold',
    fontSize: 20,
    color: '#3D2B1F',
  },
  closeButton: {
    fontFamily: 'BJCree-Medium',
    fontSize: 14,
    color: '#8A7060',
  },
  form: {
    paddingHorizontal: 24,
    gap: 12,
  },
  label: {
    fontFamily: 'BJCree-SemiBold',
    fontSize: 15,
    color: '#3D2B1F',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D4C4B8',
    borderRadius: 12,
    padding: 14,
    fontFamily: 'BJCree-Regular',
    fontSize: 15,
    color: '#3D2B1F',
    height: 120,
    backgroundColor: '#FBF3EB',
  },
  counter: {
    fontFamily: 'BJCree-Regular',
    fontSize: 12,
    color: '#B0A090',
    textAlign: 'right',
  },
  sendButton: {
    backgroundColor: '#3D2B1F',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  sendButtonDisabled: {
    opacity: 0.35,
  },
  sendButtonText: {
    fontFamily: 'BJCree-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  successContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 12,
  },
  successEmoji: {
    fontSize: 48,
  },
  successTitle: {
    fontFamily: 'BJCree-Bold',
    fontSize: 22,
    color: '#3D2B1F',
    textAlign: 'center'
  },
  successDescription: {
    fontFamily: 'BJCree-Regular',
    fontSize: 15,
    color: '#8A7060',
    textAlign: 'center',
    lineHeight: 22,
  },
  backButton: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: '#FBF3EB',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#D4C4B8',
  },
  backButtonText: {
    fontFamily: 'BJCree-SemiBold',
    fontSize: 15,
    color: '#3D2B1F',
  },
});
