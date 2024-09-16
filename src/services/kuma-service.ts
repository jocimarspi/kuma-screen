import axios from 'axios';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';

const KUMATOKEN = "uk1_fRQ9EY9ZJC3RdHhyVxVaR5LAonjz6LJpLPXVXm9o"


interface MonitorStatusLabel {
  monitor_name: string;
}

export enum MonitorStatusEnum {
  DOWN = '0',
  UP = '1',
  PENDING = '2',
  MAINTANING = '3'
}
export interface MonitorStatus {
  labels: MonitorStatusLabel
  value: MonitorStatusEnum
}

class KumaService {
  async getMonitorStatus(): Promise<MonitorStatus[] | undefined> {
    try {
      const kumaMetricsPrometheusResponse = await axios.get("/uptime/metrics", {
        auth: {
          username: "",
          password: KUMATOKEN
        }
      })
      
      if (!kumaMetricsPrometheusResponse?.data) return

      const kumaMetrics = parsePrometheusTextFormat(kumaMetricsPrometheusResponse.data)
      

      const monitorStatusMetrics = kumaMetrics.find((it: any) => it.name === "monitor_status")

      return monitorStatusMetrics.metrics
    } catch (error) {
      console.error("getMonitorStatus: ", error)
      
    }
  }
}

export default new KumaService