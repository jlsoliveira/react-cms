import * as React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { 
  Dashboard, 
  Email, 
  SupervisedUserCircle, 
  ShoppingCart,
  Shop,
  ViewCarousel 
} from '@material-ui/icons' 
import { Link } from 'react-router-dom'

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem 
        button 
        component={React.forwardRef(
          (props, ref) => (
            <Link to={to} {...props} ref={ref} />
          )
        )}
      > 
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

export default function MenuItems() {
  return (
    <div>
      <ListItemLink
        icon={<Dashboard />}
        primary={'Home'}
        to={'/'}
      />

      <ListItemLink
        icon={<ViewCarousel />}
        primary={'Banners'}
        to={'/banners'}
      />
      <ListItemLink
        icon={<Email />}
        primary={'Contatos'}
        to={'/contatos'}
      />
      <ListItemLink
        icon={<ShoppingCart />}
        primary={'Produtos'}
        to={'/produtos'}
      />
      <ListItemLink
        icon={<Shop />}
        primary={'Linha de Produtos'}
        to={'/linha-produto'}
      />
      <ListItemLink
        icon={<SupervisedUserCircle />}
        primary={'Usuários'}
        to={'/usuarios'}
      />
    </div>
  )
}