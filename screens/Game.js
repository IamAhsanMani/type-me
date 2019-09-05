import React from 'react';
import { View, Button, Text, StyleSheet,TextInput,KeyboardAvoidingView, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback, UIManager, Platform } from 'react-native';
import {connect} from 'react-redux'

class Game extends React.Component{
  constructor() {
    super()
    this.state ={
        answer: '',
        questionTime : null,
        currentQuestionToAsk: 0,
        count: 0,
        answers:[]
    }
  }


  componentDidMount() {
      const gameType = this.props.navigation.getParam('gameType');
      if(gameType === 'easy') {
        this.setState({questionTime: 15,gameType})
      }
      if(gameType === 'medium') {
        this.setState({questionTime: 10,gameType})
      }
      if(gameType === 'hard') {
        this.setState({questionTime: 5,gameType})
      }
      this.getQuestions()
      this.timer = setInterval(() => {
        this.counterRender();
      }, 1000);
  }


  getQuestions = () => {
    let questions;
    let { currentQuestionToAsk} = this.state;
    fetch('https://ahsan2323.herokuapp.com/users/questions')
    .then(res => res.json())
    .then(data =>  {
        var a = Object.values(data)
        
        a.map(v => {
            questions = v
        }) 
        const questionToAsk = questions[currentQuestionToAsk];
        const question =  questionToAsk.name
        const lastQuestionIndex = questions.length -1
        this.setState({lastQuestionIndex,questions, question})
    })
    .catch(e => {
        console.log('eeee',e.message)
    })
  }



  counterRender = () => {
    let { count, questionTime, currentQuestionToAsk, lastQuestionIndex } = this.state;
    if(count < questionTime) {
        count += 1
        this.setState({count})
    }
    else{
        if(currentQuestionToAsk === lastQuestionIndex) {
            clearInterval(this.timer);
            this.nextQuestion('last');
        }
        if(currentQuestionToAsk < lastQuestionIndex) {
            this.nextQuestion()
        }
        else{
            console.log('last else')
            clearInterval(this.timer);
            this.calculateResult('last')
        }
    }
}





nextQuestion = last => {
    let {
      currentQuestionToAsk,
      questions,
      answers,
      answer,
      timeTaken,
      count
    } = this.state;
    const currentQuestion = questions[currentQuestionToAsk];


    timeTaken += count
    const currentAnswer = {
      question : currentQuestion.name,
      score : currentQuestion.name === answer,
    };


    answers.push(currentAnswer)
    this.setState({
      answers,  
      answer: '',
      timeTaken,
      count: 0,
      currentQuestionToAsk: currentQuestionToAsk + 1,
    },
    () => (!last ? this.getQuestions() : this.calculateResult()),
    )
  };


  saveToDb = (gameType,score,name,userId) => {
    fetch('https://ahsan2323.herokuapp.com/users/saveScore',
    {method:'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({gameType,score,name,userId})
    })
    .then(res => res.json())
    .then(data =>   console.log(data))
    .catch(e => {
      console.log('error msj',e.message)
    })
  }

  saveToEasy = (gameType,score,name,userId) => {
    fetch('https://ahsan2323.herokuapp.com/users/saveEasyScore',
    {method:'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({gameType,score,name,userId})
    })
    .then(res => res.json())
    .then(data =>   console.log(data))
    .catch(e => {
      console.log('error msj',e.message)
    })
  }

  saveToMedium = (gameType,score,name,userId) => {
    fetch('https://ahsan2323.herokuapp.com/users/saveMediumScore',
    {method:'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({gameType,score,name,userId})
    })
    .then(res => res.json())
    .then(data =>   console.log(data))
    .catch(e => {
      console.log('error msj',e.message)
    })
  }

  saveToHard = (gameType,score,name,userId) => {
    fetch('https://ahsan2323.herokuapp.com/users/saveHardScore',
    {method:'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({gameType,score,name,userId})
    })
    .then(res => res.json())
    .then(data =>   console.log(data))
    .catch(e => {
      console.log('error msj',e.message)
    })
  }



calculateResult = () => {
    let { answers, timeTaken,questions,count,gameType } = this.state;
    timeTaken += count
    
    clearInterval(this.timer);
    this.setState({timeTaken})
      console.log('result calculating...')
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
    if (answers[i].score) {
      console.log(answers[i].score)
      score += 1;
    }
    console.log('scores===>',score)
  } 
    this.saveToDb(gameType,score,this.props.user.name,this.props.user._id)
    if(gameType === 'easy') {
      this.saveToEasy(gameType,score,this.props.user.name,this.props.user._id)
      this.props.navigation.navigate('Score',{gameType:'Easy',score,id:this.props.user._id,timeTaken})
    }
    if(gameType === 'medium') {
      this.saveToMedium(gameType,score,this.props.user.name,this.props.user._id)
      this.props.navigation.navigate('Score',{gameType:'Medium',score,id:this.props.user._id,timeTaken})
    }
    if(gameType === 'hard') {
      this.saveToHard(gameType,score,this.props.user.name,this.props.user._id)
      this.props.navigation.navigate('Score',{gameType:'Hard',score,id:this.props.user._id,timeTaken})
    }
  }


    render() {
        console.log('ddd*****************************', this.props.user._id)
        const { count, question, currentQuestionToAsk, lastQuestionIndex} = this.state
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.imageView}>
            <Text>{count}</Text>
          <Text>{question}</Text>
          <TextInput onChangeText={(answer) => this.setState({answer})} value={this.state.answer} style={{width: '80%', borderRadius:20,height:40,paddingLeft:10,paddingRight:7,borderBottomColor:'#000',borderBottomWidth:1}} placeholder='User Name' />
          <View style={styles.nextBtn}>
            {currentQuestionToAsk === lastQuestionIndex ? (
              <Button
                onPress={() => this.nextQuestion('last')}
                title="Finish"
                color="#5352ed"
              />
            ) : (
              <Button
                onPress={() => this.nextQuestion()}
                title="Next"
                color="#5352ed"
              />
            )}
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


export default connect(mapStateToProps,null)(Game);

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:20,
    },
    imageView:{
        flex:1,
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