// ================================
// BOTÃO "CARREGAR MAIS"
// ================================

let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 4;

loadMoreBtn.onclick = () => {
    // Pega todos os produtos
    let boxes = [...document.querySelectorAll('.box-container .box')];

    // Mostra mais 4 produtos por clique
    for (let i = currentItem; i < currentItem + 4 && i < boxes.length; i++) {
        boxes[i].style.display = 'inline-block';
    }

    // Atualiza o contador
    currentItem += 4;

    // Esconde o botão se todos foram exibidos
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
};


// ================================
// CARRINHO DE COMPRAS
// ================================

// Corrige o seletor da tabela (mesmo que o HTML esteja errado com "tbody" dentro do id)
const carrinho = document.getElementById('carrinho');
const elementos1 = document.getElementById('lista-1');
const listaCarrinho = document.querySelector('#lista-carrinho tbody') || document.querySelector('table tbody');
const esvaziarBtn = document.getElementById('esvaziar');

// Adiciona todos os eventos principais
carregarEventListeners();

function carregarEventListeners() {
    // Adicionar produto ao carrinho
    elementos1.addEventListener('click', comprarElemento);

    // Excluir item do carrinho
    carrinho.addEventListener('click', excluirElemento);

    // Esvaziar carrinho inteiro
    esvaziarBtn.addEventListener('click', esvaziarCarrinho);
}


// ================================
// ADICIONAR PRODUTO AO CARRINHO
// ================================
function comprarElemento(e) {
    e.preventDefault();

    // Verifica se o botão clicado é o de adicionar
    if (e.target.classList.contains('agregar-carrinho')) {
        const elemento = e.target.closest('.box');
        lerDadosElemento(elemento);
    }
}


// ================================
// LER DADOS DO PRODUTO
// ================================
function lerDadosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        preco: elemento.querySelector('.preço').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };

    inserirCarrinho(infoElemento);
}


// ================================
// INSERIR PRODUTO NA TABELA
// ================================
function inserirCarrinho(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${elemento.imagen}" width="100" /></td>
        <td>${elemento.titulo}</td>
        <td>${elemento.preco}</td>
        <td><a href="#" class="apagar" data-id="${elemento.id}">X</a></td>
    `;
    listaCarrinho.appendChild(row);
}


// ================================
// EXCLUIR UM ITEM DO CARRINHO
// ================================
function excluirElemento(e) {
    if (e.target.classList.contains('apagar')) {
        e.preventDefault();
        e.target.closest('tr').remove();
    }
}


// ================================
// ESVAZIAR CARRINHO
// ================================
function esvaziarCarrinho() {
    listaCarrinho.innerHTML = '';
}
