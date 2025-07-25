import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../globalStyles';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const Button = ({children, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50,
  },
})