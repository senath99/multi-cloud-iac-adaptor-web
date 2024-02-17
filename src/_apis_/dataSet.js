/*
 * Project: Dynamedics Portal Web
 * Created Date: Thursday February 17th 2022
 * Author: Senath Weerasinghe
 * -----
 * Last Modified: Thursday February 17th 2022 11:33:46 am
 * Modified By: Senath Weerasinghe at <sweerasinghe@mitrai.com>
 * -----
 * Copyright (c) 2022 Mitra Sparks
 * -----
 * HISTORY:
 */

import faker from 'faker';
// utils
import mock from '../utils/mock';
import fakeRequest from '../utils/fakeRequest';

// ----------------------------------------------------------------------

let esg = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: setIndex,
    uploadedDate: faker.date.past(),
    fileUrl:
      'https://test-experienz-media.s3.eu-west-2.amazonaws.com/experienz/new/experienz_/sample_kpi_sheet.csv',
    dateRange: faker.date.past(),
    documentType: 'esg/kpis',
    uploadedBy: faker.name.firstName() + ' ' + faker.name.lastName(),
    description: 'Data for Q1 Energy'
  };
});

let validateTable = [...Array(24)].map((_, index) => {
  return {
    id: index,
    Segment: 'environment',
    Date: '12-31-2021',
    Sector: 'transport',
    Indicator:
      'Total official development assistance (gross disbursement) for water supply and sanitation, by recipient countries (millions of constant 2019 United States dollars)',
    Indicator_Code: 'Biodiesel HVO',
    Category: 'consumption',
    Sub_Category: 'fuel',
    Company: 'default',
    Department: 'default',
    Location: 'default',
    Data_Type: 'number',
    Data_Unit: '',
    Data: '1200',
    Comparison_Data: '0.5',
    Comparison_Data_Set: '',
    Comparison_Data_Set_Code: 'DC_TOF_WASHL',
    Emission_Factor_Aggregated_Id: 'Biodiesel HVO=l',
    Emission_Factor: 'fuel_type_biodiesel_hvo-fuel_use_na',
    Emission_Factor_Unit: 'kg-CO2e/l'
  };
});

let ESG_META_INFO = {
  status: 0,
  approved: false
};

const LABELS = {
  Segment: 'Segment',
  Date: 'Date',
  Sector: 'Sector',
  Indicator: 'Indicator',
  Indicator_Code: 'Indicator Code',
  Category: 'Category',
  Sub_Category: 'Sub Category',
  Company: 'Company',
  Department: 'Department',
  Location: 'Location',
  Data_Type: 'Data Type',
  Data_Unit: 'Data Unit',
  Data: 'Data',
  Comparison_Data: 'Comparison Data',
  Comparison_Data_Set: 'Comparison Data Set'
};

const DATA_SETS_META = [
  {
    name: 'Segment',
    options: ['environment', 'social', 'governance'],
    label: 'Segment'
  },
  { name: 'Date', title: 'TEST', label: ' Date' },
  { name: 'Sector', options: 'tEST', label: 'Sector' }
];

mock.onGet('/api/instances').reply(async () => {
  return [
    200,
    {
      data: [...DATA_SETS_META]
    }
  ];
});

mock.onPost(/^\/api\/data-sets\/confirm\/[^\/]+/).reply(async (request) => {
  await fakeRequest(3000);
  try {
    const { confirmType } = JSON.parse(request.data);
    if (confirmType === 'CONFIRM') {
      ESG_META_INFO.status = 'completed';
    } else {
      ESG_META_INFO.status = 'inactive';
    }
    return [200, { data: [] }];
  } catch (error) {
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/data-sets/supplier').reply(async () => {
  await fakeRequest(1000);
  return [200, { data: { dataFiles: [...esg], labels: LABELS } }];
});

let isValid = false;

mock.onPost('/api/data-sets').reply(async (request) => {
  try {
    isValid = !isValid;
    //uploading
    ESG_META_INFO.status = 1;
    await fakeRequest(4000);
    ESG_META_INFO.status = 3;
    processStateMachine();

    return [200, { data: { id: 1234, executionArn: 'testArn' } }];
  } catch (error) {
    return [500, { message: 'Internal server error' }];
  }
});

const processStateMachine = async () => {
  await fakeRequest(3000);
  ESG_META_INFO.status = 4;
};

mock.onPut(/^\/api\/data-sets\/confirm\/[^\/]+/).reply(async (request) => {
  await fakeRequest(1000);
  try {
    ESG_META_INFO.status = 0;

    return [200, {}];
  } catch (error) {
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet(/^\/api\/data-sets\/status\/[^\/]+/).reply(async () => {
  return [
    200,
    {
      data: {
        processState: ESG_META_INFO.status,
        stateMachineStatus: 'RUNNING',
        preview: JSON.stringify(validateTable),
        previewType: 'valid',
        totalRows: 100
      }
    }
  ];
});

mock.onPut(/^\/api\/data-sets\/[^\/]+/).reply(async (request) => {
  await fakeRequest(1000);
  try {
    const dataId = Number(request.url.split('/').slice(-1)[0]);

    return [200, { dataId }];
  } catch (error) {
    return [500, { message: 'Internal server error' }];
  }
});
