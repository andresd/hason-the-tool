import universalGA from 'universal-ga'

const gaKey = process.env.REACT_APP_GA_KEY

interface IGa {
  initialize: (key?: string) => void;
  pageview: (path: string) => void;
}

export const ga: IGa = gaKey ? universalGA : { initialize: () => {}, pageview: () => {} }
ga.initialize(gaKey)
