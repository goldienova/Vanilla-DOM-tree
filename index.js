import { testTreeData1, testTreeData2, testTreeData3, emptyTestTreeData } from './tests/test_data.js'
import mine from './mine.js'


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

let createLayer = () => {
  let layer = document.createElement('div');
  layer.setAttribute('class', 'layer ' + extraClass);


  let tier = document.createElement('div');
  tier.setAttribute('class', 'tier');

  let subtier = document.createElement('div');
  subtier.setAttribute('class', 'subtier');
}



let populateTree = function populateTree(treeDataObj, sharedNodesMapped = false, extraClass=''){

  // let hasChildren = false;
  let hasSharedChildren = false;
  let sharedChildren = [];


  let layer = document.createElement('div');
  layer.setAttribute('class', 'layer ' + extraClass);


  let tier = document.createElement('div');
  tier.setAttribute('class', 'tier');

  let subtier = document.createElement('div');
  subtier.setAttribute('class', 'subtier');

  let splitArr = [];
  let holdingArr = [];
  let parentListStr = ''
  // console.log("what are the nodes", nodes)

  treeDataObj.map((node)=>{
    if (node.parents.length > 1 && !sharedNodesMapped) {
      if(holdingArr.length) splitArr.push(holdingArr);
      holdingArr = []

      splitArr.push([node])
      hasSharedChildren = true;

    } else {
      node.hasSharedSibling = true;
      holdingArr.push(node)
    }

    // if (node.children.length) {
      let mappedChildren = populateTree(node.children);
      // hasChildren = true

      if (!Array.isArray(mappedChildren)) {
        subtier.appendChild(mappedChildren);
      } else {

        mappedChildren = uniqueArr(sharedChildren, mappedChildren)
        mappedChildren.map((nodeArr)=>subtier.appendChild(populateTree(nodeArr, true, addExtraClass(nodeArr))))
        sharedChildren = sharedChildren.concat(mappedChildren);
      }
  })



  let nodesArray = treeDataObj.map((node)=>{

    //adds parents as data object to layers
    parentListStr = ''
    node.parents.forEach((parent)=>{
      parentListStr = parentListStr ? `${parentListStr},${parent.id}` : parent.id
    })

    // }

    let nodeDiv = document.createElement('div');
    nodeDiv.setAttribute('class', 'node');
    nodeDiv.setAttribute('key', node.id);



    nodeDiv.addEventListener('click', (e)=>{
      //click on the node & grab key from node
      let key = e.target.getAttribute('key')

      let oldLayers = subtier.querySelectorAll('.layer')
      //grabbing all of the oldlayers in case there is already a layer there..
      // console.log("what are the layers", oldLayers)
      // console.log('what are the nodes?', nodes)

      treeDataObj.forEach((node)=>{


        let childless = node.children.length === 0

        if(node.id == parseInt(key)) {
          node.children.push(createChildNode(node.id))
        }

        let mappedChildren = populateTree(node.children);

        // hasChildren = true
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




    nodeDiv.textContent = node.text;
    //never use innerhtml as it is unsafe

    return nodeDiv;
  })






  if(holdingArr.length) splitArr.push(holdingArr);
  if(hasSharedChildren) return splitArr;

  // Adds Dynamic Spacing to SharedChildren
  // TODO: Clean up dynamic spacing code
  if(sharedChildren.length){

    let flexFactor = treeDataObj.length
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
        flexGrow = ((flexFactor / treeDataObj.length) / layerNodeCount) * nodeCount
      } else if(layer.className.indexOf('sharedChild')>0){
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

  // console.log('nodesArray', nodesArray)
  nodesArray.forEach((child)=>tier.appendChild(child))
  layer.dataset.parents = parentListStr;
  layer.appendChild(tier);
  layer.appendChild(subtier);

  return layer;

};



// TODO: Dynamically iterate through tests
let startEl1 = document.getElementById('testNode1')
if(startEl1) startEl1.appendChild(populateTree(testTreeData1))
// console.log("node 1", testTreeData1)
// console.log("node 2", testTreeData2)
let startEl2 = document.getElementById('testNode2')
if(startEl2) startEl2.appendChild(populateTree(testTreeData2))

// document.getElementById('testNode3').appendChild(populateTree(testTreeData3))

let emptyMap = document.getElementById('emptyTest')
if(emptyMap) emptyMap.appendChild(populateTree(emptyTestTreeData))

let myMap = document.getElementById('mine')
if(myMap) myMap.appendChild(populateTree(mine))




let drawBranchLines = (startNodeEl)=> {

  let childrenNodes = startNodeEl.querySelectorAll('.node')
  let svg = document.getElementById('svg')
  var svgns = 'http://www.w3.org/2000/svg'

  let nodePositions = {}

  childrenNodes.forEach((node)=>{
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

    parents.forEach((parent)=>{
      if(nodePositions[parent]) {
        var line = document.createElementNS(svgns, "line");

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

if(startEl1) drawBranchLines(startEl1)
if(startEl2) drawBranchLines(startEl2)
if(emptyMap) drawBranchLines(emptyTest)
if(myMap) drawBranchLines(myMap)



//nodes structure should change with adding child nodes
console.log("what is populateTree", typeof populateTree)
export default populateTree
