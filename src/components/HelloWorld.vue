<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios"
import parsePrometheusTextFormat from 'parse-prometheus-text-format';

const metrics = ref(null)

onMounted (() => {
  axios.get("/uptime/metrics", {
    auth: {
      username: "",
      password: "uk1_fRQ9EY9ZJC3RdHhyVxVaR5LAonjz6LJpLPXVXm9o"
    }
  }).then(resp => metrics.value = parsePrometheusTextFormat(resp.data))
  .catch(err => metrics.value = err)
})

function getMetrics() {
  if (!metrics.value) return null

  return metrics.value.find((it: any) => it.name === "monitor_status").metrics
}

defineProps<{
  msg: string
}>()

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <div>
      <ul>
        <li v-for="m in getMetrics()" :key="m.labels.monitor_name">{{m.value +" - "+ m.labels.monitor_name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
