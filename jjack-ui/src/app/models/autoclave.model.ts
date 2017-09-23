import {Agitator} from './agitator.model'

export interface Autoclave {
  name: string
  id: string
  agitators: Agitator[]
  selected: boolean
}
