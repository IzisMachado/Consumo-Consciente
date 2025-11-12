import React, { useEffect } from 'react'; // ← CORRIGIDO: useEffect importado
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, BackHandler } from 'react-native';

const { width } = Dimensions.get('window');

export default function Result({ route, navigation }) {
  const { resultado } = route.params || {};
  const total = resultado?.total || 0;
  const cat = resultado?.categories || {};

  // CORRIGIDO: useEffect em vez de userFfect
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const getAvaliacao = (total) => {
    if (total < 200) return { text: "Ótimo! 🌟", color: "#4CAF50", desc: "Você está no caminho certo!" };
    if (total < 500) return { text: "Bom! 👍", color: "#FFC107", desc: "Pode melhorar um pouco" };
    return { text: "Alerta! ⚠️", color: "#F44336", desc: "Considere mudar hábitos" };
  };

  const avaliacao = getAvaliacao(total);

  const BarChart = ({ label, value, maxValue = 500, color }) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    
    return (
      <View style={styles.barContainer}>
        <Text style={styles.barLabel}>{label}</Text>
        <View style={styles.barBackground}>
          <View 
            style={[
              styles.barFill, 
              { 
                width: `${percentage}%`,
                backgroundColor: color
              }
            ]} 
          />
        </View>
        <Text style={styles.barValue}>{value.toFixed(1)} kg</Text>
      </View>
    );
  };

  const PieIndicator = () => {
    const categories = [
      { name: 'Energia', value: cat.energia || 0, color: '#FF6B6B' },
      { name: 'Mobilidade', value: cat.mobilidade || 0, color: '#4ECDC4' },
      { name: 'Alimentação', value: cat.alimentacao || 0, color: '#FFD166' },
      { name: 'Compras', value: cat.compras || 0, color: '#6A0572' },
    ];

    return (
      <View style={styles.pieContainer}>
        <Text style={styles.pieTitle}>Distribuição por Categoria</Text>
        {categories.map((category, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: category.color }]} />
            <Text style={styles.legendText}>
              {category.name}: {category.value.toFixed(1)} kg
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Sua Pegada de Carbono</Text>
        <View style={[styles.totalContainer, { borderColor: avaliacao.color }]}>
          <Text style={styles.total}>{total.toFixed(1)}</Text>
          <Text style={styles.totalUnit}>kg CO₂/mês</Text>
        </View>
        <View style={[styles.avaliacaoBadge, { backgroundColor: avaliacao.color }]}>
          <Text style={styles.avaliacaoText}>{avaliacao.text}</Text>
        </View>
        <Text style={styles.avaliacaoDesc}>{avaliacao.desc}</Text>
      </View>

      {/* Gráfico de Barras */}
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Detalhamento por Categoria</Text>
        <BarChart label="⚡ Energia" value={cat.energia || 0} color="#FF6B6B" />
        <BarChart label="🚗 Mobilidade" value={cat.mobilidade || 0} color="#4ECDC4" />
        <BarChart label="🍽️ Alimentação" value={cat.alimentacao || 0} color="#FFD166" />
        <BarChart label="🛍️ Compras" value={cat.compras || 0} color="#6A0572" />
      </View>

      {/* Gráfico de Pizza (Legenda) */}
      <PieIndicator />

      {/* Dicas */}
      <View style={styles.dicasContainer}>
        <Text style={styles.dicasTitle}>💡 Dicas para Reduzir</Text>
        
        {cat.energia > 100 && (
          <Text style={styles.dica}>• Troque lâmpadas por LED e desligue aparelhos standby</Text>
        )}
        
        {cat.mobilidade > 100 && (
          <Text style={styles.dica}>• Use transporte público, bicicleta ou caminhe mais</Text>
        )}
        
        {cat.alimentacao > 150 && (
          <Text style={styles.dica}>• Reduza consumo de carne e prefira alimentos locais</Text>
        )}
        
        {cat.compras > 50 && (
          <Text style={styles.dica}>• Compre apenas o necessário e evite fast fashion</Text>
        )}

        <Text style={styles.dica}>• Plante árvores ou apoie projetos de reflorestamento</Text>
        <Text style={styles.dica}>• Separe o lixo para reciclagem</Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.secondaryButtonText}>📊 Ver Histórico</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Onboarding')}
        >
          <Text style={styles.primaryButtonText}>🔄 Calcular Novamente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 15,
    padding: 10,
  },
  backButtonText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  totalContainer: {
    alignItems: 'center',
    padding: 20,
    borderWidth: 3,
    borderRadius: 50,
    marginBottom: 15,
  },
  total: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  totalUnit: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  avaliacaoBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  avaliacaoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avaliacaoDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  chartSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  barLabel: {
    width: 100,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  barBackground: {
    flex: 1,
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 10,
  },
  barValue: {
    width: 60,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'right',
  },
  pieContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  dicasContainer: {
    backgroundColor: '#e8f5e8',
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  dicasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2e7d32',
  },
  dica: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 25,
    flex: 0.48,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 25,
    flex: 0.48,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});