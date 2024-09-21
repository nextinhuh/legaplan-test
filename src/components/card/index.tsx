import { Square, SquareCheck, Trash } from 'lucide-react'
import style from './card.module.scss'
import { DeleteTaskDialog } from '../delete-task-dialog'
import { useState } from 'react'
import { Task } from '@/utils/types'

interface CardProps {
  taskList?: Task[]
  isLoading?: boolean
  onDeleteTask: (taskId: string) => void
}

export function Card({ taskList, isLoading, onDeleteTask }: CardProps) {
  const [taskIdToDelete, setTaskIdToDelete] = useState<string>('')
  const [isDeleteTaskDialogOpen, setDeleteTaskDialogOpen] =
    useState<boolean>(false)

  function handleOpenDeleteTaskDialog(taskId?: string) {
    if (!taskId) return
    setTaskIdToDelete(taskId)
    setDeleteTaskDialogOpen(true)
  }

  return (
    <div className={style.container}>
      <DeleteTaskDialog
        onConfirmDeleteTask={() => onDeleteTask(taskIdToDelete)}
        isOpen={isDeleteTaskDialogOpen}
        onClose={() => setDeleteTaskDialogOpen(false)}
      ></DeleteTaskDialog>

      <p className={style.title}>Suas tarefas hoje</p>

      <ul className={style.listContainer}>
        {isLoading && <p>Carregando...</p>}
        {taskList &&
          taskList.map((task) => {
            if (task.completed) return null
            return (
              <li key={task.id}>
                <Square size={26} />
                <p>{task.name}</p>
                <Trash
                  size={26}
                  onClick={() => handleOpenDeleteTaskDialog(task.id)}
                />
              </li>
            )
          })}
      </ul>

      <p className={style.title}>Tarefas finalizadas</p>
      <ul className={style.listContainer}>
        {isLoading && <p>Carregando...</p>}
        {taskList &&
          taskList.map((task) => {
            if (!task.completed) return null
            return (
              <li key={task.id}>
                <SquareCheck className={style.finishedIconItemList} size={26} />
                <p className={style.finishedItemList}>{task.name}</p>
                <Trash
                  size={26}
                  onClick={() => handleOpenDeleteTaskDialog(task.id)}
                />
              </li>
            )
          })}
      </ul>
    </div>
  )
}
