
//TEST DATA
const startNode1 = [
  {
    'id': 0,
    'text': 'First Problem',
    'children': [
      {
        'id': 1,
        'text': '2nd Problem',
        'children': [
          {
            'id': 4,
            'text': '5th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              }
            ]
          },
          {
            'id': 5,
            'text': '6th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              }
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 2,
        'text': '3rd Problem',
        'children': [
          {
            'id': 6,
            'text': '7th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 7,
            'text': '8th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 8,
            'text': '9th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '4th Problem',
              },
              {
               'id': 3,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 3,
        'text': '4th Problem',
        'children': [
          {
            'id': 8,
            'text': '9th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
              {
               'id': 3,
               'text': '4th Problem',
              },
            ]
          },
          {
            'id': 9,
            'text': '10th Problem',
            'children': [],
            'parents': [
              {
               'id': 3,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
    ],
    'parents': []
  }
]

const startNode2 = [
  {
    'id': 0,
    'text': 'First Problem',
    'children': [
      {
        'id': 1,
        'text': '2nd Problem',
        'children': [
          {
            'id': 4,
            'text': '5th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              }
            ]
          },
          {
            'id': 5,
            'text': '6th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              },
              {
                'id': 2,
                'text': '3rd Problem',
              }
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 2,
        'text': '3rd Problem',
        'children': [
          {
            'id': 5,
            'text': '6th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              },
              {
                'id': 2,
                'text': '3rd Problem',
              }
            ]
          },
          {
            'id': 6,
            'text': '7th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 7,
            'text': '8th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 8,
            'text': '9th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 3,
        'text': '4th Problem',
        'children': [
          {
            'id': 9,
            'text': '10th Problem',
            'children': [],
            'parents': [
              {
               'id': 3,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
    ],
    'parents': []
  }
]


//TEST DATA
const startNode3 = [
  {
    'id': 0,
    'tier': 0,
    'text': 'First Problem',
    'children': [
      {
        'id': 1,
        'tier': 1,
        'text': '2nd Problem',
        'children': [
          {
            'id': 4,
            'text': '5th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              }
            ]
          },
          {
            'id': 5,
            'text': '6th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              },
              {
                'id': 2,
                'text': '3rd Problem',
              }
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 2,
        'text': '3rd Problem',
        'children': [
          {
            'id': 5,
            'text': '6th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              },
              {
                'id': 2,
                'text': '3rd Problem',
              }
            ]
          },
          {
            'id': 6,
            'text': '7th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 7,
            'text': '8th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 8,
            'text': '9th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 3,
        'text': '4th Problem',
        'children': [
          {
            'id': 6,
            'text': '7th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 7,
            'text': '8th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 8,
            'text': '9th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '4th Problem',
              },
              {
               'id': 3,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 4,
        'text': '5th Problem',
        'children': [
          {
            'id': 8,
            'text': '9th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
              {
               'id': 3,
               'text': '4th Problem',
              },
            ]
          },
          {
            'id': 9,
            'text': '10th Problem',
            'children': [],
            'parents': [
              {
               'id': 3,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
    ],
    'parents': []
  }
]

const startNode4 = [
  {
    'id': 0,
    'text': 'First Problem',
    'children': [
      {
        'id': 1,
        'text': '2nd Problem',
        'children': [
          {
            'id': 4,
            'text': '5th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              }
            ]
          },
          {
            'id': 5,
            'text': '6th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              },
              {
                'id': 2,
                'text': '3rd Problem',
              }
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 2,
        'text': '3rd Problem',
        'children': [
          {
            'id': 5,
            'text': '6th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'text': '2nd Problem',
              },
              {
                'id': 2,
                'text': '3rd Problem',
              }
            ]
          },
          {
            'id': 6,
            'text': '7th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 7,
            'text': '8th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 8,
            'text': '9th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 3,
        'text': '4th Problem',
        'children': [
          {
            'id': 9,
            'text': '10th Problem',
            'children': [],
            'parents': [
              {
               'id': 3,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'text': 'First Problem',
          },
        ]
      },
    ],
    'parents': []
  }
]

const emptyStartNode = [
  {
    'id': 0,
    'text': 'First Problem',
    'children': [],
    'parents': []
  }
]




//Using Tests as Documentation

//test for adding children
//test if data is changed after adding children


export default startNode1
export { startNode2, startNode3, emptyStartNode}
