import React from 'react';
import { View, Button, Text, StyleSheet, Image,KeyboardAvoidingView, TouchableOpacity, Alert, Dimensions, TouchableWithoutFeedback, UIManager, Platform,TextInput } from 'react-native';
import {save_user} from '../store/action';
import {connect} from 'react-redux';

class Login extends React.Component{
  constructor() {
    super()
    this.state ={
      name: ''
    }
  }

  login = () => {
    const { name} = this.state
    fetch('https://ahsan2323.herokuapp.com/users/addUser',
    {method:'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({name})
    })
    .then(res => res.json())
    .then(data => { 
      Object.keys(data).map(v => {
        console.log('datata',data)
        data[v].map(a => {
          _id = a._id;
          userName = a.name
          this.props.store_user(a)
          this.props.navigation.navigate('Home')
        })
      })
    })
    .catch(e => {
      console.log('error msj',e.message)
    })
  }

    render() {
      console.log(this.state.name)
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.imageView}>
          <TextInput onChangeText={(name) => this.setState({name})} value={this.state.name} style={{width: '80%', borderRadius:20,height:40,paddingLeft:10,paddingRight:7,borderBottomColor:'#000',borderBottomWidth:1}} placeholder='User Name' />

          <View style={styles.ButtonView}>
              <TouchableOpacity onPress={this.login}>
                  <View style = {styles.button}>
                      <Text style = {{color: 'white',fontSize:14,fontWeight:'bold',textTransform:'uppercase'}}>login</Text>
                  </View>
              </TouchableOpacity>
          </View>
          </View>
        </KeyboardAvoidingView>
    )
    }

}


const mapStateToProps = state => {
  return{
      user : state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
      store_user : user => dispatch(save_user(user))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);

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