import { Link } from 'react-router-dom'
import './Menu.scss'

function Menu() {
    return (
        <div className="menu">
            <ul>
                <li>
                    <div className="logo">InstaGit</div>
                </li>
                <li>
                    <Link to="/home" className="menu-item">
                        <i className="bi bi-house-fill" />
                        Página Inicial
                    </Link>
                </li>
                <li>
                    <Link to="/search" className="menu-item">
                        <i className="bi bi-search" />
                        Pesquisar
                    </Link>
                </li>
                <li>
                    <div className="menu-item">
                        <i className="bi bi-box-arrow-left" />
                        Sair
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Menu