// utils
import mock from './mock';

// ----------------------------------------------------------------------

// Have you measured your CO2 emissions?
// Have you measured your scope 3 emissions?
// Have you set publicly available CO2 emission reduction targets?
// Do you have an operational procedure for managing or treating your solid and water waste, including hazardous and non-hazardous waste?
// Have you measure solid waste generated?
// Have you set publicly available solid waste reduction targets?

const manifests = {
  Supplier: {
    QuestionnaireId: 'Supplier',
    Categories: [
      {
        Name: 'Environment',
        QuestionPreface: 'Emissions',
        Questions: [
          {
            Type: 'radio-standalone',
            Value: 'Have you measured your CO2 emissions? ',
            QuestionId: 'DCWWLQ01',
            Default: {
              Id: '3',
              Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
              Value: 'N/A'
            },
            QuestionnaireId: 'SUPPLIER',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ea',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value: 'Have you measured your scope 3 emissions?',
            QuestionId: 'DCWWLQ02',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Have you set publicly available CO2 emission reduction targets? ',
            QuestionId: 'DCWWLQ03',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0uu',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Do you have an operational procedure for managing or treating your solid and water waste, including hazardous and non-hazardous waste?',
            QuestionId: 'DCWWLQ04',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcfss',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value: 'Have you measure solid waste generated?',
            QuestionId: 'DCWWLQ05',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Have you set publicly available solid waste reduction targets?',
            QuestionId: 'DCWWLQ06',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },

          {
            Type: 'radio-standalone',
            Value: ' Have you measure water waste generated?',
            QuestionId: 'DCWWLQ07',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Have you set publicly available water waste reduction targets?',
            QuestionId: 'DCWWLQ08',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value: 'Have you measured total energy use?',
            QuestionId: 'DCWWLQ09',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Have you set publicly available energy use reduction targets?',
            QuestionId: 'DCWWLQ10',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Have you set publicly available water use reduction targets?',
            QuestionId: 'DCWWLQ11',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          }
        ]
      },
      {
        Name: 'Social',
        Questions: [
          {
            Type: 'categorical',
            Value:
              'Do you have a formal policy that covers the following areas described in the UN Supplier Code of Conduct? (Note: it could be one overarching policy/code of conduct or multiple policies)',
            QuestionId: 'DCWWLQ12',
            QuestionnaireId: 'SUPPLIER',
            SubQuestions: [
              {
                Type: 'radio-standalone',
                Value: 'Freedom of Association and Collective Bargaining',
                QuestionId: 'DCWWLQ0012-i',
                QuestionnaireId: 'WLQ',
                Answers: [
                  {
                    Id: '1',
                    Key: '84798941-c154-4dae-8143-fa08ded419b5',
                    Value: 'Yes'
                  },
                  {
                    Id: '2',
                    Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                    Value: 'No'
                  },
                  {
                    Id: '3',
                    Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                    Value: 'N/A'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        Name: 'Governance',
        QuestionPreface: 'Emissions',
        Questions: [
          {
            Type: 'radio-standalone',
            Value: 'Have you measured your scope 3 emissions?',
            QuestionId: 'DCWWLQ0011',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Have you set publicly available CO2 emission reduction targets? ',
            QuestionId: 'DCWWLQ012',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Have you set publicly available CO2 emission reduction targets? ',
            QuestionId: 'DCWWLQ013',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Have you set publicly available CO2 emission reduction targets? ',
            QuestionId: 'DCWWLQ0014',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          },
          {
            Type: 'radio-standalone',
            Value:
              'Have you set publicly available CO2 emission reduction targets? ',
            QuestionId: 'DCWWLQ0015',
            QuestionnaireId: 'WLQ',
            Answers: [
              {
                Id: '1',
                Key: '84798941-c154-4dae-8143-fa08ded419b5',
                Value: 'Yes'
              },
              {
                Id: '2',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0aa',
                Value: 'No'
              },
              {
                Id: '3',
                Key: 'da6cc7a0-ff8b-4d66-9422-55ed5ffcf0ee',
                Value: 'N/A'
              }
            ]
          }
        ]
      }
    ],
    DisclaimerId: 1,
    DisclaimerVersion: '1.0.0',
    DisclaimerTitle: 'Supplier Questionnaire',
    DisclaimerDescription:
      'The following survey explores the environment, social, governance aspects of an organization.',
    DisclaimerAcceptanceDescription:
      'By accepting, you agree to our Terms & Conditions and that you have read our Data Use Policy.',
    DisclaimerAcceptanceRequired: true,
    SuccessNote:
      'Thank you for taking the time to answer the Questions! We truly value the information you have provided.'
  }
};

mock.onGet(/^\/api\/questionnaire\/manifest\/[^/]+/).reply((request) => {
  const questionnaireId = request.url.split('/').slice(-1)[0];
  if (manifests[questionnaireId]) {
    return [200, { Data: [manifests[questionnaireId]] }];
  }
  return [404, { Data: [] }];
});

mock
  .onPost(/^\/api\/questionnaire\/channel\/email\?Token=.+/)
  .reply(() => [200, { Data: [], StatusCode: 200 }]);

mock
  .onGet(/^\/api\/questionnaire\/channel\/email\/validate\?Token=.+/)
  .reply(() =>
    // [400, { error: 'Survay has been already submited!' }]
    [200, { Data: [], StatusCode: 200 }]
  );
