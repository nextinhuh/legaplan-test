import { useMutation, useQueryClient } from 'react-query'
import { Button } from '../button'
import styles from './delete-task-dialog.module.scss'
import { deleteTask } from '@/service/task.service'
import { useListAllTasksKey } from '@/service/queries/task.query'

interface DeleteTaskDialogProps {
  taskId: string
  isOpen: boolean
  onClose: () => void
}

export function DeleteTaskDialog({
  taskId,
  isOpen,
  onClose,
}: DeleteTaskDialogProps) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (taskId: string) => {
      return deleteTask(taskId)
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [useListAllTasksKey],
      })
    },
  })

  function handleDeleteTask(taskId: string) {
    if (taskId !== '') {
      mutation.mutate(taskId)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p>Deletar tarefa</p>

        <p className={styles.descriptionText}>
          Tem certeza que você deseja deletar essa tarefa?
        </p>

        <div className={styles.buttonContainer}>
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteTask(taskId)}
            variant="destructive"
          >
            Deletar
          </Button>
        </div>
      </div>
    </div>
  )
}
