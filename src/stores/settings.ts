import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const BACKEND_URL_KEY = 'kuma_backend_url'
const ACCESS_TOKEN_KEY = 'kuma_access_token'

export const useSettingsStore = defineStore('settings', () => {
  const backendUrl = ref(
    localStorage.getItem(BACKEND_URL_KEY) || import.meta.env.VITE_UPTIME_KUMA_BACKEND_URL || ''
  )
  const accessToken = ref(
    localStorage.getItem(ACCESS_TOKEN_KEY) || import.meta.env.VITE_UPTIME_KUMA_TOKEN || ''
  )

  watch(backendUrl, (value) => localStorage.setItem(BACKEND_URL_KEY, value))
  watch(accessToken, (value) => localStorage.setItem(ACCESS_TOKEN_KEY, value))

  function save(newBackendUrl: string, newAccessToken: string) {
    backendUrl.value = newBackendUrl.trim().replace(/\/+$/, '')
    accessToken.value = newAccessToken.trim()
  }

  return { backendUrl, accessToken, save }
})
