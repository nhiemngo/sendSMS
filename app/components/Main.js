import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const base64 = require('base-64');

export default class Main extends React.Component {

  constructor(props) {
      super(props);
      this.state = {text: '+'};
    }

  send(toNumber)  {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Basic ' + base64.encode('AC9237a102893f7de7dbc091edb2b80a6f:385695064d93b6b7c7ff13186a5723f7'))
    var url = 'https://api.twilio.com/2010-04-01/Accounts/AC9237a102893f7de7dbc091edb2b80a6f/Messages'
    fetch(url, {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        'To': '+13158257415',
        'From': '+12147616710',
        'Body': 'Testing 1 2 3',
      }),
    })
    .then((response) => {
      temp = response.status.toString()
      if (temp == '400') {
        Alert.alert('The phone number you entered is invalid')
      }
      else {
        Alert.alert('Message sent to ' + toNumber)
      }
    });

  }

  validateInput(inputValue) {
    return inputValue
  }

  onPressButton() {
      var x = "hi"
      var k = this.validateInput(this.state.text)
      // if (k != '')
      //   Alert.alert(k)
      // else {
        this.send(k)
        // }
      }

  render() {
    return (
      <View style={styles.container}>
        <View><Text style={styles.titleText}>Send SMS</Text></View>
          <View>
            <TextInput
              style={styles.textbox}
              value = {this.state.text}
              onChangeText={(text) => this.setState({text})}
            />
          </View>

          <View>
            <Text style={styles.subtitleText}>(Please include country code)</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
            style={styles.button}
              onPress={(text) => this.onPressButton()}
              title="Send"
              color = '#111f4d'
            />
          </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#f2f4f7',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize:40,
    fontWeight: '500',
    color: '#e43a19',
  },
  buttonContainer: {
    margin: 20
  },
  textbox: {
    fontSize:20,
    width:180,
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    color: '#111f4d',
  },
  subtitleText: {
    fontSize: 10,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
  }

});
