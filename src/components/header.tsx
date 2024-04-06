import nlwUniteIcon from '../assets/nlw_unite-icon.svg'
import { NavLink } from './nav-link'

export function Header(){
  return(
    <div className='flex items-center gap-5 py-2'>
    <img src={nlwUniteIcon} alt="Logo" />

    <nav className='flex items-center gap-5'>
      <NavLink href="/eventos" className='font-medium text-sm text-zinc-300'>Eventos</NavLink>
      <NavLink href='/participantes'>Participantes</NavLink>
    </nav>
  </div>
  )
}