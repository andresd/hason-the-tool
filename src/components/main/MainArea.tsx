import React, { Suspense, useState } from 'react'
import SplitterLayout from 'react-splitter-layout'
import 'react-splitter-layout/lib/index.css'

import { JsonEditor } from '../editor/JsonEditor'
import { FiltersEditor } from '../editor/FiltersEditor'
import { FilteredJsonView } from '../editor/FilteredJsonView'

import '../../assets/main.css'

export const MainArea = () => {

  return (
    <SplitterLayout className="h-full w-full" percentage vertical>
      <SplitterLayout>
        <JsonEditor className="h-full overflow-auto" />
        <FilteredJsonView className="h-full overflow-auto" />
      </SplitterLayout>
      <FiltersEditor className="" />
    </SplitterLayout>
  )
}
