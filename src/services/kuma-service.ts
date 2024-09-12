import axios from 'axios';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';

const KUMATOKEN = "uk1_Pw_OBZ5bgOvpoPa9SKw4yuZg6Ey5AKWJ6OtUivbY"

class KumaService {
  async getMonitorStatus() {
    try {
      const kumaMetricsPrometheusResponse = await axios.get("/uptime/metrics", {
        auth: {
          username: "",
          password: "uk1_Pw_OBZ5bgOvpoPa9SKw4yuZg6Ey5AKWJ6OtUivbY"
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