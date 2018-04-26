import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './components/CustomButton';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    this.setState({
      count: this.state.count + 1
    })
  }
  decrement() {
    this.setState({
      count: this.state.count - 1
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <CustomButton onPress={this.increment}>+1</CustomButton>
        <Text>Counter: {this.state.count}</Text>
        <CustomButton onPress={this.decrement}>-1</CustomButton>
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
