# About

Creator: Nhiem Ngo.

This project used [Create React Native App](https://github.com/react-community/create-react-native-app).

## Features:
- [X] User interface

- [x] Phone number validation

- [x] Send SMS with the Twilio API

**Additional feature:**

- [x] User can input the text content they want to send

## Interface:

![Interface](./Screenshot_20180325-174328.png)

## Current issue:

I receive error 400 BAD REQUEST from the server, even after I successfully authorize the HTTP request. Somehow, the body of the request is not received. I found a lot of discussion on this problem online, but there doesn't seem to be a universal, acceptable solution to this:

https://github.com/matthew-andrews/isomorphic-fetch/issues/34

https://github.com/github/fetch/issues/323

https://stackoverflow.com/questions/39565706/post-request-with-fetch-api

The function that makes the request is send(), located on line 15 in Main.js


## References:

https://www.twilio.com/docs/api/messaging

https://facebook.github.io/react-native/

https://stackoverflow.com/questions/34815853/react-native-fetch-and-basic-authentication
