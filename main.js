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
