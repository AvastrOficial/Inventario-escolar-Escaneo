    // Arreglo global para todas las imágenes seleccionadas
let archivosSeleccionados = [];

function agregarArchivos(event) {
  // Convierte FileList a Array y concatena al arreglo global
  const nuevosArchivos = Array.from(event.target.files);
  archivosSeleccionados = archivosSeleccionados.concat(nuevosArchivos);

  // Opcional: mostrar cantidad acumulada en consola o UI
  console.log('Archivos acumulados:', archivosSeleccionados.length);
}

function mostrarInputCantidad() {
  const categoria = document.getElementById("categoria").value;
  const container = document.getElementById("inputCantidadContainer");
  if (categoria === "Escritorio y Silla" || categoria === "Pizarrón") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
}

async function procesarImagen() {
  if (archivosSeleccionados.length === 0) {
    alert('Por favor, selecciona o toma al menos una imagen');
    return;
  }

  const modal = document.getElementById('modalResultado');
  const contenido = document.getElementById('contenidoResultado');
  modal.style.display = "flex";
  contenido.innerHTML = `<div class="cuadro"><strong>⏳ Procesando ${archivosSeleccionados.length} imagen(es)...</strong></div>`;

  const salon = document.getElementById('salon').value || "No especificado";
  const categoria = document.getElementById('categoria').value;
  const cantidad = document.getElementById('cantidad').value;

  let resultados = [];

  for (let i = 0; i < archivosSeleccionados.length; i++) {
    const archivo = archivosSeleccionados[i];
    contenido.innerHTML = `<div class="cuadro"><strong>⏳ Procesando imagen ${i + 1} de ${archivosSeleccionados.length}...</strong></div>`;
    try {
      const { data: { text } } = await Tesseract.recognize(archivo, 'spa');

      const activo = text.match(/Activo Fijo:\s*(\d+)/);
      const fuente = text.match(/recurso\s+del\s+FEDERAL\s+(\d{4})/i);

      resultados.push({
        salon,
        activo: activo ? activo[1] : 'No detectado',
        año: fuente ? fuente[1] : 'No detectado',
        categoria,
        cantidad: (categoria === "Escritorio y Silla" || categoria === "Pizarrón") ? (cantidad || 'No especificada') : '',
        archivo: archivo.name
      });
    } catch {
      resultados.push({
        salon,
        activo: 'Error al procesar',
        año: 'Error al procesar',
        categoria,
        cantidad: '',
        archivo: archivo.name
      });
    }
  }

  mostrarResultados(resultados);
  archivosSeleccionados = [];

  // 👇 ESTA ES LA LÍNEA CLAVE QUE FALTABA
  cerrarModal();
}


function mostrarResultados(resultados) {
  const contenedor = document.getElementById("tablaResultados");

  // Conteo por categoría
  const conteoCategorias = resultados.reduce((acc, r) => {
    acc[r.categoria] = (acc[r.categoria] || 0) + 1;
    return acc;
  }, {});

  // Construir tabla HTML
  let tablaHTML = `
    <h3>Resultados</h3>
    <table>
      <thead>
        <tr>
          <th>Archivo</th><th>Salón</th><th>Activo Fijo</th><th>Año Adquisición</th><th>Categoría</th><th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
  `;

  resultados.forEach(r => {
    tablaHTML += `
      <tr>
        <td>${r.archivo}</td>
        <td>${r.salon}</td>
        <td>${r.activo}</td>
        <td>${r.año}</td>
        <td>${r.categoria}</td>
        <td>${r.cantidad}</td>
      </tr>
    `;
  });

  tablaHTML += `</tbody></table>`;

  // Mostrar conteo categorías
  tablaHTML += `<h3>Conteo por Categoría</h3><ul>`;
  for (const [cat, count] of Object.entries(conteoCategorias)) {
    tablaHTML += `<li><strong>${cat}:</strong> ${count}</li>`;
  }
  tablaHTML += `</ul>`;

  contenedor.innerHTML = tablaHTML;
}


function cerrarModal() {
  document.getElementById("modalResultado").style.display = "none";
}
