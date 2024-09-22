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

  return (
    <div>
      <Header />
      <main>
        <div className={styles.container}>
          <Card taskList={taskListData} isLoading={taskLisIsFetching} />

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
        </div>
      </main>
    </div>
  )
}
