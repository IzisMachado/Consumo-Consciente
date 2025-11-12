import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  console.log('WelcomeScreen carregada!'); // ← Isso aparece no console?
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Consumo Consciente! 🌍</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Onboarding')}
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#d4f4d2' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    color: '#2e7d32',
    textAlign: 'center'
  },
  button: { 
    backgroundColor: '#2e7d32', 
    padding: 15, 
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center'
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold'
  },
});