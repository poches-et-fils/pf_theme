const getRandImg = urlParams => {
    // Receives a shirt type
    // and select an adecuate image bg
    const searchParams = []
    let	models = [
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt---child--male--33.png',
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt---child--male--31.png',
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt---child--male--32.png',
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt--adult--male--5.png',
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt---child--male--29.png',
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt---child--male--28.png',
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt--adult--female--24.png',
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt---child--_female--30.png',
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt--adult--male--3.png',
      'https://cdn.shopify.com/s/files/1/0013/6685/1647/files/model--tshirt--adult--male--4.png'
    ]
    
    if(urlParams)
      urlParams.map(param => searchParams.push(param.split('=')[1]))
      
    if(searchParams.length) {
      models = models.filter((model, index) => {
        /* IF `searchParams` has at least an item
         * THEN look up in `models`
         * FOR URLs that match the params received
         * (that is -> correctModel === true)
         */
        let correctModel = true
        searchParams.map(param => { if (!model.includes(param)) correctModel = false })
        return correctModel
      })
    }
    
    // Choose a random available image from the array
    return models[Math.floor(Math.random() * models.length)]
  }
