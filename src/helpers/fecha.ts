export const obtenerFechaActual = (): string => {
  const ahora = new Date();

  const fechaHoraArgentina = ahora.toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(',', ' -')

  return fechaHoraArgentina
}