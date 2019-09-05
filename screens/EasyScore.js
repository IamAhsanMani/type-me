import React from 'react';
import { View, Button, Text, StyleSheet,TextInput, Image, TouchableOpacity, Alert, Dimensions, TouchableWithoutFeedback, UIManager, Platform } from 'react-native';

export default class EasyScore extends React.Component{
  constructor() {
    super()
    this.state ={
      data:{}
    }
  }

  componentDidMount() {
    this.getData()
  }


  getData = () => {
    fetch('https://ahsan2323.herokuapp.com/users/easyScore',
    {
    headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data) {
        this.setState({data})
      }
    })
  }

    render() {
      // console.log(this.state.userName)
      Object.values(this.state.data).map(v => {
        console.log('daaaaaaaa',v)
        v.map(d => {
          console.log('dddddd',d.name)
          console.log('dddddd',d.score)
        })
      })
    return(
        <View style={styles.container}>
          <View style={styles.imageView}>
          <View style={styles.ButtonView}>
              <Text style={{fontSize:19,fontWeight:'bold'}}>Easy Mode High Score</Text>
          {  this.state.data ?
            Object.values(this.state.data).map(v => {
            return v.map((d,index) => {
              return (
              <View key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <Text style={{fontSize:18,fontWeight:'bold',paddingRight:10}}>Name: {d.name}</Text>
                <Text style={{fontSize:18,fontWeight:'bold',paddingLeft:10}}>Score: {d.score}</Text>
              </View>
              )
            })
          }) 
          :
          <Text>No High Score yet!</Text>
          }   
          </View>
          </View>
        </View>
    )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:20,
    },
    imageView:{
        flex:1,
        // marginTop:40,
        alignItems:'center',
        justifyContent:'center'
    },
    ButtonView:{
        marginTop:8,
        width:'100%',
        alignItems:'center'
    },
    button:{
        marginTop: 20,
        backgroundColor: '#213',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        width:300,
        height:50
    },
})