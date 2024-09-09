import axios from 'axios';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';

const KUMATOKEN = "uk1_fRQ9EY9ZJC3RdHhyVxVaR5LAonjz6LJpLPXVXm9o"

class KumaService {
  async getMonitorStatus() {
    try {
      const kumaMetricsPrometheusResponse = await axios.get("/uptime/metrics", {
        auth: {
          username: "",
          password: "uk1_fRQ9EY9ZJC3RdHhyVxVaR5LAonjz6LJpLPXVXm9o"
        }
      })

      if (!kumaMetricsPrometheusResponse?.data) return null

      const kumaMetrics = parsePrometheusTextFormat(kumaMetricsPrometheusResponse.data)
      

      const monitorStatusMetrics = kumaMetrics.find((it: any) => it.name === "monitor_status")

      return monitorStatusMetrics.metrics
    } catch (error) {
      console.error("getMonitorStatus: ", error)
    }
  }
}

export default new KumaService