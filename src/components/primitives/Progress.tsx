import React, { useEffect, useContext, useState } from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  min?: number;
  max?: number;
  value?: number;
  backgroundColor?: string;
  color: string;
}

export const Progress = (props: Props) => {
  const { min = 0, max = 100, value = 0, color = 'rgba(236, 72, 153)', backgroundColor = 'rgba(251, 207, 232)' } = props

  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const val = (value * 100 / Math.abs(max - min))
    setPercentage(val)
  }, [min, max, value])

  return (
    <div className='relative pt-1'>
      <div className='overflow-hidden h-2 mb-4 text-xs flex rounded' style={{ backgroundColor }}>
        <div style={{ width: `${percentage}%`, backgroundColor: color }} className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center' />
      </div>
    </div>
  )
}
