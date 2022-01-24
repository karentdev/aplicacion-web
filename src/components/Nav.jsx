import { Link } from "wouter"
import './Nav.css'

export function Nav() {
  return (
    <>
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/" className="enlace">Trámite</Link>
          </li>
          <li>
            <Link href="/mantenimiento" className="enlace">Mantenimiento</Link>
          </li>
          <li>
            <Link href="/personal" className="enlace">Personal</Link>
          </li>
          <li>
            <Link href="/cliente" className="enlace">Cliente</Link>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}