/*
 * Project: Dynamedics Supplier Portal Web
 * Created Date: Friday March 31st 2023
 * Author: KasunSKarunasekara
 * -----
 * Last Modified: Friday March 31st 2023 2:52:11 pm
 * Modified By: KasunSKarunasekara at <kkarunasekara@mitrai.com>
 * -----
 * Copyright (c) 2023 Mitra Sparks
 * -----
 * HISTORY:
 */

import faker from 'faker';
// utils
import mock from '../utils/mock';
import fakeRequest from '../utils/fakeRequest';
import { checkUndefinedOrNull } from 'src/utils/functions';

// ----------------------------------------------------------------------

let WEBFORM_MANIFEST = {
  sections: [
    {
      id: 'S1',
      order: 1,
      label: 'Goods and services',
      description:
        'Emissions from the production of products and services supplied to the customers',
      headerImageUrl: '',
      questions: [
        {
          id: 'Q1',
          order: 1,
          label: 'Product or service name',
          type: 'text',
          answers: [],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: []
          }
        },
        {
          id: 'Q2',
          order: 2,
          label:
            "Do you calculate your product's or service(s) level carbon footprint?",
          type: 'radio',
          answers: [
            {
              label: 'Yes',
              value: 1
            },
            {
              label: 'No',
              value: 2
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: []
          }
        },
        {
          id: 'Q3',
          order: 3,
          label: "product's or service(s)",
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Quantity of product or service',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kg',
                    value: 'kg'
                  },
                  {
                    label: 'hours',
                    value: 'hours'
                  }
                ]
              },
              {
                id: 'C2',
                order: 2,
                label: 'CO2 emission',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kgCO2e',
                    value: 'kgCO2e'
                  }
                ]
              }
            ]
          },
          indicator: 'purchas_goods_services',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S1',
                    question: 'Q2',
                    column: 'N/A',
                    value: 1,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q4',
          order: 4,
          label: 'Do you calculate your Scope-01 & Scope-02 emissions?',
          type: 'radio',
          answers: [
            {
              label: 'Yes',
              value: 1
            },
            {
              label: 'No',
              value: 2
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S1',
                    question: 'Q2',
                    column: 'N/A',
                    value: 2,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q5',
          order: 5,
          label: 'Scope-01 & Scope-02',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Scope 1 emissions (kgCO2e)',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kgCO2e',
                    value: 'kgCO2e'
                  }
                ]
              },
              {
                id: 'C2',
                order: 2,
                label: 'Scope 2 emissions (kgCO2e)',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kgCO2e',
                    value: 'kgCO2e'
                  }
                ]
              },
              {
                id: 'C3',
                order: 3,
                label: 'Material quantity (kg)',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kg',
                    value: 'kg'
                  }
                ]
              },
              {
                id: 'C4',
                order: 4,
                label: 'Waste send to landfill (kg)',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kg',
                    value: 'kg'
                  }
                ]
              },
              {
                id: 'C5',
                order: 5,
                label:
                  'Distance of travelled to supply material to supplier site (km)',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'km',
                    value: 'km'
                  }
                ]
              },
              {
                id: 'C6',
                order: 6,
                label: 'Mode of transport to supply material to supplier site',
                type: 'dropdown',
                answers: [
                  {
                    label: '3rd party logistics',
                    value: '3rd party logistics'
                  },
                  {
                    label: 'public transport',
                    value: 'public transport'
                  },
                  {
                    label: 'private car',
                    value: 'private car'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: []
              }
            ]
          },
          indicator: 'purchas_goods_services',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S1',
                    question: 'Q4',
                    column: 'N/A',
                    value: 1,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q6',
          order: 5,
          label: 'Scope-01 & Scope-02',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Quantity of product or service (kg or hours)',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kg',
                    value: 'kg'
                  },
                  {
                    label: 'hours',
                    value: 'hours'
                  }
                ]
              },
              {
                id: 'C2',
                order: 2,
                label: 'Amount spend on product or service ($)',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: '$',
                    value: '$'
                  }
                ]
              }
            ]
          },
          indicator: 'purchas_goods_services',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S1',
                    question: 'Q4',
                    column: 'N/A',
                    value: 2,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        }
      ],
      preCondition: {
        operator: 'OR',
        groups: []
      }
    },
    {
      id: 'S2',
      order: 2,
      label: 'Transport/Logistics',
      description: 'Emissions from the Transport/Logistics',
      headerImageUrl: '',
      questions: [
        {
          id: 'Q7',
          order: 1,
          label: 'Product or service name',
          type: 'text',
          answers: [],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: []
          }
        },
        {
          id: 'Q8',
          order: 2,
          label: 'Transport mode',
          type: 'dropdown',
          answers: [
            {
              label: 'Air',
              value: 'Air'
            },
            {
              label: 'Sea',
              value: 'Sea'
            },
            {
              label: 'Road',
              value: 'Road'
            },
            {
              label: 'Rail',
              value: 'Rail'
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: []
          }
        },
        {
          id: 'Q9',
          order: 3,
          label:
            'Do you record the types and quantities/cost of fuels consumed during transportation?',
          type: 'radio',
          answers: [
            {
              label: 'Yes',
              value: 1
            },
            {
              label: 'No',
              value: 2
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: []
          }
        },
        {
          id: 'Q10',
          order: 4,
          label: 'Quantities/cost of fuels consumed during transportation',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Type of fuel used',
                type: 'dropdown',
                answers: [
                  {
                    label: 'Petrol',
                    value: 'petrol'
                  },
                  {
                    label: 'Diesel',
                    value: 'diesel'
                  },
                  {
                    label: 'Electricity',
                    value: 'electricity'
                  },
                  {
                    label: 'Hybrid',
                    value: 'hybrid'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: []
              },
              {
                id: 'C2',
                order: 2,
                label: 'Quantity of fuel consumed (liters)',
                type: 'number',
                unitOptions: [
                  {
                    label: 'liters',
                    value: 'liters'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                }
              },
              {
                id: 'C3',
                order: 3,
                label: 'Quantity of electricity consumed (kWh)',
                type: 'number',
                unitOptions: [
                  {
                    label: 'kWh',
                    value: 'kWh'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                }
              },
              {
                id: 'C4',
                order: 4,
                label: 'Type of refrigerant',
                type: 'dropdown',
                answers: [
                  {
                    label: 'R410A',
                    value: 'R410A'
                  },
                  {
                    label: 'HFC-41',
                    value: 'HFC-41'
                  },
                  {
                    label: 'HFC-23',
                    value: 'HFC-23'
                  },
                  {
                    label: 'R402A',
                    value: 'R402A'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: []
              },
              {
                id: 'C5',
                order: 5,
                label: 'Quantity of refrigerant consumed (kg)',
                type: 'number',
                unitOptions: [
                  {
                    label: 'kg',
                    value: 'kg'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                }
              }
            ]
          },
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S2',
                    question: 'Q9',
                    column: 'N/A',
                    value: 1,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q11',
          order: 5,
          label:
            'Do you record the mass, distance and mode of each transportation and mode of each shipment delivered?',
          type: 'radio',
          answers: [
            {
              label: 'Yes',
              value: 1
            },
            {
              label: 'No',
              value: 2
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S2',
                    question: 'Q9',
                    column: 'N/A',
                    value: 2,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q12',
          order: 6,
          label: 'transport information',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Total distance travelled in transport(km)',
                type: 'number',
                unitOptions: [
                  {
                    label: 'km',
                    value: 'km'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                }
              },
              {
                id: 'C2',
                order: 2,
                label: 'Mass of goods purchased',
                type: 'number',
                unitOptions: [
                  {
                    label: 'tonnes',
                    value: 'tonnes'
                  },
                  {
                    label: 'm3',
                    value: 'm3'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                }
              }
            ]
          },
          indicator: 'purchas_goods_services',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S2',
                    question: 'Q11',
                    column: 'N/A',
                    value: 1,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q13',
          order: 7,
          label: 'Amount spent on transportation',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Amount spent on transportation',
                type: 'number',
                unitOptions: [
                  {
                    label: '$',
                    value: '$'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                }
              }
            ]
          },
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S2',
                    question: 'Q11',
                    column: 'N/A',
                    value: 2,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        }
      ],
      preCondition: {
        operator: 'OR',
        groups: []
      }
    },
    {
      id: 'S3',
      order: 3,
      label: 'Staff travel',
      description: 'Emissions from the Staff travel',
      headerImageUrl: '',
      questions: [
        {
          id: 'Q14',
          order: 1,
          label: 'Vehicle type',
          type: 'dropdown',
          answers: [
            {
              label: 'Bus',
              value: 'Bus'
            },
            {
              label: 'Car',
              value: 'Car'
            },
            {
              label: 'Taxi',
              value: 'Taxi'
            },
            {
              label: 'Rail',
              value: 'Rail'
            },
            {
              label: 'Air',
              value: 'Air'
            },
            {
              label: 'Subway',
              value: 'Subway'
            },
            {
              label: 'Bicycle',
              value: 'Bicycle'
            },
            {
              label: 'Walk',
              value: 'Walk'
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: []
          }
        },
        {
          id: 'Q15',
          order: 2,
          label:
            'Do you record the types and quantities/cost of fuels consumed during staff travel?',
          type: 'radio',
          answers: [
            {
              label: 'Yes',
              value: 1
            },
            {
              label: 'No',
              value: 2
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: []
          }
        },
        {
          id: 'Q16',
          order: 3,
          label: 'Quantities/cost of fuels consumed during staff travel',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Quantity of fuel consumed',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'litres',
                    value: 'litres'
                  }
                ]
              },
              {
                id: 'C2',
                order: 2,
                label: 'Quantity of electricity consumed',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kWh',
                    value: 'kWh'
                  }
                ]
              },
              {
                id: 'C3',
                order: 3,
                label: 'Quantity of refrigerant leakage',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kg',
                    value: 'kg'
                  }
                ]
              }
            ]
          },
          indicator: 'staff_travel',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S3',
                    question: 'Q15',
                    column: 'N/A',
                    value: 1,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q17',
          order: 4,
          label: 'Do you record the distance of staff travel?',
          type: 'radio',
          answers: [
            {
              label: 'Yes',
              value: 1
            },
            {
              label: 'No',
              value: 2
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S3',
                    question: 'Q15',
                    column: 'N/A',
                    value: 2,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q18',
          order: 5,
          label: 'Distance of staff travel',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Total distance travelled in travel',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'km',
                    value: 'km'
                  }
                ]
              },
              {
                id: 'C2',
                order: 2,
                label: 'Number of hotel nights',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'nights',
                    value: 'nights'
                  }
                ]
              }
            ]
          },
          indicator: 'staff_travel',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S3',
                    question: 'Q17',
                    column: 'N/A',
                    value: 1,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q19',
          order: 5,
          label: 'Amount spent',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Amount spent on transportation',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: '$',
                    value: '$'
                  }
                ]
              }
            ]
          },
          indicator: 'purchas_goods_services',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S3',
                    question: 'Q17',
                    column: 'N/A',
                    value: 2,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        }
      ],
      preCondition: {
        operator: 'OR',
        groups: []
      }
    },
    {
      id: 'S4',
      order: 3,
      label: 'Waste',
      description: 'Emissions from the waste',
      headerImageUrl: '',
      questions: [
        {
          id: 'Q20',
          order: 1,
          label: 'Do you record waste-specific scope 1 and scope 2 data?',
          type: 'radio',
          answers: [
            {
              label: 'Yes',
              value: 1
            },
            {
              label: 'No',
              value: 2
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: []
          }
        },
        {
          id: 'Q21',
          order: 2,
          label: 'Waste-specific scope 1 and scope 2 data',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Allocated waste-specific scope 1 emissions',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kgCO2e',
                    value: 'kgCO2e'
                  }
                ]
              },
              {
                id: 'C2',
                order: 2,
                label: 'Allocated waste-specific scope 2 emissions',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'kgCO2e',
                    value: 'kgCO2e'
                  }
                ]
              }
            ]
          },
          indicator: 'staff_travel',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S4',
                    question: 'Q20',
                    column: 'N/A',
                    value: 1,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q22',
          order: 3,
          label: 'Can you differentiate your waste streams?',
          type: 'radio',
          answers: [
            {
              label: 'Yes',
              value: 1
            },
            {
              label: 'No',
              value: 2
            }
          ],
          indicator: 'N/A',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S4',
                    question: 'Q20',
                    column: 'N/A',
                    value: 2,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q23',
          order: 4,
          label: 'Waste produced',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Waste produced',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'tonnes',
                    value: 'tonnes'
                  },
                  {
                    label: 'm3',
                    value: 'm3'
                  }
                ]
              },
              {
                id: 'C2',
                order: 2,
                label: 'Waste type',
                type: 'dropdown',
                answers: [
                  {
                    label: 'Plastic',
                    value: 'Plastic'
                  },
                  {
                    label: 'Food and drinks',
                    value: 'Food and drinks'
                  },
                  {
                    label: 'Paper and board',
                    value: 'Paper and board'
                  },
                  {
                    label: 'Electrical items',
                    value: 'Electrical items'
                  },
                  {
                    label: 'Water disposal',
                    value: 'Water disposal'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: []
              },
              {
                id: 'C3',
                order: 3,
                label: 'Waste treatment',
                type: 'dropdown',
                answers: [
                  {
                    label: 'Landfill',
                    value: 'Landfill'
                  },
                  {
                    label: 'Incinerated with energy recovery',
                    value: 'Incinerated with energy recovery'
                  },
                  {
                    label: 'Recycled',
                    value: 'Recycled'
                  },
                  {
                    label: 'Composted',
                    value: 'Composted'
                  },
                  {
                    label: 'Wastewater',
                    value: 'Wastewater'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: []
              }
            ]
          },
          indicator: 'staff_travel',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S4',
                    question: 'Q22',
                    column: 'N/A',
                    value: 1,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        },
        {
          id: 'Q24',
          order: 5,
          label: 'Waste produced',
          type: 'table',
          answerSchema: {
            columns: [
              {
                id: 'C1',
                order: 1,
                label: 'Total mass of waste',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: 'tonnes',
                    value: 'tonnes'
                  }
                ]
              },
              {
                id: 'C2',
                order: 2,
                label: 'Waste treatment',
                type: 'dropdown',
                answers: [
                  {
                    label: 'Landfill',
                    value: 'Landfill'
                  },
                  {
                    label: 'Incinerated with energy recovery',
                    value: 'Incinerated with energy recovery'
                  },
                  {
                    label: 'Recycled',
                    value: 'Recycled'
                  },
                  {
                    label: 'Composted',
                    value: 'Composted'
                  },
                  {
                    label: 'Wastewater',
                    value: 'Wastewater'
                  }
                ],
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: []
              },
              {
                id: 'C3',
                order: 3,
                label:
                  'Proportion of total waste being treated by above waste treatment method',
                type: 'number',
                preCondition: {
                  operator: 'OR',
                  groups: []
                },
                unitOptions: [
                  {
                    label: '%',
                    value: '%'
                  }
                ]
              }
            ]
          },
          indicator: 'purchas_goods_services',
          mandatory: true,
          unitOptions: [],
          preCondition: {
            operator: 'OR',
            groups: [
              {
                operator: 'AND',
                conditions: [
                  {
                    section: 'S4',
                    question: 'Q22',
                    column: 'N/A',
                    value: 2,
                    comparisonOperator: '=='
                  }
                ]
              }
            ]
          }
        }
      ],
      preCondition: {
        operator: 'OR',
        groups: []
      }
    }
  ]
};

const questionnaireManifestWithPreviousSubmission = {
  data: {
    lastSubmission: {
      status: 1,
      answers: [
        {
          sectionId: 'S1',
          questionId: 'Q2',
          responses: [
            {
              value: '1'
            }
          ]
        },
        {
          sectionId: 'S1',
          questionId: 'Q1',
          responses: [
            {
              value: 'Automotive repairs'
            }
          ]
        },
        {
          sectionId: 'S1',
          questionId: 'Q3',
          columnId: 'C1',
          responses: [
            {
              index: 0,
              value: '125000',
              unit: 'kg'
            }
          ]
        },
        {
          sectionId: 'S1',
          questionId: 'Q3',
          columnId: 'C2',
          responses: [
            {
              index: 0,
              value: '5200',
              unit: 'kgCO2e'
            }
          ]
        }
      ]
    },
    description:
      'Lorem ipsum dolor sit amet, ea corpora dolores vis, at ius epicuri accumsan principes. Assum propriae elaboraret ut mea, vero quaerendum per te. Ea rebum tation nominavi eum, ei feugait gloriatur pro. Qui vitae ridens rationibus ea.',
    manifest: WEBFORM_MANIFEST
  }
};

const questionnaireManifest = {
  data: {
    lastSubmission: {
      status: undefined
    },
    description: '',
    manifest: WEBFORM_MANIFEST
  }
};

// ----------------------------------------------------------------------

mock.onGet(`api/web-form`).reply(async (config) => {
  const params = config?.params;
  await fakeRequest(1000);

  if (!checkUndefinedOrNull(params?.eventId) && params?.eventId == 2) {
    try {
      return [200, { ...questionnaireManifestWithPreviousSubmission }];
    } catch (error) {
      console.error(error);
      return [500, { message: 'Internal server error' }];
    }
  } else {
    try {
      return [200, { ...questionnaireManifest }];
    } catch (error) {
      console.error(error);
      return [500, { message: 'Internal server error' }];
    }
  }
});

mock.onPost('api/web-form').reply(async (request) => {
  await fakeRequest(1000);
  try {
    const eventData = JSON.parse(request.data);
    return [200, {}];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
