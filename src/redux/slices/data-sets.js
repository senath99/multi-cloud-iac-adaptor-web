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
  recordData: { id: null },
  statusData: {
    stateMachineStatus: PROCESS_STATUS.INITIAL,
    processState: DATA_FILE_STATUS.INITIAL.HASH_CODE
  },
  datasetData: [],
  metaDefaults: []
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
      state.isLoading = false;
      state.esgData = action.payload;
    },

    getInstancesByStackNameSuccess(state, action) {
      state.isLoading = false;
      state.stack = action.payload;
    },

    // VALIDATE ESG Data
    addDataSuccess(state, action) {
      state.statusData = {
        ...state.statusData,
        webformState: WEB_FORMS_STATUS.SECOND_STEP
      };
      state.description = action.payload.description;
      state.documentType = action.payload.documentType;
      state.fileType = action.payload.fileType;
    },
    // DELETE DATA
    deleteDataSuccess(state, action) {
      state.isLoading = false;
    },
    // SAVE DATA
    saveDataSuccess(state, action) {
      state.isLoading = false;
      state.statusData = {
        ...state.statusData,
        processState: DATA_FILE_STATUS.INITIAL.HASH_CODE,
        stateMachineStatus: PROCESS_STATUS.INITIAL
      };
    },
    checkStatus(state, action) {
      state.statusData = action.payload;
    },
    resetStepperStatus(state) {
      state.statusData = {
        ...state.statusData,
        processState: DATA_FILE_STATUS.INITIAL.HASH_CODE,
        stateMachineStatus: PROCESS_STATUS.INITIAL,
        webformState: WEB_FORMS_STATUS.LOADING
      };
    },
    cancelDataSets(state, action) {
      state.iscancelLoading = false;
      state.statusData = {
        ...state.statusData,
        stateMachineStatus: PROCESS_STATUS.INITIAL
      };
    },
    saveDataSets(state, action) {
      state.statusData = {
        ...state.statusData,
        stateMachineStatus: PROCESS_STATUS.INITIAL
      };
      state.datasetData = [];
    },
    // GET META Data
    getMetaDataSuccess(state, action) {
      state.isLoading = false;
      state.metaData = action.payload;
    },
    // GET META Data
    loadDataSetData(state, action) {
      state.isLoading = false;
      state.datasetData = action.payload;
    },
    addNewRecord(state, action) {
      let data = action.payload;
      let newData = data.map((item) => {
        return { id: uuidv4() + new Date(), ...item };
      });
      state.datasetData = [...state.datasetData, ...newData];
      state.success = !state.success;
    },
    removeRow(state, action) {
      let index = action.payload;
      state.datasetData.splice(index, 1);
      state.success = !state.success;
    },
    updateRecord(state, action) {
      const index = action.payload.id;
      const record = action.payload.record;
      state.datasetData.splice(index, 1, record);
      state.success = !state.success;
    },

    emptyDataRecords(state) {
      state.datasetData = [];
    },

    getMetaDefaultSuccess(state, action) {
      state.metaDefaults = action.payload;
    }
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

export function deleteDataSet(id) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.put(`/data-sets/${id}`);
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

//--------------------------------------------

export function saveDataSet(id, confirmType) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/data-sets/confirm/${id}`, {
        confirmType: confirmType
      });
      dispatch(slice.actions.saveDataSets(response.data.data));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function checkStatus(id, executionArn) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/data-sets/status/${id}`, {
        params: { executionArn: executionArn }
      });
      dispatch(slice.actions.checkStatus(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function cancelDataSet(id, confirmType) {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.startCancelLoading());
      const response = await axios.put(`/data-sets/confirm/${id}`, {
        confirmType: confirmType
      });
      dispatch(slice.actions.cancelDataSets());
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function getMetaDataSets(cubejsApi) {
  return async (dispatch) => {
    let fOptions = [];
    try {
      const meta = await cubejsApi.meta();
      //check for esg meta schema
      let schema = meta.cubes.find(
        (schema) => schema.name.toLowerCase() === 'esgmeta'
      );

      if (schema) {
        schema.dimensions.forEach((dimension) => {
          fOptions.push(dimension.name);
        });
        let results = [];
        const filterQuery = { dimensions: fOptions };
        const queryResult = await cubejsApi.load(filterQuery);
        fOptions.forEach((filterName) => {
          const options = uniq(
            map(queryResult.loadResponses[0].data, filterName)
          ).filter((val) => val != null);

          results.push({ name: filterName.split('.')[1], options: options });
        });

        dispatch(slice.actions.getMetaDataSuccess(results));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}