import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../../config.ts'
import Todo, { ITodo } from './Todo.tsx'
import { Skeleton } from '@mui/material'

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
      {isLoading ? (
        <div className="mt-5">
          {[...Array(6).keys()].map((el) => (
            <Skeleton
              key={el}
              variant="rectangular"
              width="100%"
              height={50}
              classes={{ root: 'mt-6' }}
            />
          ))}
        </div>
      ) : isError ? (
        'Error'
      ) : (
        data.map((todo: ITodo) => <Todo key={todo.id} todo={todo} />)
      )}
    </div>
  )
}

export default List
