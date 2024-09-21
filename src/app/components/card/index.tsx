import { Square, SquareCheck, Trash } from 'lucide-react'
import style from './card.module.scss'

export function Card() {
  return (
    <div className={style.container}>
      <p className={style.title}>Suas tarefas hoje</p>

      <ul className={style.listContainer}>
        <li>
          <Square size={26} />
          <p>Lavar as mãos</p>
          <Trash size={26} />
        </li>
        <li>
          <Square size={26} />
          <p>Fazer um bolo</p>
          <Trash size={26} />
        </li>
        <li>
          <Square size={26} />
          <p>Lavar a louça</p>
          <Trash size={26} />
        </li>
      </ul>

      <p className={style.title}>Tarefas finalizadas</p>
      <ul className={style.listContainer}>
        <li>
          <SquareCheck className={style.finishedIconItemList} size={26} />
          <p className={style.finishedItemList}>Levar o lixo pra fora</p>
          <Trash size={26} />
        </li>
      </ul>
    </div>
  )
}
