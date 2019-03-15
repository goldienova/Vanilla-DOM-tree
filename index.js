
//TEST DATA
const startNode1 = [
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

const startNode2 = [
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
              },
              {
                'id': 2,
                'tier': 1,
                'text': '3rd Problem',
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
            'id': 5,
            'tier': 2,
            'text': '6th Problem',
            'children': [],
            'parents': [
              {
                'id': 1,
                'tier': 1,
                'text': '2nd Problem',
              },
              {
                'id': 2,
                'tier': 1,
                'text': '3rd Problem',
              }
            ]
          },
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

let uniqueArr = (array1, array2) => {
  let hashTable = {}
  let uniqueArray = []

  array1.map((arrItem)=>{
    arrItem.map((item)=>{
      hashTable[item.id] = true
    })
  })

  array2.map((arrItem)=>{
    let unique = true

    arrItem.map((item)=>{
      if (hashTable[item.id]) unique = false
    })

    if(unique)  uniqueArray.push(arrItem)
  })

  return uniqueArray
}

let addExtraClass = (array) => {
  extraClass = ''
  array.map((item)=>{
    if(item.hasSharedSibling) extraClass='hasSharedSibling'
    if(item.parents.length > 1) extraClass='sharedChild'
  })

  return extraClass
}


let populateTree = (function populateTree(nodes, sharedIsMapped = false, extraClass=''){

  let hasChildren = false;
  let hasSharedChildren = false;

  let layer = document.createElement('div');
  layer.setAttribute('class', 'layer ' + extraClass);

  let tier = document.createElement('div');
  tier.setAttribute('class', 'tier');

  let subtier = document.createElement('div');
  subtier.setAttribute('class', 'subtier');


  let sharedChildren = [];

  let splitArr = [];
  let holdingArr = [];

  let nodesArray = nodes.map((node)=>{

    if (node.parents.length > 1 && !sharedIsMapped) {
      if(holdingArr.length) splitArr.push(holdingArr);
      holdingArr = []

      splitArr.push([node])
      hasSharedChildren = true;

    } else {
      node.hasSharedSibling = true;
      holdingArr.push(node)
    }

    let nodeChildren;
    if (node.children.length ) nodeChildren = populateTree(node.children);

    if (nodeChildren) {
      hasChildren = true
      if (!Array.isArray(nodeChildren)) {
        subtier.appendChild(nodeChildren);
      } else {
        nodeChildren = uniqueArr(sharedChildren, nodeChildren)
        nodeChildren.map((nodeArr)=>subtier.appendChild(populateTree(nodeArr, true, addExtraClass(nodeArr))))
        sharedChildren = sharedChildren.concat(nodeChildren);
      }
    }


    let nodeDiv = document.createElement('div');
    nodeDiv.setAttribute('class', 'node');
    nodeDiv.setAttribute('key', node.id);
    nodeDiv.textContent = node.text;

    return nodeDiv;
  })

  if(holdingArr.length) splitArr.push(holdingArr);
  if(hasSharedChildren) return splitArr;

  // Adds Dynamic Spacing to SharedChildren
  // TODO: Clean up dynamic spacing code
  if(sharedChildren.length){

    let flexFactor = nodes.length
    let layers = subtier.querySelectorAll('.layer')

    layers.forEach((layer)=>{
      let nodeCount = layer.querySelector('.tier').childElementCount

      if(layer.className.indexOf('hasSharedSibling')>0) {
        nodeCount++
        flexFactor = flexFactor * nodeCount
      }
    })

    let flexRemain = flexFactor

    layers.forEach((layer)=>{
      let nodeCount = layer.querySelector('.tier').childElementCount
      let totalNodeCount = nodeCount + 1
      let flexGrow
      if(layer.className.indexOf('hasSharedSibling')>0) {
        flexGrow = ((flexFactor / nodes.length) / totalNodeCount) * nodeCount
      } else if(layer.className.indexOf('sharedChild')>0){
        return
      } else {
        flexGrow = flexFactor / nodes.length
      }
      flexRemain = flexRemain - flexGrow;
      layer.style.flex = flexGrow;
    })

    let sharedChildLayer = subtier.querySelector('.sharedChild')
    sharedChildLayer.style.flex = flexRemain
  }


  nodesArray.forEach((child)=>tier.appendChild(child))

  layer.appendChild(tier);
  if(hasChildren) layer.appendChild(subtier);

  return layer;

});


let startEl1 = document.getElementById('testNode1')
startEl1.appendChild(populateTree(startNode1))

let startEl2 = document.getElementById('testNode2')
startEl2.appendChild(populateTree(startNode2))

