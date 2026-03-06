// Basic end-to-end encryption for clipboard sync
export function encrypt(text: string, secret: string): string {
  // Simple XOR encryption (for demo; replace with real crypto in prod)
  return Buffer.from(
    text.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ secret.charCodeAt(i % secret.length))).join('')
  ).toString('base64');
}

export function decrypt(data: string, secret: string): string {
  const decoded = Buffer.from(data, 'base64').toString();
  return decoded.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ secret.charCodeAt(i % secret.length))).join('');
}
