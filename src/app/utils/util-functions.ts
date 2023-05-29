export function createId(): string{
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function saveToLocalStorage(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function getFromLocalStorage(key: string) {
  const dataStr = localStorage.getItem(key)
  if (dataStr) return JSON.parse(dataStr)
}
