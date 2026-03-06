// Backup & restore utility (placeholder)
export async function backupData(data: any) {
  // TODO: Implement backup logic (e.g., export as JSON)
  return new Blob([JSON.stringify(data)], { type: 'application/json' });
}

export async function restoreData(blob: Blob) {
  // TODO: Implement restore logic
  const text = await blob.text();
  return JSON.parse(text);
}
