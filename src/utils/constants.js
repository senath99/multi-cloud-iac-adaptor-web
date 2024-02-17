/*
 * Project: Dynamedics Portal Web
 * Created Date: Wednesday May 18th 2022
 * Author: Nalinda Wijayagunawardhane
 * -----
KasunSKarunasekara at <kkarunasekara@mitrai.com> * Modified By: KasunSKarunasekara at <kkarunasekara@mitrai.com>
 * -----
 * Copyright (c) 2022 Mitra Sparks
 * -----
 * HISTORY:
 * 2023-02-06	NRB	Added show percentage option for progress table.
 * 2022-11-15	NRB	Added additional options for Swarm Plot.
 * 2022-11-14	NRB	Added options for Swarm Plot, Bullet chart.
 * 2022-11-01	NRB	Added comparison mode option for bullet chart.
 * 2022-10-31	NRB	Added Bullet Chart and supporting options.
 * 2022-10-24	NRB	Added support for filter box widget.
 * 2022-10-24	NRB	Added options for Bump Chart.
 * 2022-10-23	NRB	Added Bump Chart.
 * 2022-10-22	NRB	Added options for line chart.
 * 2022-10-20	NRB	Added more options for area chart.
 * 2022-10-18	NRB	Added no data option for heatmap.
 * 2022-09-14	NRB	Added font size option for number card.
 * 2022-09-13	NRB	Added options for pie chart.
 * 2022-09-10	NRB	Added support for no data charts.
 * 2022-09-10	NRB	Added options for UN SDG Summary chart.
 * 2022-09-09	NRB	Added options for Progress Table including icons and icon sizes.
 * 2022-08-30	NRB	Added options for EPC recommendations.
 * 2022-08-19	NRB	Added options for Heatmap.
 * 2022-08-05	NRB	Added options for radial percentage chart.
 * 2022-08-05	NRB	Added chart options for Emissions Lineage Chart.
 * 2022-07-24	NRB	Added more options for mixed charts.
 * 2022-07-22	NRB	Extended chart options including curve type and marker size.
 * 2022-07-05	KK Added percentage option to pie chart
 * 2022-07-20	NRB	Added bar chart options including colors and bar width.
 * 2022-07-18	NRB	Added options maps for colors, font sizes, and percentage selections.
 * 2022-07-16	NRB	Added color schemes for Nivo charts.
 * 2022-07-19	KK Added time insensitivity
 * 2022-12-12 KK Added Interest group types.
 * 2023-06-08 KK Changed supplier keyword to partner.
 */

export const CORE_PILLARS = [
  'Physical & Emotional Wellbeing',
  'Financial Wellbeing',
  'Environment & Ways Of Working',
  'Technology',
  'Leadership & Culture',
  'Strategy & Change Management',
  'Career Wellbeing',
  'Rewards & Benefits'
];
export const ORG_HEALTH = 'Organisational Health';
export const APP_USAGE_THRESHOLD = 50;
export const FINANCIAL_OUTLOOK_THRESHOLD = 1450;
export const SURVEY_SCHEDULE_TYPES = [
  'Weekly',
  'Monthly',
  'Daily',
  'Quarterly'
];
export const CHECK_BOX_FONT_SIZE = 'large';
export const TABLE_ROW_HEIGHT = 53;
export const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];
export const DIGITAL_RESOURCE_TYPES = ['VIDEO', 'PODCAST', 'ARTICLE'];
export const NEWS_TYPES = ['TEXT', 'VIDEO'];
export const NEWS_LINK_TYPES = ['generic', 'interest-group'];
export const DATA_RESTRICTION_TYPES = ['none', 'from employees data', 'custom'];
export const OVERALL = 'Overall';
export const REPORT_UNIT_TYPES = ['NUMBER', 'PERCENT', 'CURRENCY'];
export const REPORTING_FILTER_DIMENSIONS = [
  'location',
  'department',
  'company'
];
export const INTEREST_GROUP_TYPE = {
  PUBLIC: {
    VALUE: 'Public',
    HASH_CODE: 0
  },
  PRIVATE: {
    VALUE: 'Private',
    HASH_CODE: 1
  }
};
export const REPORTING_DATE_RANGES = [
  { name: 'All time' },
  // { name: 'Today' },
  // { name: 'Yesterday' },
  // { name: 'This week' },
  { name: 'This month' },
  { name: 'This quarter' },
  { name: 'This year' },
  // { name: 'Last 7 days' },
  // { name: 'Last 30 days' },
  // { name: 'Last week' },
  { name: 'Last month' },
  { name: 'Last quarter' },
  { name: 'Last year' }
];
export const TABLE_ROW_COUNTS = [5, 10, 15, 25];
export const HEATMAP_COLORS = [
  { name: 'green/primary', value: '#055763' },
  { name: 'amber/orange', value: '#B78B02' }
];
export const NIVO_COLOR_SCHEMES = [
  { value: 'nivo' },
  { value: 'category10' },
  { value: 'accent' },
  { value: 'dark2' },
  { value: 'paired' },
  { value: 'pastel1' },
  { value: 'pastel2' },
  { value: 'set1' },
  { value: 'set2' },
  { value: 'set3' },
  { value: 'brown_blueGreen' },
  { value: 'purpleRed_green' },
  { value: 'pink_yellowGreen' },
  { value: 'purple_orange' },
  { value: 'red_blue' },
  { value: 'red_grey' },
  { value: 'red_yellow_blue' },
  { value: 'red_yellow_green' },
  { value: 'spectral' },
  { value: 'blues' },
  { value: 'greens' },
  { value: 'greys' },
  { value: 'oranges' },
  { value: 'purples' },
  { value: 'reds' },
  { value: 'blue_green' },
  { value: 'blue_purple' },
  { value: 'green_blue' },
  { value: 'orange_red' },
  { value: 'purple_blue_green' },
  { value: 'purple_blue' },
  { value: 'purple_red' },
  { value: 'red_purple' },
  { value: 'yellow_green_blue' },
  { value: 'yellow_green' },
  { value: 'yellow_orange_brown' },
  { value: 'yellow_orange_red' }
];
export const COLOR_PALETTES = [
  { value: 'palette1' },
  { value: 'palette2' },
  { value: 'palette3' },
  { value: 'palette4' },
  { value: 'palette5' },
  { value: 'palette6' },
  { value: 'palette7' },
  { value: 'palette8' },
  { value: 'palette9' },
  { value: 'palette10' }
];

export const PERCENTAGE_OPTIONS = [
  { value: 1, name: '1%' },
  { value: 2, name: '2%' },
  { value: 3, name: '3%' },
  { value: 4, name: '4%' },
  { value: 5, name: '5%' },
  { value: 6, name: '6%' },
  { value: 7, name: '7%' },
  { value: 8, name: '8%' },
  { value: 9, name: '9%' },
  { value: 10, name: '10%' },
  { value: 11, name: '11%' },
  { value: 12, name: '12%' },
  { value: 13, name: '13%' },
  { value: 14, name: '14%' },
  { value: 15, name: '15%' },
  { value: 16, name: '16%' },
  { value: 17, name: '17%' },
  { value: 18, name: '18%' },
  { value: 19, name: '19%' },
  { value: 20, name: '20%' },
  { value: 21, name: '21%' },
  { value: 22, name: '22%' },
  { value: 23, name: '23%' },
  { value: 24, name: '24%' },
  { value: 25, name: '25%' },
  { value: 26, name: '26%' },
  { value: 27, name: '27%' },
  { value: 28, name: '28%' },
  { value: 29, name: '29%' },
  { value: 30, name: '30%' },
  { value: 31, name: '31%' },
  { value: 32, name: '32%' },
  { value: 33, name: '33%' },
  { value: 34, name: '34%' },
  { value: 35, name: '35%' },
  { value: 36, name: '36%' },
  { value: 37, name: '37%' },
  { value: 38, name: '38%' },
  { value: 39, name: '39%' },
  { value: 40, name: '40%' },
  { value: 41, name: '41%' },
  { value: 42, name: '42%' },
  { value: 43, name: '43%' },
  { value: 44, name: '44%' },
  { value: 45, name: '45%' },
  { value: 46, name: '46%' },
  { value: 47, name: '47%' },
  { value: 48, name: '48%' },
  { value: 49, name: '49%' },
  { value: 50, name: '50%' },
  { value: 51, name: '51%' },
  { value: 52, name: '52%' },
  { value: 53, name: '53%' },
  { value: 54, name: '54%' },
  { value: 55, name: '55%' },
  { value: 56, name: '56%' },
  { value: 57, name: '57%' },
  { value: 58, name: '58%' },
  { value: 59, name: '59%' },
  { value: 60, name: '60%' },
  { value: 61, name: '61%' },
  { value: 62, name: '62%' },
  { value: 63, name: '63%' },
  { value: 64, name: '64%' },
  { value: 65, name: '65%' },
  { value: 66, name: '66%' },
  { value: 67, name: '67%' },
  { value: 68, name: '68%' },
  { value: 69, name: '69%' },
  { value: 70, name: '70%' },
  { value: 71, name: '71%' },
  { value: 72, name: '72%' },
  { value: 73, name: '73%' },
  { value: 74, name: '74%' },
  { value: 75, name: '75%' },
  { value: 76, name: '76%' },
  { value: 77, name: '77%' },
  { value: 78, name: '78%' },
  { value: 79, name: '79%' },
  { value: 80, name: '80%' },
  { value: 81, name: '81%' },
  { value: 82, name: '82%' },
  { value: 83, name: '83%' },
  { value: 84, name: '84%' },
  { value: 85, name: '85%' },
  { value: 86, name: '86%' },
  { value: 87, name: '87%' },
  { value: 88, name: '88%' },
  { value: 89, name: '89%' },
  { value: 90, name: '90%' },
  { value: 91, name: '91%' },
  { value: 92, name: '92%' },
  { value: 93, name: '93%' },
  { value: 94, name: '94%' },
  { value: 95, name: '95%' },
  { value: 96, name: '96%' },
  { value: 97, name: '97%' },
  { value: 98, name: '98%' },
  { value: 99, name: '99%' },
  { value: 100, name: '100%' }
];

export const EXPERIENZ_COLORS = [
  { name: 'Blue', value: '#1d71b8' },
  { name: 'Orange', value: '#ed6c05' },
  { name: 'Green', value: '#00b1aa' },
  { name: 'Dark Blue', value: '#102693' },
  { name: 'Dark Green', value: '#3F830E' },
  { name: 'Dark Orange', value: '#926116' },
  { name: 'Dark Red', value: '#B71926' }
];

export const MATERIAL_COLORS = [
  { name: 'Primary', value: 'primary' },
  { name: 'Secondary', value: 'secondary' },
  { name: 'Info', value: 'info' },
  { name: 'Success', value: 'success' },
  { name: 'Warning', value: 'warning' },
  { name: 'Error', value: 'error' }
];

export const CUREVE_TYPES = [
  { value: 'smooth' },
  { value: 'straight' },
  { value: 'stepline' }
];

export const MARKER_SIZES = [
  { name: 'None', value: 0 },
  { name: 'Small', value: 5 },
  { name: 'Medium', value: 7 },
  { name: 'Large', value: 10 },
  { name: 'Extra Large', value: 15 }
];

export const FONT_SIZES = [
  { name: '8 px', value: 8 },
  { name: '10 px', value: 10 },
  { name: '12 px', value: 12 },
  { name: '14 px', value: 14 },
  { name: '16 px', value: 16 },
  { name: '18 px', value: 18 },
  { name: '20 px', value: 20 },
  { name: '22 px', value: 22 },
  { name: '24 px', value: 24 }
];

export const ICON_TYPES = [
  'none',
  'gender',
  'completion',
  'like',
  'heart',
  'eco',
  'factory',
  'man',
  'woman',
  'electric'
];

export const ICON_SIZES = ['small', 'medium', 'large'];

export const UN_GOAL_IMAGE_SIZES = [
  { name: 'Tiny', value: 40 },
  { name: 'Small', value: 60 },
  { name: 'Medium', value: 80 },
  { name: 'Large', value: 100 },
  { name: 'Extra Large', value: 120 }
];

const COMMON_OPTIONS = [
  {
    type: 'radio',
    optionName: 'hideTitle',
    valueType: 'boolean',
    label: 'Hide Title',
    selections: [
      { name: 'No', value: false },
      { name: 'Yes', value: true }
    ]
  },
  {
    type: 'radio',
    optionName: 'hideBorder',
    valueType: 'boolean',
    label: 'Hide Outer Border',
    selections: [
      { name: 'No', value: false },
      { name: 'Yes', value: true }
    ]
  },
  {
    type: 'radio',
    optionName: 'timeInsensitive',
    valueType: 'boolean',
    label: 'Time Insensitive',
    selections: [
      { name: 'No', value: false },
      { name: 'Yes', value: true }
    ]
  },
  {
    type: 'radio',
    optionName: 'filterSensitive',
    valueType: 'boolean',
    label: 'Filter Sensitive',
    selections: [
      { name: 'No', value: false },
      { name: 'Yes', value: true }
    ]
  }
];
export const REPORTING_CHART_TYPES = [
  {
    name: 'Pie Chart',
    value: 'pie',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showAsPercent',
        valueType: 'boolean',
        label: 'Show as Percent',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'monoChromeColors',
        valueType: 'boolean',
        label: 'Show MonoChrome Colors',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showLegend',
        valueType: 'boolean',
        label: 'Show Legend',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'radio',
        optionName: 'tooltipsEnabled',
        label: 'Show Tooltips',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'select',
        label: 'Color Palette',
        optionName: 'colorPalette',
        valueType: 'object',
        selections: COLOR_PALETTES
      },
      {
        type: 'select',
        label: 'Monochrome Color',
        optionName: 'monoChromeBaseColor',
        valueType: 'object',
        selections: [...MATERIAL_COLORS, ...EXPERIENZ_COLORS]
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'radio',
        optionName: 'showAsDonut',
        valueType: 'boolean',
        label: 'Show As Donut',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Donut Chart',
    value: 'donut',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showLegend',
        valueType: 'boolean',
        label: 'Show Legend',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showTitle',
        valueType: 'boolean',
        label: 'Show Title',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'text',
        optionName: 'centeredTitle',
        valueType: 'string',
        label: 'Centered Title'
      },
      {
        type: 'radio',
        optionName: 'showAsPie',
        valueType: 'boolean',
        label: 'Show As Pie',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Color Scheme',
        optionName: 'colorScheme',
        valueType: 'object',
        selections: NIVO_COLOR_SCHEMES
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'select',
        label: 'Border Radius',
        optionName: 'borderRadius',
        valueType: 'object',
        selections: [
          { name: 'Thinner', value: 0.8 },
          { name: 'Thin', value: 0.5 },
          { name: 'Thick', value: 0.3 },
          { name: 'Full', value: 0 }
        ]
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit Suffix'
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Line Chart',
    value: 'line',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showRefData',
        valueType: 'boolean',
        label: 'Show Comparison Data',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'tooltipsEnabled',
        label: 'Show Tooltips',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideYAxis',
        label: 'Hide Y Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideXAxis',
        label: 'Hide X Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showDataLabels',
        label: 'Show Data Labels',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showLegend',
        label: 'Show Legend',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'select',
        label: 'Color Palette',
        optionName: 'colorPalette',
        valueType: 'object',
        selections: COLOR_PALETTES
      },
      {
        type: 'radio',
        optionName: 'monoChromeColors',
        valueType: 'boolean',
        label: 'Show MonoChrome Colors',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Monochrome Color',
        optionName: 'monoChromeBaseColor',
        valueType: 'object',
        selections: [...MATERIAL_COLORS, ...EXPERIENZ_COLORS]
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'radio',
        optionName: 'skewLabels',
        valueType: 'boolean',
        label: 'Skew Labels 90 Degrees',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit Suffix'
      },
      {
        type: 'radio',
        optionName: 'showZeros',
        label: 'Show Zero Values',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Curve Type',
        optionName: 'curveType',
        valueType: 'object',
        selections: CUREVE_TYPES
      },
      {
        type: 'select',
        label: 'Marker Size',
        optionName: 'markerSize',
        valueType: 'object',
        selections: MARKER_SIZES
      },
      {
        type: 'select',
        label: 'Stroke Width',
        optionName: 'strokeWidth',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'text',
        optionName: 'maxValue',
        valueType: 'string',
        label: 'Max Value'
      },
      {
        type: 'text',
        optionName: 'minValue',
        valueType: 'string',
        label: 'Min Value'
      },
      {
        type: 'radio',
        optionName: 'showDataLabelsOnAll',
        label: 'Show Data Labels On All Series',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showDataLabelsWithSeriesColors',
        label: 'Show Data Labels In Series Colors',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Mixed Chart',
    value: 'mixed',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showRefData',
        valueType: 'boolean',
        label: 'Show Comparison Data',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Color Palette',
        optionName: 'colorPalette',
        valueType: 'object',
        selections: COLOR_PALETTES
      },
      {
        type: 'radio',
        optionName: 'monoChromeColors',
        valueType: 'boolean',
        label: 'Show MonoChrome Colors',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Monochrome Color',
        optionName: 'monoChromeBaseColor',
        valueType: 'object',
        selections: [...MATERIAL_COLORS, ...EXPERIENZ_COLORS]
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'text',
        optionName: 'labels',
        valueType: 'string',
        label: 'Labels (Comma Separated)'
      },
      {
        type: 'select',
        label: 'Bar Width',
        optionName: 'barWidth',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'radio',
        optionName: 'showDataLabels',
        label: 'Show Data Labels',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'radio',
        optionName: 'tooltipsEnabled',
        label: 'Show Tooltips',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'radio',
        optionName: 'showLegend',
        label: 'Show Legend',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showZeros',
        label: 'Show Zero Values',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Curve Type',
        optionName: 'curveType',
        valueType: 'object',
        selections: CUREVE_TYPES
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit Suffix'
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Area Chart',
    value: 'area',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showRefData',
        valueType: 'boolean',
        label: 'Show Comparison Data',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'tooltipsEnabled',
        label: 'Show Tooltips',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideYAxis',
        label: 'Hide Y Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideXAxis',
        label: 'Hide X Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showDataLabels',
        label: 'Show Data Labels',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showLegend',
        label: 'Show Legend',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'select',
        label: 'Color Palette',
        optionName: 'colorPalette',
        valueType: 'object',
        selections: COLOR_PALETTES
      },
      {
        type: 'radio',
        optionName: 'monoChromeColors',
        valueType: 'boolean',
        label: 'Show MonoChrome Colors',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Monochrome Color',
        optionName: 'monoChromeBaseColor',
        valueType: 'object',
        selections: [...MATERIAL_COLORS, ...EXPERIENZ_COLORS]
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'radio',
        optionName: 'skewLabels',
        valueType: 'boolean',
        label: 'Skew Labels 90 Degrees',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit Suffix'
      },
      {
        type: 'radio',
        optionName: 'showZeros',
        label: 'Show Zero Values',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Curve Type',
        optionName: 'curveType',
        valueType: 'object',
        selections: CUREVE_TYPES
      },
      {
        type: 'select',
        label: 'Marker Size',
        optionName: 'markerSize',
        valueType: 'object',
        selections: MARKER_SIZES
      },
      {
        type: 'radio',
        optionName: 'showStroke',
        label: 'Show Stroke',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'select',
        label: 'Stroke Width',
        optionName: 'strokeWidth',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'select',
        label: 'Opacity',
        optionName: 'opacity',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Bar Chart',
    value: 'bar',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showRefData',
        valueType: 'boolean',
        label: 'Show Comparison Data',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'stacked',
        label: 'Stacked',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'tooltipsEnabled',
        label: 'Show Tooltips',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideYAxis',
        label: 'Hide Y Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideXAxis',
        label: 'Hide X Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showDataLabels',
        label: 'Show Data Labels',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'dataLabelsInside',
        label: 'Data Labels Position',
        valueType: 'boolean',
        selections: [
          { name: 'Outside', value: false },
          { name: 'Inside', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showLegend',
        label: 'Show Legend',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'select',
        label: 'Color Palette',
        optionName: 'colorPalette',
        valueType: 'object',
        selections: COLOR_PALETTES
      },
      {
        type: 'radio',
        optionName: 'monoChromeColors',
        valueType: 'boolean',
        label: 'Show MonoChrome Colors',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Monochrome Color',
        optionName: 'monoChromeBaseColor',
        valueType: 'object',
        selections: [...MATERIAL_COLORS, ...EXPERIENZ_COLORS]
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'select',
        label: 'Bar Width',
        optionName: 'barWidth',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'radio',
        optionName: 'skewLabels',
        valueType: 'boolean',
        label: 'Skew Labels 90 Degrees',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit Suffix'
      },
      {
        type: 'radio',
        optionName: 'showZeros',
        label: 'Show Zero Values',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Sankey Chart',
    value: 'sankey',
    optionAvailable: true,
    options: [...COMMON_OPTIONS],
    category: 'Generic'
  },
  {
    name: 'Radar Chart',
    value: 'radar',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showRefData',
        valueType: 'boolean',
        label: 'Show Comparison Data',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showZeros',
        label: 'Show Zero Values',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      }
    ],
    category: 'Generic'
  },
  // { name: 'Bubble Chart', value: 'bubble', optionAvailable: false },
  {
    name: 'Data Table',
    value: 'table',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showTableHeader',
        valueType: 'boolean',
        label: 'Show Table Header',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Rows Per Page',
        optionName: 'tableRowCount',
        valueType: 'primitive',
        selections: TABLE_ROW_COUNTS
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Progress Table',
    value: 'progressTable',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'select',
        label: 'Color',
        optionName: 'color',
        valueType: 'object',
        selections: [...MATERIAL_COLORS]
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit Suffix'
      },
      {
        type: 'select',
        label: 'Icon',
        optionName: 'icon',
        valueType: 'object',
        selections: [...ICON_TYPES.map((i) => ({ value: i }))]
      },
      {
        type: 'select',
        label: 'Icon Size',
        optionName: 'iconSize',
        valueType: 'object',
        selections: [...ICON_SIZES.map((s) => ({ value: s }))]
      },
      {
        type: 'select',
        label: 'Max Icons',
        optionName: 'maxIcons',
        valueType: 'primitive',
        selections: [5, 10]
      },
      {
        type: 'radio',
        optionName: 'showPercentage',
        valueType: 'boolean',
        label: 'Show Percentage',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Progress Radial',
    value: 'progressRadial',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showFractionAsLabel',
        valueType: 'boolean',
        label: 'Show Fraction As Label',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'sortByLabel',
        valueType: 'boolean',
        label: 'Sort By Label',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showRAGColors',
        valueType: 'boolean',
        label: 'Show RAG',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        optionName: 'recordsToShow',
        valueType: 'primitive',
        label: 'Records To Show',
        selections: TABLE_ROW_COUNTS
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Percentage Radial',
    value: 'percentageRadial',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'showAsFraction',
        valueType: 'boolean',
        label: 'Show As Fraction',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showRefData',
        valueType: 'boolean',
        label: 'Multiple Series',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Radial Size',
        optionName: 'radialSize',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'select',
        label: 'Radial End',
        optionName: 'radialEnding',
        valueType: 'object',
        selections: [
          { value: 'round', name: 'Rounded' },
          { value: 'butt', name: 'Squared' }
        ]
      },
      {
        type: 'select',
        label: 'Color Palette',
        optionName: 'colorPalette',
        valueType: 'object',
        selections: COLOR_PALETTES
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'select',
        label: 'Value Font Size',
        optionName: 'valueFontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'text',
        optionName: 'shortDescription',
        valueType: 'string',
        label: 'Short Description'
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Number',
    value: 'number',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'trendEnabled',
        valueType: 'boolean',
        label: 'Show Trend',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        label: 'Inverted Colors',
        type: 'radio',
        optionName: 'inverted',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'enableRoundoff',
        valueType: 'boolean',
        label: 'Show as a Whole Number',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'text',
        optionName: 'shortDescription',
        valueType: 'string',
        label: 'Short Description'
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Heatmap',
    value: 'heatmap',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        label: 'Inverted Colors',
        type: 'radio',
        optionName: 'inverted',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'tooltipsEnabled',
        label: 'Show Tooltips',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideYAxis',
        label: 'Hide Y Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideXAxis',
        label: 'Hide X Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showDataLabels',
        label: 'Show Data Labels',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showLegend',
        label: 'Show Legend',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'select',
        label: 'Color Palette',
        optionName: 'colorPalette',
        valueType: 'object',
        selections: COLOR_PALETTES
      },
      {
        type: 'radio',
        optionName: 'monoChromeColors',
        valueType: 'boolean',
        label: 'Show MonoChrome Colors',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Monochrome Color',
        optionName: 'monoChromeBaseColor',
        valueType: 'object',
        selections: [...MATERIAL_COLORS, ...EXPERIENZ_COLORS]
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'radio',
        optionName: 'skewLabels',
        valueType: 'boolean',
        label: 'Skew Labels 90 Degrees',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showAxisInDataLabels',
        label: 'Show Axis Data In Data Labels',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showRAGColors',
        label: 'Show RAG Colors',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'showNoData',
        label: 'Show No Data',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'text',
        optionName: 'labels',
        valueType: 'string',
        label: 'Labels'
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit Suffix'
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Bump Chart',
    value: 'bump',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'hideYAxis',
        label: 'Hide Y Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideXAxis',
        label: 'Hide X Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Color Scheme',
        optionName: 'colorScheme',
        valueType: 'object',
        selections: NIVO_COLOR_SCHEMES
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'select',
        label: 'Line Width',
        optionName: 'lineWidth',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'select',
        label: 'Point Size',
        optionName: 'pointSize',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'text',
        optionName: 'colors',
        valueType: 'string',
        label: 'Colors (Separated by commas)'
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Bullet Chart',
    value: 'bullet',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'select',
        label: 'Markers Size',
        optionName: 'markersSize',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'select',
        label: 'Ranges Size',
        optionName: 'rangesSize',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'select',
        label: 'Measures Size',
        optionName: 'measuresSize',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit'
      },
      {
        type: 'text',
        optionName: 'minValue',
        valueType: 'string',
        label: 'Minimum Value'
      },
      {
        type: 'text',
        optionName: 'markersColors',
        valueType: 'string',
        label: 'Marker Colors'
      },
      {
        type: 'text',
        optionName: 'measuresColors',
        valueType: 'string',
        label: 'Measure Colors'
      },
      {
        type: 'text',
        optionName: 'rangesColors',
        valueType: 'string',
        label: 'Ranges Colors'
      },
      {
        label: 'Comparison Mode',
        type: 'radio',
        optionName: 'comparisonMode',
        valueType: 'boolean',
        selections: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      },
      {
        type: 'select',
        optionName: 'recordsPerPage',
        valueType: 'primitive',
        label: 'Records Per Page',
        selections: TABLE_ROW_COUNTS
      },
      {
        type: 'text',
        optionName: 'label',
        valueType: 'string',
        label: 'Pages Label'
      },
      {
        type: 'text',
        optionName: 'rangesColors',
        valueType: 'string',
        label: 'Ranges Colors'
      },
      {
        type: 'select',
        optionName: 'marginLeft',
        valueType: 'primitive',
        label: 'Left Margin',
        selections: [100, 150, 200, 250, 300]
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Swarm Chart',
    value: 'swarm',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'hideYAxis',
        label: 'Hide Y Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideXAxis',
        label: 'Hide X Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'isHorizontal',
        label: 'Horizontal',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Color Scheme',
        optionName: 'colorScheme',
        valueType: 'object',
        selections: NIVO_COLOR_SCHEMES
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'select',
        label: 'Measure Index For Y Axis',
        optionName: 'measureIndex',
        valueType: 'object',
        selections: [
          { name: 'Primary', value: 0 },
          { name: 'Secondary', value: 1 },
          { name: 'Tertiary', value: 2 }
        ]
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit'
      },
      {
        type: 'text',
        optionName: 'colors',
        valueType: 'string',
        label: 'Colors (Separated by commas)'
      },
      {
        type: 'select',
        label: 'Markers Size',
        optionName: 'markerSize',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'text',
        optionName: 'tooltipLabel',
        valueType: 'string',
        label: 'Tooltip Label'
      },
      {
        type: 'text',
        optionName: 'tooltipSecondaryLabel',
        valueType: 'string',
        label: 'Secondary Tooltip Label'
      },
      {
        type: 'select',
        label: 'Primary Measure Type',
        optionName: 'primaryMeasureType',
        valueType: 'object',
        selections: [...REPORT_UNIT_TYPES.map((t) => ({ value: t }))]
      }
    ],
    category: 'Generic'
  },
  {
    name: 'Emissions Recommendations',
    value: 'emissions_recommendations',
    optionAvailable: true,
    options: [
      {
        label: 'Show Total Savings',
        type: 'radio',
        optionName: 'showTotal',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      ...COMMON_OPTIONS
    ],
    category: 'Climate and Emissions'
  },
  {
    name: 'Emissions Lineage',
    value: 'emissions_lineage',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'select',
        label: 'Category Font Size',
        optionName: 'categoryFontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit Suffix'
      },
      {
        type: 'select',
        label: 'Color Palette',
        optionName: 'colorPalette',
        valueType: 'object',
        selections: [
          { value: 'schemeAccent' },
          { value: 'schemeDark2' },
          { value: 'schemePastel2' },
          { value: 'schemeSet2' },
          { value: 'schemeSet1' },
          { value: 'schemePastel1' },
          { value: 'schemeCategory10' },
          { value: 'schemeSet3' },
          { value: 'schemePaired' }
        ]
      }
    ],
    category: 'Climate and Emissions'
  },
  {
    name: 'EPC And Recommendations',
    value: 'epc_recommendations',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'select',
        optionName: 'recordsPerPage',
        valueType: 'primitive',
        label: 'Records Per Page',
        selections: TABLE_ROW_COUNTS
      }
    ],
    category: 'Climate and Emissions'
  },
  {
    name: 'Partner Emissions Chart',
    value: 'partner_emissions',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'radio',
        optionName: 'hideYAxis',
        label: 'Hide Y Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'hideXAxis',
        label: 'Hide X Axis',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'radio',
        optionName: 'isHorizontal',
        label: 'Horizontal',
        valueType: 'boolean',
        selections: [
          { name: 'No', value: false },
          { name: 'Yes', value: true }
        ]
      },
      {
        type: 'select',
        label: 'Color Scheme',
        optionName: 'colorScheme',
        valueType: 'object',
        selections: NIVO_COLOR_SCHEMES
      },
      {
        type: 'select',
        label: 'Font Size',
        optionName: 'fontSize',
        valueType: 'object',
        selections: [...FONT_SIZES]
      },
      {
        type: 'select',
        label: 'Measure Index For Y Axis',
        optionName: 'measureIndex',
        valueType: 'object',
        selections: [
          { name: 'Primary', value: 0 },
          { name: 'Secondary', value: 1 },
          { name: 'Tertiary', value: 2 }
        ]
      },
      {
        type: 'text',
        optionName: 'unit',
        valueType: 'string',
        label: 'Unit'
      },
      {
        type: 'text',
        optionName: 'colors',
        valueType: 'string',
        label: 'Colors (Separated by commas)'
      },
      {
        type: 'select',
        label: 'Markers Size',
        optionName: 'markerSize',
        valueType: 'object',
        selections: PERCENTAGE_OPTIONS
      },
      {
        type: 'text',
        optionName: 'tooltipLabel',
        valueType: 'string',
        label: 'Tooltip Label'
      },
      {
        type: 'text',
        optionName: 'tooltipSecondaryLabel',
        valueType: 'string',
        label: 'Secondary Tooltip Label'
      },
      {
        type: 'select',
        label: 'Primary Measure Type',
        optionName: 'primaryMeasureType',
        valueType: 'object',
        selections: [...REPORT_UNIT_TYPES.map((t) => ({ value: t }))]
      }
    ],
    category: 'Climate and Emissions'
  },
  {
    name: 'UN SDG Summary',
    value: 'unsdgsummary',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'select',
        optionName: 'imageSize',
        valueType: 'object',
        label: 'Goal Image Size',
        selections: UN_GOAL_IMAGE_SIZES
      },
      {
        type: 'text',
        optionName: 'goals',
        valueType: 'string',
        label: 'List Of Goals'
      }
    ],
    category: 'Miscellaneous'
  },
  {
    name: 'Filter Box',
    value: 'filter',
    optionAvailable: true,
    options: [
      ...COMMON_OPTIONS,
      {
        type: 'text',
        optionName: 'label',
        valueType: 'string',
        label: 'Label'
      },
      {
        type: 'text',
        optionName: 'defaultValue',
        valueType: 'string',
        label: 'Default Value'
      }
    ],
    category: 'Miscellaneous'
  }
];

// Property Matrix Document - https://docs.google.com/spreadsheets/d/1JJnYOXvh1RnUS4pG8-s0if6hw69KikyStm3XPq09U5s/edit?usp=sharing
export const MAX_VIDEO_FILE_SIZE = 1610612736; // 1.5 GB
export const MAX_AUDIO_FILE_SIZE = 1073741824; // 1.0 GB
export const MAX_IMAGE_SIZE = 2097152; // 2 MB
export const MAX_IMAGE_SIZE_WELCOME_SCREENS = 1048576; // 1 MB
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
export const MAX_FORM_TITLE_LENGTH = 55;
export const MAX_FORM_DESCRIPTION_LENGTH = 260;
export const MIN_FORM_DESCRIPTION_LENGTH = 55;
export const MAX_COMMUNICATION_RESPONSE_LENGTH = 1500;
export const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#94D82D', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E' // theme.palette.error.darker
];

//event calendar constants
export const DAY_GRID_MONTH = 'dayGridMonth';
export const TIME_GRID_WEEK = 'timeGridWeek';
export const TIME_GRID_DAY = 'timeGridDay';

//client resource constants
export const CLIENT_LOGO_FILE = 'logo.png';

//user roles

//roles - insight
export const ROLE_ADMIN_PORTAL_ACCESS = 'admin-portal-access';
export const ROLE_DASHBOARD = 'dashboard';
export const ROLE_ORGANIZATIONAL_HEALTH = 'insights_organizational_health';
export const ROLE_APPLICATION_USAGE = 'insights_application_usage';
export const ROLE_FINANCIAL_OUTCOMES = 'insights_financial_outcomes';
export const ROLE_PULSE = 'insights_pulse';
export const ROLE_PRODUCTIVITY = 'insights_productivity';
export const ROLE_REPORT_WRITE = 'insights_reports_create';
export const ROLE_REPORT_READ = 'insights_reports_read';
export const ROLE_INSIGHTS_SUPPLIER = 'insights_supplier';
//roles-management

export const ROLE_COMMUNICATION = 'manage_communications';
export const ROLE_INTEREST_GROUPS = 'manage_interest_groups';
export const ROLE_CONTENT = 'manage_content';
export const ROLE_SURVEYS = 'manage_surveys';
export const ROLE_SETTINGS = 'manage_settings';
export const ROLE_USERS = 'manage_users';
export const ROLE_DATA_SETS_READ = 'manage_datasets_read';
export const ROLE_DATA_SETS_WRITE = 'manage_datasets_write';
export const ROLE_INTEGRATED_REPORTS_READ = 'integrated_reports_read';
export const ROLE_INTEGRATED_REPORTS_WRITE = 'integrated_reports_write';
export const ROLE_INTEGRATED_REPORTS_REVIEW = 'integrated_reports_review';
export const ROLE_MANAGE_SUPPLIERS = 'manage_suppliers';
export const ROLE_MANAGE_EVENTS = 'manage_events';

//email validation
export const EMAIL_VALIDATION = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//communication error message
export const QUESTIONS_CHARACTER_LIMIT_EXCEEDED =
  'Response must be at most 1500 characters';

export const QUESTION_RESPONSE_LENGTH = 1500;

//message labels
export const CHART_EXISTING_ERROR =
  'Existing chart title. Chart title must be unique.';
export const REPORT_VIEW_CREATE_SUCCESS = 'Report View created successfully.';
export const REPORT_VIEW_CREATE_ERROR = 'Report View was not created.';
export const REPORT_VIEW_EXISTING_ERROR =
  'Existing report view title. Report view titles must be unique.';
export const REPORT_VIEW_EDIT_SUCCESS = 'View changes saved successfully.';
export const REPORT_VIEW_EDIT_ERROR =
  'View changes were not saved. Please try again.';
export const REPORT_VIEW_BOOKMARKED_SUCCESS =
  'View was bookmarked successfully.';
export const REPORT_VIEW_BOOKMARK_REMOVED_SUCCESS =
  'View was removed from bookmarks successfully.';
export const REPORT_VIEW_BOOKMARKED_ERROR =
  'Bookmark status was not changed. Please try again.';
export const PIN_SUPPLIER_VIEW_SUCCESS =
  'View was pinned to partner section successfully.';
export const UNPIN_SUPPLIER_VIEW_SUCCESS =
  'View was unpinned from partner section successfully.';
export const PIN_SUPPLIER_VIEW_ERROR = 'View was not pinned. Please try again.';
export const UNPIN_SUPPLIER_VIEW_ERROR =
  'View was not unpinned. Please try again.';
export const REPORT_VIEW_DELETE_SUCCESS = 'View was deleted successfully.';
export const REPORT_VIEW_DELETE_ERROR =
  'View was not deleted. Please try again.';
export const EDIT_CANCEL_TITLE = 'Discarding Changes';
export const EDIT_CANCEL_DESCRIPTION =
  'Are you sure you want to discard the changes?';

//Common Labels
export const ACCEPTED_FILES_LABEL = `(Only *.{fileExtension} files will be accepted)`;

export const PROCESS_STATUS = {
  INITIAL: 'INITIAL',
  RUNNING: 'RUNNING',
  FAILED: 'FAILED',
  TIMED_OUT: 'TIMED_OUT',
  ABORTED: ' ABORTED',
  WAIT_TIME: 1000
};

export const PREVIEW_TYPE = {
  ERROR: 'invalid',
  SUCCESS: 'valid'
};

export const DATA_SET_CONFIRM_TYPE = {
  CONFIRM: 'CONFIRM',
  CANCEL: 'CANCEL'
};

export const DATA_FILE_STATUS = {
  INITIAL: {
    VALUE: 'initial',
    HASH_CODE: 0
  },
  UPLOADING: {
    VALUE: 'uploading',
    HASH_CODE: 1
  },
  UPLOADED: {
    VALUE: 'uploaded',
    HASH_CODE: 2
  },
  PROCESSING: {
    VALUE: 'processing',
    HASH_CODE: 3
  },
  PROCESSED: {
    VALUE: 'processed',
    HASH_CODE: 4
  },
  COMPLETED: {
    VALUE: 'completed',
    HASH_CODE: 5
  },
  INACTIVE: {
    VALUE: 'inactive',
    HASH_CODE: -1
  }
};

export const DATA_SET_DOC_TYPE = {
  ESG_KPIS: {
    VALUE: 'esg/kpis',
    LABEL: 'ESG KPI Document'
  },
  OTHER: {
    VALUE: 'other',
    LABEL: 'Other'
  }
};

export const ERROR_PREVIEW = {
  ERROR_COLOR: '#FCD5D5',
  ERROR_HOVER_COLOR: '#F6A1A1'
};

export const DATASET_DOCUMENT_TYPES = [
  { name: 'ESG KPI document', value: 'esg/kpis' }
];

export const ESG_STEPPER_LAYOUT = {
  WIDTH: {
    xl: '150vh',
    lg: '150vh',
    md: '60vh',
    sm: '60vh',
    xs: '80vh'
  },
  HEIGHT: { xl: '60vh', lg: '85vh', md: '60vh', sm: '60vh', xs: '80vh' }
};

export const ACCESS_TOKEN = 'accessToken';
export const EMPTY_STRING = '';
export const SEPERATOR_COMMA = ',';
export const DEFAULT_CUBE_SCHEMA = 'employees';
export const LIMIT_DIMENSION_ARRAY = [
  { chartType: 'heatmap', dimensionLimit: 2 },
  { chartType: 'sankey', dimensionLimit: 2 }
];

export const INTEGRATED_REPORT_STATUS = {
  DRAFT: {
    VALUE: 'draft',
    LABEL: 'Draft',
    HASH_CODE: 0
  },
  PENDING_APPROVAL: {
    VALUE: 'pending_approval',
    LABEL: 'Pending Approval',
    HASH_CODE: 1
  },
  IMPROVEMENTS_NEEDED: {
    VALUE: 'improvements_needed',
    LABEL: 'Improvements Needed',
    HASH_CODE: 2
  },
  APPROVED: {
    VALUE: 'approved',
    LABEL: 'Approved',
    HASH_CODE: 3
  },
  REJECTED: {
    VALUE: 'rejected',
    LABEL: 'Rejected',
    HASH_CODE: 4
  }
};

export const IR_HELPER_TEXTS = {
  TOPICS: {
    LABEL: 'Topics to be reported under the standard',
    VALUE: 1
  },
  NAME: {
    LABEL: 'Name of the report',
    VALUE: 2
  },
  PERIOD: {
    LABEL: 'Period of reporting',
    VALUE: 3
  },
  APPROVERS: {
    LABEL: 'Users who have access to review the report',
    VALUE: 4
  }
};

export const IR_ENUMS = {
  NO_DATA_FOUND: 'No data found'
};

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const NO_DATA_CHARTS = ['unsdgsummary'];
export const NO_MEASURES_CHARTS = ['filter'];
export const NO_TITLE_CHARTS = ['filter'];
export const DATA_SET_FILE_TYPE = 'text/csv';
export const DATA_SET_OPTIONS = {
  DATA_UPLOAD: 0,
  WEB_FORMS: 1
};
export const WEB_FORMS_STATUS = {
  LOADING: 0,
  FIRST_STEP: 1,
  SECOND_STEP: 2
};

export const WEB_FORMS_HELPER_TEXTS = {
  Segment: 'ESG pillar of the indicator',
  Sector: 'Classification of the specific ESG pillar',
  Indicator: 'Measure of the specific ESG pillar',
  Category: 'Section of the indicator selected',
  Sub_Category: 'Sub section of the indicator selected',
  Company: 'Name of the company',
  Department: 'default',
  Location: 'Company location of data ownership',
  Data_Type: 'Type of data of the indicator ',
  Data_Unit: 'Unit of measurement of the indicator ',
  Data: 'Quantity of the indicator',
  Date: 'Related Date'
};

export const EVENTS_ADD_EDIT_FORM = {
  CREATE_EVENT_HELPER:
    'Please create a new event where your partners can input their ESG (Environmental, Social, and Governance) data.',
  EDIT_EVENT_HELPER: 'Update the selected event details.',
  VALIDATION_TEXT: {
    CHAR_LIMIT: '{fieldName} must be at most {limit} characters.',
    REQUIRED: '{fieldName} is required.',
    END_DATE_BEFORE_START_DATE: "End Date can't be before Start Date.",
    DEADLINE_BEFORE_END_DATE:
      "Submission Deadline can't be before Event End Date."
  },
  ALERT_MESSAGES: {
    CREATE_EVENT_SUCCESS: 'Event added successfully.',
    CREATE_EVENT_FAILD: 'Event was not added successfully.',
    EDIT_EVENT_SUCCESS: 'Event updated successfully.',
    EDIT_EVENT_FAILD: 'Event was not updated successfully.'
  },
  CONFIRMATION_MESSAGES: {
    ADD_NEW_SEGMENT: 'Add this as a new segment?',
    CREATE_NEW_EVENT: 'Are you sure you want to create this event?'
  }
};

export const SUPPLIER_ADD_INVITE_FORM_TEXT = {
  ADD_OR_INVITE_HELPER:
    'Search for a partner that is already registered with experienz, and add them to your list of partners.',
  DATA_ENTRY_HELPER: `Please use the <strong>"Partner Entry Template"</strong> for uploading multiple partners in .csv format. Existing partners will be added to your Approved list, and new partners will receive invitations.`,
  DATA_ENTRY_TOOLTIP: `Add or invite multiple partners.`,
  VALIDATION_TEXT: {
    CHAR_LIMIT: '{fieldName} must be at most {limit} characters.',
    REQUIRED: '{fieldName} is required.',
    ONE_OR_MORE_INVALID: 'One or more rows are invalid.',
    ONE_OR_MORE_EMAILS_INVALID:
      'One or more email addresses you have provided are invalid.',
    ONE_OR_MORE_EMAILS_REQUIRED:
      'Email address is required. One or more rows are invalid.'
  },
  SUPPLIER_ADDITION_SUCCESS: 'Partner added successfully.',
  SUPPLIER_ADDITION_FAILED: 'Partner was not added successfully.',
  SUPPLIER_DELETION_SUCCESS: 'Partner deleted successfully.',
  SUPPLIER_DELETION_FAILED: 'Partner was not deleted successfully.',
  SUPPLIER_INVITATION_FAILED: `Invitations was not sent successfully.`,
  SUPPLIER_FILE_PROCESSED_SUCCESSFULLY:
    'Your data file has been processed successfully!',
  SUPPLIER_FILE_INVALID: 'Please correct the invalid records and reupload',
  CONFIRM_SUPPLIER_FILE: 'Confirm the Validated',
  SUPPLIERS_NOT_FOUND_TITLE: 'Partners Not Found',
  SUPPLIER_INVITATIONS_NOT_FOUND_TITLE: 'Invitations Not Found',
  SUPPLIER_APPROVALS_NOT_FOUND_TITLE: 'Approvals Not Found',
  SUPPLIER_DATA_SUBMISSIONS_NOT_FOUND_TITLE: 'Data Submissions Not Found',
  SUPPLIER_DATA_SUBMISSIONS_NOT_FOUND_DESCRIPTION:
    'We are unable to retrieve any submissions at the moment.',
  SUPPLIER_APPROVALS_NOT_FOUND_DESCRIPTION:
    'We are unable to retrieve any approvals at the moment.',
  SUPPLIERS_NOT_FOUND_DECRIPTION:
    'Partner cannot be found. Please fill in the required details above and send an invite.',
  SUPPLIERS_INVITE_CONFIRMATION: `Are you sure you want to send an invitation to this partner?`,
  NO_RECORDS_FOUND: `No records found`,
  SUPPLIER_SHAREABLE_LINK_TITLE: 'Partner Invitation Link',
  SUPPLIER_SHAREABLE_LINK_DESCRIPTION:
    'Invite your partners to register with experienz by sending the link below.',
  SHAREABLE_LINK_COPPIED: 'Copied to clipboard',
  SUPPLIER_ADD_TEXT:
    'Invite a new partner to register with Experienz by filling the required details below.'
};

export const SUPPLIER_SEARCH_LIST = {
  ERROR_MESSAGES: {
    SUPPLIER_NOT_FOUND_INVITE:
      'Partner cannot be found. Please fill in the required details below and send an invite.'
  }
};

export const SUPPLIER_APPROVALS_STATUS = {
  REJECTED: {
    VALUE: 'rejected',
    LABEL: 'Rejected',
    HASH_CODE: 6
  },
  APPROVED: {
    VALUE: 'approved',
    LABEL: 'Approved',
    HASH_CODE: 2
  },
  PENDING_APPROVAL: {
    VALUE: 'pending_approval',
    LABEL: 'Pending Approval',
    HASH_CODE: 5
  }
};

export const SUPPLIER_APPROVALS_ACTION = {
  REJECT: {
    VALUE: 'reject',
    LABEL: 'Reject',
    HASH_CODE: 2
  },
  APPROVE: {
    VALUE: 'approve',
    LABEL: 'Approve',
    HASH_CODE: 1
  }
};
