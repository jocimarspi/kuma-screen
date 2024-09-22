<script setup lang="ts">
import { defineProps } from 'vue'
import { MonitorStatusEnum } from '@/services/kuma-service'

const props = defineProps<{
  title: string
  status?: MonitorStatusEnum
}>()

function getStatusClass() {
  switch (props.status) {
    case MonitorStatusEnum.DOWN:
      return 'monitor--down'
    case MonitorStatusEnum.UP:
      return 'monitor--up'
    case MonitorStatusEnum.PENDING:
      return 'monitor--pending'
    case MonitorStatusEnum.MAINTANING:
      return 'monitor--maintenance'
    default:
      return 'monitor-undefined'
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
  animation: pulse 0.5s ease-in-out infinite alternate;
}

.monitor--pending {
  background-color: #e7c52d;
  animation: pulse 0.5s ease-in-out infinite alternate;
}

.monitor--maintenance {
  background-color: #2998e2;
  animation: pulse 0.5s ease-in-out infinite alternate;
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
