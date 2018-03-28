import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const base64 = require('base-64');

export default class Main extends React.Component {

  constructor(props) {
      super(props);
      this.state = {phoneNumber: '', textBody: ''};
    }

  //use the Twilio REST API to send message to the designated number:
  send(toNumber, content)  {
    var data = new FormData();
    data.append("To", toNumber);
    data.append("From", "+12147616710");
    data.append("Body", content);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      //Alert the user of the status of their request:
      if (this.readyState === 4) {
        console.log(this.responseText);

        status = this.status;

        if (status == '400') {
          Alert.alert('The number ' + toNumber + ' is not correct, or has not been verified.')
        }
        else if (status == '201'){
          Alert.alert('SMS sent.')
        }
        else {
          Alert.alert('The Twilio server is having errors.')
        }
      }
    });

    xhr.open("POST", "https://api.twilio.com/2010-04-01/Accounts/AC9237a102893f7de7dbc091edb2b80a6f/Messages");
    xhr.setRequestHeader('Authorization', 'Basic ' + base64.encode('AC9237a102893f7de7dbc091edb2b80a6f:385695064d93b6b7c7ff13186a5723f7'))

    xhr.send(data);

  }

  //returns only the numbers in the input value, preceded by '+'. Used for validating the phone number before passing it to send(). Additional validation is left for the Twilio server.
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

  //validates the input data using validateInput() then pass it to send():
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
              maxLength = {20}
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
