export const coloresEstadoProducto = {
  ACTIVO: 'bg-dorado-primary/25 text-green-primary',
  'STOCK BAJO': 'bg-dorado-primary/30 text-green-primary',
  'SIN STOCK': 'bg-red-100 text-red-700',
  INACTIVO: 'bg-slate-200 text-slate-600',
}

export const estadosPublicacion = [
  { key: 'activa', label: 'Activa' },
  { key: 'inactiva', label: 'Inactiva' },
]

export const clasesCampoProducto = {
  errorMessage: 'font-semibold',
  input: 'font-bold text-green-primary',
  inputWrapper:
    'border border-dorado-primary/35 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 group-data-[focus=true]:border-dorado-primary group-data-[focus=true]:bg-white',
  trigger:
    'border border-dorado-primary/35 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 data-[open=true]:border-dorado-primary',
  value: 'font-bold text-green-primary',
}
