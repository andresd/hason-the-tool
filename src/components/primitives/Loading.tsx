import React from 'react'
import classNames from 'classnames'

import { Panel } from './Panel'
import { GridSpinner } from './spinners/GridSpinner'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export const Loading = (props: Props) => (
  <Panel className={classNames('flex items-center justify-center', props.className)}>
    <GridSpinner color='#000' size={20} className='flex-none w-72' />
  </Panel>
)
