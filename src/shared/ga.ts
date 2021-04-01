import universalGA from 'universal-ga'

const gaKey = process.env.REACT_APP_GA_KEY

export let ga = gaKey ? universalGA : {}
if (gaKey) {
  ga.initialize(gaKey)
}
