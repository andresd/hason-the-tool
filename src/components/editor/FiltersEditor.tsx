import React, { Suspense, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentFiltersJsonState } from '../../atoms/filters'

interface FiltersEditorProps extends React.HTMLAttributes<HTMLDivElement> {
}

interface FilterRow  {
  isCheck?: boolean;
  key: string;
  value: any;
}

const isEmpty = (text: string) => (!text || 0 === text.length)

export const FiltersEditor = (props: FiltersEditorProps) => {
  const [filters, setFilters] = useRecoilState(currentFiltersJsonState)

  const [filterTable, setFilterTable] = useState<FilterRow[]>([{ isCheck: true, key: '', value: '' }])
  const [showSiblings, setShowSiblings] = useState(false)

  useEffect(() => {
    const filtersStr = filterTable
      .filter(row => row.isCheck)
      .map(row => {
        if (!isEmpty(row.key) && !isEmpty(row.value)) {
          return `[${JSON.stringify(row.key)},${JSON.stringify(row.value)}]`
        } else if (isEmpty(row.key) && !isEmpty(row.value)) {
          return JSON.stringify(row.value)
        } else if (!isEmpty(row.key) && isEmpty(row.value)) {
          return JSON.stringify(row.key)
        }
      }).join(',')
    console.log(`{"filter": [${filtersStr}], showSiblings: ${showSiblings}}`)
    setFilters(isEmpty(filtersStr) ? '' : `{"filter": [${filtersStr}]${showSiblings ? `, showSiblings: ${showSiblings}`: ''}}`)
  }, [filterTable, showSiblings])

  const updateFilterRow = (key: string, value: string, isCheck: boolean, index: number) => {
    let adaptedValue: any = value
    if (!isEmpty(value)) {
      const numberValue = Number(value)
      if (!isNaN(numberValue)) {
        adaptedValue = numberValue
      } else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
        adaptedValue = value.replaceAll('^\"|^\'|\"|\'$', '')
      }
    }
    setFilterTable([
      ...filterTable.slice(0, index),
      { key, value: adaptedValue, isCheck },
      ...filterTable.slice(index + 1)
    ])
  }

  const toggleRow = (index: number) => {
    setFilterTable([
      ...filterTable.slice(0, index),
      { ...filterTable[index], isCheck: !filterTable[index].isCheck },
      ...filterTable.slice(index + 1)
    ])
  }

  const addRow = (index: number) => {
    setFilterTable([
      ...filterTable,
      { key: '', value: undefined, isCheck: true }
    ])
  }

  const delRow = (index: number) => {
    if (filterTable.length === 1) {
      return
    }
    setFilterTable([
      ...filterTable.slice(0, index),
      ...filterTable.slice(index + 1)
    ])
  }

  return (
    <Suspense fallback={<p>WTF?</p>}>
      <div className="flex flex-col w-full h-full" style={{ backgroundColor: '#2d2d2d', color: 'white' }}>
        <div className="flex flex-row w-full">
          <label>
            <input name="showSiblings" checked={showSiblings} onChange={() => setShowSiblings(!showSiblings)} type="checkbox" className="flex-initial m-2" />
            Show Siblings
          </label>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex-1">Property</div>
          <div className="flex-1">Value</div>
        </div>
        {filterTable.map((row, index) => (
          <div key={index} className="flex flex-row w-full justify-center items-center">
            <input checked={row.isCheck} onChange={() => toggleRow(index)} type="checkbox" className="flex-initial m-2"/>
            <input value={row.key} onChange={(event) => updateFilterRow(event.target.value, row.value, !!row.isCheck, index)} className="flex-1 mr-1 bg-gray-600 text-white"/>
            <input value={row.value} onChange={(event) => updateFilterRow(row.key, event.target.value, !!row.isCheck, index)} className="flex-1 ml-1 bg-gray-600 text-white" />
            <button onClick={() => delRow(index)} className="flex-initial justify-center items-center p-2 w-6">-</button>
            {filterTable.length - 1 === index && <button onClick={() => addRow(index)} className="flex-initial justify-center items-center p-2 w-6">+</button>}
            {filterTable.length - 1 > index && <button className="flex-initial justify-center items-center p-2 w-6">&nbsp;</button>}
          </div>
        ))
        }
        <div className="w-full">
          <textarea className="w-full m-2 bg-gray-600 text-white" value={filters} onChange={(event) =>setFilters(event.target.value) }/>
        </div>
      </div>
    </Suspense>
  )
}
