/**
 * Client for communicating with the CIL integration API.
 */
export async function sendIntelligenceToCIL(intelligenceObject) {
  try {
    const response = await fetch('/api/cil/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(intelligenceObject),
    });

    if (!response.ok) {
      console.warn(`[CIL] API responded with status ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data?.sessionId || null;
  } catch (error) {
    // EME must continue functioning normally. Never throw errors.
    console.error('[CIL] Failed to publish exposure intelligence:', error);
    return null;
  }
}
