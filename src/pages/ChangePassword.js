import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ChangePassword extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is ChangePassword.js page on your app!</Text>
        <Text>You can change your password here.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
