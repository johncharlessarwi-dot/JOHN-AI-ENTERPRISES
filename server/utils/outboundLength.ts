/** Allow readable outgoing messages, including tabs and multiline text. */
export function validateOutgoingText(value: unknown): value is string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.length > 4096) {
    return false;
  }

  // Disallow non-printable ASCII controls and DEL, while preserving line breaks.
  return !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200E\u200F\u202A-\u202E\u2066-\u2069]/.test(value);
}
