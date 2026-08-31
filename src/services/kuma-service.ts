import axios from 'axios'
import parsePrometheusTextFormat from 'parse-prometheus-text-format'
import { useSettingsStore } from '@/stores/settings'

interface MonitorStatusLabel {
  monitor_name: string
  monitor_type: string
}

export enum MonitorStatusEnum {
  DOWN = '0',
  UP = '1',
  PENDING = '2',
  MAINTANING = '3'
}

export const MonitorStatusEnumLabel = {
  [MonitorStatusEnum.DOWN]: 'Down',
  [MonitorStatusEnum.UP]: 'Up',
  [MonitorStatusEnum.PENDING]: 'Pending',
  [MonitorStatusEnum.MAINTANING]: 'Maintaning'
}
export interface MonitorStatus {
  labels: MonitorStatusLabel
  value: MonitorStatusEnum
}

class KumaService {
  async getMonitorStatus(): Promise<MonitorStatus[] | undefined> {
    const settingsStore = useSettingsStore()

    try {
      // encodeURI (not encodeURIComponent): nginx's $arg_target is never
      // url-decoded, so ':' and '/' must survive as literal characters.
      const kumaMetricsPrometheusResponse = await axios.get(
        `/uptime/metrics?target=${encodeURI(settingsStore.backendUrl)}`,
        {
          auth: {
            username: '',
            password: settingsStore.accessToken
          }
        }
      )

      if (!kumaMetricsPrometheusResponse?.data) return

      const kumaMetrics = parsePrometheusTextFormat(kumaMetricsPrometheusResponse.data)

      const monitorStatusMetrics = kumaMetrics.find((it: any) => it.name === 'monitor_status')

      return monitorStatusMetrics.metrics
    } catch (error) {
      console.error('getMonitorStatus: ', error)
    }
  }

  async testConnection(backendUrl: string, accessToken: string): Promise<boolean> {
    const url = backendUrl.trim().replace(/\/+$/, '')
    await axios.get(`/uptime/metrics?target=${encodeURI(url)}`, {
      auth: {
        username: '',
        password: accessToken
      }
    })
    return true
  }
}

export default new KumaService()
