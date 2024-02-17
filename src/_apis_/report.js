// utils
import mock from '../utils/mock';
import fakeRequest from '../utils/fakeRequest';
import { reject } from 'lodash';

const SEARCH_RESPONSE = {
  measures: ['esg.total'],
  timeDimensions: [
    {
      dimension: 'esg.date',
      granularity: 'quarter'
    }
  ],
  dimensions: ['esg.subCategory'],
  segments: ['esg.environment'],
  order: [{ id: 'esg.date', desc: false }],
  filters: [
    {
      member: 'esg.category',
      operator: 'equals',
      values: ['emission']
    }
  ],
  chartType: 'Bar Chart'
};

const PERSPECTIVES = {
  defaultDateRange: 'This year',
  views: [
    {
      viewId: 10,
      viewTitle: 'Overview of GHG Emissions',
      viewDescription: null,
      bookmarked: true,
      userGroups: []
    },
    {
      viewId: 1,
      viewTitle: 'Employee Turnover DashBoard',
      viewDescription:
        '<p>A common definition of employee turnover is the loss of talent in the workforce over time. This includes any employee departure, including resignations, layoffs, terminations, retirements, location transfers, or even deaths.Businesses often calculate their rate of employee turnover as a means of predicting the impact on productivity, customer service, or even morale. The U.S. Bureau of Labor Statistics (BLS) also calculates employee turnover at a national level.</p>',
      bookmarked: false,
      userGroups: []
    },
    {
      viewId: 2,
      viewTitle: 'Environment - Energy',
      viewDescription: '<p><br/><p>',
      bookmarked: true,
      userGroups: []
    },
    {
      viewId: 3,
      viewTitle: 'Environment - Waste',
      viewDescription: '<p><br/><p>',
      bookmarked: false,
      userGroups: []
    },
    {
      viewId: 4,
      viewTitle: 'Environment - Water Usage',
      viewDescription: '<p><br/><p>',
      bookmarked: false,
      userGroups: []
    },
    {
      viewId: 5,
      viewTitle: 'Environment - Carbon Footprint',
      viewDescription: '<p><br/><p>',
      bookmarked: false,
      userGroups: []
    },
    {
      viewId: 9,
      viewTitle: 'Social - Diversity',
      viewDescription: null,
      bookmarked: true,
      userGroups: []
    },
    {
      viewId: 6,
      viewTitle: 'Environment',
      viewDescription: null,
      bookmarked: false,
      userGroups: []
    },
    {
      viewId: 7,
      viewTitle: 'Social',
      viewDescription: null,
      bookmarked: false,
      userGroups: []
    },
    {
      viewId: 8,
      viewTitle: 'Governance',
      viewDescription: null,
      bookmarked: true,
      userGroups: []
    }
  ]
};

const COMPONENTS = [
  {
    pId: 2,
    layouts: {
      lg: '{"x":0,"y":0,"w":24,"h":14}',
      md: '{"x":0,"y":0,"w":24,"h":14}',
      sm: '{"x":0,"y":0,"w":12,"h":14}',
      xs: '{"x":0,"y":0,"w":8,"h":13}',
      xxs: '{"x":0,"y":0,"w":8,"h":13}'
    },
    title: 'Energy use (kg of oil equivalent per capita)',
    description:
      '<p style="font-size:10px; margin-top: 10px">Energy use in kgs per capita. Reference data for South Asia (provided by <a href="https://databank.worldbank.org/reports.aspx?source=3711&series=EG.USE.PCAP.KG.OE&country=EAS,SAS,MEA,SSF,LCN,ECS,NAC" target="_blank">worldbank.org</a>) <br/><a href="https://sdgs.un.org/goals/goal7" target="_blank">UN SDG Goal 7</a>: Ensure access to affordable, reliable, sustainable and modern energy for all</p>',
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data', 'esg.refData', 'esg.target'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 524.2,
        'esg.refData': 450.5,
        'esg.target': 420.5
      },
      {
        'esg.kpi': 2018,
        'esg.data': 570.1,
        'esg.refData': 520.5,
        'esg.target': 528.5
      },
      {
        'esg.kpi': 2019,
        'esg.data': 650.2,
        'esg.refData': 500.0,
        'esg.target': 645.5
      },
      {
        'esg.kpi': 2020,
        'esg.data': 673.2,
        'esg.refData': 0,
        'esg.target': 610.5
      },
      {
        'esg.kpi': 2021,
        'esg.data': 720.3,
        'esg.refData': 0,
        'esg.target': 647.5
      }
    ],
    chartType: 'mixed',
    showRefData: true,
    barWidth: 1,
    colorPalette: 'palette8',
    fontSize: 12,
    monoChromeColors: false,
    monoChromeBaseColor: 'success',
    showZeros: false,
    curveType: 'straight'
  },
  {
    pId: 2,
    layouts: {
      lg: '{"x":0,"y":14,"w":12,"h":13}',
      md: '{"x":0,"y":14,"w":12,"h":13}',
      sm: '{"x":0,"y":14,"w":6,"h":13}',
      xs: '{"x":0,"y":14,"w":4,"h":13}',
      xxs: '{"x":0,"y":14,"w":4,"h":13}'
    },
    title: 'Total electricity used (Kwh/Mwh)',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 4231
      },
      {
        'esg.kpi': 2018,
        'esg.data': 5021
      },
      {
        'esg.kpi': 2019,
        'esg.data': 4710
      },
      {
        'esg.kpi': 2020,
        'esg.data': 4089
      },
      {
        'esg.kpi': 2021,
        'esg.data': 4896
      }
    ],
    chartType: 'bar',
    showRefData: false,
    hideYAxis: false
  },
  {
    pId: 2,
    layouts: {
      lg: '{"x":13,"y":14,"w":12,"h":13}',
      md: '{"x":13,"y":14,"w":12,"h":13}',
      sm: '{"x":7,"y":14,"w":6,"h":13}',
      xs: '{"x":0,"y":14,"w":4,"h":13}',
      xxs: '{"x":0,"y":14,"w":4,"h":13}'
    },
    title: 'Total natural gas used (Kwh/Mwh)',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 2860
      },
      {
        'esg.kpi': 2018,
        'esg.data': 3830
      },
      {
        'esg.kpi': 2019,
        'esg.data': 3040
      },
      {
        'esg.kpi': 2020,
        'esg.data': 3460
      },
      {
        'esg.kpi': 2021,
        'esg.data': 2010
      }
    ],
    chartType: 'bar',
    showRefData: false
  },
  {
    pId: 2,
    layouts: {
      lg: '{"x":0,"y":28,"w":12,"h":13}',
      md: '{"x":0,"y":28,"w":12,"h":13}',
      sm: '{"x":0,"y":14,"w":6,"h":13}',
      xs: '{"x":0,"y":14,"w":4,"h":13}',
      xxs: '{"x":0,"y":14,"w":4,"h":13}'
    },
    title:
      'Renewable energy share in the total final energy consumption (Kwh/Mwh)',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0
      },
      {
        'esg.kpi': 2018,
        'esg.data': 0
      },
      {
        'esg.kpi': 2019,
        'esg.data': 56
      },
      {
        'esg.kpi': 2020,
        'esg.data': 102
      },
      {
        'esg.kpi': 2021,
        'esg.data': 288
      }
    ],
    chartType: 'bar',
    showRefData: false
  },
  {
    pId: 2,
    layouts: {
      lg: '{"x":0,"y":28,"w":12,"h":18}',
      md: '{"x":0,"y":28,"w":12,"h":18}',
      sm: '{"x":0,"y":14,"w":6,"h":13}',
      xs: '{"x":0,"y":14,"w":4,"h":13}',
      xxs: '{"x":0,"y":14,"w":4,"h":13}'
    },
    title: 'Renewable Vs Electricity Usage Vs Natural Gas',
    description: 'Save me Save me Save me Save me Save me Save me ',
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 'Electricity Electricity Electricity ',
        'esg.data': 40000.0
      },
      {
        'esg.kpi': 'Renewable',
        'esg.data': 10000.0
      },
      {
        'esg.kpi': 'Natural Gas',
        'esg.data': 50000.0
      },
      {
        'esg.kpi': 'Bio Gas',
        'esg.data': 500.0
      }
    ],
    chartType: 'progressTable',
    showRefData: false,
    color: 'info',
    unit: 'MtCO2e',
    fontSize: 12,
    showTitle: true,
    centeredTitle: 'Total Scope 1'
  },
  {
    pId: 3,
    layouts: {
      lg: '{"x":0,"y":0,"w":12,"h":13}',
      md: '{"x":0,"y":0,"w":12,"h":13}',
      sm: '{"x":0,"y":0,"w":6,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Total waste generated (metric tons)',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 814520
      },
      {
        'esg.kpi': 2018,
        'esg.data': 123730
      },
      {
        'esg.kpi': 2019,
        'esg.data': 941270
      },
      {
        'esg.kpi': 2020,
        'esg.data': 356380
      },
      {
        'esg.kpi': 2021,
        'esg.data': 686000
      }
    ],
    chartType: 'bar',
    showRefData: false
  },
  {
    pId: 3,
    layouts: {
      lg: '{"x":14,"y":0,"w":12,"h":13}',
      md: '{"x":14,"y":0,"w":12,"h":13}',
      sm: '{"x":7,"y":0,"w":6,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Total waste per production (kg/metric ton)',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 56
      },
      {
        'esg.kpi': 2018,
        'esg.data': 70
      },
      {
        'esg.kpi': 2019,
        'esg.data': 69
      },
      {
        'esg.kpi': 2020,
        'esg.data': 61
      },
      {
        'esg.kpi': 2021,
        'esg.data': 59
      }
    ],
    chartType: 'bar',
    showRefData: false
  },
  {
    pId: 3,
    layouts: {
      lg: '{"x":0,"y":14,"w":12,"h":13}',
      md: '{"x":0,"y":14,"w":12,"h":13}',
      sm: '{"x":0,"y":14,"w":6,"h":13}',
      xs: '{"x":0,"y":14,"w":4,"h":13}',
      xxs: '{"x":0,"y":14,"w":4,"h":13}'
    },
    title: 'Total landfill waste (%)',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 5
      },
      {
        'esg.kpi': 2018,
        'esg.data': 5
      },
      {
        'esg.kpi': 2019,
        'esg.data': 7
      },
      {
        'esg.kpi': 2020,
        'esg.data': 7
      },
      {
        'esg.kpi': 2021,
        'esg.data': 6
      }
    ],
    chartType: 'bar',
    showRefData: false
  },
  {
    pId: 3,
    layouts: {
      lg: '{"x":13,"y":14,"w":12,"h":13}',
      md: '{"x":13,"y":14,"w":12,"h":13}',
      sm: '{"x":7,"y":14,"w":6,"h":13}',
      xs: '{"x":0,"y":14,"w":4,"h":13}',
      xxs: '{"x":0,"y":14,"w":4,"h":13}'
    },
    title: 'Electronic waste generated (Tonnes)',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 8
      },
      {
        'esg.kpi': 2018,
        'esg.data': 7
      },
      {
        'esg.kpi': 2019,
        'esg.data': 7
      },
      {
        'esg.kpi': 2020,
        'esg.data': 8
      },
      {
        'esg.kpi': 2021,
        'esg.data': 7
      }
    ],
    chartType: 'bar',
    showRefData: false
  },
  {
    pId: 4,
    layouts: {
      lg: '{"x":0,"y":0,"w":24,"h":13}',
      md: '{"x":0,"y":0,"w":24,"h":13}',
      sm: '{"x":0,"y":0,"w":12,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Total water usage',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 6641760
      },
      {
        'esg.kpi': 2018,
        'esg.data': 6254897
      },
      {
        'esg.kpi': 2019,
        'esg.data': 5645345
      },
      {
        'esg.kpi': 2020,
        'esg.data': 4987453
      },
      {
        'esg.kpi': 2021,
        'esg.data': 4481760
      }
    ],
    chartType: 'bar',
    showRefData: false
  },
  {
    pId: 4,
    layouts: {
      lg: '{"x":0,"y":14,"w":24,"h":20}',
      md: '{"x":0,"y":14,"w":24,"h":20}',
      sm: '{"x":0,"y":14,"w":12,"h":20}',
      xs: '{"x":0,"y":14,"w":4,"h":20}',
      xxs: '{"x":0,"y":14,"w":4,"h":20}'
    },
    title: 'Water usage details by type (%)',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi'],
      timeDimensions: [
        {
          dimension: 'esg.date',
          granularity: 'year'
        }
      ]
    },
    data: [
      {
        'esg.date': '2017-01-01T00:00:00.000',
        'esg.date.year': '2017-01-01T00:00:00.000',
        'esg.kpi': 'Primary water usage',
        'esg.data': 90
      },
      {
        'esg.date': '2018-01-01T00:00:00.000',
        'esg.date.year': '2018-01-01T00:00:00.000',
        'esg.kpi': 'Primary water usage',
        'esg.data': 87
      },
      {
        'esg.date': '2019-01-01T00:00:00.000',
        'esg.date.year': '2019-01-01T00:00:00.000',
        'esg.kpi': 'Primary water usage',
        'esg.data': 60
      },
      {
        'esg.date': '2020-01-01T00:00:00.000',
        'esg.date.year': '2020-01-01T00:00:00.000',
        'esg.kpi': 'Primary water usage',
        'esg.data': 55
      },
      {
        'esg.date': '2021-01-01T00:00:00.000',
        'esg.date.year': '2021-01-01T00:00:00.000',
        'esg.kpi': 'Primary water usage',
        'esg.data': 45
      },
      {
        'esg.date': '2017-01-01T00:00:00.000',
        'esg.date.year': '2017-01-01T00:00:00.000',
        'esg.kpi': 'Recycled water',
        'esg.data': 10
      },
      {
        'esg.date': '2018-01-01T00:00:00.000',
        'esg.date.year': '2018-01-01T00:00:00.000',
        'esg.kpi': 'Recycled water',
        'esg.data': 13
      },
      {
        'esg.date': '2019-01-01T00:00:00.000',
        'esg.date.year': '2019-01-01T00:00:00.000',
        'esg.kpi': 'Recycled water',
        'esg.data': 35
      },
      {
        'esg.date': '2020-01-01T00:00:00.000',
        'esg.date.year': '2020-01-01T00:00:00.000',
        'esg.kpi': 'Recycled water',
        'esg.data': 70
      },
      {
        'esg.date': '2021-01-01T00:00:00.000',
        'esg.date.year': '2021-01-01T00:00:00.000',
        'esg.kpi': 'Recycled water',
        'esg.data': 85
      },
      {
        'esg.date': '2017-01-01T00:00:00.000',
        'esg.date.year': '2017-01-01T00:00:00.000',
        'esg.kpi': 'Rain water harvesting',
        'esg.data': 0
      },
      {
        'esg.date': '2018-01-01T00:00:00.000',
        'esg.date.year': '2018-01-01T00:00:00.000',
        'esg.kpi': 'Rain water harvesting',
        'esg.data': 0
      },
      {
        'esg.date': '2019-01-01T00:00:00.000',
        'esg.date.year': '2019-01-01T00:00:00.000',
        'esg.kpi': 'Rain water harvesting',
        'esg.data': 5
      },
      {
        'esg.date': '2020-01-01T00:00:00.000',
        'esg.date.year': '2020-01-01T00:00:00.000',
        'esg.kpi': 'Rain water harvesting',
        'esg.data': 5
      },
      {
        'esg.date': '2021-01-01T00:00:00.000',
        'esg.date.year': '2021-01-01T00:00:00.000',
        'esg.kpi': 'Rain water harvesting',
        'esg.data': 10
      }
    ],
    chartType: 'line',
    showRefData: false,
    barWidth: 1,
    colorPalette: 'palette8',
    fontSize: 12,
    monoChromeColors: false,
    monoChromeBaseColor: 'success',
    showZeros: true,
    hideXAxis: false,
    hideYAxis: true,
    showDataLabels: false,
    enableMonoChromeColors: false,
    tooltipsEnabled: true,
    skewLabels: false,
    unit: '%',
    markerSize: 7,
    paddingOverrides: { left: 60, right: 60 }
  },
  {
    pId: 5,
    layouts: {
      lg: '{"x":0,"y":0,"w":12,"h":13}',
      md: '{"x":0,"y":0,"w":12,"h":13}',
      sm: '{"x":0,"y":0,"w":6,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Manufacturing (%)',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 29
      },
      {
        'esg.kpi': 2018,
        'esg.data': 25
      },
      {
        'esg.kpi': 2019,
        'esg.data': 27
      },
      {
        'esg.kpi': 2020,
        'esg.data': 29
      },
      {
        'esg.kpi': 2021,
        'esg.data': 29
      }
    ],
    chartType: 'pie',
    showRefData: false,
    monoChromeColors: true
  },
  {
    pId: 5,
    layouts: {
      lg: '{"x":13,"y":0,"w":12,"h":13}',
      md: '{"x":13,"y":0,"w":12,"h":13}',
      sm: '{"x":7,"y":0,"w":6,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'CO2 emissions (Tons)',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.73
      },
      {
        'esg.kpi': 2018,
        'esg.data': 0.84
      },
      {
        'esg.kpi': 2019,
        'esg.data': 0.75
      },
      {
        'esg.kpi': 2020,
        'esg.data': 0.62
      },
      {
        'esg.kpi': 2021,
        'esg.data': 0.7
      }
    ],
    chartType: 'area',
    showRefData: false
  },
  {
    pId: 6,
    layouts: {
      lg: '{"x":0,"y":0,"w":6,"h":10}',
      md: '{"x":0,"y":0,"w":6,"h":10}',
      sm: '{"x":0,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'Renewable energy usage ',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.8
      }
    ],
    chartType: 'percentageRadial',
    chartHeight: 240,
    showRefData: false
  },
  {
    pId: 6,
    layouts: {
      lg: '{"x":6,"y":0,"w":6,"h":10}',
      md: '{"x":6,"y":0,"w":6,"h":10}',
      sm: '{"x":3,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'Reduction in CO2 emission from manufacturing',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.65
      }
    ],
    chartType: 'percentageRadial',
    radialSize: 68,
    chartHeight: 250,
    fontSize: 12,
    showRefData: false
  },
  {
    pId: 6,
    layouts: {
      lg: '{"x":12,"y":0,"w":6,"h":10}',
      md: '{"x":12,"y":0,"w":6,"h":10}',
      sm: '{"x":6,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'Reduction in priority water usage',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.69
      }
    ],
    chartType: 'percentageRadial',
    showRefData: false
  },
  {
    pId: 6,
    layouts: {
      lg: '{"x":18,"y":0,"w":6,"h":10}',
      md: '{"x":18,"y":0,"w":6,"h":10}',
      sm: '{"x":9,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'Reduction of waste from manufacturing',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.51
      }
    ],
    chartType: 'percentageRadial',
    showRefData: false
  },
  {
    pId: 7,
    layouts: {
      lg: '{"x":0,"y":0,"w":6,"h":10}',
      md: '{"x":0,"y":0,"w":6,"h":10}',
      sm: '{"x":0,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'Revenue invested in employee training',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.63
      }
    ],
    chartType: 'percentageRadial',
    showRefData: false
  },
  {
    pId: 7,
    layouts: {
      lg: '{"x":6,"y":0,"w":6,"h":10}',
      md: '{"x":6,"y":0,"w":6,"h":10}',
      sm: '{"x":3,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'Absenteeism',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.82
      }
    ],
    chartType: 'percentageRadial',
    showRefData: false
  },
  {
    pId: 7,
    layouts: {
      lg: '{"x":12,"y":0,"w":6,"h":10}',
      md: '{"x":12,"y":0,"w":6,"h":10}',
      sm: '{"x":6,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'New hires',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.69
      }
    ],
    chartType: 'percentageRadial',
    showRefData: false
  },
  {
    pId: 7,
    layouts: {
      lg: '{"x":18,"y":0,"w":6,"h":10}',
      md: '{"x":18,"y":0,"w":6,"h":10}',
      sm: '{"x":9,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'Employee turnover',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.51
      }
    ],
    chartType: 'percentageRadial',
    showRefData: false,
    colorPalette: 'palette1',
    radialSize: 70
  },
  {
    pId: 8,
    layouts: {
      lg: '{"x":0,"y":0,"w":6,"h":10}',
      md: '{"x":0,"y":0,"w":6,"h":10}',
      sm: '{"x":0,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'Women in Leadership',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data', 'esg.refData'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 63,
        'esg.refData': 200
      }
    ],
    chartType: 'percentageRadial',
    showRefData: true,
    showAsFraction: false,
    colorPalette: 'palette8',
    radialSize: 70
  },
  {
    pId: 8,
    layouts: {
      lg: '{"x":6,"y":0,"w":6,"h":10}',
      md: '{"x":6,"y":0,"w":6,"h":10}',
      sm: '{"x":3,"y":0,"w":3,"h":10}',
      xs: '{"x":0,"y":0,"w":4,"h":10}',
      xxs: '{"x":0,"y":0,"w":4,"h":10}'
    },
    title: 'Revenue from new products',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 0.82
      }
    ],
    chartType: 'percentageRadial',
    showRefData: false,
    colorPalette: 'palette3',
    radialSize: 70
  },
  // {
  //   pId: 8,
  //   layouts: {
  //     lg: '{"x":0,"y":14,"w":12,"h":13}',
  //     md: '{"x":0,"y":14,"w":12,"h":13}',
  //     sm: '{"x":0,"y":14,"w":6,"h":13}',
  //     xs: '{"x":0,"y":14,"w":4,"h":13}',
  //     xxs: '{"x":0,"y":14,"w":4,"h":13}'
  //   },
  //   title: 'Monthly Progress',
  //   description: null,
  //   unitType: 'PERCENT',
  //   query: {
  //     measures: ['esg.data', 'esg.refData'],
  //     dimensions: ['esg.kpi']
  //   },
  //   data: [
  //     {
  //       'esg.kpi': 'Jan',
  //       'esg.data': 0.65,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'Feb',
  //       'esg.data': 0.58,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'March',
  //       'esg.data': 0.83,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'April',
  //       'esg.data': 0.8,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'May',
  //       'esg.data': 0.6,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'June',
  //       'esg.data': 0.84,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'August',
  //       'esg.data': 0.5,
  //       'esg.refData': 1000
  //     }
  //   ],
  //   chartType: 'progressRadial',
  //   showRefData: false,
  //   showFractionAsLabel: false,
  //   sortByLabel: false
  // },
  // {
  //   pId: 4,
  //   layout: '{"x":0,"y":0,"w":12,"h":13}',
  //   title: 'Actual VS Benchmark work time in months per Divisic',
  //   description: null,
  //   unitType: 'PERCENT',
  //   query: {
  //     measures: ['esg.data'],
  //     dimensions: ['esg.kpi']
  //   },
  //   data: [
  //     {
  //       'esg.kpi': 'Actual Expenses vs Budget',
  //       'esg.data': 82.23
  //     }
  //   ],
  //   chartType: 'percentageRadial',
  //   showRefData: false
  // },
  // {
  //   pId: 4,
  //   layout: '{"x":12,"y":0,"w":12,"h":13}',
  //   title: 'Actual income VS Budget',
  //   description: null,
  //   unitType: 'PERCENT',
  //   query: {
  //     measures: ['esg.data'],
  //     dimensions: ['esg.kpi']
  //   },
  //   data: [
  //     {
  //       'esg.kpi': 'Actual income VS Budget',
  //       'esg.data': 58.76
  //     }
  //   ],
  //   chartType: 'percentageRadial',
  //   showRefData: false
  // },
  // {
  //   pId: 4,
  //   layout: '{"x":0,"y":9,"w":12,"h":13}',
  //   title: 'Actual Expenses VS Budget',
  //   description: null,
  //   unitType: 'NUMBER',
  //   query: {
  //     measures: ['esg.data', 'esg.refData'],
  //     dimensions: ['esg.kpi']
  //   },
  //   data: [
  //     {
  //       'esg.kpi': 'Jan',
  //       'esg.data': 650,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'Feb',
  //       'esg.data': 580,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'March',
  //       'esg.data': 800,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'April',
  //       'esg.data': 800,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'May',
  //       'esg.data': 600,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'June',
  //       'esg.data': 800,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'August',
  //       'esg.data': 500,
  //       'esg.refData': 1000
  //     }
  //   ],
  //   chartType: 'line',
  //   showRefData: true
  // },
  // {
  //   pId: 4,
  //   layouts: {
  //     lg: '{"x":12,"y":8,"w":12,"h":13}',
  //     md: '{"x":12,"y":8,"w":12,"h":13}',
  //     sm: '{"x":12,"y":8,"w":6,"h":13}',
  //     xs: '{"x":0,"y":8,"w":4,"h":13}',
  //     xxs: '{"x":0,"y":8,"w":4,"h":13}'
  //   },
  //   title: 'Actual Income VS Budget',
  //   description: null,
  //   unitType: 'NUMBER',
  //   query: {
  //     measures: ['esg.data', 'esg.refData'],
  //     dimensions: ['esg.kpi']
  //   },
  //   data: [
  //     {
  //       'esg.kpi': 'Jan',
  //       'esg.data': 800,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'Feb',
  //       'esg.data': 900,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'March',
  //       'esg.data': 950,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'April',
  //       'esg.data': 800,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'May',
  //       'esg.data': 900,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'June',
  //       'esg.data': 800,
  //       'esg.refData': 1000
  //     },
  //     {
  //       'esg.kpi': 'August',
  //       'esg.data': 950,
  //       'esg.refData': 1000
  //     }
  //   ],
  //   chartType: 'line',
  //   showRefData: true
  // },
  {
    pId: 1,
    layouts: {
      lg: '{"x":0,"y":9,"w":24,"h":13}',
      md: '{"x":0,"y":9,"w":24,"h":13}',
      sm: '{"x":0,"y":9,"w":6,"h":13}',
      xs: '{"x":0,"y":9,"w":4,"h":13}',
      xxs: '{"x":0,"y":9,"w":4,"h":13}'
    },
    title: 'Actual VS Benchmark work time in months per Divisic',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data', 'esg.refData'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 'Customer Success',
        'esg.data': 20.23,
        'esg.refData': 29.33
      },
      {
        'esg.kpi': 'R&D',
        'esg.data': 20.65,
        'esg.refData': 28.2
      },
      {
        'esg.kpi': 'Marketing/Sales',
        'esg.data': 20.8,
        'esg.refData': 27.5
      },
      {
        'esg.kpi': 'Mobile/Web',
        'esg.data': 18.4,
        'esg.refData': 27
      },
      {
        'esg.kpi': 'IT',
        'esg.data': 14.34,
        'esg.refData': 24
      }
    ],
    chartType: 'bar',
    showRefData: true
  },
  {
    pId: 1,
    layouts: {
      lg: '{"x":13,"y":0,"w":24,"h":18}',
      md: '{"x":13,"y":0,"w":24,"h":18}',
      sm: '{"x":0,"y":0,"w":12,"h":18}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Turnover rate by Division',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data', 'esg.refData'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 'Mobile/Web',
        'esg.data': 43.8,
        'esg.refData': 45
      },
      {
        'esg.kpi': 'IT',
        'esg.data': 36.8,
        'esg.refData': 40
      },
      {
        'esg.kpi': 'Customer',
        'esg.data': 33.6,
        'esg.refData': 35
      },
      {
        'esg.kpi': 'R&D',
        'esg.data': 32.5,
        'esg.refData': 30
      },
      {
        'esg.kpi': 'Marketing',
        'esg.data': 31.1,
        'esg.refData': 35
      }
    ],
    chartType: 'bar',
    showRefData: true
  },
  {
    pId: 1,
    layouts: {
      lg: '{"x":0,"y":0,"w":24,"h":13}',
      md: '{"x":0,"y":0,"w":12,"h":13}',
      sm: '{"x":0,"y":0,"w":6,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Turnover rate Year over Year',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data', 'esg.refData'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': '2018',
        'esg.data': 17.2,
        'esg.refData': 20
      },
      {
        'esg.kpi': '2019',
        'esg.data': 20.9,
        'esg.refData': 22
      },
      {
        'esg.kpi': '2020',
        'esg.data': 25.7,
        'esg.refData': 25
      },
      {
        'esg.kpi': '2021',
        'esg.data': 33.2,
        'esg.refData': 33.5
      }
    ],
    chartType: 'bar',
    showRefData: true
  },
  ,
  // {
  //   pId: 2,
  //   layouts: '{"x":0,"y":0,"w":12,"h":13}',
  //   title: 'GHG emission contributors',
  //   description: null,
  //   unitType: 'PERCENT',
  //   query: {
  //     measures: ['esg.data'],
  //     dimensions: ['esg.kpi']
  //   },
  //   data: [
  //     {
  //       'esg.kpi': 'Manufacturing',
  //       'esg.data': 10
  //     },
  //     { 'esg.kpi': 'Raw material', 'esg.data': 15 },
  //     { 'esg.kpi': 'Packaging', 'esg.data': 20 },
  //     { 'esg.kpi': 'Raw material', 'esg.data': 15 }
  //   ],
  //   chartType: 'pie',
  //   showRefData: false
  // },
  // {
  //   pId: 2,
  //   layout: '{"x":12,"y":0,"w":12,"h":13}',
  //   title: 'GHG emissions',
  //   description: null,
  //   unitType: 'NUMBER',
  //   query: {
  //     measures: ['esg.data', 'esg.refData'],
  //     dimensions: ['esg.kpi']
  //   },
  //   data: [
  //     { 'esg.kpi': 2018, 'esg.data': 88000, 'esg.refData': 80000 },
  //     { 'esg.kpi': 2019, 'esg.data': 80000, 'esg.refData': 72000 },
  //     { 'esg.kpi': 2020, 'esg.data': 65000, 'esg.refData': 62000 },
  //     { 'esg.kpi': 2021, 'esg.data': 60000, 'esg.refData': 55555 }
  //   ],
  //   chartType: 'line',
  //   showRefData: true
  // },
  // {
  //   pId: 2,
  //   layout: '{"x":0,"y":8,"w":12,"h":13}',
  //   title: 'Types of energy used',
  //   description: null,
  //   unitType: 'NUMBER',
  //   query: {
  //     measures: ['esg.data'],
  //     dimensions: ['esg.kpi']
  //   },
  //   data: [
  //     { 'esg.kpi': 'Renewable', 'esg.data': 15.3 },
  //     { 'esg.kpi': 'Brown Coal', 'esg.data': 26.6 },
  //     { 'esg.kpi': 'Nuclear', 'esg.data': 27.2 },
  //     { 'esg.kpi': 'Gas ', 'esg.data': 30.9 }
  //   ],
  //   chartType: 'pie',
  //   showRefData: false
  // },
  // {
  //   pId: 2,
  //   layout: '{"x":12,"y":8,"w":12,"h":13}',
  //   title: 'Reduction in emissions due energy conversions',
  //   description: null,
  //   unitType: 'NUMBER',
  //   query: {
  //     measures: ['esg.data', 'esg.refData'],
  //     dimensions: ['esg.kpi']
  //   },
  //   data: [
  //     { 'esg.kpi': 2018, 'esg.data': 2700, 'esg.refData': 3700 },
  //     { 'esg.kpi': 2019, 'esg.data': 7500, 'esg.refData': 8000 },
  //     { 'esg.kpi': 2020, 'esg.data': 5200, 'esg.refData': 5200 },
  //     { 'esg.kpi': 2021, 'esg.data': 11000, 'esg.refData': 13700 }
  //   ],
  //   chartType: 'line',
  //   showRefData: true
  // },
  {
    pId: 9,
    layouts: {
      lg: '{"x":6,"y":0,"w":6,"h":8}',
      md: '{"x":6,"y":0,"w":6,"h":8}',
      sm: '{"x":3,"y":0,"w":3,"h":8}',
      xs: '{"x":0,"y":0,"w":4,"h":8}',
      xxs: '{"x":0,"y":0,"w":4,"h":8}'
    },
    title: 'Women Employees Ratio',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [{ 'esg.kpi': 'Women Employees Ratio', 'esg.data': 42.2 }],
    chartType: 'number',
    showRefData: false
  },
  {
    pId: 9,
    layouts: {
      lg: '{"x":12,"y":0,"w":6,"h":8}',
      md: '{"x":12,"y":0,"w":6,"h":8}',
      sm: '{"x":6,"y":0,"w":3,"h":8}',
      xs: '{"x":0,"y":0,"w":4,"h":8}',
      xxs: '{"x":0,"y":0,"w":4,"h":8}'
    },
    title: 'Complete Training Ratio',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [{ 'esg.kpi': 'Completed Training Ratio', 'esg.data': 0.6 }],
    chartType: 'number',
    showRefData: false,
    shortDescription: 'MtCO2e (Market Based)',
    trendEnabled: true
  },
  {
    pId: 9,
    layouts: {
      lg: '{"x":18,"y":0,"w":6,"h":8}',
      md: '{"x":18,"y":0,"w":6,"h":8}',
      sm: '{"x":9,"y":0,"w":3,"h":8}',
      xs: '{"x":0,"y":0,"w":4,"h":8}',
      xxs: '{"x":0,"y":0,"w":4,"h":8}'
    },
    title: 'Employee Satisfaction Ratio',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [{ 'esg.kpi': 'Employee Satisfaction Ratio', 'esg.data': 48.7 }],
    chartType: 'number',
    showRefData: false
  },
  {
    pId: 9,
    layouts: {
      lg: '{"x":0,"y":9,"w":12,"h":13}',
      md: '{"x":0,"y":9,"w":12,"h":13}',
      sm: '{"x":0,"y":9,"w":6,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Gender Diversity',
    description: null,

    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      { 'esg.kpi': 'Male', 'esg.data': 75 },
      { 'esg.kpi': 'Female', 'esg.data': 25 }
    ],
    chartType: 'pie',
    showRefData: false
  },
  {
    pId: 9,
    layouts: {
      lg: '{"x":12,"y":9,"w":12,"h":13}',
      md: '{"x":12,"y":9,"w":12,"h":13}',
      sm: '{"x":6,"y":9,"w":6,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Ethnic Diversity',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      { 'esg.kpi': 'White', 'esg.data': 33.3 },
      { 'esg.kpi': 'Black', 'esg.data': 66.7 }
    ],
    chartType: 'pie',
    showRefData: false
  },
  {
    Id: 5,
    title: 'Manufacturing (%)',
    titleEnabled: true,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 2017,
        'esg.data': 29
      },
      {
        'esg.kpi': 2018,
        'esg.data': 25
      },
      {
        'esg.kpi': 2019,
        'esg.data': 27
      },
      {
        'esg.kpi': 2020,
        'esg.data': 29
      },
      {
        'esg.kpi': 2021,
        'esg.data': 29
      }
    ],
    chartType: 'donut',
    chartHeight: 400,
    showRefData: false,
    titleEnabled: true,
    showLegend: false
  },
  {
    pId: 9,
    layouts: {
      lg: '{"x":0,"y":23,"w":12,"h":13}',
      md: '{"x":0,"y":23,"w":12,"h":13}',
      sm: '{"x":0,"y":23,"w":6,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Tenure Diversity',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      { 'esg.kpi': '0-3 years', 'esg.data': 33.3 },
      { 'esg.kpi': '4-6 years', 'esg.data': 16.7 },
      { 'esg.kpi': '7-9 years', 'esg.data': 25 },
      { 'esg.kpi': '10+ years', 'esg.data': 25 }
    ],
    chartType: 'pie',
    showRefData: false
  },
  {
    pId: 9,
    layouts: {
      lg: '{"x":0,"y":36,"w":24,"h":13}',
      md: '{"x":0,"y":36,"w":24,"h":13}',
      sm: '{"x":0,"y":36,"w":12,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Employees by Role',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.category', 'esg.subCategory']
    },
    data: [
      {
        'esg.category': 'Marketing',
        'esg.data': 43.8,
        'esg.subCategory': 'Cat 1'
      },
      {
        'esg.category': 'Marketing',
        'esg.data': 63.8,
        'esg.subCategory': 'Cat 2'
      },
      {
        'esg.category': 'IT',
        'esg.data': 36.8,
        'esg.subCategory': 'Cat 1'
      },
      {
        'esg.category': 'Engineering',
        'esg.data': 33.6,
        'esg.subCategory': 'Cat 2'
      },
      {
        'esg.category': 'HR',
        'esg.data': 32.5,
        'esg.subCategory': 'Cat 3'
      },
      {
        'esg.category': 'Management',
        'esg.data': 31.1,
        'esg.subCategory': 'Cat 4'
      }
    ],
    chartType: 'bar',
    showRefData: true,
    stacked: true,
    hideYAxis: true,
    showLegend: false,
    titleEnabled: true,
    showDataLabels: true,
    tooltipsEnabled: true,
    colorPalette: 'palette1',
    barWidth: 50,
    fontSize: 12,
    unit: 'x'
  },
  // {
  //   pId: 10,
  //   layouts: {
  //     lg: '{"x":0,"y":14,"w":24,"h":20}',
  //     md: '{"x":0,"y":14,"w":24,"h":20}',
  //     sm: '{"x":0,"y":14,"w":12,"h":20}',
  //     xs: '{"x":0,"y":14,"w":4,"h":20}',
  //     xxs: '{"x":0,"y":14,"w":4,"h":20}'
  //   },
  //   title: 'Water usage details by type (%)',
  //   description: null,
  //   unitType: 'PERCENT',
  //   query: {
  //     measures: ['esg.data'],
  //     dimensions: ['esg.kpi'],
  //     timeDimensions: [
  //       {
  //         dimension: 'esg.date',
  //         granularity: 'year'
  //       }
  //     ]
  //   },
  //   data: [
  //     {
  //       'esg.date': '2017-01-01T00:00:00.000',
  //       'esg.date.year': '2017-01-01T00:00:00.000',
  //       'esg.kpi': 'Primary water usage',
  //       'esg.data': 90
  //     },
  //     {
  //       'esg.date': '2018-01-01T00:00:00.000',
  //       'esg.date.year': '2018-01-01T00:00:00.000',
  //       'esg.kpi': 'Primary water usage',
  //       'esg.data': 87
  //     },
  //     {
  //       'esg.date': '2019-01-01T00:00:00.000',
  //       'esg.date.year': '2019-01-01T00:00:00.000',
  //       'esg.kpi': 'Primary water usage',
  //       'esg.data': 60
  //     },
  //     {
  //       'esg.date': '2020-01-01T00:00:00.000',
  //       'esg.date.year': '2020-01-01T00:00:00.000',
  //       'esg.kpi': 'Primary water usage',
  //       'esg.data': 55
  //     },
  //     {
  //       'esg.date': '2021-01-01T00:00:00.000',
  //       'esg.date.year': '2021-01-01T00:00:00.000',
  //       'esg.kpi': 'Primary water usage',
  //       'esg.data': 45
  //     },
  //     {
  //       'esg.date': '2017-01-01T00:00:00.000',
  //       'esg.date.year': '2017-01-01T00:00:00.000',
  //       'esg.kpi': 'Recycled water',
  //       'esg.data': 10
  //     },
  //     {
  //       'esg.date': '2018-01-01T00:00:00.000',
  //       'esg.date.year': '2018-01-01T00:00:00.000',
  //       'esg.kpi': 'Recycled water',
  //       'esg.data': 13
  //     },
  //     {
  //       'esg.date': '2019-01-01T00:00:00.000',
  //       'esg.date.year': '2019-01-01T00:00:00.000',
  //       'esg.kpi': 'Recycled water',
  //       'esg.data': 35
  //     },
  //     {
  //       'esg.date': '2020-01-01T00:00:00.000',
  //       'esg.date.year': '2020-01-01T00:00:00.000',
  //       'esg.kpi': 'Recycled water',
  //       'esg.data': 70
  //     },
  //     {
  //       'esg.date': '2021-01-01T00:00:00.000',
  //       'esg.date.year': '2021-01-01T00:00:00.000',
  //       'esg.kpi': 'Recycled water',
  //       'esg.data': 85
  //     },
  //     {
  //       'esg.date': '2017-01-01T00:00:00.000',
  //       'esg.date.year': '2017-01-01T00:00:00.000',
  //       'esg.kpi': 'Rain water harvesting',
  //       'esg.data': 0
  //     },
  //     {
  //       'esg.date': '2018-01-01T00:00:00.000',
  //       'esg.date.year': '2018-01-01T00:00:00.000',
  //       'esg.kpi': 'Rain water harvesting',
  //       'esg.data': 0
  //     },
  //     {
  //       'esg.date': '2019-01-01T00:00:00.000',
  //       'esg.date.year': '2019-01-01T00:00:00.000',
  //       'esg.kpi': 'Rain water harvesting',
  //       'esg.data': 5
  //     },
  //     {
  //       'esg.date': '2020-01-01T00:00:00.000',
  //       'esg.date.year': '2020-01-01T00:00:00.000',
  //       'esg.kpi': 'Rain water harvesting',
  //       'esg.data': 5
  //     },
  //     {
  //       'esg.date': '2021-01-01T00:00:00.000',
  //       'esg.date.year': '2021-01-01T00:00:00.000',
  //       'esg.kpi': 'Rain water harvesting',
  //       'esg.data': 10
  //     }
  //   ],
  //   chartType: 'radar',
  //   showRefData: false
  // },
  // {
  //   pId: 10,
  //   layouts: {
  //     lg: '{"x":0,"y":0,"w":24,"h":20}',
  //     md: '{"x":0,"y":0,"w":24,"h":13}',
  //     sm: '{"x":0,"y":0,"w":12,"h":13}',
  //     xs: '{"x":0,"y":0,"w":4,"h":13}',
  //     xxs: '{"x":0,"y":0,"w":4,"h":13}'
  //   },
  //   title: 'Organisational Health By Department',
  //   description: null,
  //   unitType: 'PERCENT',
  //   query: {
  //     measures: ['esg.data'],
  //     dimensions: ['esg.kpi', 'esg.department']
  //   },
  //   data: [
  //     {
  //       'esg.kpi': 'Physical & Emotional Wellbeing',
  //       'esg.department': 'Human Resources',
  //       'esg.data': 56
  //     },
  //     {
  //       'esg.kpi': 'Financial Wellbeing',
  //       'esg.department': 'Human Resources',
  //       'esg.data': 34
  //     },
  //     {
  //       'esg.kpi': 'Technology',
  //       'esg.department': 'Human Resources',
  //       'esg.data': 78
  //     },
  //     {
  //       'esg.kpi': 'Leadership & Culture',
  //       'esg.department': 'Human Resources',
  //       'esg.data': 40
  //     },
  //     {
  //       'esg.kpi': 'Strategy & Change Management',
  //       'esg.department': 'Human Resources',
  //       'esg.data': 33
  //     },
  //     {
  //       'esg.kpi': 'Physical & Emotional Wellbeing',
  //       'esg.department': 'Finance',
  //       'esg.data': 56
  //     },
  //     {
  //       'esg.kpi': 'Financial Wellbeing',
  //       'esg.department': 'Finance',
  //       'esg.data': 34
  //     },
  //     {
  //       'esg.kpi': 'Technology',
  //       'esg.department': 'Finance',
  //       'esg.data': 78
  //     },
  //     {
  //       'esg.kpi': 'Leadership & Culture',
  //       'esg.department': 'Finance',
  //       'esg.data': 40
  //     },
  //     {
  //       'esg.kpi': 'Strategy & Change Management',
  //       'esg.department': 'Finance',
  //       'esg.data': 33
  //     },
  //     {
  //       'esg.kpi': 'Physical & Emotional Wellbeing',
  //       'esg.department': 'Legal',
  //       'esg.data': 56
  //     },
  //     {
  //       'esg.kpi': 'Financial Wellbeing',
  //       'esg.department': 'Legal',
  //       'esg.data': 34
  //     },
  //     {
  //       'esg.kpi': 'Technology',
  //       'esg.department': 'Legal',
  //       'esg.data': 78
  //     },
  //     {
  //       'esg.kpi': 'Leadership & Culture',
  //       'esg.department': 'Legal',
  //       'esg.data': 40
  //     },
  //     {
  //       'esg.kpi': 'Strategy & Change Management',
  //       'esg.department': 'Legal',
  //       'esg.data': 33
  //     },
  //     {
  //       'esg.kpi': 'Physical & Emotional Wellbeing',
  //       'esg.department': 'Adminstration',
  //       'esg.data': 56
  //     },
  //     {
  //       'esg.kpi': 'Financial Wellbeing',
  //       'esg.department': 'Adminstration',
  //       'esg.data': 34
  //     },
  //     {
  //       'esg.kpi': 'Technology',
  //       'esg.department': 'Adminstration',
  //       'esg.data': 78
  //     },
  //     {
  //       'esg.kpi': 'Leadership & Culture',
  //       'esg.department': 'Adminstration',
  //       'esg.data': 40
  //     },
  //     {
  //       'esg.kpi': 'Strategy & Change Management',
  //       'esg.department': 'Adminstration',
  //       'esg.data': 33
  //     },
  //     {
  //       'esg.kpi': 'Physical & Emotional Wellbeing',
  //       'esg.department': 'Information Technology',
  //       'esg.data': 56
  //     },
  //     {
  //       'esg.kpi': 'Financial Wellbeing',
  //       'esg.department': 'Information Technology',
  //       'esg.data': 34
  //     },
  //     {
  //       'esg.kpi': 'Technology',
  //       'esg.department': 'Information Technology',
  //       'esg.data': 78
  //     },
  //     {
  //       'esg.kpi': 'Leadership & Culture',
  //       'esg.department': 'Information Technology',
  //       'esg.data': 40
  //     },
  //     {
  //       'esg.kpi': 'Strategy & Change Management',
  //       'esg.department': 'Information Technology',
  //       'esg.data': 33
  //     },
  //     {
  //       'esg.kpi': 'Physical & Emotional Wellbeing',
  //       'esg.department': 'Logistics',
  //       'esg.data': 56
  //     },
  //     {
  //       'esg.kpi': 'Financial Wellbeing',
  //       'esg.department': 'Logistics',
  //       'esg.data': 34
  //     },
  //     {
  //       'esg.kpi': 'Technology',
  //       'esg.department': 'Logistics',
  //       'esg.data': 78
  //     },
  //     {
  //       'esg.kpi': 'Leadership & Culture',
  //       'esg.department': 'Logistics',
  //       'esg.data': 40
  //     },
  //     {
  //       'esg.kpi': 'Strategy & Change Management',
  //       'esg.department': 'Logistics',
  //       'esg.data': 33
  //     }
  //   ],
  //   chartType: 'bubble',
  //   showRefData: true
  // },
  {
    pId: 10,
    layouts: {
      lg: '{"x":0,"y":0,"w":6,"h":6}',
      md: '{"x":0,"y":0,"w":6,"h":6}',
      sm: '{"x":0,"y":0,"w":3,"h":6}',
      xs: '{"x":0,"y":0,"w":4,"h":6}',
      xxs: '{"x":0,"y":0,"w":4,"h":6}'
    },
    title: 'Tonnes CO2e',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [{ 'esg.kpi': 'Tonnes CO2e', 'esg.data': 304766.77 }],
    chartType: 'number',
    showRefData: false
  },
  {
    pId: 10,
    layouts: {
      lg: '{"x":6,"y":0,"w":6,"h":6}',
      md: '{"x":6,"y":0,"w":6,"h":6}',
      sm: '{"x":3,"y":0,"w":3,"h":6}',
      xs: '{"x":0,"y":0,"w":4,"h":6}',
      xxs: '{"x":0,"y":0,"w":4,"h":6}'
    },
    title: 'Tonnes C02',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [{ 'esg.kpi': 'Tonnes C02', 'esg.data': 272589.41 }],
    chartType: 'number',
    showRefData: false
  },
  {
    pId: 10,
    layouts: {
      lg: '{"x":12,"y":0,"w":6,"h":6}',
      md: '{"x":12,"y":0,"w":6,"h":6}',
      sm: '{"x":6,"y":0,"w":3,"h":6}',
      xs: '{"x":0,"y":0,"w":4,"h":6}',
      xxs: '{"x":0,"y":0,"w":4,"h":6}'
    },
    title: 'Tonnes CH4',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [{ 'esg.kpi': 'Tonnes CH4', 'esg.data': 22674.27 }],
    chartType: 'number',
    showRefData: false
  },
  {
    pId: 10,
    layouts: {
      lg: '{"x":18,"y":0,"w":6,"h":6}',
      md: '{"x":18,"y":0,"w":6,"h":6}',
      sm: '{"x":9,"y":0,"w":3,"h":6}',
      xs: '{"x":0,"y":0,"w":4,"h":6}',
      xxs: '{"x":0,"y":0,"w":4,"h":6}'
    },
    title: 'Tonnes N2O',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [{ 'esg.kpi': 'Tonnes N2O', 'esg.data': 9503.11 }],
    chartType: 'number',
    showRefData: false
  },
  {
    pId: 10,
    layouts: {
      lg: '{"x":0,"y":8,"w":24,"h":14}',
      md: '{"x":0,"y":8,"w":24,"h":14}',
      sm: '{"x":0,"y":8,"w":12,"h":14}',
      xs: '{"x":0,"y":8,"w":8,"h":13}',
      xxs: '{"x":0,"y":8,"w":8,"h":13}'
    },
    title: 'CO2 emissions (metric tons per capita)',
    description: '<p style="font-size:12px;">Sample description</p>',
    // '<p style="font-size:12px; margin-left: 20px;">Emissions in tons per capita. Reference data for South Asia (provided by <a href="https://databank.worldbank.org/reports.aspx?source=3711&series=EN.ATM.CO2E.PC&country=EAS" target="_blank">worldbank.org</a>) <br/><br/> <a href="https://sdgs.un.org/goals/goal13" target="_blank">UN SDG Goal 13</a>: Take urgent action to combat climate change and its impacts</p>',
    unitType: 'NUMBER',
    query: {
      measures: ['esg.target', 'esg.data'],
      timeDimensions: [
        {
          dimension: 'esg.date',
          granularity: 'year'
        }
      ],
      dimensions: ['esg.date']
    },
    data: [
      {
        'esg.date': '2019-01-01T00:00:00.000',
        'esg.date.year': '2019-01-01T00:00:00.000',
        'esg.target': 772290,
        'esg.data': 772290
      },
      {
        'esg.date': '2020-01-01T00:00:00.000',
        'esg.date.year': '2020-01-01T00:00:00.000',
        'esg.target': 632290,
        'esg.data': 572190
      },
      {
        'esg.date': '2021-01-01T00:00:00.000',
        'esg.date.year': '2021-01-01T00:00:00.000',
        'esg.target': 450000,
        'esg.data': 402000
      }
    ],
    chartType: 'mixed',
    showRefData: true,
    // labels: 'T,E',
    barWidth: 1,
    colorPalette: 'palette2',
    fontSize: 12,
    monoChromeColors: true,
    monoChromeBaseColor: 'success'
  },

  {
    pId: 10,
    layouts: {
      lg: '{"x":0,"y":8,"w":24,"h":18}',
      md: '{"x":0,"y":8,"w":24,"h":18}',
      sm: '{"x":0,"y":8,"w":12,"h":14}',
      xs: '{"x":0,"y":8,"w":8,"h":13}',
      xxs: '{"x":0,"y":8,"w":8,"h":13}'
    },
    title: 'Emissions Lineage',
    description: '<p>Some description.</p>',
    unitType: 'NUMBER',
    query: {
      measures: ['emissions.data'],
      timeDimensions: [
        {
          dimension: 'emissions.date',
          granularity: 'year'
        }
      ],
      dimensions: ['emissions.category', 'emissions.subCategory'],
      timezone: 'UTC',
      order: [],
      filters: []
    },
    data: [
      {
        'emissions.date': '2019-10-01T00:00:00.000',
        'emissions.date.year': '2019-10-01T00:00:00.000',
        'emissions.category': 'Petrol',
        'emissions.subCategory': 'Scope 1',
        'emissions.data': 220150
      },
      {
        'emissions.date': '2019-10-01T00:00:00.000',
        'emissions.date.year': '2019-10-01T00:00:00.000',
        'emissions.category': 'Diesel',
        'emissions.subCategory': 'Scope 1',
        'emissions.data': 215000
      },
      {
        'emissions.date': '2019-10-01T00:00:00.000',
        'emissions.date.year': '2019-10-01T00:00:00.000',
        'emissions.category': 'Refrigirents (R-410)',
        'emissions.subCategory': 'Scope 1',
        'emissions.data': 182050
      },
      {
        'emissions.date': '2019-10-01T00:00:00.000',
        'emissions.date.year': '2019-10-01T00:00:00.000',
        'emissions.category': 'Purchased Electricity',
        'emissions.subCategory': 'Scope 2',
        'emissions.data': 308000
      },
      {
        'emissions.date': '2019-10-01T00:00:00.000',
        'emissions.date.year': '2019-10-01T00:00:00.000',
        'emissions.category': 'Purchased Goods',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 250000
      },
      {
        'emissions.date': '2019-10-01T00:00:00.000',
        'emissions.date.year': '2019-10-01T00:00:00.000',
        'emissions.category': 'Downstream Transport',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 285000
      },
      {
        'emissions.date': '2019-10-01T00:00:00.000',
        'emissions.date.year': '2019-10-01T00:00:00.000',
        'emissions.category': 'investments',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 145000
      },
      {
        'emissions.date': '2020-10-01T00:00:00.000',
        'emissions.date.year': '2020-10-01T00:00:00.000',
        'emissions.category': 'Petrol',
        'emissions.subCategory': 'Scope 1',
        'emissions.data': 200150
      },
      {
        'emissions.date': '2020-10-01T00:00:00.000',
        'emissions.date.year': '2020-10-01T00:00:00.000',
        'emissions.category': 'Diesel',
        'emissions.subCategory': 'Scope 1',
        'emissions.data': 235000
      },
      {
        'emissions.date': '2020-10-01T00:00:00.000',
        'emissions.date.year': '2020-10-01T00:00:00.000',
        'emissions.category': 'Refrigirents (R-410)',
        'emissions.subCategory': 'Scope 1',
        'emissions.data': 142050
      },
      {
        'emissions.date': '2020-10-01T00:00:00.000',
        'emissions.date.year': '2020-10-01T00:00:00.000',
        'emissions.category': 'Purchased Electricity',
        'emissions.subCategory': 'Scope 2',
        'emissions.data': 308000
      },
      {
        'emissions.date': '2020-10-01T00:00:00.000',
        'emissions.date.year': '2020-10-01T00:00:00.000',
        'emissions.category': 'Purchased Goods',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 190000
      },
      {
        'emissions.date': '2020-10-01T00:00:00.000',
        'emissions.date.year': '2020-10-01T00:00:00.000',
        'emissions.category': 'Downstream Transport',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 285000
      },
      {
        'emissions.date': '2020-10-01T00:00:00.000',
        'emissions.date.year': '2020-10-01T00:00:00.000',
        'emissions.category': 'investments',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 145000
      },
      {
        'emissions.date': '2020-10-01T00:00:00.000',
        'emissions.date.year': '2020-10-01T00:00:00.000',
        'emissions.category': 'Other',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 350000
      },
      {
        'emissions.date': '2021-10-01T00:00:00.000',
        'emissions.date.year': '2021-10-01T00:00:00.000',
        'emissions.category': 'Petrol',
        'emissions.subCategory': 'Scope 1',
        'emissions.data': 302150
      },
      {
        'emissions.date': '2021-10-01T00:00:00.000',
        'emissions.date.year': '2021-10-01T00:00:00.000',
        'emissions.category': 'Diesel',
        'emissions.subCategory': 'Scope 1',
        'emissions.data': 206097
      },
      {
        'emissions.date': '2021-10-01T00:00:00.000',
        'emissions.date.year': '2021-10-01T00:00:00.000',
        'emissions.category': 'Refrigirents (R-410)',
        'emissions.subCategory': 'Scope 1',
        'emissions.data': 210000
      },
      {
        'emissions.date': '2021-10-01T00:00:00.000',
        'emissions.date.year': '2021-10-01T00:00:00.000',
        'emissions.category': 'Purchased Electricity',
        'emissions.subCategory': 'Scope 2',
        'emissions.data': 408000
      },
      {
        'emissions.date': '2021-10-01T00:00:00.000',
        'emissions.date.year': '2021-10-01T00:00:00.000',
        'emissions.category': 'Purchased Goods',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 190000
      },
      {
        'emissions.date': '2021-10-01T00:00:00.000',
        'emissions.date.year': '2021-10-01T00:00:00.000',
        'emissions.category': 'Downstream Transport',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 275000
      },
      {
        'emissions.date': '2021-10-01T00:00:00.000',
        'emissions.date.year': '2021-10-01T00:00:00.000',
        'emissions.category': 'investments',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 286000
      },
      {
        'emissions.date': '2021-10-01T00:00:00.000',
        'emissions.date.year': '2021-10-01T00:00:00.000',
        'emissions.category': 'Other',
        'emissions.subCategory': 'Scope 3',
        'emissions.data': 316000
      }
      // {
      //   'esg.indicator': 'Purchased electricity - Location based',
      //   'esg.subCategory': 'scope 2',
      //   'esg.date.year': '2019-01-01T00:00:00.000',
      //   'esg.date': '2019-01-01T00:00:00.000',
      //   'esg.total': '247'
      // }
      // {
      //   'esg.indicator': 'Purchased electricity - Location based',
      //   'esg.subCategory': 'scope 2',
      //   'esg.date.year': '2020-01-01T00:00:00.000',
      //   'esg.date': '2020-01-01T00:00:00.000',
      //   'esg.total': '799'
      // },
      // {
      //   'esg.indicator': 'Purchased electricity - Location based',
      //   'esg.subCategory': 'scope 2',
      //   'esg.date.year': '2021-01-01T00:00:00.000',
      //   'esg.date': '2021-01-01T00:00:00.000',
      //   'esg.total': '327'
      // },
      // {
      //   'esg.indicator': 'Refrigerant (R-410A)',
      //   'esg.subCategory': 'scope 1',
      //   'esg.date.year': '2021-01-01T00:00:00.000',
      //   'esg.date': '2021-01-01T00:00:00.000',
      //   'esg.total': '191.3'
      // },
      // {
      //   'esg.indicator': 'Refrigerant (R-410A)',
      //   'esg.subCategory': 'scope 1',
      //   'esg.date.year': '2019-01-01T00:00:00.000',
      //   'esg.date': '2019-01-01T00:00:00.000',
      //   'esg.total': '144.7'
      // },
      // {
      //   'esg.indicator': 'Natural Gas',
      //   'esg.subCategory': 'scope 1',
      //   'esg.date.year': '2021-01-01T00:00:00.000',
      //   'esg.date': '2021-01-01T00:00:00.000',
      //   'esg.total': '120.3'
      // },
      // {
      //   'esg.indicator': 'Natural Gas',
      //   'esg.subCategory': 'scope 1',
      //   'esg.date.year': '2019-01-01T00:00:00.000',
      //   'esg.date': '2019-01-01T00:00:00.000',
      //   'esg.total': '85.5'
      // },
      // {
      //   'esg.indicator': 'Motor Gasoline (Petrol)',
      //   'esg.subCategory': 'scope 1',
      //   'esg.date.year': '2019-01-01T00:00:00.000',
      //   'esg.date': '2019-01-01T00:00:00.000',
      //   'esg.total': '81.6'
      // },
      // {
      //   'esg.indicator': 'Natural Gas',
      //   'esg.subCategory': 'scope 1',
      //   'esg.date.year': '2020-01-01T00:00:00.000',
      //   'esg.date': '2020-01-01T00:00:00.000',
      //   'esg.total': '48.4'
      // },
      // {
      //   'esg.indicator': 'Motor Gasoline (Petrol)',
      //   'esg.subCategory': 'scope 1',
      //   'esg.date.year': '2020-01-01T00:00:00.000',
      //   'esg.date': '2020-01-01T00:00:00.000',
      //   'esg.total': '12.5'
      // },
      // {
      //   'esg.indicator': 'Motor Gasoline (Petrol)',
      //   'esg.subCategory': 'scope 1',
      //   'esg.date.year': '2021-01-01T00:00:00.000',
      //   'esg.date': '2021-01-01T00:00:00.000',
      //   'esg.total': '12.1'
      // },
      // {
      //   'esg.indicator': 'Refrigerant (R-410A)',
      //   'esg.subCategory': 'scope 1',
      //   'esg.date.year': '2020-01-01T00:00:00.000',
      //   'esg.date': '2020-01-01T00:00:00.000',
      //   'esg.total': '5.9'
      // }
    ],
    chartType: 'emissions_lineage',
    showRefData: false,
    fontSize: 12,
    categoryFontSize: 14,
    colorPalette: 'schemePaired',
    unit: 'mtCO2e'
  },
  {
    pId: 10,
    layouts: {
      lg: '{"x":0,"y":22,"w":24,"h":13}',
      md: '{"x":0,"y":22,"w":24,"h":13}',
      sm: '{"x":0,"y":22,"w":12,"h":13}',
      xs: '{"x":0,"y":0,"w":4,"h":13}',
      xxs: '{"x":0,"y":0,"w":4,"h":13}'
    },
    title: 'Co2 Emissions (tons) with Aspect',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.emission', 'esg.franchise']
    },
    data: [
      {
        'esg.emission': 'Direct Emission',
        'esg.franchise': 'Franchise A',
        'esg.data': 20000
      },
      {
        'esg.emission': 'Direct Emission',
        'esg.franchise': 'Franchise B',
        'esg.data': 35000
      },
      {
        'esg.emission': 'Direct Emission',
        'esg.franchise': 'Franchise C',
        'esg.data': 20000
      },
      {
        'esg.emission': 'Direct Emission',
        'esg.franchise': 'Franchise D',
        'esg.data': 72220
      },
      {
        'esg.emission': 'Direct Emission',
        'esg.franchise': 'Franchise E',
        'esg.data': 53111
      },
      {
        'esg.emission': 'Direct Emission',
        'esg.franchise': 'Franchise F',
        'esg.data': 14222
      },
      {
        'esg.emission': 'Direct Emission',
        'esg.franchise': 'Franchise G',
        'esg.data': 28999
      },
      {
        'esg.emission': 'Other Indirect Emission',
        'esg.franchise': 'Franchise A',
        'esg.data': 230
      },
      {
        'esg.emission': 'Other Indirect Emission',
        'esg.franchise': 'Franchise B',
        'esg.data': 300
      },
      {
        'esg.emission': 'Other Indirect Emission',
        'esg.franchise': 'Franchise C',
        'esg.data': 510
      },
      {
        'esg.emission': 'Other Indirect Emission',
        'esg.franchise': 'Franchise D',
        'esg.data': 72220
      },
      {
        'esg.emission': 'Other Indirect Emission',
        'esg.franchise': 'Franchise E',
        'esg.data': 350
      },
      {
        'esg.emission': 'Other Indirect Emission',
        'esg.franchise': 'Franchise F',
        'esg.data': 217
      },
      {
        'esg.emission': 'Other Indirect Emission',
        'esg.franchise': 'Franchise G',
        'esg.data': 121
      }
    ],
    chartType: 'heatmap',
    chartColor: '#B78B02',
    showRefData: true
  },
  {
    pId: 10,
    layouts: {
      lg: '{"x":0,"y":8,"w":12,"h":13}',
      md: '{"x":0,"y":8,"w":12,"h":13}',
      sm: '{"x":0,"y":8,"w":6,"h":13}',
      xs: '{"x":0,"y":8,"w":4,"h":13}',
      xxs: '{"x":0,"y":8,"w":4,"h":13}'
    },
    title: 'Emissions by the scopes',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: [
        'esg.tonnesCO2e',
        'esg.tonnesCO2',
        'esg.tonnesCH4',
        'esg.tonnesNO2'
      ],
      dimensions: ['esg.kpi']
    },
    data: [
      {
        'esg.kpi': 'Scope-1',
        'esg.tonnesCO2e': 115837.87,
        'esg.tonnesCO2': 104254.09,
        'esg.tonnesCH4': 8108.65,
        'esg.tonnesNO2': 3475.14
      },
      {
        'esg.kpi': 'Scope-2',
        'esg.tonnesCO2e': 36511.17,
        'esg.tonnesCO2': 32860.05,
        'esg.tonnesCH4': 2555.78,
        'esg.tonnesNO2': 1096.33
      },
      {
        'esg.kpi': 'Scope-3',
        'esg.tonnesCO2e': 152417.73,
        'esg.tonnesCO2': 135475.28,
        'esg.tonnesCH4': 12009.83,
        'esg.tonnesNO2': 4932.64
      }
    ],
    chartType: 'bar',
    showRefData: true
  },
  {
    pId: 10,
    layouts: {
      lg: '{"x":12,"y":8,"w":12,"h":13}',
      md: '{"x":12,"y":8,"w":12,"h":13}',
      sm: '{"x":6,"y":8,"w":6,"h":13}',
      xs: '{"x":0,"y":8,"w":4,"h":13}',
      xxs: '{"x":0,"y":8,"w":4,"h":13}'
    },
    title: 'Emission factors',
    description: null,
    unitType: 'PERCENT',
    query: {
      measures: ['esg.data'],
      dimensions: ['esg.kpi']
    },
    data: [
      { 'esg.kpi': 'Business travelling', 'esg.data': 6.9 },
      {
        'esg.kpi': 'Downstream transportation and distribution',
        'esg.data': 8.9
      },
      { 'esg.kpi': 'Employee commuting', 'esg.data': 7.3 },
      { 'esg.kpi': 'End-of-Life Treatment of Sold Products', 'esg.data': 3.1 },
      { 'esg.kpi': 'Fugitive Emissions', 'esg.data': 6.9 },
      { 'esg.kpi': 'Mobile Combustion', 'esg.data': 12.9 },
      { 'esg.kpi': 'Processing of sold products', 'esg.data': 7.4 },
      { 'esg.kpi': 'Purchased Energy', 'esg.data': 12 },
      { 'esg.kpi': 'Purchased goods & services', 'esg.data': 4.5 },
      { 'esg.kpi': 'Others', 'esg.data': 30.1 }
    ],
    chartType: 'pie',
    showRefData: false
  },
  {
    pId: 10,
    layouts: {
      lg: '{"x":0,"y":35,"w":24,"h":13}',
      md: '{"x":0,"y":35,"w":24,"h":13}',
      sm: '{"x":0,"y":35,"w":12,"h":13}',
      xs: '{"x":0,"y":35,"w":8,"h":13}',
      xxs: '{"x":0,"y":35,"w":8,"h":13}'
    },
    title: 'Details',
    description: null,
    unitType: 'NUMBER',
    query: {
      measures: [
        'esg.tonnesCO2e',
        'esg.tonnesCO2',
        'esg.tonnesCH4',
        'esg.tonnesNO2'
      ],
      dimensions: ['esg.emissions', 'esg.franchise', 'esg.aspects']
    },
    data: [
      {
        'esg.emissions': 'Indirect Emission',
        'esg.franchise': 'Franchise A',
        'esg.aspects': 'Electricity',
        'esg.tonnesCO2e': 25000,
        'esg.tonnesCO2': 22500,
        'esg.tonnesNO2': 750,
        'esg.tonnesCH4': 1750
      },
      {
        'esg.emissions': 'Other Indirect Emission',
        'esg.franchise': 'Franchise B',
        'esg.aspects': 'supplier van',
        'esg.tonnesCO2e': 23899,
        'esg.tonnesCO2': 21509.12,
        'esg.tonnesNO2': 716.97,
        'esg.tonnesCH4': 1672.93
      },
      {
        'esg.emissions': 'Other Indirect Emission',
        'esg.franchise': 'Franchise B',
        'esg.aspects': 'products',
        'esg.tonnesCO2e': 21530.65,
        'esg.tonnesCO2': 19377.59,
        'esg.tonnesNO2': 645.92,
        'esg.tonnesCH4': 1507.15
      },
      {
        'esg.emissions': 'Direct Emission',
        'esg.franchise': 'Franchise B',
        'esg.aspects': 'Refrigerants',
        'esg.tonnesCO2e': 19713.14,
        'esg.tonnesCO2': 17741.83,
        'esg.tonnesNO2': 591.39,
        'esg.tonnesCH4': 1379.92
      },
      {
        'esg.emissions': 'Other Indirect Emission',
        'esg.franchise': 'Franchise B',
        'esg.aspects': 'Cars',
        'esg.tonnesCO2e': 19396.98,
        'esg.tonnesCO2': 17457.29,
        'esg.tonnesNO2': 581.91,
        'esg.tonnesCH4': 1357.79
      },
      {
        'esg.emissions': 'Other Indirect Emission',
        'esg.franchise': 'Franchise B',
        'esg.aspects': 'Air travelling',
        'esg.tonnesCO2e': 17474.76,
        'esg.tonnesCO2': 15727.28,
        'esg.tonnesNO2': 524.24,
        'esg.tonnesCH4': 1223.23
      }
    ],
    chartType: 'table',
    showTableHeader: true,
    tableRowCount: 5,
    showRefData: true
  }
];

const ADMIN_PORTAL_PERMISSION_GROUPS = [
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba1-${1}`,
    name: 'Report_Admins'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba2-${2}`,
    name: 'Basic_Users'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba3-${3}`,
    name: 'ESG_Managers'
  }
];

const SUMMARY_CHARTS = {
  title: 'Environment',
  link: '/insights/reports/bookmarks/2?view=Environment%20-%20Energy',
  linkText: 'View Full Report',
  chartData: {
    props: { chartDescriptionEnabled: true },
    values: [
      {
        id: 6,
        title: 'Reduction in CO2',
        shortDescription: 'MtCO2e',
        unitType: 'PERCENT',
        query: {
          measures: ['esg.data'],
          dimensions: ['esg.kpi']
        },
        data: [
          {
            'esg.kpi': 2017,
            'esg.data': 82.98
          }
        ],
        chartType: 'percentageRadial',
        radialSize: 60,
        // chartHeight: 280,
        fontSize: 10,
        showRefData: false,
        titleEnabled: true,
        valueFontSize: 26,
        // paddingOverrides: { left: 30, right: 30, top: 20, bottom: 20 },
        colorPalette: 'palette4'
      },
      {
        title: 'CO2 Emissions by Department',
        description:
          'A total of ${Math.round(total())} A total of ${Math.round(total())} A total of ${Math.round(total())} A total of ${Math.round(total())} A total of ${Math.round(total())} A total of ${Math.round(total())} A total of ${Math.round(total())} A total of ${Math.round(total())}',
        unitType: 'PERCENT',
        query: {
          measures: ['esg.data', 'esg.subCategory'],
          dimensions: ['esg.category']
        },
        data: [
          {
            'esg.category': 'Marketing',
            'esg.data': 43.8,
            'esg.subCategory': 45
          },
          {
            'esg.category': 'IT',
            'esg.data': 36.8,
            'esg.subCategory': 40
          },
          {
            'esg.category': 'Engineering',
            'esg.data': 33.6,
            'esg.subCategory': 35
          }
        ],
        chartType: 'bar',
        showRefData: true,
        stacked: true,
        hideXAxis: true,
        hideYAxis: true,
        showLegend: false,
        titleEnabled: true,
        showDataLabels: true,
        tooltipsEnabled: true,
        paddingOverrides: { top: 30, bottom: 30 },
        colorPalette: 'palette4',
        barWidth: 65,
        fontSize: 14
      },

      {
        Id: 2,
        title: 'Total electricity used',
        unitType: 'NUMBER',
        query: {
          measures: ['esg.data'],
          dimensions: ['esg.kpi']
        },
        data: [
          {
            'esg.kpi': 2017,
            'esg.data': 4231
          },
          {
            'esg.kpi': 2018,
            'esg.data': 5021
          },
          {
            'esg.kpi': 2019,
            'esg.data': 4710
          },
          {
            'esg.kpi': 2020,
            'esg.data': 4089
          },
          {
            'esg.kpi': 2021,
            'esg.data': 4896
          }
        ],
        chartType: 'bar',
        showRefData: true,
        stacked: true,
        hideXAxis: true,
        hideYAxis: true,
        showLegend: false,
        titleEnabled: true,
        showDataLabels: true,
        tooltipsEnabled: false,
        // paddingOverrides: { left: 40, right: 40, top: 30, bottom: 30 },
        paddingOverrides: { top: 30, bottom: 30 },
        colorPalette: 'palette4',
        barWidth: 75,
        fontSize: 12
      },
      {
        Id: 5,
        title: 'Manufacturing (%)',
        titleEnabled: true,
        unitType: 'PERCENT',
        query: {
          measures: ['esg.data'],
          dimensions: ['esg.kpi']
        },
        data: [
          {
            'esg.kpi': 2017,
            'esg.data': 29
          },
          {
            'esg.kpi': 2018,
            'esg.data': 25
          },
          {
            'esg.kpi': 2019,
            'esg.data': 27
          },
          {
            'esg.kpi': 2020,
            'esg.data': 29
          },
          {
            'esg.kpi': 2021,
            'esg.data': 29
          }
        ],
        chartType: 'donut',
        chartHeight: 400,
        showRefData: false,
        titleEnabled: true,
        showLegend: false
      }
    ]
  }
};

// {
//   id: 6,
//   // title: 'Reduction in Scope 1 Emissions in 2021',
//   titleEnabled: false,
//   unitType: 'NUMBER',
//   query: {
//     measures: ['esg.data', 'esg.refData'],
//     dimensions: ['esg.kpi']
//   },
//   data: [
//     {
//       'esg.kpi': 2017,
//       'esg.data': 63,
//       'esg.refData': 200
//     }
//   ],
//   chartType: 'percentageRadial',
//   radialSize: 65,
//   chartHeight: 250,
//   fontSize: 12,
//   valueFontSize: 28,
//   showRefData: false
// }

// {
//   Id: 2,
//   title: 'Products Revenue',
//   titleEnabled: false,
//   unitType: 'PERCENT',
//   query: {
//     measures: ['esg.data'],
//     dimensions: ['esg.kpi']
//   },
//   data: [
//     {
//       'esg.kpi': 2017,
//       'esg.data': 0.82
//     }
//   ],
//   chartType: 'percentageRadial',
//   chartHeight: 240,
//   showRefData: false,
//   titleEnabled: false
// }

const userPermissionGroups = {
  data: [...ADMIN_PORTAL_PERMISSION_GROUPS]
};

let perspectives = {
  data: { ...PERSPECTIVES }
};

let components = {
  data: [...COMPONENTS]
};

let summaryCharts = {
  data: { ...SUMMARY_CHARTS }
};

//------------------------------------------------------------------------------------------

mock.onGet('/api/insights-views/summary').reply(async (config) => {
  try {
    return [200, summaryCharts];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/insights-views').reply(async (config) => {
  await fakeRequest(1000);
  try {
    return [200, { ...perspectives }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

//------------------------------------------------------------------------------------------

mock.onGet(/^\/api\/insights-views\/[^\/]+/).reply(async (request) => {
  await fakeRequest(1000);
  try {
    const perspectiveId = Number(request.url.split('/').slice(-1)[0]);
    const perspective = perspectives.data.views.find(
      (p) => p.viewId == perspectiveId
    );
    const childComponents = components.data.filter(
      (_component) => _component.pId == perspectiveId
    );
    return [
      200,
      {
        data: {
          ...perspective,
          viewCharts: childComponents ? childComponents : []
        }
      }
    ];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

//------------------------------------------------------------------------------------------

mock.onPost('/api/insights-views').reply(async (request) => {
  await fakeRequest(1000);
  try {
    const { viewTitle, viewDescription, userGroups } = JSON.parse(request.data);
    const perspective = {
      viewId: perspectives.data.length + 1,
      viewTitle,
      viewDescription,
      userGroups
    };

    perspectives.data.views = [...perspectives.data, perspective];
    return [200, { perspective: perspective }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

//------------------------------------------------------------------------------------------

mock.onDelete(/^\/api\/insights-views\/[^\/]+/).reply(async (request) => {
  await fakeRequest(1000);
  try {
    const Id = Number(request.url.split('/').slice(-1)[0]);
    let viewId = parseInt(Id);
    perspectives.data.views = reject(perspectives.data, {
      viewId: viewId
    });
    return [200, { viewId: viewId }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock
  .onPut(/^\/api\/insights-views\/bookmark\/[^\/]+/)
  .reply(async (request) => {
    await fakeRequest(1000);
    return [200, { data: [] }];
  });

mock.onPut(/^\/api\/insights-views\/[^\/]+/).reply(async (request) => {
  await fakeRequest(1000);
  return [200, { data: [] }];
});

//------------------------------------------------------------------------------------------

mock.onGet('/api/suggest').reply(async (config) => {
  await fakeRequest(1000);
  try {
    return [200, { data: SEARCH_RESPONSE }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/user/groups').reply(async (config) => {
  try {
    return [200, { ...userPermissionGroups }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
