

let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 4;

loadMoreBtn.onclick = () => {

    let boxes = [...document.querySelectorAll('.box-container .box')];


    for (let i = currentItem; i < currentItem + 4 && i < boxes.length; i++) {
        boxes[i].style.display = 'inline-block';
    }


    currentItem += 4;


    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
};



const carrinho = document.getElementById('carrinho');
const elementos1 = document.getElementById('lista-1');
const listaCarrinho = document.querySelector('#lista-carrinho tbody') || document.querySelector('table tbody');
const esvaziarBtn = document.getElementById('esvaziar');

carregarEventListeners();

function carregarEventListeners() {

    elementos1.addEventListener('click', comprarElemento);


    carrinho.addEventListener('click', excluirElemento);


    esvaziarBtn.addEventListener('click', esvaziarCarrinho);
}



function comprarElemento(e) {
    e.preventDefault();

    // Verifica se o botão clicado é o de adicionar
    if (e.target.classList.contains('agregar-carrinho')) {
        const elemento = e.target.closest('.box');
        lerDadosElemento(elemento);
    }
}


function lerDadosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        preco: elemento.querySelector('.preço').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };

    inserirCarrinho(infoElemento);
}


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



function excluirElemento(e) {
    if (e.target.classList.contains('apagar')) {
        e.preventDefault();
        e.target.closest('tr').remove();
    }
}



function esvaziarCarrinho() {
    listaCarrinho.innerHTML = '';
}

