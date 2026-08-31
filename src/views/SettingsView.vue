<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import kumaService from '@/services/kuma-service'

const settingsStore = useSettingsStore()
const router = useRouter()

const backendUrl = ref(settingsStore.backendUrl)
const accessToken = ref(settingsStore.accessToken)
const showToken = ref(false)

type TestStatus = 'idle' | 'testing' | 'success' | 'error'
const testStatus = ref<TestStatus>('idle')
const testErrorMessage = ref('')

async function testConnection() {
  testStatus.value = 'testing'
  try {
    await kumaService.testConnection(backendUrl.value, accessToken.value)
    testStatus.value = 'success'
  } catch (error: any) {
    testStatus.value = 'error'
    testErrorMessage.value = error?.message || 'Falha ao conectar'
  }
}

function save() {
  settingsStore.save(backendUrl.value, accessToken.value)
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="settings">
    <h1 class="settings__title">Configurações</h1>

    <form class="settings__form" @submit.prevent="save">
      <label class="field">
        <span class="field__label">URL do backend</span>
        <input
          v-model="backendUrl"
          type="url"
          placeholder="https://uptime.exemplo.com"
          required
        />
      </label>

      <label class="field">
        <span class="field__label">Token de acesso</span>
        <div class="field__token">
          <input
            v-model="accessToken"
            :type="showToken ? 'text' : 'password'"
            placeholder="uk2_..."
            required
          />
          <button type="button" class="field__toggle" @click="showToken = !showToken">
            {{ showToken ? 'Ocultar' : 'Mostrar' }}
          </button>
        </div>
      </label>

      <div class="settings__actions">
        <button
          type="button"
          class="button button--secondary"
          :disabled="testStatus === 'testing'"
          @click="testConnection"
        >
          {{ testStatus === 'testing' ? 'Testando...' : 'Testar conexão' }}
        </button>
        <button type="submit" class="button button--primary">Salvar</button>
      </div>

      <p v-if="testStatus === 'success'" class="feedback feedback--success">
        Conexão OK.
      </p>
      <p v-if="testStatus === 'error'" class="feedback feedback--error">
        Falha na conexão: {{ testErrorMessage }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.settings {
  max-width: 480px;
  margin: 4rem auto;
}

.settings__title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--white-soft);
  margin-bottom: 2rem;
}

.settings__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field__label {
  font-weight: 500;
}

.field input {
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--black-mute);
  background: var(--black-soft);
  color: var(--white-soft);
  font-family: inherit;
  font-size: 1rem;
}

.field__token {
  display: flex;
  gap: 0.5rem;
}

.field__token input {
  flex: 1;
}

.field__toggle {
  padding: 0 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--black-mute);
  background: var(--black-soft);
  color: var(--white-soft);
  cursor: pointer;
}

.settings__actions {
  display: flex;
  gap: 1rem;
}

.button {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  font-weight: 700;
  cursor: pointer;
}

.button--primary {
  background: var(--yellow-highlight);
  color: var(--black);
}

.button--secondary {
  background: var(--black-soft);
  color: var(--white-soft);
  border: 1px solid var(--black-mute);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.feedback {
  font-weight: 500;
}

.feedback--success {
  color: var(--up-monitors);
}

.feedback--error {
  color: var(--down-monitors);
}
</style>
