function calcularVPL() {
    const taxaDesconto = parseFloat(document.getElementById("taxaDesconto").value) / 100;

    // Função para calcular o VPL de uma série de desembolsos com taxa anual
    function calcularVPLEquivalente(desembolsos, diasPagamentos, taxaAnual) {
        let vpl = 0;
        for (let i = 0; i < desembolsos.length; i++) {
            const tempoAnos = diasPagamentos[i] / 365; // Conversão dos dias para anos
            vpl += desembolsos[i] / Math.pow(1 + taxaAnual, tempoAnos);  // Fórmula para calcular o valor presente
        }
        return vpl;
    }

    // Fornecedor 1
    const valorTotal1 = parseFloat(document.getElementById("valorTotal1").value);
    const desembolsos1 = document.getElementById("desembolsos1").value.split(',').map(Number);
    const diasPagamentos1 = document.getElementById("diasPagamentos1").value.split(',').map(Number);
    const vpl1 = calcularVPLEquivalente(desembolsos1, diasPagamentos1, taxaDesconto);

    // Fornecedor 2
    const valorTotal2 = parseFloat(document.getElementById("valorTotal2").value);
    const desembolsos2 = document.getElementById("desembolsos2").value.split(',').map(Number);
    const diasPagamentos2 = document.getElementById("diasPagamentos2").value.split(',').map(Number);
    const vpl2 = calcularVPLEquivalente(desembolsos2, diasPagamentos2, taxaDesconto);

    // Determinar fornecedor vencedor
    let resultado = `<p>Fornecedor 1 - VPL: R$ ${vpl1.toFixed(2)}</p>`;
    resultado += `<p>Fornecedor 2 - VPL: R$ ${vpl2.toFixed(2)}</p>`;

    if (vpl1 < vpl2) {
        resultado += `<p><strong>Fornecedor Vencedor: Fornecedor 1 com VPL de R$ ${vpl1.toFixed(2)}</strong></p>`;
    } else {
        resultado += `<p><strong>Fornecedor Vencedor: Fornecedor 2 com VPL de R$ ${vpl2.toFixed(2)}</strong></p>`;
    }

    document.getElementById("resultado").innerHTML = resultado;
}