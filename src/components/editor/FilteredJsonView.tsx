import React, { Suspense, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentJsonState } from '../../atoms/content'
import { currentFiltersJsonState } from '../../atoms/filters'
import { JsonRawEditor } from './JsonRawEditor'
import { filterDeep } from 'deepdash-es/standalone'

interface FilteredJsonViewProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const FilteredJsonView = (props: FilteredJsonViewProps) => {
  const content = useRecoilValue(currentJsonState)
  const filters = useRecoilValue(currentFiltersJsonState)

  const [text, setText] = useState(content)

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
    const pickByCondition = (value: any, key: string | number) => {
      if (Array.isArray(filter) && filter.length > 0) {
        return filter.some((current) => {
          if (Array.isArray(current)) {
            return (current[0] === key && current[1] === value)
          } else {
            return current === key || current === value
          }
        })
      } else if (Array.isArray(filter) && filter.length === 1) {
        return filter[0] === key || filter[0] === value
      }
    }
    const unfilteredObject = safeJsonParse(content)

    const result = filterDeep(unfilteredObject, (value, key, parent) => pickByCondition(value, key), { condense: !showSiblings })
    setText(JSON.stringify(result ?? {}, null, 2))
  }

  return (
    <Suspense fallback={<p>WTF?</p>}>
      <JsonRawEditor className={props.className} text={text} onTextChange={(value) => setText(value)} readOnly={true} />
    </Suspense>
  )
}
