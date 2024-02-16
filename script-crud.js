var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var estadoInicial = {
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
};
var selecionarTarefa = function (estado, tarefa) {
    return __assign(__assign({}, estado), { tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa });
};
var atualizarUI = function () {
    var taskIconSvg = "\n  <svg class=\"app__section-task-icon-status\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"\n      fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <circle cx=\"12\" cy=\"12\" r=\"12\" fill=\"#FFF\" />\n      <path\n          d=\"M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z\"\n          fill=\"#01080E\" />\n  </svg>\n  ";
    var ulTarefas = document.querySelector(".app__section-task-list");
    if (ulTarefas) {
        ulTarefas.innerHTML = "";
    }
    estadoInicial.tarefas.forEach(function (tarefa) {
        var li = document.createElement("li");
        li.classList.add("app__section-task-list-item");
        var svgIcon = document.createElement("svg");
        svgIcon.innerHTML = taskIconSvg;
        var paragraph = document.createElement("p");
        paragraph.classList.add("app__section-task-list-item-description");
        paragraph.textContent = tarefa.descricao;
        var button = document.createElement("button");
        button.classList.add("app_button-edit");
        var editIcon = document.createElement("img");
        editIcon.setAttribute("src", "/imagens/edit.png");
        button.appendChild(editIcon);
        if (tarefa.concluida) {
            button.setAttribute("disabled", "true");
            li.classList.add("app__section-task-list-item-complete");
        }
        li.appendChild(svgIcon);
        li.appendChild(paragraph);
        li.appendChild(button);
        ulTarefas === null || ulTarefas === void 0 ? void 0 : ulTarefas.appendChild(li);
    });
};
