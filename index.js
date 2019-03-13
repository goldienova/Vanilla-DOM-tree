const startNode = [
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
            'tier': 2,
            'text': '5th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'tier': 1,
                'text': '2nd Problem',
              }
            ]
          },
          {
            'id': 5,
            'tier': 2,
            'text': '6th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'tier': 1,
                'text': '2nd Problem',
              }
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'tier': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 2,
        'tier': 1,
        'text': '3rd Problem',
        'children': [
          {
            'id': 6,
            'tier': 2,
            'text': '7th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'tier': 1,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 7,
            'tier': 2,
            'text': '8th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'tier': 1,
               'text': '3rd Problem',
              },
            ]
          },
          {
            'id': 8,
            'tier': 2,
            'text': '9th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'tier': 1,
               'text': '4th Problem',
              },
              {
               'id': 3,
               'tier': 1,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'tier': 0,
            'text': 'First Problem',
          },
        ]
      },
      {
        'id': 3,
        'tier': 1,
        'text': '4th Problem',
        'children': [
          {
            'id': 8,
            'tier': 2,
            'text': '9th Problem',
            'children': [],
            'parents': [
              {
               'id': 2,
               'tier': 1,
               'text': '3rd Problem',
              },
              {
               'id': 3,
               'tier': 1,
               'text': '4th Problem',
              },
            ]
          },
          {
            'id': 9,
            'tier': 2,
            'text': '10th Problem',
            'children': [],
            'parents': [
              {
               'id': 3,
               'tier': 1,
               'text': '4th Problem',
              },
            ]
          },
        ],
        'parents': [
          {
            'id': 0,
            'tier': 0,
            'text': 'First Problem',
          },
        ]
      },
    ],
    'parents': []
  }
]


// let uniqueByAttribute = (array, attribute) => {

//   let uniqueArray = []
//   let hashTable = {}

//   array.map((item, idx)=>{
//     let value = item.getAttribute(attribute)

//     if (!hashTable[value]) uniqueArray.push(item);
//     hashTable[value] = true;
//   })

//   return uniqueArray
// }

// let unique = (array) => {
//   // console.log()
//   let uniqueArray = []
//   let hashTable = {}

//   array.map((item, idx)=>{
//     // let value = item.getAttribute(attribute)

//     if (!hashTable[value]) uniqueArray.push(item);
//     hashTable[value] = true;
//   })

//   return uniqueArray
// }


let populateTree = (function populateTree(nodes, sharedMapped = false){

  let hasChildren = false;
  let hasSharedChildren = false;

  let layer = document.createElement('div');
  layer.setAttribute('class', 'layer');

  let tier = document.createElement('div');
  tier.setAttribute('class', 'tier');

  let subtier = document.createElement('div');
  subtier.setAttribute('class', 'subtier');


  let sharedChildren = [];

  let splitArr = [];
  let holdingArr = [];

  let nodesArray = nodes.map((node, idx)=>{

    if (node.parents.length > 1 && !sharedMapped) {
      if(holdingArr.length) splitArr.push(holdingArr);
      holdingArr = []
      splitArr.push([node])
      hasSharedChildren = true;

    } else {
      holdingArr.push(node)
    }

    let nodeDiv = document.createElement('div');
    nodeDiv.setAttribute('class', 'node');
    nodeDiv.setAttribute('key', node.id);
    nodeDiv.textContent = node.text;

    let nodeChildren;
    if (node.children.length ) nodeChildren = populateTree(node.children);

    if (nodeChildren) {
      hasChildren = true
      if (!Array.isArray(nodeChildren)) {
        subtier.appendChild(nodeChildren);
      } else {
        sharedChildren = sharedChildren.concat(nodeChildren);
      }
    }

    return nodeDiv;
  })

  if(holdingArr.length) splitArr.push(holdingArr);

  if(hasSharedChildren) return splitArr;

  if (sharedChildren.length) {

    sharedChildren.map((nodeArr)=>subtier.appendChild(populateTree(nodeArr, true)))
  }

  nodesArray.forEach((child)=>tier.appendChild(child))

  layer.appendChild(tier);
  if(hasChildren) layer.appendChild(subtier);

  return layer;

}(startNode));


let startEl = document.getElementById('mountNode')
startEl.appendChild(populateTree)
