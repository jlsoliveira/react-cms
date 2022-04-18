import React from 'react'
import { ThemeProvider } from '@material-ui/styles';
import { createTheme} from '@material-ui/core/styles'
import { ptBR } from '@material-ui/core/locale'
import Router from './router'
import Theme from './configs/theme'
import './App.css';

export default function App() {
  const themeConfig = createTheme(Theme, ptBR)

  return (
    <ThemeProvider theme={themeConfig}>
      <Router />
    </ThemeProvider>
  )
}