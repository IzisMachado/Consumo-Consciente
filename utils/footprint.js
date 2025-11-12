export function calcularPegada(respostas) {
  console.log('🔄 Calculando pegada com:', respostas);
  
  // Cálculos baseados em fatores de emissão aproximados
  const energia = respostas.kwh * 0.82; // kg CO₂ por kWh
  const mobilidade = (respostas.kmCarro * 0.12) + (respostas.kmOnibus * 0.05) + (respostas.kmMetro * 0.03);
  const alimentacao = (respostas.porcCarne * 27.0) + (respostas.porcFrango * 6.9) + (respostas.porcLeite * 3.2) + (respostas.porcPlant * 2.0);
  const compras = (respostas.itensRoupa * 15) + (respostas.itensEletronico * 50);
  
  const total = energia + mobilidade + alimentacao + compras;
  
  const resultado = {
    total: Number(total.toFixed(2)),
    categories: {
      energia: Number(energia.toFixed(2)),
      mobilidade: Number(mobilidade.toFixed(2)),
      alimentacao: Number(alimentacao.toFixed(2)),
      compras: Number(compras.toFixed(2))
    }
  };

  console.log('📈 Resultado do cálculo:', resultado);
  return resultado;
}