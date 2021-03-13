/* eslint-disable no-invalid-this */
import dayjs from 'dayjs'
import { isDev } from './utils'

interface ILogs {
  log: (...args: any[]) => void;
  debugDev: (message: string, extra?: object) => void;
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warning: (...args: any[]) => void;
  error: (...args: any[]) => void;
  critical: (...args: any[]) => void;
}

class LogsImpl implements ILogs {
  private readonly remoteLoggingEnabled = () => {
    return !isDev
  }

  log = (...args: any[]) => {
    if (isDev) {
      const message = args[0]
      const time = dayjs().format('HH:mm:ss')
      if (args.length > 1 && typeof args[1] === 'object') {
        const extra = args[1]
        console.log(time, message, extra)
      } else {
        console.log(time, message)
      }
    }
    return { uuid: '' }
  }

  debugDev = (message: string, extra?: object) => {
    if (isDev) {
      const time = dayjs().format('HH:mm:ss')
      if (extra) {
        console.debug(time, message, extra)
      } else {
        console.debug(time, message)
      }
    }
    return { uuid: '' }
  }

  debug = (...args: any[]) => {
    if (isDev) {
      const message = args[0]
      const time = dayjs().format('HH:mm:ss')
      if (args.length > 1 && typeof args[1] === 'object') {
        const extra = args[1]
        console.debug(time, message, extra)
      } else {
        console.debug(time, message)
      }
    }
    return { uuid: '' }
  }

  info = (...args: any[]) => {
    if (isDev) {
      const message = args[0]
      const time = dayjs().format('HH:mm:ss')
      if (args.length > 1 && typeof args[1] === 'object') {
        const extra = args[1]
        console.info(time, message, extra)
      } else {
        console.info(time, message)
      }
    }
    return { uuid: '' }
  }

  warning = (...args: any[]) => {
    if (isDev) {
      const message = args[0]
      const time = dayjs().format('HH:mm:ss')
      if (args.length > 1 && typeof args[1] === 'object') {
        const extra = args[1]
        console.warn(time, message, extra)
      } else {
        console.warn(time, message)
      }
    }
    return { uuid: '' }
  }

  error = (...args: any[]) => {
    if (isDev) {
      const message = args[0]
      const time = dayjs().format('HH:mm:ss')
      if (args.length > 1 && typeof args[1] === 'object') {
        const extra = args[1]
        console.log(time, message, extra) // log instead of error to avoid red screen
      } else {
        console.log(time, message) // log instead of error to avoid red screen
      }
    }
    return { uuid: '' }
  }

  critical = (...args: any[]) => {
    if (isDev) {
      const message = args[0]
      const time = dayjs().format('HH:mm:ss')
      if (args.length > 1 && typeof args[1] === 'object') {
        const extra = args[1]
        console.log(time, message, extra) // log instead of error to avoid red screen
      } else {
        console.log(time, message) // log instead of error to avoid red screen
      }
    }
    return { uuid: '' }
  }
}

const logsInstance = new LogsImpl()
export const logs = logsInstance
