import { Button } from '../button'
import styles from './delete-task-dialog.module.scss'

interface DeleteTaskDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirmDeleteTask: () => void
}

export function DeleteTaskDialog({
  isOpen,
  onClose,
  onConfirmDeleteTask,
}: DeleteTaskDialogProps) {
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
          <Button onClick={onConfirmDeleteTask} variant="destructive">
            Deletar
          </Button>
        </div>
      </div>
    </div>
  )
}
