import { atom, selector } from 'recoil'
import lodash from 'lodash'

export const currentFiltersJsonState = atom<string>({
  key: 'currentFiltersJsonState',
  default: ('')
})

