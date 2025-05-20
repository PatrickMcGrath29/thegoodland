export const useSettingsStore = defineStore('settings', () => {
  const searchOpen = ref(false)

  return {
    searchOpen,
  }
})
