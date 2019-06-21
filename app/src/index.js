import { testTreeData1, testTreeData2, testTreeData3, emptyTestTreeData } from '../../tests/test_data.js'
import mine from '../../tests/mine.js'

import { uniqueFromArrays, addClassName } from './helpers.js'


let id = 10

//state has isEditing

let createChildNode = (parentId) => {
  let text = ''

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

let editNode = (node) => {

}

let createNodeDivs = (nodesArr) => {

  return nodesArr.map((node) => {
    let nodeDiv = document.createElement('div');
    nodeDiv.setAttribute('class', 'node');
    nodeDiv.setAttribute('key', node.id);

    nodeDiv.addEventListener('click', (event) => {

      let hasSharedChildren = false;
      let key = event.target.getAttribute('key')

      let subtier = nodeDiv.parentNode.parentNode.querySelector('.subtier')
      let parentLayer = subtier.parentNode.parentNode

      let existingLayers = subtier.querySelectorAll('.layer')

      let selectedNode = nodesArr.find((node) => {
        return node.id === parseInt(key)
      })

      selectedNode.children.push(createChildNode(selectedNode.id))

      let mappedChildren = populateTree(selectedNode.children)

      let oldLayer

      existingLayers.forEach((layer) => {
        let parents = layer.dataset.parents
        let nodeId = selectedNode.id.toString()

        if (parents === nodeId || parents.includes(`,${nodeId},`) || parents.endsWith(`,${nodeId}` || parents.startsWith`${nodeId},`)) {
          oldLayer = layer
        }
      })

      if (!Array.isArray(mappedChildren)) {
        subtier.replaceChild(mappedChildren, oldLayer)
      } else {
        mappedChildren.map((nodeChild)=>{

          let newLayer = populateTree(nodeChild, true, addClassName(nodeChild))

          if (newLayer.dataset.parents !== oldLayer.dataset.parents) return
          subtier.replaceChild(newLayer, oldLayer)

          hasSharedChildren = true
        })
      }

      if(hasSharedChildren) spaceSharedChildren(nodesArr.length, subtier)
      eraseBranchLines(parentLayer)
      drawBranchLines(parentLayer)


    }, false)

    nodeDiv.textContent = node.text;

    return nodeDiv;
  })
}

let spaceSharedChildren = (parentCount, subtier) => {

  let flexFactor = parentCount
  let layers = subtier.childNodes

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
      flexGrow = ((flexFactor / parentCount) / layerNodeCount) * nodeCount
    } else if (layer.className.indexOf('sharedChild')>0){
      return
    } else {
      flexGrow = flexFactor / parentCount
    }

    flexRemain = flexRemain - flexGrow;

    layer.style.flex = flexGrow;
  })

  let sharedChildLayer = subtier.querySelector('.sharedChild')

  sharedChildLayer.style.flex = flexRemain
}


let populateTree = (treeDataObj, sharedNodesMapped = false, extraClass = '') => {
  let hasMultipleParents = false;

  let sharedChildren = [];

  let layer = document.createElement('div');
  layer.setAttribute('class', 'layer ' + extraClass);

  let tier = document.createElement('div');
  tier.setAttribute('class', 'tier');

  let subtier = document.createElement('div');
  subtier.setAttribute('class', 'subtier');

  layer.appendChild(tier);
  layer.appendChild(subtier);

  if (!Array.isArray(treeDataObj)) {
    layer.dataset.parents = treeDataObj
    return layer;
  }

  let parentListStr = ''
  let splitSiblings = {}

  treeDataObj.map((node) => {
    parentListStr = ''

    node.parents.forEach((parent) => {

      if(!parentListStr.length) parentListStr = `${parent.id}`

      if (parentListStr == parent.id
          || parentListStr.startsWith(`${parent.id},`)
          || parentListStr.endsWith(`,${parent.id}`)
          || parentListStr.includes(`,${parent.id},`)) return

      parentListStr = `${parentListStr},${parent.id}`
    })

    if (!node.id && node.id !== 0) return;

    if (!splitSiblings[parentListStr]) splitSiblings[parentListStr] = []

    if (node.parents.length > 1 && !sharedNodesMapped) {
      hasMultipleParents = true;
    } else {
      node.hasSharedSibling = true;
    }

    splitSiblings[parentListStr].push(node)

    let mappedChildren = node.children.length ? populateTree(node.children) : populateTree(node.id)

    if (!Array.isArray(mappedChildren)) {
      subtier.appendChild(mappedChildren);
    } else {
      mappedChildren = uniqueFromArrays(sharedChildren, mappedChildren)
      mappedChildren.map((nodeArr)=>subtier.appendChild(populateTree(nodeArr, true, addClassName(nodeArr))))

      sharedChildren = sharedChildren.concat(mappedChildren);
    }

  })

  let nodeDivs = createNodeDivs(treeDataObj);

  let splitSiblingsArr = Object.values(splitSiblings)
  if (hasMultipleParents) return splitSiblingsArr;

  if (sharedChildren.length){
    spaceSharedChildren(treeDataObj.length, subtier)
  }

  nodeDivs.forEach((node)=>tier.appendChild(node))

  layer.dataset.parents = parentListStr;

  return layer;

};


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

let eraseBranchLines = (startNodeEl) => {
  let nodes = startNodeEl.querySelectorAll('.node')
  let svg = document.getElementById('svg')
  var svgns = 'http://www.w3.org/2000/svg'

  let nodePositions = {}

  nodes.forEach((node) => {
    let nodePosition = node.getBoundingClientRect()
    let bottom = nodePosition.bottom - 20

  svg.childNodes.forEach((shape)=>{
    if (shape.attributes && shape.getAttribute('y2') == bottom) shape.remove()
  })
  })
}

let renderDom = (rootId, treeData) => {
  let startEl = document.getElementById(rootId)
  if (startEl) {
    startEl.appendChild(populateTree(treeData))
    drawBranchLines(startEl)
  }
}

renderDom('testNode1', testTreeData1)
renderDom('testNode2', testTreeData2)
renderDom('emptyTest', emptyTestTreeData)
renderDom('mine', mine)

export default populateTree
