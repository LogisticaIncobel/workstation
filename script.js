document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const cpfInput = document.getElementById('cpf');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const cpf = cpfInput.value.trim();

        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cpf)) {
            alert('CPF inválido. Use o formato 000.000.000-00');
            return;
        }

        fetch('dados.csv')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar CSV');
                return response.text();
            })
            .then(csvText => {
                const linhas = csvText.trim().split('\n').slice(1); // ignora cabeçalho
                const cpfEncontrado = linhas.find(linha => linha.split(',')[0].trim() === cpf);

                if (cpfEncontrado) {
                    const filtro = encodeURIComponent(`CPF eq '${cpf}'`);
                    const url = `https://app.powerbi.com/reportEmbed?reportId=d3943548-d36d-405a-b692-bb60587e736e&autoAuth=true&ctid=659822cf-7349-4e98-98ce-a7f29833b5c6&filter=Planilha1/CPF ${filtro}&mobile=true`;
                    window.location.href = url;
                } else {
                    alert('CPF não encontrado na base de dados.');
                }
            })
            .catch(() => {
                alert('Erro ao processar dados. Tente novamente.');
            });
    });
});

