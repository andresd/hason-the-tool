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
