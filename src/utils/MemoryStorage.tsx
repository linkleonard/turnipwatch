export default function MemoryStorage(): Storage {
  const store = new Map<string, string>();
  
  return {
    getItem(key: string) {
      const value = store.get(key)
      if (value === undefined) {
        return null
      }
      return value
    },
    get length() {
      return store.size;
    },
    clear: store.clear,
    removeItem: store.delete,
    setItem(key: string, value: string) {
      store.set(key, value)
    },
    // Not implemented because its unused
    key(index: number): string | null {
      return null
    }
  }
}