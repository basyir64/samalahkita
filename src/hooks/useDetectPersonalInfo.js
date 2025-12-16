export default function containsPersonalInfo(text) {
  // Email
  if (/@/.test(text)) return true;

  // URL
  if (/https?:\/\/|www\./i.test(text)) return true;

  // Phone: too many digits
  const digits = text.replace(/\D/g, "");
  if (digits.length >= 8) return true;

  return false;
}
