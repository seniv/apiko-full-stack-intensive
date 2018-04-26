import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

const CustomButton = ({onPress, children}) => (
  <TouchableNativeFeedback
    onPress={onPress}>
    <View style={styles.view}>
      <Text style={styles.text}>{children}</Text>
    </View>
  </TouchableNativeFeedback>
)

const styles = StyleSheet.create({
  view: {
    width: 100,
    margin: 5,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 3,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
  },
});

export default CustomButton;