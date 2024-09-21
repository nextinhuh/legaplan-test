import { Task } from '@/utils/types'
import API from './api'

const SERVICE = 'task'

export async function createTask(taskData: Task): Promise<void> {
  return await API.post(`/${SERVICE}`, {
    name: taskData,
  }).then((response) => response.data)
}
export async function listAllTasks(): Promise<Task[]> {
  return await API.get(`/${SERVICE}`).then((response) => response.data)
}

export async function deleteTask(taskId: string): Promise<void> {
  return await API.delete(`/${SERVICE}/${taskId}`).then(
    (response) => response.data,
  )
}
