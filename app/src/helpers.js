const uniqueFromArrays = (array1, array2) => {
  let hashTable = {}
  let uniqueArray = []

  array1.map((arrItem) => {
    arrItem.map((item) => {
      hashTable[item.id] = true
    })
  })

  array2.map((arrItem) => {
    let unique = true

    arrItem.map((item) => {
      if (hashTable[item.id]) unique = false
    })

    if (unique) uniqueArray.push(arrItem)
  })

  return uniqueArray
}

const addClassName = (array) => {
  let newClassName = ''
  array.map((item) => {
    if (item.hasSharedSibling) newClassName='hasSharedSibling'
    if (item.parents.length > 1) newClassName='sharedChild'
  })

  return newClassName
}


export {uniqueFromArrays, addClassName}
