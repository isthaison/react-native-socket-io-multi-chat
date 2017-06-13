# React Native - Socket IO - Chat

**13 June 2017**
In progress! I am currently still working on the App. My target is to make MVP with possibility to:
- Join/Leave the chat
- Set your name on start && on fly in the APP
- Send messages to all connected people in one channel.
- Deploy to AppStore && Google Play

*Next Targets*
- Multichannel
- List of people connected
- Direct messages
- Docker
- Jenkins


##Mac osx
###Run server 
```
npm start
```

###Run iOS
On iOS the IP to reach node is `localhost:3000`.

```
react-native run-ios
```

###Run Android
At the first place you need to have emulator running. You can setup it via Android Studio.
For now the IP for android version to reach node is `10.0.2.2`, as Android Develoers made it as a bridge.

```
react-native run-android
```