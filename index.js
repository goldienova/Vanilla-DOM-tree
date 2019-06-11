import { testTreeData1, testTreeData2, testTreeData3, emptyTestTreeData } from './tests/test_data.js'
import mine from './mine.js'

import { uniqueFromArrays, addClassName } from './helpers.js'


let id = 1

let createChildNode = (parentId) => {
  let text = `${id++} Problem`

  return {
      id: id,
      text: text,
      children: [],
      parents: [
        {
          id: parentId
        }
      ]
    }
}

let createDummyNode = (parentId) => {
  return {
    parents: [
      {
        id: parentId,
      }
    ]
  }
}


let createNodeDivs = (nodesObj) => {

  return nodesObj.map((node) => {

    let nodeDiv = document.createElement('div');
    nodeDiv.setAttribute('class', 'node');
    nodeDiv.setAttribute('key', node.id);


    nodeDiv.addEventListener('click', (e) => {

      let key = e.target.getAttribute('key')


      const subtier = nodeDiv.parentNode.parentNode.querySelector('.subtier')
      let oldLayers = subtier.querySelectorAll('.layer')

      nodesObj.forEach((node) => {

        let childless = node.children.length === 0

        if (node.id == parseInt(key)) {
          node.children.push(createChildNode(node.id))
        }

        let mappedChildren = populateTree(node.children);


        let oldLayer

        oldLayers.forEach((layer) => {
          let parents = layer.dataset.parents
          let nodeId = parseInt(node.id)
          if (parents === nodeId || parents.includes(`,${nodeId},`) || parents.endsWith(nodeId)) {
            oldLayer = layer
          }
        })


        if (!Array.isArray(mappedChildren)) {

          subtier.replaceChild(mappedChildren, oldLayer)


        } else {

          mappedChildren.map((nodeChild) => subtier.appendChild(populateTree(nodeChild, true, addClassName(nodeChild))))

          sharedChildren = sharedChildren.concat(mappedChildren);
        }

      })
    }, false)


    nodeDiv.textContent = node.text;

    return nodeDiv;
  })
}


let populateTree = (treeDataObj, sharedNodesMapped = false, extraClass = '') => {

  let hasSharedChildren = false;
  let sharedChildren = [];


  let layer = document.createElement('div');
  layer.setAttribute('class', 'layer ' + extraClass);


  let tier = document.createElement('div');
  tier.setAttribute('class', 'tier');

  let subtier = document.createElement('div');
  subtier.setAttribute('class', 'subtier');

  let splitChildrenArr = [];
  let siblingArr = [];

  let parentListStr = ''

  treeDataObj.map((node) => {
    node.parents.forEach((parent) => {
      parentListStr = parentListStr ? `${parentListStr},${parent.id}` : parent.id
    })


    if (!node.id && node.id !== 0) return;


    if (node.parents.length > 1 && !sharedNodesMapped) {

      if (siblingArr.length) splitChildrenArr.push(siblingArr);
      siblingArr = []

      splitChildrenArr.push([node])
      hasSharedChildren = true;

    } else {
      node.hasSharedSibling = true;
      siblingArr.push(node)
    }

    if (!node.children.length) node.children = [createDummyNode(node.id)]

    let mappedChildren = populateTree(node.children);

    if (!Array.isArray(mappedChildren)) {
      subtier.appendChild(mappedChildren);
    } else {

      mappedChildren = uniqueFromArrays(sharedChildren, mappedChildren)
      mappedChildren.map((nodeArr)=>subtier.appendChild(populateTree(nodeArr, true, addClassName(nodeArr))))

      sharedChildren = sharedChildren.concat(mappedChildren);
    }

  })

  let nodeDivs = createNodeDivs(treeDataObj);

  if (siblingArr.length) splitChildrenArr.push(siblingArr);
  if (hasSharedChildren) return splitChildrenArr;

  if (sharedChildren.length){

    let flexFactor = treeDataObj.length
    let layers = subtier.querySelectorAll('.layer')

    layers.forEach((layer) => {
      let nodeCount = layer.querySelector('.tier').childElementCount

      if (layer.className.indexOf('hasSharedSibling')>0) {
        nodeCount++
        flexFactor = flexFactor * nodeCount
      }
    })

    let flexRemain = flexFactor

    layers.forEach((layer) => {
      let nodeCount = layer.querySelector('.tier').childElementCount
      let layerNodeCount = nodeCount + 1
      let flexGrow
      if (layer.className.indexOf('hasSharedSibling')>0) {
        flexGrow = ((flexFactor / treeDataObj.length) / layerNodeCount) * nodeCount
      } else if (layer.className.indexOf('sharedChild')>0){
        return
      } else {
        flexGrow = flexFactor / treeDataObj.length
      }
      flexRemain = flexRemain - flexGrow;
      layer.style.flex = flexGrow;
    })

    let sharedChildLayer = subtier.querySelector('.sharedChild')
    sharedChildLayer.style.flex = flexRemain
  }


  nodeDivs.forEach((node)=>tier.appendChild(node))

  layer.dataset.parents = parentListStr;
  layer.appendChild(tier);
  layer.appendChild(subtier);

  return layer;

};


let startEl1 = document.getElementById('testNode1')
if (startEl1) startEl1.appendChild(populateTree(testTreeData1))

let startEl2 = document.getElementById('testNode2')
if (startEl2) startEl2.appendChild(populateTree(testTreeData2))

// document.getElementById('testNode3').appendChild(populateTree(testTreeData3))

let emptyMap = document.getElementById('emptyTest')
if (emptyMap) emptyMap.appendChild(populateTree(emptyTestTreeData))

let myMap = document.getElementById('mine')
if (myMap) myMap.appendChild(populateTree(mine))




let drawBranchLines = (startNodeEl)=> {

  let childrenNodes = startNodeEl.querySelectorAll('.node')
  let svg = document.getElementById('svg')
  var svgns = 'http://www.w3.org/2000/svg'

  let nodePositions = {}

  childrenNodes.forEach((node) => {
    let nodePosition = node.getBoundingClientRect()

    let top = nodePosition.top - 20
    let bottom = nodePosition.bottom - 20

    let middle = (nodePosition.right + nodePosition.left) / 2 - 6


    let key = node.getAttribute('key')

    nodePositions[key] = {
      top: top,
      bottom: bottom,
      middle: middle
    }

    let layer = node.parentElement.parentElement
    let parents = layer.dataset.parents.split(',')

    parents.forEach((parent) => {
      if (nodePositions[parent]) {
        var line = document.createElementNS(svgns, 'line');

        line.setAttributeNS(null, 'class', 'stroke')
        line.setAttributeNS(null, 'x1', middle)
        line.setAttributeNS(null, 'y1', top)
        line.setAttributeNS(null, 'x2', nodePositions[parent].middle)
        line.setAttributeNS(null, 'y2', nodePositions[parent].bottom)

        svg.appendChild(line)
      }
    })
  })

}

if (startEl1) drawBranchLines(startEl1)
if (startEl2) drawBranchLines(startEl2)
if (emptyMap) drawBranchLines(emptyTest)
if (myMap) drawBranchLines(myMap)



export default populateTree
