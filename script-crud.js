"use strict";
let estadoInicial = {
    tarefas: [
        {
            descricao: "Tarefa concluída",
            concluida: true,
        },
        {
            descricao: "Tarefa pendente 1",
            concluida: false,
        },
        {
            descricao: "Tarefa pendente 2",
            concluida: false,
        },
    ],
    tarefaSelecionada: null,
    editando: false,
};
const selecionarTarefa = (estado, tarefa) => {
    return {
        ...estado,
        tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa,
    };
};
const adicionarTarefa = (estado, tarefa) => {
    return {
        ...estado,
        tarefas: [...estado.tarefas, tarefa],
    };
};
const editarTarefa = (estado, tarefa) => {
    return { ...estado, editando: !estado.editando, tarefaSelecionada: tarefa };
};
const deletarTarefa = (estado, tarefa) => {
    estado.tarefas = estado.tarefas.filter((item) => item.descricao !== tarefa.descricao);
    estado.editando = false;
    estado.tarefaSelecionada = null;
    return {
        ...estado,
    };
};
const concluirTarefa = (estado, tarefa) => {
    tarefa.concluida = true;
    return { ...estado };
};
let tarefasEmAndamento = [];
const pTarefasEmAndamento = document.querySelector(".app__section-active-task-description");
const adicionarOuRemoverTarefaEmAndamento = (tarefa) => {
    const include = tarefasEmAndamento.includes(tarefa);
    if (!include) {
        pTarefasEmAndamento.innerHTML += `<span>${tarefa.descricao}</span>`;
        tarefasEmAndamento = [...tarefasEmAndamento, tarefa];
    }
    if (include) {
        tarefasEmAndamento = tarefasEmAndamento.filter((item) => item !== tarefa);
        pTarefasEmAndamento.innerHTML = "";
        if (tarefasEmAndamento) {
            tarefasEmAndamento.map((tarefa) => (pTarefasEmAndamento.innerHTML += `<span>${tarefa.descricao}</span>`));
        }
    }
};
const atualizarTarefaEmAndamento = () => {
    pTarefasEmAndamento.innerHTML = "";
    tarefasEmAndamento.map((tarefa) => (pTarefasEmAndamento.innerHTML += `<span>${tarefa.descricao}</span>`));
};
const atualizarUI = () => {
    const taskIconSvg = `
  <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#FFF" />
      <path
          d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
          fill="#01080E" />
  </svg>
  `;
    const ulTarefas = document.querySelector(".app__section-task-list");
    if (ulTarefas) {
        ulTarefas.innerHTML = "";
    }
    const formAdicionarTarefa = document.querySelector(".app__form-add-task");
    const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
    const textArea = document.querySelector(".app__form-textarea");
    const btnDelete = document.querySelector(".app__form-footer__button--delete");
    const btnCancel = document.querySelector(".app__form-footer__button--cancel");
    btnCancel.onclick = () => {
        formAdicionarTarefa.classList.add("hidden");
    };
    if (estadoInicial.editando && estadoInicial.tarefaSelecionada) {
        formAdicionarTarefa.classList.remove("hidden");
        textArea.value = estadoInicial.tarefaSelecionada.descricao;
        btnDelete.onclick = () => {
            deletarTarefa(estadoInicial, estadoInicial.tarefaSelecionada);
            atualizarUI();
        };
    }
    else {
        formAdicionarTarefa.classList.add("hidden");
        textArea.value = "";
    }
    if (!btnAdicionarTarefa) {
        throw Error("Não encontramos o elemento btnAdicionarTarefa.");
    }
    btnAdicionarTarefa.onclick = () => {
        formAdicionarTarefa?.classList.toggle("hidden");
    };
    formAdicionarTarefa.onsubmit = (evento) => {
        evento.preventDefault();
        const descricao = textArea.value;
        if (estadoInicial.editando) {
            estadoInicial.tarefaSelecionada.descricao = descricao;
            tarefasEmAndamento.map((tarefa) => {
                if (tarefa === estadoInicial.tarefaSelecionada) {
                    tarefa.descricao = descricao;
                    atualizarTarefaEmAndamento();
                }
            });
            estadoInicial = editarTarefa(estadoInicial, {
                descricao,
                concluida: false,
            });
        }
        else {
            estadoInicial = adicionarTarefa(estadoInicial, {
                descricao,
                concluida: false,
            });
        }
        atualizarUI();
    };
    estadoInicial.tarefas.forEach((tarefa) => {
        const li = document.createElement("li");
        li.classList.add("app__section-task-list-item");
        const svgIcon = document.createElement("svg");
        svgIcon.innerHTML = taskIconSvg;
        const paragraph = document.createElement("p");
        paragraph.classList.add("app__section-task-list-item-description");
        paragraph.textContent = tarefa.descricao;
        const buttonEdit = document.createElement("button");
        buttonEdit.classList.add("app_button-edit");
        const editIcon = document.createElement("img");
        editIcon.setAttribute("src", "/imagens/edit.png");
        buttonEdit.appendChild(editIcon);
        svgIcon.addEventListener("click", () => {
            estadoInicial = concluirTarefa(estadoInicial, tarefa);
            atualizarUI();
        });
        if (tarefa.concluida) {
            buttonEdit.setAttribute("disabled", "true");
            li.classList.add("app__section-task-list-item-complete");
        }
        li.appendChild(svgIcon);
        li.appendChild(paragraph);
        li.appendChild(buttonEdit);
        li.addEventListener("click", () => {
            estadoInicial = selecionarTarefa(estadoInicial, tarefa);
            if (!tarefa.concluida) {
                adicionarOuRemoverTarefaEmAndamento(tarefa);
            }
            atualizarUI();
        });
        buttonEdit.onclick = (e) => {
            e.stopPropagation();
            estadoInicial = editarTarefa(estadoInicial, tarefa);
            atualizarUI();
        };
        ulTarefas?.appendChild(li);
    });
};
document.addEventListener("TarefaFinalizada", () => {
    if (estadoInicial.tarefaSelecionada) {
        estadoInicial.tarefaSelecionada.concluida = true;
        adicionarOuRemoverTarefaEmAndamento(estadoInicial.tarefaSelecionada);
        atualizarUI();
    }
});
atualizarUI();
