const { hotel } = require('../../lib')

module.exports = {
  Mutation: {
    createHotel: async (obj, args, context, info) => {
      return new Promise(async (resolve) => {
        let response = await hotel.createHotel(args.input)
        return resolve(response)
      });
    },
    createReservation: async (obj, args, context, info) => {
      return new Promise(async (resolve) => {
        let response = await hotel.createReservation(args.input)
        return resolve(response)
      });
    }
  },
  Query: {
    getAllReservationHotels: async (obj, args, context, info) => {
      return new Promise(async (resolve) => {
        let response = await hotel.getAllReservationHotels()
        return resolve(response)
      });
    },
    getAllHotels: async (obj, args, context, info) => {
      return new Promise(async (resolve) => {
        let response = await hotel.getAllHotels()
        return resolve(response)
      });
    }
  }
}
