// =========================
// Configuração do fundo com fundo.gif local
// =========================

const localGif = 'fundo.gif';

const testeGIF = new Image();
testeGIF.src = localGif;

testeGIF.onload = () => {
    document.body.style.backgroundImage = `url('${localGif}')`;
};

testeGIF.onerror = () => {
    console.error('Erro ao carregar fundo.gif');
    document.body.style.backgroundColor = 'pink'; // Fundo rosa se o GIF falhar
};


// =========================
// Funções da To Do List
// =========================

// Seleciona os elementos do HTML
const button = document.querySelector('.button-add-task'); // botão
const input = document.querySelector('.input-task'); // campo de texto
const listaCompleta = document.querySelector('.list-tasks'); // ul da lista

// Array que vai guardar todas as tarefas
let minhaListaDeItens = [];

// Adiciona uma nova tarefa
function adicionarNovaTarefa() {
  if(input.value.trim() === "") return; // não adiciona se estiver vazio
  minhaListaDeItens.push({
    tarefa: input.value, // texto da tarefa
    concluida: false,    // começa como não concluída
  });
  input.value = ''; // limpa o input
  mostrarTarefas(); // atualiza a lista na tela
}

// Mostra as tarefas na tela
function mostrarTarefas() {
  let novaLi = ''; // vai juntar todos os <li> em uma string

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? 'done' : ''}">
          <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
          <p>${item.tarefa}</p>
          <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi; // coloca os <li> no HTML
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens)); // salva no navegador
}

// Marca ou desmarca a tarefa como concluída
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas(); // atualiza a lista
}

// Deleta uma tarefa
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1); // remove do array
  mostrarTarefas(); // atualiza a lista
}

// Carrega tarefas salvas no LocalStorage quando abre a página
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');
  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }
  mostrarTarefas();
}

// Inicializa a lista ao abrir a página
recarregarTarefas();

// Evento do botão para adicionar tarefa
button.addEventListener('click', adicionarNovaTarefa);
