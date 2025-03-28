import React from 'react'
import { FilterBox, FilterContent, FilterItem, FilterLabel, FilterSelect } from './FilterElements'

const Filter = ( domains ) => {
  return (
    <FilterBox>
        <FilterContent>
            <FilterItem>
                <FilterLabel>Filters</FilterLabel>
                <FilterSelect>
                    <option value="all">All</option>
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="desktop">Desktop</option>
                </FilterSelect>
            </FilterItem>
        </FilterContent>
      
    </FilterBox>
  )
}

export default Filter
