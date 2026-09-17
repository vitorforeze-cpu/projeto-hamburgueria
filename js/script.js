// Ativa os estilos de animação somente quando o JavaScript está funcionando.
document.documentElement.classList.add('javascript-ativo');

// Elementos do menu no celular.
const botaoMenu = document.querySelector('.botao-menu');
const navegacao = document.querySelector('.navegacao');
const linksMenu = document.querySelectorAll('.navegacao a');

// Abre ou fecha o menu e atualiza as informações de acessibilidade.
function alternarMenu() {
    const menuEstaAberto = navegacao.classList.toggle('ativo');

    botaoMenu.classList.toggle('ativo', menuEstaAberto);
    botaoMenu.setAttribute('aria-expanded', String(menuEstaAberto));
    botaoMenu.setAttribute('aria-label', menuEstaAberto ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-aberto', menuEstaAberto);
}

// Fecha o menu depois que uma opção é escolhida.
function fecharMenu() {
    navegacao.classList.remove('ativo');
    botaoMenu.classList.remove('ativo');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-aberto');
}

botaoMenu.addEventListener('click', alternarMenu);

linksMenu.forEach(function (link) {
    link.addEventListener('click', fecharMenu);
});

// Elementos e dados usados pelo carrinho.
const botoesAdicionar = document.querySelectorAll('.botao-adicionar');
const botoesAbrirCarrinho = document.querySelectorAll('.botao-carrinho');
const contadoresCarrinho = document.querySelectorAll('.contador-carrinho');
const painelCarrinho = document.querySelector('.painel-carrinho');
const fundoCarrinho = document.querySelector('.fundo-carrinho');
const botaoFecharCarrinho = document.querySelector('.fechar-carrinho');
const listaCarrinho = document.querySelector('.lista-carrinho');
const mensagemCarrinhoVazio = document.querySelector('.carrinho-vazio');
const totalCarrinho = document.querySelector('.carrinho-total strong');
const botaoFinalizar = document.querySelector('.finalizar-pedido');
const avisoCarrinho = document.querySelector('.aviso-carrinho');
const carrinho = [];
let elementoAnterior = null;
let tempoAviso = null;

// Formata os valores no padrão brasileiro.
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Mostra uma confirmação curta quando um produto é adicionado.
function mostrarAviso(texto) {
    avisoCarrinho.textContent = texto;
    avisoCarrinho.classList.add('visivel');
    clearTimeout(tempoAviso);

    tempoAviso = setTimeout(function () {
        avisoCarrinho.classList.remove('visivel');
    }, 1800);
}

// Atualiza os itens, as quantidades e o total exibidos no carrinho.
function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';

    let quantidadeTotal = 0;
    let valorTotal = 0;

    carrinho.forEach(function (item, indice) {
        quantidadeTotal += item.quantidade;
        valorTotal += item.preco * item.quantidade;

        const itemLista = document.createElement('li');
        itemLista.className = 'item-carrinho';
        itemLista.innerHTML = `
            <div>
                <h3>${item.nome}</h3>
                <p class="item-carrinho-preco">${formatarMoeda(item.preco * item.quantidade)}</p>
            </div>
            <div class="item-carrinho-acoes">
                <div class="controle-quantidade" aria-label="Quantidade de ${item.nome}">
                    <button type="button" data-acao="diminuir" data-indice="${indice}" aria-label="Diminuir quantidade de ${item.nome}">−</button>
                    <span>${item.quantidade}</span>
                    <button type="button" data-acao="aumentar" data-indice="${indice}" aria-label="Aumentar quantidade de ${item.nome}">+</button>
                </div>
                <button class="remover-item" type="button" data-acao="remover" data-indice="${indice}">Remover</button>
            </div>
        `;

        listaCarrinho.appendChild(itemLista);
    });

    contadoresCarrinho.forEach(function (contador) {
        contador.textContent = quantidadeTotal;
    });

    botoesAbrirCarrinho.forEach(function (botao) {
        botao.setAttribute('aria-label', `Abrir carrinho com ${quantidadeTotal} itens`);
    });

    mensagemCarrinhoVazio.hidden = carrinho.length > 0;
    totalCarrinho.textContent = formatarMoeda(valorTotal);
    botaoFinalizar.disabled = carrinho.length === 0;
}

// Adiciona um produto novo ou aumenta a quantidade de um item existente.
function adicionarProduto(nome, preco) {
    const produtoExistente = carrinho.find(function (item) {
        return item.nome === nome;
    });

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    mostrarAviso(`${nome} adicionado ao carrinho`);
}

botoesAdicionar.forEach(function (botao) {
    botao.addEventListener('click', function () {
        const nome = botao.dataset.produto;
        const preco = Number(botao.dataset.preco);

        adicionarProduto(nome, preco);
    });
});

// Abre o painel lateral do carrinho.
function abrirCarrinho(evento) {
    elementoAnterior = evento.currentTarget;
    fecharMenu();
    fundoCarrinho.hidden = false;
    painelCarrinho.classList.add('ativo');
    painelCarrinho.setAttribute('aria-hidden', 'false');
    document.body.classList.add('carrinho-aberto');

    requestAnimationFrame(function () {
        fundoCarrinho.classList.add('ativo');
    });

    botaoFecharCarrinho.focus();
}

// Fecha o painel e devolve o foco ao botão que o abriu.
function fecharCarrinho() {
    painelCarrinho.classList.remove('ativo');
    painelCarrinho.setAttribute('aria-hidden', 'true');
    fundoCarrinho.classList.remove('ativo');
    document.body.classList.remove('carrinho-aberto');

    setTimeout(function () {
        fundoCarrinho.hidden = true;
    }, 300);

    if (elementoAnterior) {
        elementoAnterior.focus();
    }
}

botoesAbrirCarrinho.forEach(function (botao) {
    botao.addEventListener('click', abrirCarrinho);
});

botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
fundoCarrinho.addEventListener('click', fecharCarrinho);

// Controla a quantidade e a remoção dos produtos.
listaCarrinho.addEventListener('click', function (evento) {
    const botao = evento.target.closest('button[data-acao]');

    if (!botao) {
        return;
    }

    const indice = Number(botao.dataset.indice);
    const acao = botao.dataset.acao;

    if (acao === 'aumentar') {
        carrinho[indice].quantidade += 1;
    }

    if (acao === 'diminuir') {
        carrinho[indice].quantidade -= 1;

        if (carrinho[indice].quantidade === 0) {
            carrinho.splice(indice, 1);
        }
    }

    if (acao === 'remover') {
        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
});

// Monta a mensagem do pedido e abre a conversa da hamburgueria.
botaoFinalizar.addEventListener('click', function () {
    if (carrinho.length === 0) {
        return;
    }

    const linhasPedido = carrinho.map(function (item) {
        const subtotal = item.preco * item.quantidade;
        return `- ${item.quantidade}x ${item.nome} — ${formatarMoeda(subtotal)}`;
    });

    const valorTotal = carrinho.reduce(function (total, item) {
        return total + item.preco * item.quantidade;
    }, 0);

    const mensagem = [
        'Olá! Gostaria de fazer este pedido na Lake:',
        '',
        ...linhasPedido,
        '',
        `Total: ${formatarMoeda(valorTotal)}`
    ].join('\n');

    const linkWhatsApp = `https://wa.me/5519727381711?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsApp, '_blank', 'noopener,noreferrer');
});

// Fecha os painéis usando a tecla Escape.
document.addEventListener('keydown', function (evento) {
    if (evento.key !== 'Escape') {
        return;
    }

    if (painelCarrinho.classList.contains('ativo')) {
        fecharCarrinho();
        return;
    }

    if (navegacao.classList.contains('ativo')) {
        fecharMenu();
        botaoMenu.focus();
    }
});

// Faz os elementos aparecerem suavemente conforme entram na tela.
const elementosAnimados = document.querySelectorAll(
    '.secao-cabecalho, .cartao-produto, .cartao-mais-pedido, .categoria-cardapio, .cartao-depoimento, .localizacao-grade, .reserva, .chamada-final-conteudo'
);

elementosAnimados.forEach(function (elemento, indice) {
    elemento.classList.add('animar-entrada');
    elemento.style.transitionDelay = `${(indice % 3) * 0.08}s`;
});

if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.12
    });

    elementosAnimados.forEach(function (elemento) {
        observador.observe(elemento);
    });
} else {
    elementosAnimados.forEach(function (elemento) {
        elemento.classList.add('visivel');
    });
}

atualizarCarrinho();
