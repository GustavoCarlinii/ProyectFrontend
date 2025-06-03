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
