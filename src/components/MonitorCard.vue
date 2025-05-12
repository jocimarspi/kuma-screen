<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { MonitorStatusEnum, type MonitorStatus } from '@/services/kuma-service'

export type MonitorStatusPropsType = {
  monitor: MonitorStatus
}

const props = defineProps<MonitorStatusPropsType>()

const emit = defineEmits(['open-details'])

function getStatusClass() {
  switch (props.monitor.value) {
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
  <div :class="['monitor', getStatusClass()]" @click="emit('open-details', { monitor })">
    <h4>{{ monitor.labels.monitor_name }}</h4>
  </div>
</template>

<style>
.monitor {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 30px;
  font-size: 2.5vw;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  border-radius: 0.5vw;
  width: 100%;
  background-color: var(--white);
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.monitor--up {
  background-color: var(--up-monitors);
}

.monitor--down {
  background-color: var(--down-monitors);
  animation: pulse 0.5s ease-in-out infinite alternate;
}

.monitor--pending {
  background-color: var(--pending-monitors);
  animation: pulse 0.5s ease-in-out infinite alternate;
}

.monitor--maintenance {
  background-color: var(--maintenance-monitors);
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
