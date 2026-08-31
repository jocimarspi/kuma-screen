<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink to="/settings" class="settings-link" title="Configurações">⚙</RouterLink>
  <RouterView />
</template>

<style scoped>
.settings-link {
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: var(--white-soft);
  text-decoration: none;
  opacity: 0.6;
  z-index: 10;
}

.settings-link:hover {
  opacity: 1;
}
</style>
