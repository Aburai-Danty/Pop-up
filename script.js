document.addEventListener("DOMContentLoaded", function () {
  // Adiciona event listener aos botões
  document.querySelectorAll(".btn-2").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openPopup("Texto 2", "popup2");
    });
  });

  // Adiciona event listeners aos inputs de arquivo
  document
    .getElementById("fileInput1")
    .addEventListener("change", handleFileSelect);
  document
    .getElementById("fileInput2")
    .addEventListener("change", handleFileSelect);
});

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  const overlay = document.getElementById("overlay");

  if (popup) {
    popup.style.display = "none";
    overlay.style.display = "none";
  }
}

function closeAllPopups() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.style.display = "none";
  });
  document.getElementById("overlay").style.display = "none";
}

function openCustomPopup(customText) {
  closeAllPopups();

  const customPopup = document.getElementById("customPopup");
  const customPopupText = document.getElementById("customPopupText");
  const overlay = document.getElementById("overlay");

  customPopupText.innerText = customText;
  customPopup.style.display = "block";
  overlay.style.display = "block";
}

function handleFileSelect(event) {
  const fileInput = event.target;
  const cardId = fileInput.id.replace("fileInput", "");
  const imagePreview = document.getElementById(`imagePreview${cardId}`);
  const fileNameElement = document.getElementById(`fileName${cardId}`);

  // Verifica se há um arquivo selecionado
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;
    fileNameElement.textContent = `Arquivo selecionado: ${file.name}`;
  }
}

document.getElementById("saveButton").addEventListener("click", saveFiles);

function saveFiles() {
  const fileInput1 = document.getElementById("fileInput1");
  const fileInput2 = document.getElementById("fileInput2");
  const formData = new FormData();
  formData.append("file1", fileInput1.files[0]);
  formData.append("file2", fileInput2.files[0]);

  // Usa a função fetch para enviar os arquivos para o servidor
  fetch("seu_php-th.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Resposta do servidor:", data);
    })
    .catch((error) => console.error("Erro:", error));
}
// visualização de imagens
function previewImage(inputId, imageId) {
  var input = document.getElementById(inputId);
  var image = document.getElementById(imageId);

  // Verifica se um arquivo foi selecionado
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // Exibe a imagem dentro do card
      image.src = e.target.result;
      image.style.display = "block";
    };

    reader.readAsDataURL(input.files[0]);
  }
}
function handleFileSelect(event) {
  const fileInput = event.target;
  const cardId = fileInput.id.replace("fileInput", "");
  const imagePreview = document.getElementById(`imagePreview${cardId}`);
  const labelElement = document.querySelector(`label[for="${fileInput.id}"]`);
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];

    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;
    labelElement.style.display = "none";
  } else {
    labelElement.style.display = "block";
  }
}
function removeImage(inputId, imageId) {
  const input = document.getElementById(inputId);
  const image = document.getElementById(imageId);
  const labelElement = document.querySelector(`label[for="${inputId}"]`);
  input.value = "";
  image.style.display = "none";
  labelElement.style.display = "block";
}
// ...

function openNewPopup() {
  const newPopup = document.getElementById("newPopup");
  const newPopupText = document.getElementById("newPopupText");
  const overlay = document.getElementById("overlay");

  newPopupText.innerText = "Atenção:";
  newPopup.style.display = "block";
  overlay.style.display = "block";
}
