<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { MonitorStatusEnumLabel, type MonitorStatus } from '@/services/kuma-service'

type MonitorCardDetailsPropsType = {
  monitor: MonitorStatus
  isVisible: boolean
}

const props = defineProps<MonitorCardDetailsPropsType>()

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <button class="modal-close" @click="emit('close')">X</button>
      <div>
        <h3>Detalhes monitor</h3>
        <p>
          Nome: <span class="highlight"> {{ monitor.labels.monitor_name }}</span>
        </p>
        <p>
          Status: <span class="highlight"> {{ MonitorStatusEnumLabel[monitor.value] }}</span>
        </p>

        <div class="more-details">
          <h4>Mais detalhes:</h4>
          <div class="more-details property-list">
            <div v-for="(value, key) in monitor.labels" :key="key">
              <p>
                {{ key }}: <span class="highlight">{{ value }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(220, 220, 220, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--black-soft);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  position: relative;
  min-width: 600px;
  max-width: 90%;
}

.modal-content h3 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: var(--white-soft);
}

.modal-content p {
  margin-bottom: 5px;
}

.more-details {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.more-details h4 {
  margin-top: 10px;
}

.more-details .property-list {
  border: 1px solid var(--white-soft);
  padding: 10px;
  background-color: #343434;
}

.highlight {
  color: var(--yellow-highlight);
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--white-soft);
}
</style>
