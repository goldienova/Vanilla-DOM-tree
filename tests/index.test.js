
import populateTree from '../index.js'
import { testTreeData1, testTreeData2, testTreeData3, emptyTestTreeData } from './test_data.js'

import prettyFormat from 'pretty-format'


const testDom = document.implementation.createHTMLDocument('New Document');

beforeAll(() => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')

  testDom.body.appendChild(svg)
  const div = document.createElement('div')
  div.id = 'tree'

  testDom.body.appendChild(div)

  let detachedTree = populateTree(testTreeData1)
  testDom.getElementById('tree').appendChild(detachedTree)
})


test('should have correct DOM element counts', () => {
  let layers = testDom.querySelectorAll('.layer')
  let nodes = testDom.querySelectorAll('.node')


  expect(layers).toHaveLength(12)
  expect(nodes).toHaveLength(10)

})

test('should seperate shared children', () => {

})

test('properly adds children', () => {

})



let startEl1 = document.getElementById('testNode1')
if (startEl1) startEl1.appendChild(populateTree(testTreeData1))
// console.log("node 1", testTreeData1)
// console.log("node 2", testTreeData2)
// let startEl2 = document.getElementById('testNode2')
// if (startEl2) startEl2.appendChild(populateTree(testTreeData2))

// document.getElementById('testNode3').appendChild(populateTree(testTreeData3))

// let emptyMap = document.getElementById('emptyTest')
// if (emptyMap) emptyMap.appendChild(populateTree(emptyStartNode))

let myMap = document.getElementById('mine')
if (myMap) myMap.appendChild(populateTree(mine))

//test normal tree structure
//test shared children several iterations
//test shared children with children
//multiple layers of shared childreN?


