export default function containsPersonalInfo(text) {
  // Email
  if (/@/.test(text)) return true;

  // URL
  if (/\b(?:https?:\/\/|www\.)?[a-z0-9-]+(?:\.[a-z]{2,})(?:\.[a-z]{2})?\b/i.test(text)) {
    return true;
  }

  // Phone: too many digits
  const digits = text.replace(/\D/g, "");
  if (digits.length >= 4) return true;

  return false;
}
