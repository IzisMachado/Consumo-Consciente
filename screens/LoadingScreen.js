import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    console.log('LoadingScreen carregada!'); // ← Isso aparece no console?
    
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Carregando... 🌱</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#2e7d32' 
  },
  text: { 
    fontSize: 24, 
    color: '#fff',
    fontWeight: 'bold'
  },
});