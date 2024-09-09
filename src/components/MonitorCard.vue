<script setup lang="ts">

  import { defineProps } from 'vue';

  const props = defineProps<{
    title: string;
    status?: string;
  }>();

</script>


<!-- 
Monitor Status (1 = UP, 0= DOWN, 2= PENDING, 3= MAINTENANCE)
-->


<template>

  <div :class="['monitor', status]">
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
    background-color: #e7c52d;
  }

  .monitor--up {
    background-color: #21b830;
  }

  .monitor--down {
    background-color: #e22929;
    animation: pulse 1s infinite;
  }

</style>