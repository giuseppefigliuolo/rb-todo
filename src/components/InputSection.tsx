import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { API_BASE_URL } from '../../config'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const InputSection = () => {
  const [value, setValue] = useState('')

  const queryClient = useQueryClient()

  const addTodo = useMutation({
    mutationFn: () => {
      return fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: value,
          completed: false,
          description: '',
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
    <div>
      <TextField
        variant="outlined"
        value={value}
        onChange={(val) => setValue(val.target.value)}
      />
      <Button variant="contained" onClick={() => addTodo.mutate()}>
        Add
      </Button>
    </div>
  )
}

export default InputSection
