import React from 'react'
import { FilterBox, FilterH1, FilterContent, FilterItem, FilterLabel, FilterSelect, CollapseButton, ExpandButton } from './FilterElements'

const Filter = ( {checkCollapse, onClick} , domains ) => {
  return (
    <FilterBox>
      {checkCollapse ? (
        <ExpandButton onClick={onClick} />  // Call the collapse function when clicked
      ) : (
        <CollapseButton onClick={onClick} />  // Call the collapse function when clicked
      )}
      
    <FilterH1>Filters</FilterH1>
    </FilterBox>

  )
}

export default Filter
