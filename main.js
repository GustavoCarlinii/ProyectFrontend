document.addEventListener("DOMContentLoaded", () => {
  // INCLUYE HEADER Y FOOTER
  const includeHTML = async (id, file) => {
    try {
      const res = await fetch(file);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;

      // Esperamos a que el contenido se cargue y luego asignamos eventos
      if (id === "header") setupMenuToggle();
    } catch (err) {
      console.error("Error al incluir archivo HTML:", err);
    }
  };

  includeHTML("header", "/components/header.html");
  includeHTML("footer", "/components/footer.html");

  //MAPAS
  const latBattios = -31.245279091786315;
  const lonBattios = -61.48525198165976;

  const map = L.map('map').setView([latBattios,lonBattios], 16);


L.tileLayer (`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=bcc9afc699fd480681415a6e281c1ff8`, {
   attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | © Geoapify', 
   maxZoom: 20, 
}).addTo(map);


L.marker([latBattios,lonBattios])
    .addTo(map)
    .bindPopup("<b>Battios</b><br>Güemes 846")
    .openPopup();



  // FUNCIONALIDAD DEL MENÚ HAMBURGUESA
  function setupMenuToggle() {
    const nav = document.querySelector(".navbar");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    if (abrir && cerrar && nav) {
      abrir.addEventListener("click", () => {
        nav.classList.add("visible");
      });

      cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
      });
    }
  }
});


//FORMULARIO 
const form = document.getElementById("contactoForm");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let valido = true;

      const nombre = document.getElementById("nombre");
      const apellido = document.getElementById("apellido");
      const email = document.getElementById("email");
      const telefono = document.getElementById("telefono");
      const motivo = document.getElementById("motivo");
      const mensaje = document.getElementById("mensaje");

     
      document.querySelectorAll(".error").forEach(e => e.textContent = "");

      // VALIDACIONES
      if (nombre.value.trim() === "") {
        document.getElementById("errorNombre").textContent = "El nombre es obligatorio.";
        valido = false;
      }

      if (apellido.value.trim() === "") {
        document.getElementById("errorApellido").textContent = "El apellido es obligatorio.";
        valido = false;
      }

      if (email.value.trim() === "" || !/^\S+@\S+\.\S+$/.test(email.value)) {
        document.getElementById("errorEmail").textContent = "Email inválido.";
        valido = false;
      }

      if (telefono.value.trim() === "" || !/^\d{6,15}$/.test(telefono.value)) {
        document.getElementById("errorTelefono").textContent = "Número inválido (solo dígitos, 6-15 caracteres).";
        valido = false;
      }

      if (motivo.value === "") {
        document.getElementById("errorMotivo").textContent = "Seleccioná un motivo.";
        valido = false;
      }

      if (mensaje.value.trim().length < 10) {
        document.getElementById("errorMensaje").textContent = "El mensaje debe tener al menos 10 caracteres.";
        valido = false;
      }

      if (valido) {
        alert("Formulario enviado correctamente ✅");
        form.reset();
      }
    });
