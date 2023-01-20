// Variáveis para manipulação do DOM.
let elementosForm = document.querySelectorAll("input");
let verifier = document.querySelector("#verificarGeral");
var form = document.querySelector("#myForm");

form.addEventListener("submit", (event) => {
  event.preventDefault(); //Previne o formulário de atualizar automaticamente após submissão.
  validateForm();
});

const validateForm = () => {
  let valid = true;
   //Transforma NodeList dos inputs em array e aplica método some para percorrê-lo.
  Array.from(elementosForm).some((element) => {
    if(element.value.length === 0){
      checkFields(null, element); //Chama função checkFields com o elemento alvo do input.
      verifier.style.visibility = "visible";
      verifier.innerHTML = "Campos obrigatórios não registrados.";
      valid = false;
    }
  })
    if(valid) success();
}

//Verifica campos vazios recebendo evento ou inputs.
let checkFields = (event = null, element = null) => {
  const target = event? event.target : element; //Constante que escolhe entre event ou element (keydown, ou submeter formulário).
  if (target.value.trim().length === 0) fail(target);
  else cleanParagraph(target);
};

//Informa qual campo é necessário preencher.
let fail = (element) => {
  var elementoP = element.parentNode.children[2]; //Busca através da tag pai (div) a tag de parágrafo para atribuição da string de falha..
  elementoP.innerHTML = "*Campo Obrigatório*";
  elementoP.style.visibility = "visible";
};

//Informa o sucesso do cadastro.
let success = () => {
  verifier.style.visibility = "visible";
  verifier.innerHTML = `<p class="success">Sucesso!</p>`;
  form.reset();
  reloadPage();
};

//Limpa o parágrafo alvo após detectar preenchimento via evento keyup ou quando o formulário é submetido.
let cleanParagraph = (element) => {
  var elementP = element.parentNode.children[2]; //Seleciona o parágrafo referente à variável element passada como parâmetro.
  element.innerHTML = "";
  elementP.style.visibility = "hidden";
  verifier.style.visibility = "hidden";
  verifier.innerHTML = "";
};

//Recarrega a página em 3s.
reloadPage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};