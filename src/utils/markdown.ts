// Utility to export notes as Markdown
export function exportNoteAsMarkdown(note: { title: string; content: string }) {
  return `# ${note.title}\n\n${note.content}`;
}
