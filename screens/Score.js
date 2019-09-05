import React from 'react';
import { View, Button, Text, StyleSheet, Image,KeyboardAvoidingView, TouchableOpacity, Alert, Dimensions, TouchableWithoutFeedback, UIManager, Platform,TextInput } from 'react-native';

export default class Score extends React.Component{
  constructor() {
    super()
    this.state ={
    }
  }

  componentDidMount() {
      this.getScore()
  }


    getScore = () => {
        const gameType = this.props.navigation.getParam('gameType');
        const score = this.props.navigation.getParam('score');
        const id = this.props.navigation.getParam('id');
        this.setState({gameType,score,id})

        console.log('iiiddiid',this.props.navigation.getParam('gameType'))
    }

    render() {
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.imageView}>
          <Text>Game Type: <Text style={{fontWeight:'bold'}}>{this.state.gameType}</Text></Text>
          <Text>Your Score: <Text style={{fontWeight:'bold'}}>{this.state.score}</Text></Text>

          <View style={styles.ButtonView}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Home',{id:this.state.id,score: this.state.score})}>
                  <View style = {styles.button}>
                      <Text style = {{color: 'white',fontSize:14,fontWeight:'bold',textTransform:'uppercase'}}>Play Again</Text>
                  </View>
              </TouchableOpacity>
          </View>
          </View>
        </KeyboardAvoidingView>
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