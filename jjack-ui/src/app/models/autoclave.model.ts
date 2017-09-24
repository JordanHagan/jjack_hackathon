import {Agitator} from './agitator.model'

export interface Autoclave {
  name: string
  chartNumber: number
  id: string
  agitators: Agitator[]
  selected: boolean
  lastStart: Date
}
