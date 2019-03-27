import startNode1 from './test.js'
import { startNode2, startNode3, emptyStartNode } from './test.js'


const uniqueArr = (array1, array2) => {
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

    if(unique) uniqueArray.push(arrItem)
  })

  return uniqueArray
}

const addExtraClass = (array) => {
  let extraClass = ''
  array.map((item)=>{
    if(item.hasSharedSibling) extraClass='hasSharedSibling'
    if(item.parents.length > 1) extraClass='sharedChild'
  })

  return extraClass
}

let id = 1

let createChildNode = () => {
  let text = `${id++} Problem`
  return {
      'id': id,
      'text': text,
      'children': [],
      'parents': [
        {
         'id': 3,
         'text': '4th Problem',
        },
      ]
    }
}

let populateTree = (function populateTree(nodes, sharedNodesMapped = false, extraClass=''){

  let hasChildren = false;
  let hasSharedChildren = false;

  let layer = document.createElement('div');
  layer.setAttribute('class', 'layer ' + extraClass);

  let tier = document.createElement('div');
  tier.setAttribute('class', 'tier');

  let subtier = document.createElement('div');
  subtier.setAttribute('class', 'subtier');

  tier.addEventListener('click', (e)=>{

    let key = e.target.getAttribute('key')

    nodes.map((node)=>{

      if(node.id.toString() === key)node.children.push(createChildNode())


      let nodeChildren = populateTree(node.children);

      hasChildren = true
      if (!Array.isArray(nodeChildren)) {
        let oldLayer = subtier.querySelector('.layer')
        if (oldLayer) {
          subtier.replaceChild(nodeChildren, oldLayer);
        } else {
          subtier.appendChild(nodeChildren)
        }

      } else {
        nodeChildren = uniqueArr(sharedChildren, nodeChildren)
        nodeChildren.map((nodeChild)=>subtier.appendChild(populateTree(nodeChild, true, addExtraClass(nodeChild))))
        sharedChildren = sharedChildren.concat(nodeChildren);
      }

    })
    layer.appendChild(subtier)
  }, false)


  let sharedChildren = [];

  let splitArr = [];
  let holdingArr = [];

  let nodesArray = nodes.map((node)=>{

    if (node.parents.length > 1 && !sharedNodesMapped) {
      if(holdingArr.length) splitArr.push(holdingArr);
      holdingArr = []

      splitArr.push([node])
      hasSharedChildren = true;

    } else {
      node.hasSharedSibling = true;
      holdingArr.push(node)
    }

    // let nodeChildren;
    // if (node.children.length ) nodeChildren = populateTree(node.children);

    if (node.children.length) {
      let mappedChildren = populateTree(node.children);
      hasChildren = true

      if (!Array.isArray(mappedChildren)) {
        subtier.appendChild(mappedChildren);
      } else {
        mappedChildren = uniqueArr(sharedChildren, mappedChildren)
        mappedChildren.map((nodeArr)=>subtier.appendChild(populateTree(nodeArr, true, addExtraClass(nodeArr))))
        sharedChildren = sharedChildren.concat(mappedChildren);
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
      let layerNodeCount = nodeCount + 1
      let flexGrow
      if(layer.className.indexOf('hasSharedSibling')>0) {
        flexGrow = ((flexFactor / nodes.length) / layerNodeCount) * nodeCount
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



// TODO: Dynamically iterate through tests
let startEl1 = document.getElementById('testNode1')
startEl1.appendChild(populateTree(startNode1))

let startEl2 = document.getElementById('testNode2')
startEl2.appendChild(populateTree(startNode2))

// document.getElementById('testNode3').appendChild(populateTree(startNode3))

document.getElementById('emptyTest').appendChild(populateTree(emptyStartNode))

