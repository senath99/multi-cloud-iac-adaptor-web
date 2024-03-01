import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { getBase64FromUrlForDataSets } from '../../utils/convertBase64';
import {
  DATA_FILE_STATUS,
  PROCESS_STATUS,
  WEB_FORMS_STATUS
} from '../../utils/constants';
import { v4 as uuidv4 } from 'uuid';
import { uniq, map } from 'lodash';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  iscancelLoading: false,
  error: false,
  esgData: [],
  stack: [],
  status: '',
  datasetData: [],
  singleStack: {}
};

const slice = createSlice({
  name: 'dataSets',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    startCancelLoading(state) {
      state.iscancelLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET ESG Data
    getInstancesSuccess(state, action) {
      state.singleStack = {};
      state.esgData = action.payload;
      state.isLoading = false;
    },

    getInstancesByStackNameSuccess(state, action) {
      state.stack = {};
      state.singleStack = {};
      state.stack = action.payload;
      state.isLoading = false;
    },

    getInstancesByStackIdSuccess(state, action) {
      state.singleStack = {};
      state.singleStack = action.payload;
      state.isLoading = false;
    },

    deleteDataSuccess(state, action) {
      state.isLoading = false;
    },

    saveInstance(state, action) {
      state.datasetData = [];
    }
    // GET META Data
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  resetStepperStatus,
  cancelDataSets,
  validateESGDataSuccess,
  addDataSuccess,
  loadDataSetData,
  addNewRecord,
  getRecords,
  removeRow,
  updateRecord,
  emptyDataRecords
} = slice.actions;

// ----------------------------------------------------------------------

export function getInstances() {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get('http://127.0.0.1:8000/stacks');
      console.log(JSON.stringify(response));
      dispatch(slice.actions.getInstancesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getInstancesByStackName(stackName) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const responseDefaults = await axios.get(
        `http://127.0.0.1:8000/stacks/${stackName}`
      );

      dispatch(
        slice.actions.getInstancesByStackNameSuccess(responseDefaults.data)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// -----------------------------------------------------------------

export async function uploadESGDataSets(dataSet, customerId) {
  try {
    const dataFileName = dataSet.dataFile.file.name;
    dataSet.dataFile = await getBase64FromUrlForDataSets(dataSet.dataFile.url);

    const response = await axios.post('/data-sets/supplier', {
      ...dataSet,
      fileName: dataFileName,
      customerId: customerId
    });

    return response;
  } catch (error) {
    return { status: -1 };
  }
}

//---------------------------------------------------------------------------

export function deleteDataSet(stack_name) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.delete(
        `http://127.0.0.1:8000/destroy/${encodeURIComponent(stack_name)}`
      );
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

//--------------------------------------------

export async function saveInstance(dataModel) {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/synth`, {
      ...dataModel
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function saveInstanceMock(dataModel) {
  try {
    const response = await axios.put(`/api/data-sets/instance/save`, {
      ...dataModel
    });

    return response;
  } catch (error) {
    return error;
  }
}

export function getInstancesByStackId(Id) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get(
        `http://127.0.0.1:8000/stacks/id/${encodeURIComponent(Id)}`
      );

      dispatch(slice.actions.getInstancesByStackIdSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}
