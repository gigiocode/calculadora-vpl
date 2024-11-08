document.getElementById('gerarFornecedores').addEventListener('click', function() {
    const numFornecedores = parseInt(document.getElementById('numFornecedores').value);
    const fornecedoresContainer = document.getElementById('fornecedoresContainer');
    fornecedoresContainer.innerHTML = ''; // Limpa o container

    for (let i = 0; i < numFornecedores; i++) {
        const fornecedorDiv = document.createElement('div');
        fornecedorDiv.className = 'fornecedor';

        fornecedorDiv.innerHTML = `
            <h3>Fornecedor ${i + 1}</h3>
            <label for="valor${i}">Valor Total da Proposta (R$):</label>
            <input type="number" id="valor${i}" required>

            <label for="taxa${i}">Taxa de Desconto (%):</label>
            <input type="number" id="taxa${i}" required step="0.01">

            <label for="desembolsos${i}">Cronograma de Desembolsos (separado por vírgulas):</label>
            <input type="text" id="desembolsos${i}" placeholder="Ex: 5000, 5000, 5000" required>
        `;
        fornecedoresContainer.appendChild(fornecedorDiv);
    }

    document.getElementById('formVPL').style.display = 'block';
});

document.getElementById('formVPL').addEventListener('submit', function(event) {
    event.preventDefault();

    const numFornecedores = parseInt(document.getElementById('numFornecedores').value);
    let melhorVPL = -Infinity;
    let fornecedorVencedor = -1;
    let resultados = '';

    for (let i = 0; i < numFornecedores; i++) {
        const valorTotal = parseFloat(document.getElementById(`valor${i}`).value);
        const taxaDesconto = parseFloat(document.getElementById(`taxa${i}`).value) / 100;
        const desembolsos = document.getElementById(`desembolsos${i}`).value.split(',').map(Number);

        let vpl = -valorTotal;
        for (let j = 0; j < desembolsos.length; j++) {
            vpl += desembolsos[j] / Math.pow(1 + taxaDesconto, (j + 1) * 0.5);
        }

        resultados += `<p>Fornecedor ${i + 1} - VPL: R$ ${vpl.toFixed(2)}</p>`;

        if (vpl > melhorVPL) {
            melhorVPL = vpl;
            fornecedorVencedor = i + 1;
        }
    }

    resultados += `<p><strong>Fornecedor Vencedor: Fornecedor ${fornecedorVencedor} com VPL de R$ ${melhorVPL.toFixed(2)}</strong></p>`;
    document.getElementById('resultado').innerHTML = resultados;
});

// Função para limpar os inputs
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('formFornecedores').reset();
    document.getElementById('fornecedoresContainer').innerHTML = '';
    document.getElementById('formVPL').style.display = 'none';
    document.getElementById('resultado').innerHTML = '';
});


