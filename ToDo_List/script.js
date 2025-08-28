// =========================
// Configuração do fundo GIF com fallback
// =========================

// URL do GIF principal
const gifURL = 'https://64.media.tumblr.com/38b1724765eadf9335bebcbb749584c8/f88674de97e340e8-a9/s2549x1823/8bd592a3b4e72f99a15d9eff9a395b8120e6984a.gif';
// URL da imagem de fallback caso o GIF falhe
const fallbackURL = 'fundo.png';

// Criamos uma imagem só pra testar se o GIF carrega
const testeGIF = new Image();
testeGIF.src = gifURL;

// Se o GIF carregar, usa ele como fundo
testeGIF.onload = () => {
    document.body.style.backgroundImage = `url('${gifURL}')`;
};

// Se o GIF não carregar, usa a imagem de fallback
testeGIF.onerror = () => {
    document.body.style.backgroundImage = `url('${fallbackURL}')`;
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
