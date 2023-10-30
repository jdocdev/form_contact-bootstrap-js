// Ejecutar el codigo despues de descargar todo el HTML
document.addEventListener("DOMContentLoaded", function () {
  const info = {
    email: "",
    emailcc: "",
    subject: "",
    message: "",
  };

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputEmailcc = document.querySelector("#emailcc");
  const inputSubject = document.querySelector("#subject");
  const inputMessage = document.querySelector("#message");
  const formContact = document.querySelector("#formContact");
  const btnSubmitForm = document.querySelector(
    "#formContact button[type='submit']"
  );
  const btnClearForm = document.querySelector(
    "#formContact button[type='reset']"
  );
  const spinner = document.querySelector("#spinner");

  // Asignar eventos
  inputEmail.addEventListener("input", validar);
  inputEmailcc.addEventListener("input", validar);
  inputSubject.addEventListener("input", validar);
  inputMessage.addEventListener("input", validar);

  formContact.addEventListener("submit", enviarForm);

  // Reiniciar el formulario
  btnClearForm.addEventListener('click', function (e) {
    e.preventDefault();
    resetform();
  })

  function enviarForm(e) {
    e.preventDefault();

    spinner.classList.remove("d-none");
    setTimeout(() => {
      spinner.classList.add("d-none");
      resetform();

      // Crear una alerta de envio
      const envioCorrecto = document.createElement("P");
      envioCorrecto.classList.add("alert", "alert-success", "mt-2");
      envioCorrecto.textContent = "Contact form sent successfully!";
      formContact.appendChild(envioCorrecto);
      setTimeout(() => {
        envioCorrecto.remove();
      }, 3000);
    }, 3000)
  }

  // Validar ingreso de datos
  function validar(e) {
    if (e.target.value.trim() === "") {
      if (e.target.value.trim() === "" && e.target.name !== "emailcc") {
        mostrarAlerta(`The ${e.target.id} field is required`, e.target.parentElement);
        info[e.target.name] = "";
        comprobarInfo();
        return;
      }
    }

    if (
      (e.target.id === "email" && !validarForm(e.target.value)) ||
      (e.target.id === "emailcc" && e.target.value.trim() !== "" && !validarForm(e.target.value))) {
      mostrarAlerta("The email address is not valid", e.target.parentElement);
      info[e.target.name] = "";
      comprobarInfo();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // Asignar los valores al objeto info
    info[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el objeto info
    comprobarInfo();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar el codigo html
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("alert", "alert-danger", "mt-2", "mensaje_alerta");

    // Pintar el error en el formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // Comprobar si ya existe un error pintado en el form
    const mensaje_alerta = referencia.querySelector(".mensaje_alerta");
    if (mensaje_alerta) {
      mensaje_alerta.remove();
    }
  }

  function validarForm(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email, emailcc);
    return resultado;
  }

  function comprobarInfo() {
    // Valores de info
    const valoresInfo = Object.values(info);

    // Excluir 'emailcc'
    const camposExcluidos = ['emailcc'];

    // Comprueba si alguno de los campos obligatorios está vacío
    const campos = valoresInfo.filter((valor, index) => {
      const fieldName = Object.keys(info)[index];
      return valor === '' && !camposExcluidos.includes(fieldName);
    });

    if (campos.length === 0) {
      btnSubmitForm.classList.remove("disabled");
    } else {
      btnSubmitForm.classList.add("disabled");
    }
  }

  function resetform() {
    // Reiniciar el objeto
    info.email = "";
    info.emailcc = "";
    info.subject = "";
    info.message = "";
    formContact.reset();
    comprobarInfo();
  }

});
