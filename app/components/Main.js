import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

// const twilio = require('../../twilio');
//
// var client = new twilio('AC9237a102893f7de7dbc091edb2b80a6f', '385695064d93b6b7c7ff13186a5723f7');

export default class Main extends React.Component {

  constructor(props) {
      super(props);
      this.state = {text: ''};
    }

  onPressButton() {
      k = this.state.text
      if (k != '')
        Alert.alert(k)
    }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.regularText}>SMS With Twilio</Text>
          <View>
            <TextInput
              style={styles.textbox}
              placeholder = "Phone # Here"
              keyboardType = 'numeric'
              onChangeText={(text) => this.setState({text})}
            />
          </View>
          <View>
          <Button
          style={styles.button}
            onPress={(text) => this.onPressButton()}
            title="Send SMS"
          />
          </View>

      </View>
    );
  }
}

class DisplayMessage extends React.Component  {
  render() {
    return (
      <View>
        <Text>The text entered: {this.props.message}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: 'powderblue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  regularText: {
    fontSize:30,
    fontWeight: 'bold',
    color: 'steelblue',
  },

  textbox: {
    fontSize:20,
    width:130,
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    color: 'steelblue',
  },

  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
  }

});
