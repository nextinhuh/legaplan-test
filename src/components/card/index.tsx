import { Trash } from 'lucide-react'
import style from './card.module.scss'
import { DeleteTaskDialog } from '../delete-task-dialog'
import { useState } from 'react'
import { Task } from '@/utils/types'
import { useMutation, useQueryClient } from 'react-query'
import { updateTask } from '@/service/task.service'
import { useListAllTasksKey } from '@/service/queries/task.query'
import checkboxIcon from '../../../public/assets/icons/checkbox.svg'
import checkboxCheckedIcon from '../../../public/assets/icons/checkbox-checked.svg'
import Image from 'next/image'

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
              <li key={task.id}>
                <Image
                  src={checkboxIcon}
                  alt="Icone de checkbox"
                  width={24}
                  height={24}
                  onClick={() => handleUpdateTask(task)}
                />
                <p onClick={() => handleUpdateTask(task)}>{task.name}</p>
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
                <Image
                  src={checkboxCheckedIcon}
                  alt="Icone de checkbox"
                  width={24}
                  height={24}
                  onClick={() => handleUpdateTask(task)}
                />
                <p
                  className={style.finishedTextItemList}
                  onClick={() => handleUpdateTask(task)}
                >
                  {task.name}
                </p>
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
