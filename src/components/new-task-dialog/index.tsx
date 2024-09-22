import { useMutation, useQueryClient } from 'react-query'
import { Button } from '../button'
import styles from './new-task-dialog.module.scss'
import { createTask } from '@/service/task.service'
import { useState } from 'react'
import { useListAllTasksKey } from '@/service/queries/task.query'

interface NewTaskDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function NewTaskDialog({ isOpen, onClose }: NewTaskDialogProps) {
  const [taskName, setTaskName] = useState<string>('')
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (taskName: string) => {
      return createTask({
        name: taskName,
        completed: false,
      })
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [useListAllTasksKey],
      })
    },
  })

  function handleCreateTask() {
    if (taskName !== '') {
      mutation.mutate(taskName)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p>Nova tarefa</p>

        <div className={styles.inputContainer}>
          <label>Título</label>
          <input
            type="text"
            name="title"
            placeholder="Digite"
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={handleCreateTask} variant="primary">
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  )
}
