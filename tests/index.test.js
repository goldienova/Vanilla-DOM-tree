// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

import {jsdom} from 'jsdom';

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
global.document = jsdom(documentHTML);
global.window = document.parentWindow;

// global.window.resizeTo = (width, height) => {
//   global.window.innerWidth = width || global.window.innerWidth;
//   global.window.innerHeight = width || global.window.innerHeight;
//   global.window.dispatchEvent(new Event('resize'));
// };

import populateTree from '../index.js'
import { testTreeData1, testTreeData2, testTreeData3, emptyTestTreeData } from './test_data.js'
import testDom1 from './test_doms.js'

beforeAll(() => {


  const testDom = document.implementation.createHTMLDocument("New Document");

  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')

  testDom.body.appendChild(svg)
  const div = document.createElement('div')
  div.id = "tree"

  testDom.body.appendChild(div)
})


test('should output proper DOM Tree', ()=>{

  // const testDom = document.implementation.createHTMLDocument("New Document");

  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')

  testDom.body.appendChild(svg)
  const div = document.createElement('div')
  div.id = "tree"

  testDom.body.appendChild(div)

  let detachedTree = populateTree(testTreeData1)


  testDom.getElementById("tree").appendChild(detachedTree)

})

test('properly adds children', ()=>{

})




let startEl1 = document.getElementById('testNode1')
if(startEl1) startEl1.appendChild(populateTree(testTreeData1))
// console.log("node 1", testTreeData1)
// console.log("node 2", testTreeData2)
// let startEl2 = document.getElementById('testNode2')
// if(startEl2) startEl2.appendChild(populateTree(testTreeData2))

// document.getElementById('testNode3').appendChild(populateTree(testTreeData3))

// let emptyMap = document.getElementById('emptyTest')
// if(emptyMap) emptyMap.appendChild(populateTree(emptyStartNode))

let myMap = document.getElementById('mine')
if(myMap) myMap.appendChild(populateTree(mine))

//test normal tree structure
//test shared children several iterations
//test shared children with children
//multiple layers of shared childreN?


