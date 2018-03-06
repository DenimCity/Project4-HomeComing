const express = require('express')
const City = require('../db/models/City')
const House = require('../db/models/House')
const router = express.Router({mergeParams: true})


router.get('/', async(request, response) => {
  // console.log('hit the get all cities route')
  try {
    const cities = await City.find()
    response.json(cities)
  } catch (error) {
    console.log(`to view all the cities route error ${error}`);
  }
})

//to get one specific city
router.get('/:cityId', async(request, response) => {
  console.log("one city from City")
  const cityId = request.params.cityId
  console.log("cityId", request.params)
  try {
    const city = await City.findById(cityId)
    response.json(city)
  } catch (error) {
    console.log(`to get one pecific city route error ${error}`);
  }
})

//to get one specific cities houses
router.get('/:cityId/houses', (request, response) => {
  console.log('hit the cities houses route')
  const cityId = request.params.cityId
  console.log(`line 33, the specific city hit is => ${cityId}`)
  // const house = request.params.houses console.log('house data line 35', house )

  City
    .findById(cityId)
    .then((city) => {
      const houses = city.houses
      console.log(`line  40: houses in the list are => ${houses}`);
      response.json(houses)
    })
    .catch((error) => {
      console.log(error)
    })
})

//post a new house route in that city
router.post('/:cityId/houses/new', async(request, response) => {
  console.log('hit the new house route')
  try {
    const newHouse = new House(request.body)
    // console.log('here is the new house ', newHouse)

    const city = await City.findById(request.params.cityId)
    // console.log('we found the city ', city)
    city
      .houses
      .push(newHouse)
    const saved = await city.save()
    response.json(saved)
  } catch (error) {
    // console.log(error)
  }
})

//grab that one individual house by Id
router.get('/:cityId/houses/:houseId', async(request, response) => {
  try {
    const cityId = request.params.cityId
    // console.log(`we grabbed the city id ${cityId}`)
    const houseId = request.params.houseId
    // console.log(`whe grabbed the house by Id ${houseId}`)
    const city = await City.findById(cityId)
    response.json(city.houses.id(houseId))
  } catch (error) {
    console.log(`//grab that one individual house by Id route error${error}`);
  }

})


router.get('/:cityId/houses/:houseId/delete', async (request, response) => {
  console.log("Deleting:", request.params)
   try {
     const cityId = request.params.cityId
     console.log(cityId)
     const houseId = request.params.houseId
     console.log(houseId)
     const city = await City.findById(cityId)
      // console.log(city)
      house = city.houses.id(houseId)
      house.remove()
      response.json(city)

      
  }
  catch (err) {
      console.log(err)
  }
})


module.exports = router
