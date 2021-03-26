import React, { Suspense, useState } from 'react'
import SplitterLayout from 'react-splitter-layout'
import 'react-splitter-layout/lib/index.css'

import { JsonEditor } from '../editor/JsonEditor'
import { FiltersEditor } from '../editor/FiltersEditor'
import { FilteredJsonView } from '../editor/FilteredJsonView'

import '../../assets/main.css'

export const MainArea = () => {

  return (
    <SplitterLayout
      className="h-full w-full"
      primaryIndex={0}
      percentage
      vertical
      onDragEnd={() => window.dispatchEvent(new Event('resize'))}>
      <SplitterLayout
        primaryIndex={0}
        onDragEnd={() => window.dispatchEvent(new Event('resize'))}>
        <JsonEditor className="h-full overflow-auto" />
        <FilteredJsonView className="h-full overflow-auto" />
      </SplitterLayout>
      <FiltersEditor className="" />
    </SplitterLayout>
  )
}
