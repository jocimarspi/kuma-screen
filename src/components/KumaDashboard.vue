<script setup lang="ts">

  import {ref, onMounted, onUnmounted, watch} from 'vue';
  import MonitorCard from './MonitorCard.vue';
  import parsePrometheusTextFormat from 'parse-prometheus-text-format'
  import kumaService from '@/services/kuma-service';

  const monitorStatuses = ref(null)
  const updateTimer = ref(0)
  const lastUpdate = ref<string>('')

  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são indexados a partir de 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} • ${hours}:${minutes}:${seconds}`;
  }

  async function startTimer() {
     updateTimer.value = setInterval(async () => {
      monitorStatuses.value =  await kumaService.getMonitorStatus()
    }, 10000)
  }

  function stopTimer() {
    clearInterval(updateTimer.value)
  }

  watch(monitorStatuses, (newValue) => {
    if (newValue) {
      lastUpdate.value = formatDate(new Date()); // Atualiza com a data e hora atuais
    }
  });

  onMounted(async () => {
    monitorStatuses.value =  await kumaService.getMonitorStatus()
    startTimer()
  })

  console.log(monitorStatuses)

  onUnmounted(() => {
    stopTimer()
  })

</script>

<template>
 
  <header>
    <h1 class="title">APLICAÇÕES FÁBRICA</h1>
    <p class="time">Last Update: <span>{{ lastUpdate }}</span></p>
  </header>

  <div id="down-services">
    <h2 class="container__title">DOWN ({{ monitorStatuses ? monitorStatuses.filter(monitor => monitor.value === '0').length : 0 }})</h2>
    <div class="container">

      <MonitorCard 
        v-for="monitorStatus in monitorStatuses?.filter(monitor => monitor.value === '0')" 
        :title="monitorStatus.labels.monitor_name" 
        :key="monitorStatus.labels.monitor_name"
        :status="monitorStatus.value"
      />
      
    </div>
  </div>

  <div id="up-services">
    <h2 class="container__title">UP ({{ monitorStatuses ? monitorStatuses.filter(monitor => monitor.value !== '0').length : 0 }})</h2>
    <div class="container">

      <MonitorCard 
        v-for="monitorStatus in monitorStatuses?.filter(monitor => monitor.value !== '0')" 
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