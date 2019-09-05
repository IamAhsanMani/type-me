import React from 'react';
import { View, Button, Text, StyleSheet,TextInput, Image, TouchableOpacity, Alert, Dimensions, TouchableWithoutFeedback, UIManager, Platform } from 'react-native';
import {connect} from 'react-redux';

class Home extends React.Component{
  constructor() {
    super()
    this.state ={
    }
  }

  alertBox = () => {
    Alert.alert(
        'Type-me',
        'Please Select Game Level',
        [
          {text: 'Easy', onPress: () => this.props.navigation.navigate('Game',{gameType:'easy'})},
          {text: 'Medium', onPress: () => this.props.navigation.navigate('Game',{gameType:'medium'})},
          {
            text: 'Hard',
            onPress: () => this.props.navigation.navigate('Game',{gameType:'hard'}),
          },
        ],
        // {cancelable: false},
      );
  }

    render() {
      console.log(this.state.userName)
    return(
        <View style={styles.container}>
         <View style={styles.imageView}>
          <View style={styles.ButtonView}>
              <TouchableOpacity onPress={this.alertBox}>
                  <View style = {styles.button}>
                      <Text style = {{color: 'white',fontSize:14,fontWeight:'bold',textTransform:'uppercase'}}>Play</Text>
                  </View>
              </TouchableOpacity>
          </View>
          </View>
          </View>
       )
    }

}

const mapStateToProps = state => {
  return{
      user : state.user
  }
}


export default connect(mapStateToProps,null)(Home);

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