module.exports = `
input createHotelInput{
    name:String!,
    city:String!,
    price:Int!,
    distance:Int,
    details:String,
    image:String,
    rating:String,
    reviews:String
}

type fields{
    _id:String,
    name:String,
    city:String,
    price:Int,
    distance:Int,
    details:String,
    image:String,
    rating:String,
    reviews:String
}

type createHotelResult{
    errors:[errorField]
    result:fields
}

type errorField{
    key:String,
    value:String
}

input createReservationInput{
    fkHotelId:String!,
    reservationAt:String!
}

type createReservationResult{
    errors:[errorField]
    result:fields
}

type reservationResult{
    result:[reservationFields]
}

type reservationFields{
    _id:String,
    reservationId:String,
    name:String,
    city:String,
    price:Int,
    distance:Int,
    details:String,
    image:String,
    rating:String,
    reviews:String,
    reservationAt:String
}

type getAllHotelsResult{
    result:[fields]
}

type Mutation {
    createHotel(input:createHotelInput):createHotelResult   
    createReservation(input:createReservationInput):createReservationResult   
} 
    
type Query {
    getAllReservationHotels:reservationResult
    getAllHotels: getAllHotelsResult
}
`;
