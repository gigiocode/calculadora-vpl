document.getElementById('vplForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtendo os valores inseridos pelo usuário
    const investimentoInicial = parseFloat(document.getElementById('investimento').value);
    const taxaDesconto = parseFloat(document.getElementById('taxa').value) / 100;
    const fluxos = document.getElementById('fluxos').value.split(',').map(Number);

    // Calculando o VPL
    let vpl = -investimentoInicial;
    for (let i = 0; i < fluxos.length; i++) {
        vpl += fluxos[i] / Math.pow(1 + taxaDesconto, i + 1);
    }

    // Exibindo o resultado
    const resultadoDiv = document.getElementById('resultado');
    if (vpl > 0) {
        resultadoDiv.innerHTML = `<p>O VPL é R$ ${vpl.toFixed(2)}. O projeto é viável!</p>`;
    } else {
        resultadoDiv.innerHTML = `<p>O VPL é R$ ${vpl.toFixed(2)}. O projeto não é viável.</p>`;
    }
});
