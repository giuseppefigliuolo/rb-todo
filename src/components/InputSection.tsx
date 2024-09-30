import { Button, Grid2 as Grid, Paper, TextField } from '@mui/material'
import { useState } from 'react'
import { API_BASE_URL } from '../../config'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const InputSection = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const queryClient = useQueryClient()

  const addTodo = useMutation({
    mutationFn: () => {
      return fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          completed: false,
          description,
          id: Math.random().toString(36).substring(2, 15)
        })
      })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  return (
    <Paper className="py-8 p-6">
      <div className="items-center mx-auto">
        <div className="">
          <div>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(val) => setTitle(val.target.value)}
              size="small"
              className="w-full"
            />
          </div>
          <div className="mt-2">
            <TextField
              label="Description"
              value={description}
              variant="outlined"
              onChange={(val) => setDescription(val.target.value)}
              size="small"
              multiline
              rows={3}
              className="w-full mt-2"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-row-reverse">
          <Button
            variant="contained"
            onClick={() => addTodo.mutate()}
            style={{ minWidth: '100px' }}
          >
            Add
          </Button>
        </div>
      </div>
    </Paper>
  )
}

export default InputSection
