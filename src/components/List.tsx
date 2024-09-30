import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../../config.ts'
import Todo, { ITodo } from './Todo.tsx'

const List = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      fetch(`${API_BASE_URL}/todos`)
        .then((res) => res.json())
        .then((data) => data)
  })

  console.log(data)

  return (
    <div>
      {isLoading
        ? 'Loading...'
        : isError
        ? 'Error'
        : data.map((todo: ITodo) => <Todo key={todo.id} todo={todo} />)}
    </div>
  )
}

export default List
