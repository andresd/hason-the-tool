import React, { Suspense, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentJsonState } from '../../atoms/content'
import { currentFiltersJsonState } from '../../atoms/filters'
import { JsonRawEditor } from './JsonRawEditor'
import { filterDeep } from 'deepdash-es/standalone'
import { IMarker } from 'react-ace'
import { CompareType } from './types'
import { anyToBoolean } from '../../shared'

interface FilteredJsonViewProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const FilteredJsonView = (props: FilteredJsonViewProps) => {
  const content = useRecoilValue(currentJsonState)
  const filters = useRecoilValue(currentFiltersJsonState)

  const [text, setText] = useState(content)
  const [markers, setMarkers] = useState<IMarker[]>()

  const safeJsonParse = (text: string) => {
    if (!text) {
      return undefined
    }
    try {
      return JSON.parse(text)
    } catch (e) {
      return undefined
    }
  }

  useEffect(() => {
    setText(content)
  }, [content])

  useEffect(() => {
    const json = safeJsonParse(filters)
    if (!json) {
      setText(content)
      return
    }
    const filter = json.filter
    const showSiblings = json.showSiblings
    if (filter) {
      filterBy(filter, showSiblings)
    } else {
      setText(content)
    }
  }, [filters])

  const filterBy = (filter: any, showSiblings: boolean) => {
    const stringsToMark: any[] = []

    const buildMarks = (str: string): IMarker[] => {
      const rows = str.split('\n')
      const startingIndices: [number, number, number][] = []
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex]
        for (const keyword of stringsToMark) {
          let indexOccurrence = row.indexOf(keyword, 0)
          while (indexOccurrence >= 0) {
            startingIndices.push([rowIndex, indexOccurrence, keyword.length])
            indexOccurrence = row.indexOf(keyword, indexOccurrence + 1)
          }
        }
      }
      return startingIndices.map(i => ({
        startRow: i[0],
        endRow: i[0],
        startCol: i[1],
        endCol: i[2],
        type: 'fullLine',
        className: 'ace_selection'
      }))
    }

    const addToFounds = (key: string, value: any, a: string, compare: CompareType, b: any) => {

      const push = (v: any) => {
        if (v !== undefined && v !== '') {
          stringsToMark.push(v)
        }
      }

      const onMatch = (condition: boolean, key: string, value: any) => {
        if (condition) {
          push(key)
          push(value)
          return true
        }
        return false
      }

      switch (compare) {
        case 'eq': return onMatch(key === a && (value === undefined || b === value), key, value)
        case 'neq': return onMatch(key === a && (value === undefined || b !== value), key, value)
        case 'gt': return onMatch(key === a && (value === undefined || b > value), key, value)
        case 'gte': return onMatch(key === a && (value === undefined || b >= value), key, value)
        case 'lt': return onMatch(key === a && (value === undefined || b < value), key, value)
        case 'lte': return onMatch(key === a && (value === undefined || b <= value), key, value)
        case 'start': return onMatch(key?.startsWith(a) || value?.toString().startsWith(b), key, value)
        case 'contains': return onMatch(key?.includes(a) || value?.toString().includes(b), key, value)
        default:
          throw new Error('Invalid compare type')
      }
    }

    const getValue = (value: any, type?: string) => {
      if (value !== undefined) {
        if (type === undefined || type === 'string') {
          return value.toString().length > 0 ? value : undefined
        }
        if (type === 'boolean') {
          return anyToBoolean(value)
        }
        if (type === 'number') {
          return Number(value)
        }
      }
      return undefined
    }

    const pickByCondition = (value: any, key: string | number) => {
      if (Array.isArray(filter) && filter.length > 0) {
        return filter.some((current) => {
          if (Array.isArray(current)) {
            return addToFounds(key?.toString(), value, getValue(current[0]), current[1], getValue(current[2], typeof value))
          }
          return false // INCORRECT SHOULD THROW ERROR
        })
      }
      return undefined
    }

    const unfilteredObject = safeJsonParse(content)

    const result = filterDeep(unfilteredObject, (value, key, parent) => pickByCondition(value, key), { condense: !showSiblings })
    const jsonText = JSON.stringify(result ?? {}, null, 2)

    setMarkers(buildMarks(jsonText))
    setText(jsonText)
  }

  return (
    <Suspense fallback={<p>WTF?</p>}>
      <JsonRawEditor className={props.className} text={text} onTextChange={(value) => setText(value)} readOnly={true} markers={markers} />
    </Suspense>
  )
}
