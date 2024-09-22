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

function getStatusOrder(monitorStatus: MonitorStatusEnum) {
  return MonitorStatusEnum.UP === monitorStatus ? '999' : monitorStatus
}

const upMonitors = computed(() => {
  return monitorStatuses.value
    ? monitorStatuses.value
        .filter((monitor) => monitor.value !== MonitorStatusEnum.DOWN)
        .sort(
          (a, b) =>
            getStatusOrder(a.value) < getStatusOrder(b.value)
              ? -1
              : getStatusOrder(a.value) > getStatusOrder(b.value)
                ? 1
                : a.labels.monitor_name.localeCompare(b.labels.monitor_name) // a.value.labels.monitor_name.localeCompare(b.value.labels.monitor_name)
        )
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
  monitorStatuses.value = await kumaService.getMonitorStatus()
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

  <div v-if="downMonitors?.length > 0" id="down-services">
    <h2 class="container__title">DOWN ({{ downMonitors?.length }})</h2>
    <div class="container">
      <MonitorCard
        v-for="monitorStatus in downMonitors"
        :title="monitorStatus.labels.monitor_name"
        :key="monitorStatus.labels.monitor_name"
        :status="monitorStatus.value"
      />
    </div>
  </div>

  <div v-if="upMonitors?.length > 0" id="up-services">
    <h2 class="container__title">UP ({{ upMonitors?.length }})</h2>
    <div class="container">
      <MonitorCard
        v-for="monitorStatus in upMonitors"
        :title="monitorStatus.labels.monitor_name"
        :key="monitorStatus.labels.monitor_name"
        :status="monitorStatus.value"
      />
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
  font-size: 4rem;
  font-weight: 700;
  color: #acacac;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #acacac;
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
  font-size: 2rem;
  font-weight: 300;
  color: #acacac;
}

.time span {
  font-weight: 700;
  color: #ffffff;
}
</style>
