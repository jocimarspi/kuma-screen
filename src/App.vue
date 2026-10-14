<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
</script>

<template>
  <nav class="toolbar">
    <button
      type="button"
      class="toolbar__item"
      :class="settingsStore.monitoringEnabled ? 'toolbar__item--stop' : 'toolbar__item--play'"
      :disabled="!settingsStore.accessToken"
      :title="
        !settingsStore.accessToken
          ? 'Configure a chave de API para iniciar o monitoramento'
          : settingsStore.monitoringEnabled
            ? 'Parar monitoramento'
            : 'Iniciar monitoramento'
      "
      @click="settingsStore.toggleMonitoring()"
    >
      {{ settingsStore.monitoringEnabled ? '⏸︎' : '▶︎' }}
    </button>
    <RouterLink to="/settings" class="toolbar__item" title="Configurações">⚙</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
.toolbar {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 10;
}

.toolbar__item {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--white-soft);
  text-decoration: none;
  opacity: 0.6;
}

.toolbar__item--play {
  color: var(--up-monitors);
}

.toolbar__item--stop {
  color: var(--down-monitors);
}

.toolbar__item:hover {
  opacity: 1;
}

.toolbar__item:disabled {
  cursor: not-allowed;
  opacity: 0.25;
}
</style>
