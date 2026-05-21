export const coloresEstadoProducto = {
  ACTIVO: 'bg-green-100 text-green-700',
  'STOCK BAJO': 'bg-yellow-100 text-yellow-700',
  'SIN STOCK': 'bg-red-100 text-red-700',
  INACTIVO: 'bg-slate-200 text-slate-600',
}

export const estadosPublicacion = [
  { key: 'activa', label: 'Activa' },
  { key: 'inactiva', label: 'Inactiva' },
]

export const clasesCampoProducto = {
  errorMessage: 'font-semibold',
  input: 'font-bold text-[#0b2b88]',
  inputWrapper:
    'border border-slate-200 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 group-data-[focus=true]:border-[#0b2b88] group-data-[focus=true]:bg-white',
  trigger:
    'border border-slate-200 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 data-[open=true]:border-[#0b2b88]',
  value: 'font-bold text-[#0b2b88]',
}
