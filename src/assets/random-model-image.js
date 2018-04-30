const getRandImg = (urlParams, returnArray) => {
  // Receives a shirt type
  // and select an adecuate image bg
  const searchParams = []
  let models = [
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--Kid--28--White.png?15499528741549918950',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--Kid--29--Black.png?15499528741549918950',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--Kid--30--Dark-Grey.png?15499528741549918950',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--Baby--31--White.png?15499528741549918950',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--Baby--32--Black.png?15499528741549918950',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--Baby--33--Dark-Grey.png?15499528741549918950',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Women--24--Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Women--16--Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Women--22--Black.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Women--21--White.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Women--23--Dark-Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Women--14--Black.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Men--5--Dark-Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Women--15--Dark-Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Tank-Top--adult--Women--27--Dark-Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Men--3--White.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Men--4--Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--Women--13--White.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--T-Shirt--adult--1--Black.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Tank-Top--adult--Women--26--Black.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Tank-Top--adult--Women--25--White.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Tank-Top--adult--Men--12--Black.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Sweatshirt--adult--Women--20--Black.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Tank-Top--adult--Men--10--White.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Tank-Top--adult--Men--11--Dark-Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Sweatshirt--adult--Men--8--Dark-Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Tank-Top--adult--Men--2--Black.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Sweatshirt--adult--Women--19--Dark-Grey.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Sweatshirt--adult--Women--18--Burgundy.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Sweatshirt--adult--Men--Black.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Sweatshirt--adult--Women--17--White.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Sweatshirt--adult--Men--9--Burgundy.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Sweatshirt--adult--Men--7--Black.png?1207510937472484771',
    'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--Sweatshirt--adult--Men--6--White.png?1207510937472484771'
  ]

  if(urlParams) {
    urlParams.map(param => searchParams.push(param.split('=')[1]))
  }

  if(searchParams.length) {
    models = models.filter(model => {
      /* IF `searchParams` has at least an item
       * THEN look up in `models`
       * FOR URLs that match the params received
       * (that is -> correctModel === true)
       */
      let correctModel = true
      if (model)
        searchParams.map(param => { 
          if (!model.includes(`--${param}`)) {
            correctModel = false 
          }
        })
        return correctModel
    })
  }

  // Choose a random available image from the array
  if (returnArray) {
    return models
  } else {
    return models[Math.floor(Math.random() * models.length)]
  }
}