export default function AlertasCompra({ error, esVendedor }) {
  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-semibold">
          {error}
        </div>
      )}

      {esVendedor && (
        <div className="mb-4 p-3 bg-dorado-primary/15 border border-dorado-primary/35 rounded-lg text-sm text-green-primary font-semibold">
          Estás logueado como vendedor. Para confirmar un pedido necesitás iniciar sesión con una cuenta compradora.
        </div>
      )}
    </>
  );
}
