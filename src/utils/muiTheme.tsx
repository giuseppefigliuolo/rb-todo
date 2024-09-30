import { createTheme } from '@mui/material'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const twColors = resolveConfig(tailwindConfig).theme.colors

const theme = createTheme({
  palette: {
    primary: {
      main: twColors.primaryLight
    }
  },
  typography: {
    fontFamily: 'inherit !important'
  }
})

export default theme
