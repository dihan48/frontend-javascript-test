import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../api/tableApi';

const initialState = {
  apilvl: '',
  sourceData: [],
  data: [],
  isLoading: false,
  isError: false,
  sortColumn: 'id',
  sortDirection: 1,
  page: 0,
  rowInPage: 50,
  selectedSourceID: -1,
  filter: ''
};

export const fetchDataAsync = createAsyncThunk(
  'table/fetchData',
  async (args, thunkAPI) => {
    const response = await fetchData(thunkAPI.getState().table.apilvl);
    const state = thunkAPI.getState().table;
    const sourceData = response.data.map((item, index) => objectWithSourceID(item, index));
    const viewData = [...sourceData];
    const data = await sortPromise(viewData, state.sortColumn, state.sortDirection);
    return { sourceData, data, error: !!response?.error };
  }
);

export const sortAsync = createAsyncThunk(
  'table/sort',
  async (key, thunkAPI) => {
    const state = thunkAPI.getState().table;
    let sortColumn, sortDirection;
    if (state.sortColumn !== key) {
      sortColumn = key;
      sortDirection = 1;
    } else {
      sortColumn = state.sortColumn;
      sortDirection = (state.sortDirection === 1) ? -1 : 1;
    }
    const data = await sortPromise([...state.data], sortColumn, sortDirection);
    return { data, sortColumn, sortDirection };
  }
);

export const filterDataAsync = createAsyncThunk(
  'table/filter',
  async (filter, thunkAPI) => {
    const state = thunkAPI.getState().table;
    let data;
    if (filter !== state.filter) {
      data = await filterPromise(state.sourceData, filter);
      data = await sortPromise([...data], state.sortColumn, state.sortDirection);
    }
    return { data, filter };
  }
);

function sortPromise(data, column, dir) {
  return new Promise((response) => {
    const sortData = data.sort(sortFunction(column, dir));
    response(sortData);
  })
}

function filterPromise(data, filter) {
  return new Promise((response) => {
    const filterData = data.filter(item => Object.values(item).toString().includes(filter));
    response(filterData);
  })
}

function sortFunction(key, dir) {
  return (a, b) => {
    if (a[key] > b[key]) return dir;
    if (a[key] === b[key]) return 0;
    if (a[key] < b[key]) return -dir;
  }
}

function objectWithSourceID(item, value) {
  return Object.defineProperty(item, 'sourceID', {
    value,
    enumerable: false
  });
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setApilvl: (state, action) => {
      state.apilvl = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSelectedSourceID: (state, action) => {
      state.selectedSourceID = action.payload;
    },
    addRow: (state, action) => {
      const row = objectWithSourceID(action.payload, state.sourceData.length);
      state.sourceData.push(row);
      state.data.unshift(row);
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sourceData = action.payload.sourceData;
        state.data = action.payload.data;
        state.isError = action.payload.error;
      })
      .addCase(sortAsync.pending, (state) => {
      })
      .addCase(sortAsync.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.sortColumn = action.payload.sortColumn;
        state.sortDirection = action.payload.sortDirection;
      })
      .addCase(filterDataAsync.pending, (state) => {
      })
      .addCase(filterDataAsync.fulfilled, (state, action) => {
        if (!action.payload.data) return;

        state.data = action.payload.data;
        state.filter = action.payload.filter;
        state.page = 0;
        state.selectedSourceID = -1;
      })
  },
});

export const { setApilvl, setPage, setSelectedSourceID, addRow } = tableSlice.actions;

export const selectApilvl = (state) => state.table.apilvl;
export const selectSourceData = (state) => state.table.sourceData;
export const selectData = (state) => state.table.data;
export const selectIsLoading = (state) => state.table.isLoading;
export const selectIsError = (state) => state.table.isError;
export const selectSortColumn = (state) => state.table.sortColumn;
export const selectSortDirection = (state) => state.table.sortDirection;
export const selectPage = (state) => state.table.page;
export const selectRowInPage = (state) => state.table.rowInPage;
export const selectSelectedSourceID = (state) => state.table.selectedSourceID;

export default tableSlice.reducer;
