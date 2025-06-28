# 📸 Procesador de Imágenes para Inventario Escolar

Este proyecto es una herramienta web desarrollada en JavaScript puro que permite procesar múltiples imágenes para extraer información de activos fijos mediante OCR (Reconocimiento Óptico de Caracteres). Está diseñado para facilitar la recopilación de datos de inventario de bienes en instituciones educativas.

![image](https://github.com/user-attachments/assets/42a87dc3-180c-4f04-85aa-e65d217e2669)

---

## 🚀 Funcionalidades

- 📤 **Carga múltiple de imágenes:** Los usuarios pueden seleccionar o tomar varias fotos para ser procesadas en lote.
- 🧠 **OCR con Tesseract.js:** Extrae automáticamente el número de *Activo Fijo* y el *año de adquisición* desde las imágenes cargadas.
- 🏷️ **Clasificación por categoría:** Permite seleccionar una categoría para cada grupo de imágenes (Ej. "Escritorio y Silla", "Pizarrón").
- 🔢 **Control de cantidad:** Para ciertas categorías, se puede indicar cuántos objetos hay por imagen.
- 📊 **Resultados tabulados:** Muestra los resultados en una tabla clara y ordenada, junto con un conteo por categoría.
- 📦 **Resumen modal:** Visualización del progreso y resultado dentro de un modal interactivo.

## 📚 Librerías utilizadas

### [`Tesseract.js`](https://github.com/naptha/tesseract.js)
> **OCR para JavaScript**
- Es una biblioteca que permite realizar reconocimiento de texto directamente en el navegador, sin necesidad de backend.
- En este proyecto, se usa para identificar:
  - Número de activo fijo (`Activo Fijo: ######`)
  - Año de adquisición desde frases como `recurso del FEDERAL 2022`

```js
const { data: { text } } = await Tesseract.recognize(archivo, 'spa');
```

## 🛠️ ¿Para qué sirve?
Esta herramienta es útil para:

> Personal administrativo o de mantenimiento que necesita inventariar bienes físicos (muebles, pizarras, etc.) en aulas o salones.
> Automatizar el proceso de captura de datos desde etiquetas o placas en objetos.
> Centralizar información visual y textual sin tener que transcribir manualmente.

## 📷 Ejemplo de uso
- Selecciona las imágenes con etiquetas de inventario visibles.
- Elige el salón y la categoría correspondiente.
- Si aplica, indica la cantidad por imagen.
- Haz clic en "Procesar".
- Revisa los resultados en una tabla detallada y organizada.

![image](https://github.com/user-attachments/assets/b2ad128b-6eb2-4141-8d03-3ac2d1743e3f)

## 🧩 Archivos clave
index.html – Interfaz de usuario.

script.js – Lógica para carga, procesamiento y visualización de resultados.

Tesseract.js – Librería OCR embebida o cargada vía CDN.

## 📁 Archivos del Proyecto

| Archivo       | Descripción                                                                    |
|---------------|---------------------------------------------------------------------------------|
| `index.html`  | Interfaz de usuario donde se cargan las imágenes y se visualizan los resultados. |
| `script.js`   | Lógica principal: manejo de archivos, procesamiento OCR, interfaz dinámica.     |
| `Tesseract.js`| Librería OCR utilizada para extraer texto desde las imágenes (vía CDN o local). |
