export default function AlertasCompra({ error, esVendedor }) {
  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-semibold">
          {error}
        </div>
      )}

      {esVendedor && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700 font-semibold">
          Estas logueado como vendedor. Para confirmar un pedido necesitas iniciar sesion con una cuenta compradora.
        </div>
      )}
    </>
  );
}
