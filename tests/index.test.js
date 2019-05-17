const jsdom = require("jsdom");
const { JSDOM } = jsdom;

import populateTree from '../index.js'
import { testTreeData1, testTreeData2, testTreeData3, emptyTestTreeData } from './test_data.js'
import testDom1 from './test_doms.js'


// const testDom = new JSDOM(`
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <title>Recursive DOM Tree</title>
//       <link rel="stylesheet" href="styles.css" />
//     </head>
//     <body>
//       <svg id="svg" xmlns='http://www.w3.org/2000/svg'>
//       </svg>
//       <div id="tree">
//       </div>
//     </body>
//   </html>`
// );

const testDom = new Document()
testDom.body = document.createElement("body")

testDom.body.innerhtml = `<html>
    <head>
      <title>Recursive DOM Tree</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <svg id="svg" xmlns='http://www.w3.org/2000/svg'>
      </svg>
      <div id="tree">
      </div>
    </body>
  </html>
  `



// var win = testDom.defaultView;

test('should output proper DOM Tree', ()=>{
  // const text = testNode1
  // expect(text).toBe(testNode1)
  console.log("startNode1", startNode1)
  // let startEl1 = testDom.getElementById('tree')
  console.log('testDom1', testDom1, typeof testDom1)

  console.log("what is startEl1", startEl1)
  let detachedTree = populateTree(startNode1)
  console.log("what is detachedTree", detachedTree, "type of", typeof detachedTree, "element", detachedTree instanceof Element, "startEl1 is", startEl1, "instance of startel", startEl1 instanceof Element)
  // if(startEl1) startEl1.appendChild(detachedTree)
  const parser = new DOMParser();
  const testDom2 = parser.parseFromString(testDom1, 'text/html');
  console.log("what is testDom2", testDom2)
  expect(detachedTree).toBe(testDom2)
})




let startEl1 = document.getElementById('testNode1')
if(startEl1) startEl1.appendChild(populateTree(startNode1))
// console.log("node 1", startNode1)
// console.log("node 2", startNode2)
// let startEl2 = document.getElementById('testNode2')
// if(startEl2) startEl2.appendChild(populateTree(startNode2))

// document.getElementById('testNode3').appendChild(populateTree(startNode3))

// let emptyMap = document.getElementById('emptyTest')
// if(emptyMap) emptyMap.appendChild(populateTree(emptyStartNode))

let myMap = document.getElementById('mine')
if(myMap) myMap.appendChild(populateTree(mine))

//test normal tree structure
//test shared children several iterations
//test shared children with children
//multiple layers of shared childreN?


