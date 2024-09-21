'use client'

import styles from './page.module.scss'
import { Header } from './components/header'
import { Card } from './components/card'
import { Button } from './components/button'
import { useState } from 'react'
import { Modal } from './components/modal'

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  return (
    <div>
      <Header />
      <main className={styles.container}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Modal Title</h2>
          <p>This is the modal content.</p>
        </Modal>
        <Card />

        <Button onClick={openModal} variant="primary">
          Adicionar nova tarefa
        </Button>
      </main>
    </div>
  )
}
