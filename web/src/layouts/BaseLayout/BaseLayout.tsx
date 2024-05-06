import { Link, routes } from '@redwoodjs/router'

type BaseLayoutProps = {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <header>
        <Link to={routes.home()}>Wishing Well</Link>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Wishing Well</p>
        <a
          href="https://github.com/clayjens/wishing-well"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </footer>
    </>
  )
}

export default BaseLayout
