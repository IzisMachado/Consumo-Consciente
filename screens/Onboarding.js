import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { calcularPegada } from '../utils/footprint';

export default function Onboarding({ navigation }) {
  const [formData, setFormData] = useState({
    kwh: "",
    kmCarro: "",
    kmOnibus: "",
    kmMetro: "",
    porcCarne: "3",
    porcFrango: "2",
    porcLeite: "5",
    itensRoupa: "1",
    itensEletronico: "0"
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach(key => {
      if (formData[key] && isNaN(formData[key])) {
        newErrors[key] = 'Digite um número válido';
      }
    });

    Object.keys(formData).forEach(key => {
      if (formData[key] && Number(formData[key]) < 0) {
        newErrors[key] = 'Não pode ser negativo';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalcular = () => {
  console.log('📍 Botão Calcular clicado!'); // ← Esta linha
  
  if (!validateForm()) {
    Alert.alert('Erro', 'Por favor, corrija os erros antes de calcular.');
    return;
  }

  const respostas = {
    kwh: Number(formData.kwh || 0),
    kmCarro: Number(formData.kmCarro || 0),
    kmOnibus: Number(formData.kmOnibus || 0),
    kmMetro: Number(formData.kmMetro || 0),
    porcCarne: Number(formData.porcCarne || 0),
    porcFrango: Number(formData.porcFrango || 0),
    porcLeite: Number(formData.porcLeite || 0),
    porcPlant: 10,
    itensRoupa: Number(formData.itensRoupa || 0),
    itensEletronico: Number(formData.itensEletronico || 0)
  };

  console.log('📊 Respostas:', respostas); // ← Esta linha

  const resultado = calcularPegada(respostas);
  console.log('🎯 Resultado:', resultado); // ← Esta linha

  navigation.navigate('Result', { resultado });
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Calcule sua Pegada de Carbono</Text>

      <Text style={styles.title}>⚡ Consumo de Energia (kWh/mês)</Text>
      <TextInput 
        style={[styles.input, errors.kwh && styles.inputError]} 
        keyboardType="numeric" 
        value={formData.kwh}
        onChangeText={(value) => handleInputChange('kwh', value)}
        placeholder="Ex: 150"
      />
      {errors.kwh && <Text style={styles.errorText}>{errors.kwh}</Text>}

      <Text style={styles.sectionTitle}>🚗 Transporte</Text>
      
      <Text style={styles.title}>Carro (km/mês)</Text>
      <TextInput 
        style={[styles.input, errors.kmCarro && styles.inputError]} 
        keyboardType="numeric" 
        value={formData.kmCarro}
        onChangeText={(value) => handleInputChange('kmCarro', value)}
        placeholder="Ex: 300"
      />
      {errors.kmCarro && <Text style={styles.errorText}>{errors.kmCarro}</Text>}

      <Text style={styles.title}>Ônibus (km/mês)</Text>
      <TextInput 
        style={[styles.input, errors.kmOnibus && styles.inputError]} 
        keyboardType="numeric" 
        value={formData.kmOnibus}
        onChangeText={(value) => handleInputChange('kmOnibus', value)}
        placeholder="Ex: 100"
      />
      {errors.kmOnibus && <Text style={styles.errorText}>{errors.kmOnibus}</Text>}

      <Text style={styles.title}>Metrô/Trem (km/mês)</Text>
      <TextInput 
        style={[styles.input, errors.kmMetro && styles.inputError]} 
        keyboardType="numeric" 
        value={formData.kmMetro}
        onChangeText={(value) => handleInputChange('kmMetro', value)}
        placeholder="Ex: 50"
      />
      {errors.kmMetro && <Text style={styles.errorText}>{errors.kmMetro}</Text>}

      <Text style={styles.sectionTitle}>🍽️ Alimentação (refeições/semana)</Text>
      
      <Text style={styles.title}>Carne vermelha</Text>
      <TextInput 
        style={[styles.input, errors.porcCarne && styles.inputError]} 
        keyboardType="numeric" 
        value={formData.porcCarne}
        onChangeText={(value) => handleInputChange('porcCarne', value)}
        placeholder="Ex: 3"
      />
      {errors.porcCarne && <Text style={styles.errorText}>{errors.porcCarne}</Text>}

      <Text style={styles.title}>Frango</Text>
      <TextInput 
        style={[styles.input, errors.porcFrango && styles.inputError]} 
        keyboardType="numeric" 
        value={formData.porcFrango}
        onChangeText={(value) => handleInputChange('porcFrango', value)}
        placeholder="Ex: 2"
      />
      {errors.porcFrango && <Text style={styles.errorText}>{errors.porcFrango}</Text>}

      <Text style={styles.title}>Laticínios</Text>
      <TextInput 
        style={[styles.input, errors.porcLeite && styles.inputError]} 
        keyboardType="numeric" 
        value={formData.porcLeite}
        onChangeText={(value) => handleInputChange('porcLeite', value)}
        placeholder="Ex: 5"
      />
      {errors.porcLeite && <Text style={styles.errorText}>{errors.porcLeite}</Text>}

      <Text style={styles.sectionTitle}>🛍️ Compras (itens/mês)</Text>
      
      <Text style={styles.title}>Roupas</Text>
      <TextInput 
        style={[styles.input, errors.itensRoupa && styles.inputError]} 
        keyboardType="numeric" 
        value={formData.itensRoupa}
        onChangeText={(value) => handleInputChange('itensRoupa', value)}
        placeholder="Ex: 1"
      />
      {errors.itensRoupa && <Text style={styles.errorText}>{errors.itensRoupa}</Text>}

      <Text style={styles.title}>Eletrônicos</Text>
      <TextInput 
        style={[styles.input, errors.itensEletronico && styles.inputError]} 
        keyboardType="numeric" 
        value={formData.itensEletronico}
        onChangeText={(value) => handleInputChange('itensEletronico', value)}
        placeholder="Ex: 0"
      />
      {errors.itensEletronico && <Text style={styles.errorText}>{errors.itensEletronico}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleCalcular}>
        <Text style={styles.buttonText}>🌱 Calcular Pegada</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    padding: 10,
  },
  backButtonText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2e7d32',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color: '#2e7d32',
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
    paddingLeft: 10,
  },
  title: { 
    fontSize: 16, 
    marginTop: 15, 
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff8f8',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 25,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});