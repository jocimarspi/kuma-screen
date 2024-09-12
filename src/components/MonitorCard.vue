<script setup lang="ts">

  import { defineProps } from 'vue';

  const props = defineProps<{
    title: string;
    status?: string;
  }>();

  function getStatusClass() {
    
    console.log(props)

    switch (props.status) {
      case '0': return 'monitor--down';
      case '1': return 'monitor--up'
      case '2': return 'monitor--pending';
      case '3': return 'monitor--maintenance';
      default: return 'monitor-undefined';
    }
  }

</script>

<template>

  <div :class="['monitor', getStatusClass()]">
    <h4>{{ title }}</h4>
  </div>

</template>

<style>

.monitor {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 30px;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    border-radius: 0.5vw;
    width: 100%;
    background-color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
  }

  .monitor--up {
    background-color: #1a9b27;
  }

  .monitor--down {
    background-color: #c51515;
    animation: pulse 1s infinite;
  }

  .monitor--pending {
    background-color: #e7c52d;
    animation: pulse 1s infinite;
  }

  .monitor--maintenance {
    background-color: #2998e2;
    animation: pulse 1s infinite;
  }

</style>