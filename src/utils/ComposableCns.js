export function useCNS() {
   function validarCNS(cns) {
    // Remove caracteres especiais
    cns = cns.replace(/[^\d]+/g,'');

    // Verifica se o CNS possui 15 dígitos
    if (cns.length !== 15) {
        return false;
    }

    // Calcula o dígito verificador
    var soma = 0;
    for (var i = 0; i < 14; i++) {
        soma += parseInt(cns.charAt(i)) * (15 - i);
    }
    var resto = soma % 11;
    var dv = resto < 2 ? 0 : 11 - resto;

    // Verifica se o dígito verificador está correto
        return parseInt(cns.charAt(14)) === dv;
    }
  
  return {
    validarCNS
  }
}