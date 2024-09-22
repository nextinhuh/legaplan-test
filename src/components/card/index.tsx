import { Square, SquareCheck, Trash } from 'lucide-react'
import style from './card.module.scss'
import { DeleteTaskDialog } from '../delete-task-dialog'
import { useState } from 'react'
import { Task } from '@/utils/types'
import { useMutation, useQueryClient } from 'react-query'
import { updateTask } from '@/service/task.service'
import { useListAllTasksKey } from '@/service/queries/task.query'

interface CardProps {
  taskList?: Task[]
  isLoading?: boolean
}

export function Card({ taskList, isLoading }: CardProps) {
  const queryClient = useQueryClient()
  const [taskIdToDelete, setTaskIdToDelete] = useState<string>('')
  const [isDeleteTaskDialogOpen, setDeleteTaskDialogOpen] =
    useState<boolean>(false)
  const mutation = useMutation({
    mutationFn: (taskData: Task) => {
      return updateTask(taskData)
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [useListAllTasksKey],
      })
    },
  })

  function handleUpdateTask(taskData: Task) {
    mutation.mutate({
      ...taskData,
      completed: !taskData.completed,
    })
  }

  function handleOpenDeleteTaskDialog(taskId?: string) {
    if (!taskId) return
    setTaskIdToDelete(taskId)
    setDeleteTaskDialogOpen(true)
  }

  return (
    <div className={style.container}>
      <DeleteTaskDialog
        taskId={taskIdToDelete}
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
              <li key={task.id} onClick={() => handleUpdateTask(task)}>
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
              <li key={task.id} onClick={() => handleUpdateTask(task)}>
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
