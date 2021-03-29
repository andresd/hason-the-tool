import { v4 as uuidv4 } from 'uuid'

export const getUniqueId = () => {
  return uuidv4()
}

export const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

export const isEmpty = (str: string | null | undefined) => {
  return (!str || str.length === 0)
}

export const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

export const anyToBoolean = (value: any) => {
  if (typeof value === 'number') {
    return value !== 0 ? true : false
  } else {
    const strValue = value?.toString().toLowerCase().trim()
    if (strValue === 'true' || strValue === 'yes' || strValue === '1') {
      return true
    }
  }
  return false
}

