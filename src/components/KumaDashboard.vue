<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import MonitorCard from './MonitorCard.vue'
import kumaService, { MonitorStatusEnum, type MonitorStatus } from '@/services/kuma-service'

const monitorStatuses = ref<MonitorStatus[]>()
const updateTimer = ref(0)
const lastUpdate = ref<string>('')

const downMonitors = computed(() => {
  return monitorStatuses.value
    ? monitorStatuses.value.filter((monitor) => monitor.value === MonitorStatusEnum.DOWN)
    : undefined
})

const penddingMonitors = computed(() => {
  return monitorStatuses.value
    ? monitorStatuses.value.filter((monitor) => monitor.value === MonitorStatusEnum.PENDING)
    : undefined
})

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Meses são indexados a partir de 0
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${day}/${month}/${year} • ${hours}:${minutes}:${seconds}`
}

async function updateMonitors() {
  const allMonitors = await kumaService.getMonitorStatus()
  monitorStatuses.value = allMonitors?.filter((monitor) => monitor.labels.monitor_type !== 'group')
}

async function startTimer() {
  updateTimer.value = setInterval(async () => {
    updateMonitors()
  }, 10000) as unknown as number
}

function stopTimer() {
  clearInterval(updateTimer.value)
}

watch(monitorStatuses, (newValue) => {
  if (newValue) {
    lastUpdate.value = formatDate(new Date()) // Atualiza com a data e hora atuais
  }
})

onMounted(async () => {
  updateMonitors()
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <header>
    <h1 class="title">APLICAÇÕES FÁBRICA</h1>
    <p class="time">
      Last Update: <span>{{ lastUpdate }}</span>
    </p>
  </header>

  <div v-if="downMonitors?.length || 0 > 0" id="down-services">
    <h2 class="container__title">
      DOWN (<span class="highlight">{{ downMonitors?.length }}</span> de
      <span class="highlight">{{ monitorStatuses?.length }}</span
      >)
    </h2>
    <div class="container">
      <MonitorCard
        v-for="monitorStatus in downMonitors"
        :title="monitorStatus.labels.monitor_name"
        :key="monitorStatus.labels.monitor_name"
        :status="monitorStatus.value"
      />
    </div>
  </div>

  <div v-if="penddingMonitors?.length || 0 > 0" id="pendding-services">
    <h2 class="container__title">
      PENDING (
      <span class="highlight"> {{ penddingMonitors?.length }}</span> de
      <span class="highlight">{{ monitorStatuses?.length }}</span
      >)
    </h2>
    <div class="container">
      <MonitorCard
        v-for="monitorStatus in penddingMonitors"
        :title="monitorStatus.labels.monitor_name"
        :key="monitorStatus.labels.monitor_name"
        :status="monitorStatus.value"
      />
    </div>
  </div>

  <div
    v-if="(downMonitors?.length || 0) === 0 && (penddingMonitors?.length || 0) === 0"
    class="all-services"
  >
    <div
      v-if="(monitorStatuses?.length || 0) > 0"
      class="all-services__box all-services__box--online"
    >
      <img class="all-services__image" src="/src/assets/check.svg" />
      <h2 class="all-services__text">TUDO ONLINE!</h2>
    </div>

    <div
      v-if="(monitorStatuses?.length || 0) === 0"
      class="all-services__box all-services__box--offline"
    >
      <img class="all-services__image" src="/src/assets/exclamation.svg" />
      <h2 class="all-services__text">MONITORAMENTO FORA DO AR!</h2>
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

h1 {
  font-size: 4vw;
  font-weight: 700;
  color: var(--white-soft);
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--white-soft);
}

.container__title {
  margin-top: 45px;
  margin-bottom: 15px;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.time {
  font-size: 2.5vw;
  font-weight: 300;
  color: var(--white-soft);
}

.time span {
  font-weight: 700;
  color: var(--yellow-highlight);
}

.all-services {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.all-services__box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  border-radius: 2vw;
}

.all-services__box--online {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  border: 0.5vw solid var(--up-monitors);
  padding: 2vw;
  border-radius: 2vw;
}

.all-services__box--offline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  animation: pulse 0.5s ease-in-out infinite alternate;
}

.all-services__image {
  width: 20vw;
}

.all-services__text {
  font-size: 3vw;
}

.highlight {
  font-weight: 700;
  color: var(--yellow-highlight);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.97);
  }
}
</style>
