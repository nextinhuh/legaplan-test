import { useQuery } from 'react-query'
import { deleteTask, listAllTasks } from '../task.service'

export const useListAllTasksKey = 'list-all-tasks'
export const useDeleteTaskByIdKey = 'delete-task-by-id'

export function useListAllTasksQuery() {
  const { data, error, refetch, isFetching } = useQuery({
    queryKey: [useListAllTasksKey],

    queryFn: async () => {
      return await listAllTasks()
    },
  })
  return { data, error, refetch, isFetching }
}

export function useDeleteTaskByIdQuery(taskId: string) {
  const { data, error, refetch, isFetching } = useQuery({
    queryKey: [useDeleteTaskByIdKey, taskId],

    queryFn: async () => {
      return await deleteTask(taskId)
    },
  })
  return { data, error, refetch, isFetching }
}
