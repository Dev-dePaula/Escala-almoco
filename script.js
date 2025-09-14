document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-btn');
    const escalaContainer = document.getElementById('escala-container');

    downloadButton.addEventListener('click', () => {
        // Opções para a geração do PDF
        const opt = {
            margin:       0.5,
            filename:     'escala_refeicoes.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true }, // Aumenta a resolução da imagem
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' } // Folha na horizontal
        };

        // Cria um clone do elemento para não modificar a página original
        const elementToPrint = escalaContainer.cloneNode(true);

        // Pega todos os campos de input dentro do clone
        const inputs = elementToPrint.querySelectorAll('input[type="text"]');
        
        // Substitui cada input pelo seu valor em texto puro
        // Isso faz com que o PDF não mostre as caixas de input, apenas o texto.
        inputs.forEach(input => {
            const text = document.createTextNode(input.value);
            input.parentNode.replaceChild(text, input);
        });

        // Gera o PDF a partir do elemento clonado e modificado
        html2pdf().from(elementToPrint).set(opt).save();
    });
});