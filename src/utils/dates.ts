import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function GetDateNowFormated() {
  return capitalizeFirstLetter(
    format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
  )
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
