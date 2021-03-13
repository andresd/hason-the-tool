import { useInterval, useIsMounted } from './hooks'
import { logs } from './logService'
import { getPasswordStrength, IPasswordStrength } from './passwordUtils'
import { getUniqueId, isDev, isEmpty, stripHtml } from './utils'

export {
  useInterval, useIsMounted,
  logs,
  getPasswordStrength,
  getUniqueId, isDev, isEmpty, stripHtml
}

export type { IPasswordStrength }
