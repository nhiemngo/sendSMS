import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const base64 = require('base-64');

export default class Main extends React.Component {

  constructor(props) {
      super(props);
      this.state = {phoneNumber: '', textBody: ''};
    }

  //use the Twilio REST API to send message to the designated number
  send(toNumber, content)  {
    var headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Basic ' + base64.encode('AC9237a102893f7de7dbc091edb2b80a6f:385695064d93b6b7c7ff13186a5723f7')) //the credentials only works after they're encoded

    var url = 'https://api.twilio.com/2010-04-01/Accounts/AC9237a102893f7de7dbc091edb2b80a6f/Messages'

    //use fetch to send an Http POST request to the Twilio REST API
    fetch(url, {
      method: 'POST',
      //originally, I cannot authorize the request just by setting headers. I also tried to put the credentials directly in the url, but that did not work
      //I discovered the solution at https://stackoverflow.com/questions/34815853/react-native-fetch-and-basic-authentication
      headers: headers,
      //for some reason, the body of the request cannot be sent. I have already authorized the request but always get 400: Bad request from the server
      body: JSON.stringify({
        'To': '+13158257415',
        'From': '+12147616710',
        'Body': 'Testing 1 2 3',
      }),
    })
    .then((response) => {
      temp = response.status.toString()
      //let the user know the result of their request
      if (temp == '400') {
        Alert.alert('Error ' + temp + ': the SMS cannot be sent to ' + toNumber + '\nBody: ' + content)
      }
      else if (temp == '201'){
        Alert.alert('SMS sent to ' + toNumber)
      }
      else {
        Alert.alert('The Twilio server is having errors')
      }
    });

  }

  //returns only the numbers in the input value, preceded by '+'. Used for validating the phone number.
  validateInput(inputValue) {
    testValue = "0123456789"
    returnValue = ""
    for (i = 0; i < inputValue.length; i++) {
      temp = inputValue.charAt(i)
      if (testValue.indexOf(temp) != -1)
        returnValue += temp
    }
    return ('+' + returnValue)
  }

  //validate the input data then pass it to send()
  onPressButton() {
      num = this.validateInput(this.state.phoneNumber)
      body = "Testing"
      if (this.state.textBody != "")
        body = this.state.textBody
      this.send(num, body)
      }

  //user interface:
  render() {
    return (
      <View style={styles.container}>
        <View><Text style={styles.titleText}>Send SMS</Text></View>
          <View>
            <TextInput
              style={styles.numberBox}
              value = {this.state.phoneNumber}
              placeholder = "# (With country code)"
              onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            />
          </View>

          <View>
            <TextInput
              style={styles.bodyBox}
              maxLength = {120}
              multiline = {true}
              placeholder = "Body (Optional)"
              value = {this.state.textBody}
              onChangeText={(textBody) => this.setState({textBody})}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={(phoneNumber) => this.onPressButton()}
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
    flex: 1,
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

  numberBox: {
    fontSize:17,
    width:160,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom:10,
    paddingTop:10,
    color: '#111f4d',
  },

  bodyBox: {
    fontSize:17,
    width:160,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom:10,
    paddingTop:10,
    color: '#111f4d',
  },

  buttonContainer: {
    margin: 5
  }

});
