import { formatToIntelligenceObject } from './intelligenceSchema';
import { sendIntelligenceToCIL } from './cilClient';

/**
 * Main entry point for EME to publish exposure intelligence to CIL.
 * @param {Object} scanResult - The internal EME scan result
 * @returns {Promise<string|null>} - The CIL session ID if successful, else null
 */
export async function publishExposureIntelligence(scanResult) {
  if (!scanResult) return null;

  try {
    // Convert to standardized CIL Intelligence Object
    const intelligenceObject = formatToIntelligenceObject(scanResult);

    // Send to CIL backend
    const sessionId = await sendIntelligenceToCIL(intelligenceObject);

    return sessionId;
  } catch (error) {
    // EME must continue functioning normally. Never throw errors.
    console.error('[CIL] Error during exposure publishing process:', error);
    return null;
  }
}
