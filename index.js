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

let createChildNode = (parentId) => {
  let text = `${id++} Problem`

  return {
      'id': id,
      'text': text,
      'children': [],
      'parents': [
        {
          'id': parentId
        }
      ]
    }
}

let populateTree = (function populateTree(nodes, sharedNodesMapped = false, extraClass=''){

  let hasChildren = false;
  let hasSharedChildren = false;
  let sharedChildren = [];

  let layer = document.createElement('div');
  layer.setAttribute('class', 'layer ' + extraClass);


  let tier = document.createElement('div');
  tier.setAttribute('class', 'tier');

  let subtier = document.createElement('div');
  subtier.setAttribute('class', 'subtier');




  tier.addEventListener('click', (e)=>{

    let key = e.target.getAttribute('key')

    let oldLayers = subtier.querySelectorAll('.layer')

    nodes.forEach((node)=>{


      let childless = node.children.length === 0
      if(node.id == parseInt(key)) {
        node.children.push(createChildNode(node.id))
      }

      let mappedChildren = populateTree(node.children);

      hasChildren = true
      let oldLayer

      oldLayers.forEach((layer)=>{
        let parents = layer.dataset.parents
        let nodeId = parseInt(node.id)
        if(parents === nodeId || parents.includes(`,${nodeId},`) || parents.endsWith(nodeId)) {
          oldLayer = layer
        }
      })


      if (!Array.isArray(mappedChildren)) {

        if (!childless || oldLayer) {

          subtier.replaceChild(mappedChildren, oldLayer);
        } else {

          mappedChildren.dataset.parents = node.id
          subtier.appendChild(mappedChildren)
        }

      } else {

        mappedChildren.map((nodeChild)=>subtier.appendChild(populateTree(nodeChild, true, addExtraClass(nodeChild))))

        sharedChildren = sharedChildren.concat(mappedChildren);
      }

    })
    layer.appendChild(subtier)
  }, false)






  let splitArr = [];
  let holdingArr = [];
  let parentListStr = ''

  let nodesArray = nodes.map((node)=>{

    parentListStr = ''
    node.parents.forEach((parent)=>{
      parentListStr = parentListStr ? `${parentListStr},${parent.id}` : parent.id
    })

    if (node.parents.length > 1 && !sharedNodesMapped) {
      if(holdingArr.length) splitArr.push(holdingArr);
      holdingArr = []

      splitArr.push([node])
      hasSharedChildren = true;

    } else {
      node.hasSharedSibling = true;
      holdingArr.push(node)
    }

    if (node.children.length) {
      let mappedChildren = populateTree(node.children);
      hasChildren = true

      if (!Array.isArray(mappedChildren)) {
        subtier.appendChild(mappedChildren);
      } else {
        console.log("mappedChildren", mappedChildren)
        console.log("sharedChildren", sharedChildren)
        mappedChildren = uniqueArr(sharedChildren, mappedChildren)
        mappedChildren.map((nodeArr)=>subtier.appendChild(populateTree(nodeArr, true, addExtraClass(nodeArr))))
        sharedChildren = sharedChildren.concat(mappedChildren);
      }
    }

    let nodeDiv = document.createElement('div');
    nodeDiv.setAttribute('class', 'node');
    nodeDiv.setAttribute('key', node.id);

    nodeDiv.textContent = node.text;
    //never use innerhtml as it is unsafe

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
  layer.dataset.parents = parentListStr;
  layer.appendChild(tier);
  layer.appendChild(subtier);

  return layer;

});



// TODO: Dynamically iterate through tests
let startEl1 = document.getElementById('testNode1')
startEl1.appendChild(populateTree(startNode1))

let startEl2 = document.getElementById('testNode2')
startEl2.appendChild(populateTree(startNode2))

// document.getElementById('testNode3').appendChild(populateTree(startNode3))

document.getElementById('emptyTest').appendChild(populateTree(emptyStartNode))

