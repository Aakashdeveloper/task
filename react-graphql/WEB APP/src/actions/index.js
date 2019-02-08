import connector from '../connection';
import gql from 'graphql-tag';

const GET_ALL_HOTELS = gql`
query{
    getAllHotels{
      result{
        _id
        name
        city
        price
        distance
        details
        image
        rating
      }
    }
  }`;
const GET_BOOKING = gql`
query{
    getAllReservationHotels{
      result{
        _id
        reservationId
        name
        city
        price
        distance
        details
        image
        rating
        reviews
        checkInDate
        checkOutDate
      }
    }
  }`

const BOOK_HOTEL = gql`
mutation createReservation($fkHotelId: String!,$checkInAt:String!,$checkOutAt:String!){
    createReservation(input: {fkHotelId: $fkHotelId, checkInDate: $checkInAt, checkOutDate: $checkOutAt}) {
      errors {
        key
        value
      }
      result {
        _id
        name
        city
        price
        distance
        details
        image
        rating
        reviews
      }
    }
  }`;
export const GetGymList = () => (dispatch, getState) => {
    dispatch(requestInitate())
    connector
        .query({
            query: GET_ALL_HOTELS
        })
        .then(result => {
            dispatch(requestDone())
            dispatch({
                type: 'GET_ALLHOTELS',
                payload: result,
            });
        }).catch((error) => {
        console.log('\nerror: \n', error)
        dispatch(requestDone())
    });
};



export const BookingRecord = () => (dispatch, getState) => {
    dispatch(requestInitate())
    connector
        .query({
            query: GET_BOOKING
        })
        .then(result => {
            dispatch(requestDone())
            dispatch({
                type: 'GET_BOOKING',
                payload: result,
            });
        }).catch((error) => {
        console.log('\nerror: \n', error)
        dispatch(requestDone())
    });
};

export const BookHotel = (fkHotelId, checkInAt, checkOutAt) => (dispatch, getState) => {
    connector(requestInitate())
    connector.mutate({
        variables: {fkHotelId, checkInAt, checkOutAt},
        mutation: BOOK_HOTEL,
    })
        .then(result => {
            dispatch(requestDone())
            console.log("Book Hotels ", result)
        })
        .catch(error => {
            dispatch(requestDone())
            console.log(error)
        });
};

const requestDone = () => (dispatch) => {
    dispatch({
        type: 'REQUEST_COMPLETED',
    });
};

const requestInitate = () => (dispatch) => {
    dispatch({
        type: 'REQUEST_STARTED',
        payload: '',
    });
};
