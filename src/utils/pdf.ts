// Utility to export notes as PDF (placeholder)
// Use a library like pdf-lib or jsPDF in the actual implementation
export async function exportNoteAsPDF(note: { title: string; content: string }) {
  // TODO: Implement PDF export logic
  return new Blob([`# ${note.title}\n\n${note.content}`], { type: 'application/pdf' });
}
