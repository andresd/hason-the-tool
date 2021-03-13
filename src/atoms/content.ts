import { atom } from 'recoil'

export const currentJsonState = atom<string>({
  key: 'currentJsonState',
  default: ''
})
