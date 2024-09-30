import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../../config.ts'

const List = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      fetch(`${API_BASE_URL}/todos`)
        .then((res) => res.json())
        .then((data) => data)
  })

  return (
    <div>
      {isLoading
        ? 'Loading...'
        : isError
        ? 'Error'
        : data.map((todo: any) => <div key={todo.id}>{todo.title}</div>)}
    </div>
  )
}

export default List
