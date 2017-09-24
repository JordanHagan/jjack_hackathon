const factor = 1.8

const daysToFailure = (dtf: number): string =>
  `~${dtf} (${(dtf / factor).toFixed()} to ${(dtf * factor).toFixed()})`

const temp = (temp: number): string =>
  `${temp.toFixed(2)}&deg; C`

const vibration = (vib: number): string =>
  `${vib.toFixed(2)} mm/s`

const coolingWater = (water: number): string =>
  `${water.toFixed(2)} m<sup>3</sup>/hr`

export {daysToFailure, temp, vibration, coolingWater}
