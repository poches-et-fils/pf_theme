const shuffleDOMSiblings = containerName => {
  const parent = $(containerName)
  const divs = parent.children()
  while (divs.length) {
    parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0])
  }
}