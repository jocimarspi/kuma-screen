<script setup lang="ts">

  import {ref, onMounted, onUnmounted} from 'vue';
  import MonitorCard from './MonitorCard.vue';
  import parsePrometheusTextFormat from 'parse-prometheus-text-format'
  import kumaService from '@/services/kuma-service';

  const monitorsStatus = ref(null)
  const updateTimer = ref(0)

  async function startTimer() {
     updateTimer.value = setInterval(async () => {
      monitorsStatus.value =  await kumaService.getMonitorStatus()
    }, 10000)
  }

  function stopTimer() {
    clearInterval(updateTimer.value)
  }

  onMounted(async () => {
    monitorsStatus.value =  await kumaService.getMonitorStatus()
    startTimer()
  })

  onUnmounted(() => {
    stopTimer()
  })

</script>

<template>
  
  <header>
    <h1 class="title">APLICAÇÕES FÁBRICA</h1>
    <span class="time">01/08/2024 22:35:46</span>
  </header>

  <div id="down-services">
    <h2 class="container__title">DOWN (4)</h2>
    <div class="container">

      <MonitorCard 
        v-for="monitorStatus in monitorsStatus" 
        :title="monitorStatus.labels.monitor_name" 
        :key="monitorStatus.labels.monitor_name"
        :status="monitorStatus.value"
      />
      
    </div>
  </div>

  <div id="up-services">
    <h2 class="container__title">UP (85)</h2>
    <div class="container">

      <MonitorCard 
        v-for="monitorStatus in monitorsStatus" 
        :title="monitorStatus.labels.monitor_name" 
        :key="monitorStatus.labels.monitor_name"
        :status="monitorStatus.value"
      />
    </div>
  </div>

  <footer>
    <p><strong>Jociardo & Ricimar</strong> - Todos os diretiros reservados.</p>
  </footer>

</template>



<style scoped>

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4vw;
  }

  h1 {
    font-size: 2vw;
  }

  h2 {
    font-size: 1.5vw;
  }

  h4 {
    margin: 0;
    vertical-align: middle;
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
    font-size: 1vw;
  }

  footer {
    margin-top: 60px;
  }
  footer p {
    text-align: center;
    letter-spacing: 0.2em;
  }

</style>