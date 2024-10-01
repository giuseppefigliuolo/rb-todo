import { useState } from 'react'
import { Button, IconButton, Paper, Stack, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_BASE_URL } from '../../config'
import {
  Done as DoneIcon,
  DoNotDisturb as DoNotDisturbIcon
} from '@mui/icons-material'

export interface ITodo {
  id: string
  title: string
  description?: string
  completed: boolean
}

const Todo = ({ todo }: { todo: ITodo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputTitle, setInputTitle] = useState(todo.title)
  const [inputDescription, setInputDescription] = useState(
    todo.description || ''
  )

  const queryClient = useQueryClient()

  const deleteTodo = useMutation({
    mutationFn: () => {
      return fetch(`${API_BASE_URL}/todos/${todo.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const editTodo = useMutation({
    mutationFn: (toggleCompletion?: boolean) => {
      return fetch(`${API_BASE_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: inputTitle,
          description: inputDescription,
          completed: toggleCompletion ? !todo.completed : todo.completed,
          id: todo.id
        })
      })
    },
    onSuccess: () => {
      setIsEditing(false)
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  return (
    <Paper
      className={`cursor-pointer ${
        todo.completed ? '!bg-indigo-500 opacity-80' : ''
      }`}
    >
      <div className="items-center mx-auto my-2 p-6 flex justify-between">
        {isEditing ? (
          <>
            <div className="w-full max-w-[680px]">
              <div className="w-full">
                <TextField
                  label="Title"
                  variant="outlined"
                  value={inputTitle}
                  onChange={(val) => setInputTitle(val.target.value)}
                  size="small"
                  className="w-full"
                />
              </div>
              <div className="mt-4">
                <TextField
                  label="Description"
                  value={inputDescription}
                  variant="outlined"
                  onChange={(val) => setInputDescription(val.target.value)}
                  multiline
                  rows={3}
                  className="w-full"
                />
              </div>
              <div className="mt-4 flex flex-row-reverse">
                <Button
                  variant="contained"
                  onClick={() => editTodo.mutate(false)}
                  style={{ minWidth: '100px' }}
                  disabled={inputTitle.length === 0}
                >
                  Save
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Stack direction="row" justifyContent="space-between">
            <div>
              <h3
                className={`font-bold capitalize ${
                  todo.completed ? 'line-through' : ''
                }`}
              >
                {todo.title}
              </h3>
              <p
                className={`font-light ${todo.completed ? 'line-through' : ''}`}
              >
                {todo.description}
              </p>
            </div>
          </Stack>
        )}
        <div>
          <IconButton
            aria-label="done"
            color="primary"
            onClick={() => editTodo.mutate(true)}
          >
            {todo.completed ? <DoNotDisturbIcon /> : <DoneIcon />}
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => setIsEditing(!isEditing)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => deleteTodo.mutate()}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  )
}

export default Todo
