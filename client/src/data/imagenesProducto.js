export const crearImagenesLocales = (archivos, cantidadActual) =>
  archivos.map((archivo, indice) => ({
    archivo,
    id: `${archivo.name}-${archivo.lastModified}-${archivo.size}-${cantidadActual + indice}`,
    nombre: archivo.name,
    url: URL.createObjectURL(archivo),
  }))

export const quitarImagenLocal = (imagenes, idImagen) => {
  const imagenEliminada = imagenes.find((imagen) => imagen.id === idImagen)

  if (imagenEliminada) {
    URL.revokeObjectURL(imagenEliminada.url)
  }

  return imagenes.filter((imagen) => imagen.id !== idImagen)
}

export const liberarImagenesLocales = (imagenes) => {
  imagenes.forEach((imagen) => URL.revokeObjectURL(imagen.url))
}
