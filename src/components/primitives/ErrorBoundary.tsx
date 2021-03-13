import React from 'react'
import { logs } from '../../services/logService'

interface Props {

}

interface State { // IS THIS THE CORRECT TYPE FOR THE state ?
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch (error, errorInfo) {
    // You can also log the error to an error reporting service
    logs.error(error, errorInfo)
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
};
