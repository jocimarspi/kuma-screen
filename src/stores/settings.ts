import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const BACKEND_URL_KEY = 'kuma_backend_url'
const ACCESS_TOKEN_KEY = 'kuma_access_token_v2'
const MONITORING_ENABLED_KEY = 'kuma_monitoring_enabled'

export const useSettingsStore = defineStore('settings', () => {
  const backendUrl = ref(
    localStorage.getItem(BACKEND_URL_KEY) || import.meta.env.VITE_UPTIME_KUMA_BACKEND_URL || ''
  )
  const accessToken = ref(localStorage.getItem(ACCESS_TOKEN_KEY) || '')
  const monitoringEnabled = ref(
    !!accessToken.value && localStorage.getItem(MONITORING_ENABLED_KEY) !== 'false'
  )

  watch(backendUrl, (value) => localStorage.setItem(BACKEND_URL_KEY, value))
  watch(accessToken, (value) => localStorage.setItem(ACCESS_TOKEN_KEY, value))
  watch(monitoringEnabled, (value) => localStorage.setItem(MONITORING_ENABLED_KEY, String(value)))

  // Sem chave de API não há o que monitorar: para ao remover e retoma ao configurar.
  watch(accessToken, (value, oldValue) => {
    if (!value) monitoringEnabled.value = false
    else if (!oldValue) monitoringEnabled.value = true
  })

  function save(newBackendUrl: string, newAccessToken: string) {
    backendUrl.value = newBackendUrl.trim().replace(/\/+$/, '')
    accessToken.value = newAccessToken.trim()
  }

  function toggleMonitoring() {
    if (!accessToken.value) return
    monitoringEnabled.value = !monitoringEnabled.value
  }

  return { backendUrl, accessToken, monitoringEnabled, save, toggleMonitoring }
})
