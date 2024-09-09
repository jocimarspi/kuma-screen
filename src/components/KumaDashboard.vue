<script setup lang="ts">

  import MonitorCard from './MonitorCard.vue';

</script>

<template>
  
  <header>
    <h1 class="title">APLICAÇÕES FÁBRICA</h1>
    <span class="time">01/08/2024 22:35:46</span>
  </header>

  <div id="down-services">
    <h2 class="container__title">DOWN (4)</h2>
    <div class="container">

      <MonitorCard title="Monitor Card 1" status="monitor--down" />
      
    </div>
  </div>

  <div id="up-services">
    <h2 class="container__title">UP (85)</h2>
    <div class="container">

      <MonitorCard title="Monitor Card 2" status="monitor--up" />
      <MonitorCard title="Monitor Card 3" />
      <MonitorCard title="Monitor Card 4" status="monitor--up" />
      <MonitorCard title="Monitor Card 5" status="monitor--up" />
      <MonitorCard title="Monitor Card 6" status="monitor--up" />
      <MonitorCard title="Monitor Card 7" status="monitor--up" />
      <MonitorCard title="Monitor Card 8" status="monitor--up" />
      <MonitorCard title="Monitor Card 9" status="monitor--up" />

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