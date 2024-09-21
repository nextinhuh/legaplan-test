'use client'

import styles from './page.module.scss'
import { Header } from '../components/header'
import { Card } from '../components/card'
import { Button } from '../components/button'
import { useState } from 'react'
import { NewTaskDialog } from '../components/new-task-dialog'
import { useListAllTasksQuery } from '@/service/queries/task.query'

export default function Home() {
  const [isNewTaskDialogOpen, setIsNewTaskDialogModalOpen] = useState(false)
  const { data: taskListData, isFetching: taskLisIsFetching } =
    useListAllTasksQuery()

  function handleDeleteTask(taskId: string) {
    console.log('deletar tarefa', taskId)
  }

  return (
    <div>
      <Header />
      <main className={styles.container}>
        <Card
          taskList={taskListData}
          isLoading={taskLisIsFetching}
          onDeleteTask={handleDeleteTask}
        />

        <NewTaskDialog
          isOpen={isNewTaskDialogOpen}
          onClose={() => setIsNewTaskDialogModalOpen(false)}
        ></NewTaskDialog>

        <Button
          onClick={() => setIsNewTaskDialogModalOpen(true)}
          variant="primary"
        >
          Adicionar nova tarefa
        </Button>
      </main>
    </div>
  )
}
