import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    loadHistory();
    return () => backHandler.remove();
  }, [navigation]);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('carbonHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.log('Erro ao carregar histórico:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('carbonHistory');
      setHistory([]);
    } catch (error) {
      console.log('Erro ao limpar histórico:', error);
    }
  };

  const HistoryItem = ({ item, index }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyDate}>{item.date}</Text>
      <Text style={styles.historyTotal}>{item.total.toFixed(1)} kg CO₂</Text>
      <View style={[
        styles.historyBar,
        { width: `${Math.min((item.total / 500) * 100, 100)}%` }
      ]} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>📊 Histórico de Cálculos</Text>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nenhum cálculo realizado ainda</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Onboarding')}
          >
            <Text style={styles.buttonText}>Fazer Primeiro Cálculo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={history}
            renderItem={HistoryItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.historyList}
          />
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearHistory}
          >
            <Text style={styles.clearButtonText}>Limpar Histórico</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

// Adicione este style extra:
const styles = StyleSheet.create({
  // ... todos os styles anteriores +
  clearButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});