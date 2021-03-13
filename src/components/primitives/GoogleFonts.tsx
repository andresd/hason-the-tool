import * as React from 'react'
import { FunctionComponent } from 'react'

export interface GoogleFontsProps {
  /**
     * URL to your Google Fonts StyleSheet.
     *
     * Be sure to end with `&display=swap` for best performance.
     */
  href: string;
}

let hydrated = false

export const GoogleFonts: FunctionComponent<GoogleFontsProps> = ({ href }) => {
  const hydratedRef = React.useRef(false)
  const [, reRender] = React.useState(false)

  React.useEffect(() => {
    if (!hydratedRef.current) {
      hydrated = true
      hydratedRef.current = true
      reRender(true)
    }
  }, [])

  return (
    <>
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      />
      <link rel='preload' as='style' href={href} />
      <link href={href} rel='stylesheet' media={!hydrated ? 'print' : 'all'} />
    </>
  )
}
