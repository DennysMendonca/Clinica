// --- MÁSCARAS ---
const aplicarMascara = (input, tipo) => {
    input.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (tipo === 'cpf') {
            v = v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (tipo === 'tel') {
            v = v.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
        }
        e.target.value = v;
    });
};

aplicarMascara(document.getElementById('cpf'), 'cpf');
aplicarMascara(document.getElementById('telefone'), 'tel');

// --- VALIDAÇÃO LÓGICA DE CPF ---
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

// --- DINÂMICA DE CAMPOS ---
document.getElementById('chkOutros').addEventListener('change', function() {
    document.getElementById('campoOutros').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('selectAlergia').addEventListener('change', function() {
    document.getElementById('campoAlergia').style.display = this.value === 'sim' ? 'block' : 'none';
});

// --- SUBMISSÃO ---
document.getElementById('formCadastro').addEventListener('submit', (e) => {
    e.preventDefault();
    const cpfVal = document.getElementById('cpf').value;

    if (cpfVal !== "" && !validarCPF(cpfVal)) {
        alert("CPF Inválido. Verifique os dados.");
        return;
    }

    document.getElementById('modalConfirmacao').style.display = 'flex';
});

function fecharModal() {
    document.getElementById('modalConfirmacao').style.display = 'none';
    document.getElementById('formCadastro').reset();
    document.getElementById('campoOutros').style.display = 'none';
    document.getElementById('campoAlergia').style.display = 'none';
}
