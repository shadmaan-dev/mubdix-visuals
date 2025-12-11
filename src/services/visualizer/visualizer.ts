
export const saveLayer = (p: any) => {
  try {
    localStorage.setItem('projects', JSON.stringify(p));
  } catch { }
}

export const getLayers = () => {
  try {
    const raw = localStorage.getItem('projects');
    if (!raw) return null;
    return JSON.parse(raw) as any;
  } catch {
    return null;
  }
}