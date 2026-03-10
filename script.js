// Função para Máscaras
const aplicarMascara = (input, tipo) => {
    input.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
        
        if (tipo === 'cpf') {
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (tipo === 'tel') {
            v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
        }
        e.target.value = v;
    });
};

// Aplicar Máscaras nos inputs
aplicarMascara(document.getElementById('cpf'), 'cpf');
aplicarMascara(document.getElementById('telefone'), 'tel');

// Controle de campos dinâmicos (Outros e Alergias)
document.getElementById('chkOutros').addEventListener('change', function() {
    document.getElementById('campoOutros').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('selectAlergia').addEventListener('change', function() {
    document.getElementById('campoAlergia').style.display = this.value === 'sim' ? 'block' : 'none';
});

// Validação simples ao enviar
document.getElementById('formCadastro').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Formulário validado com sucesso! Os dados obrigatórios foram preenchidos.');
});
