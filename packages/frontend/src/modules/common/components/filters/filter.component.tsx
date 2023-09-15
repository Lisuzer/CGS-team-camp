import React, { ChangeEvent } from 'react';
import { FormControl, MenuItem, SelectChangeEvent, Select } from '@mui/material';
import {
  FilterBox,
  SearchInput,
  StyledSelectBox,
  StyledSearchBox,
  StyledClearButton
} from './filter.styled';
import { STORAGE_KEYS } from '../../consts/app-keys.const';

export interface FilterProps {
  handleButtonFilter: (event: SelectChangeEvent) => void;
  handleButtonClear: () => void;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentFilter: string;
  search: string;
}

const STATUSES = {
  ALL: '',
  PUBLIC: 'public',
  PRIVATE: 'private',
  COMPLETED: 'completed',
  NOT_COMPLETED: 'not_completed'
};

const FilterComponent = (props: FilterProps) => {
  const { onSearchChange, handleButtonFilter, handleButtonClear, currentFilter, search } = props;
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  return (
    <FilterBox>
      <StyledSearchBox>
        <SearchInput
          id="search_input"
          onChange={onSearchChange}
          value={search}
          placeholder="Search"
        />
        <StyledClearButton onClick={() => handleButtonClear()}>Clear</StyledClearButton>
      </StyledSearchBox>
      <StyledSelectBox>
        <FormControl sx={{ m: { xs: '1', md: '0' }, minWidth: 100 }}>
          <Select
            value={currentFilter}
            onChange={handleButtonFilter}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            id="filter_select"
          >
            <MenuItem value={STATUSES.ALL}>
              <em>All</em>
            </MenuItem>
            {token && <MenuItem value={STATUSES.PUBLIC}>Public</MenuItem>}
            {token && <MenuItem value={STATUSES.PRIVATE}>Private</MenuItem>}
            <MenuItem value={STATUSES.COMPLETED}>Completed</MenuItem>
            <MenuItem value={STATUSES.NOT_COMPLETED}>Not completed</MenuItem>
          </Select>
        </FormControl>
      </StyledSelectBox>
    </FilterBox>
  );
};

export default FilterComponent;
