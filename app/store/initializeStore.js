import {createStore} from '../../node_modules/redux'
console.log("window.redux", window.Redux)

import { reducers } from './reducers.js'

// const reducers = []

export default function initializeStore () {
  return createStore(reducers)
}
