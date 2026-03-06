// Daily goals tracker utility
export function getTodayGoals(goals: { date: string; goals: string[] }[]) {
  const today = new Date().toISOString().slice(0, 10);
  return goals.find((g) => g.date === today)?.goals || [];
}
