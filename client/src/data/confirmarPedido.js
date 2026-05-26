const leerRespuesta = async (respuesta) => {
  const texto = await respuesta.text();
  if (!texto) return null;

  try {
    return JSON.parse(texto);
  } catch {
    return { mensaje: texto };
  }
};

export const confirmarPedido = async ({ articulos, token, usuario }) => {
  const respuesta = await fetch("/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      idUsuario: usuario.idUsuario,
      items: articulos.map((articulo) => ({
        idProducto: articulo.id,
        cantidad: articulo.cantidad,
      })),
    }),
  });

  const json = await leerRespuesta(respuesta);

  if (!respuesta.ok) {
    throw new Error(json?.mensaje || json?.message || respuesta.statusText);
  }

  return json?.mensaje || "Pedido confirmado";
};
