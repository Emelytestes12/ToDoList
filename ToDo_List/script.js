// Seleciona os elementos principais do HTML
const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

// Lista de tarefas que vai guardar tudo
let minhaListaDeItens = []

// Função que adiciona uma nova tarefa
function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value, // Texto da tarefa
    concluida: false,    // Por padrão começa não concluída
  })

  input.value = '' // Limpa o campo
  mostrarTarefas() // Atualiza a lista na tela
}

// Função para mostrar as tarefas na tela
function mostrarTarefas() {
  let novaLi = ''

  // Percorre cada tarefa do array e cria um <li> para cada uma
  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `
        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
      `
  })

  // Mostra no HTML
  listaCompleta.innerHTML = novaLi

  // Salva no navegador (LocalStorage)
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

// Função que marca tarefa como concluída/não concluída
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
  mostrarTarefas()
}

// Função que deleta uma tarefa
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1) // Remove pelo índice
  mostrarTarefas()
}

// Carrega tarefas salvas no LocalStorage
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTarefas()
}

// Executa ao abrir a página
recarregarTarefas()

// Evento: quando clicar no botão, chama a função
button.addEventListener('click', adicionarNovaTarefa)
