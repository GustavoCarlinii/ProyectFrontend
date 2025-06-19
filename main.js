// ===============================
// 1. INICIALIZACIÓN GLOBAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Cargar header y footer
  includeHTML("header", "/components/header.html");
  includeHTML("footer", "/components/footer.html");

  // Cargar mapa si existe
  if (document.getElementById("map")) {
    inicializarMapa();
  }

  // Insertar productos si existe la sección
  if (document.getElementById("productos")) {
    insertarProductos();
  }

  // Setup del menú hamburguesa solo cuando se carga el header
  function setupMenuToggle() {
    const nav = document.querySelector(".navbar");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    if (abrir && cerrar && nav) {
      abrir.addEventListener("click", () => nav.classList.add("visible"));
      cerrar.addEventListener("click", () => nav.classList.remove("visible"));
    }
  }

  // Incluir HTML externo (header/footer)
  async function includeHTML(id, file) {
    try {
      const res = await fetch(file);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
      if (id === "header") setupMenuToggle();
    } catch (err) {
      console.error("Error al incluir archivo HTML:", err);
    }
  }
});


// ===============================
// 2. MAPA EN RESEÑAS
// ===============================
function inicializarMapa() {
  const lat = -31.245279091786315;
  const lon = -61.48525198165976;

  const map = L.map('map').setView([lat, lon], 16);

  L.tileLayer(`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=bcc9afc699fd480681415a6e281c1ff8`, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | © Geoapify',
    maxZoom: 20
  }).addTo(map);

  L.marker([lat, lon])
    .addTo(map)
    .bindPopup("<b>Battios</b><br>Güemes 846")
    .openPopup();
}


// ===============================
// 3. FORMULARIO DE CONTACTO
// ===============================
const form = document.getElementById("contactoForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valido = true;

    // Captura de campos
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const motivo = document.getElementById("motivo");
    const mensaje = document.getElementById("mensaje");

    // Limpiar errores anteriores
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    // Validaciones
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
}


// ===============================
// 4. CONSUMO DE API DE PRODUCTOS (Fake Coffee)
// ===============================
async function buscarProductos() {
  try {
    const res = await fetch('https://api.sampleapis.com/coffee/hot');
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error al cargar productos de café:", err);
    return null;
  }
}

async function insertarProductos() {
  const contenedor = document.getElementById('productos');
  if (!contenedor) return;

  const productos = await buscarProductos();
  if (!productos) {
    contenedor.innerHTML = "<p>No se pudieron cargar los productos ☕</p>";
    return;
  }

  let html = '';

  productos.slice(0, 15).forEach(producto => {
    html += `
      <div class="review-card">
        <img src="${producto.image}" alt="${producto.title}" />
        <h3>${producto.title}</h3>

      </div>
    `;
  });

  contenedor.innerHTML = html;
}
