import React from 'react'
import { Box, Link, Typography } from '@material-ui/core'

export default function Footer() {
	return (
    <Box p={2}>
      <Typography variant={'body2'} color={'textSecondary'} align={'center'} className={'footer'} gutterBottom={true}>
        {'Copyright © '}
        <Link color={'inherit'} href={''} target={'_blank'}>
          © 2002 / 2021 React. Todos Direitos Reservados.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
	)
}