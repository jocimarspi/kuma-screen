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
    justify-content: center;
    padding: 0.7vw;
    font-size: 2vw;
    text-align: center;
    height: 5vw;
    border-radius: 0.5vw;
    width: 100%;
    background-color: #adadad;
  }

  .monitor--up {
    background-color: #21b830;
  }

  .monitor--down {
    background-color: #e22929;
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