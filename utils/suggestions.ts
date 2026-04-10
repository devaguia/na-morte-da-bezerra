const WEBHOOK_URL = process.env.EXPO_PUBLIC_WEBHOOK_URL;
const TIMEOUT_MS = 10_000;

export async function sendSuggestion(text: string): Promise<void> {
  if (!WEBHOOK_URL) {
    throw new Error('EXPO_PUBLIC_WEBHOOK_URL não configurada.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        suggestion: text,
        timestamp: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    let data: { status: string };
    try {
      data = (await response.json()) as { status: string };
    } catch {
      throw new Error('Resposta inválida do servidor.');
    }

    if (data.status !== 'ok') {
      throw new Error(`Servidor retornou status inesperado: ${data.status}`);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
