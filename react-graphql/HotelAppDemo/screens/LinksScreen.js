import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';

import createApolloClient from './apollo';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';



const FETCH_TODOS = gql`
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
      reservationAt
    }
  }
}

`;
let  client = null

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)
    this.state = {data:[]}

    client = new ApolloClient({
      link: createHttpLink({ uri: 'http://localhost:3500/graphql?' }),
      cache: new InMemoryCache()
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <ApolloProvider client={client}>

      <Query
      query={FETCH_TODOS}>
      {
        ({data, error, loading}) => {
          if(data){
            console.log('Error us ',JSON.stringify(data))
            // this.setState({data:data})
            return(
              <SafeAreaView>
            <FlatList
            data={data.getAllReservationHotels && data.getAllReservationHotels.result}
            renderItem={({item}) => this.renderItem(item)}
            ItemSeparatorComponent = {() => this.renderSeperator()}
          />
          </SafeAreaView>
            )
          }
          if(error){
            console.log('Error us ',JSON.stringify(error))
            return null
          }
          else if (loading) {
            return (
            <View> 
              <Text> 
              Loading ... 
              </Text>
               </View>
               )
          }
             
        }
      }
    </Query>
   </ApolloProvider>
   </View>
    );
  }

  renderSeperator = () => {
    return(
      <View style = {{height:0.2,backgroundColor:'gray'}}/>
    )
  }

  renderItem = (item) => {
    return(
    <View style = {{height:160}}>
      <View style = {{flexDirection:'row' , flex:1 }}>
        <Image source = {{uri:item.image}} style = {{width:80, height:120 , margin:10 , backgroundColor:'red'}} />
        <View>
          <Text style = {styles.headingTextStyle} numberOfLines = {1}>{item.name}</Text>
          <Text style = {styles.subheadingTextStyle}>{item.city}</Text>
          <View style = {{flexDirection:'row' , alignItems:'space-between'}}>
            <Text style = {styles.ratingTextStyle}>{item.rating}/5</Text>
            <Text style = {{fontSize:16 , fontWeight:'500', marginLeft:150}}>{item.price}$</Text>
          </View>
          <Text style = {styles.reviewTextStyle}>{item.reviews}</Text>
          {/* <TouchableOpacity onPress = {this.onBookingPress} style = {{backgroundColor:'orange' , marginLeft:155 , height:40 , marginTop:-15 ,  justifyContent:'center', alignItems:'center'}}>
              <Text style = {{fontSize:16 , color:'white' , fontWeight:'500'}}> Book Now </Text>
            </TouchableOpacity> */}

        </View>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headingTextStyle :{
    fontSize:16 ,
    paddingTop:15,
    maxWidth:225

  },
  subheadingTextStyle :{
    fontSize:13 ,
    paddingTop:5,
  },
  ratingTextStyle :{
    fontSize:13 ,
    fontWeight:'500',
    paddingTop:40,
    color:'green'
  },
  reviewTextStyle :{
    fontSize:13 ,
    fontWeight:'300',
    paddingTop:2,
    color:'gray'
  }
});
