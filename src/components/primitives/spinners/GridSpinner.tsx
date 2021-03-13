
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './gridSpinner.css'

export const GridSpinner = ({ color, className, style, size }) => {
  const circles = [...Array(9)].map((_, index) => <div key={index} style={{ background: `${color}` }} />)

  return (
    <div className={classNames('lds-grid', className)} style={{ width: size, height: size, ...style }}>
      {circles}
    </div>
  )
}

GridSpinner.propTypes = {
  /** hex color */
  color: PropTypes.string,
  /** size in pixel */
  size: PropTypes.number,
  /** class name  */
  className: PropTypes.string,
  /** style object */
  style: PropTypes.object
}

GridSpinner.defaultProps = {
  color: '#7f58af',
  size: 80,
  className: '',
  style: {}
}
