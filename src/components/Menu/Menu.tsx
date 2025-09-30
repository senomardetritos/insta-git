import { Link, useNavigate } from 'react-router-dom'
import './Menu.scss'

function Menu() {

    const navigate = useNavigate()

    function logout() {
        navigate('/')
    }

    return (
        <div className="menu">
            <ul>
                <li>
                    <div className="logo">
                        <img src='./vite.svg' width={20} height={20} />
                        <p>InstaGit</p>
                    </div>
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
                    <div className="menu-item" onClick={() => logout()}>
                        <i className="bi bi-box-arrow-left" />
                        Sair
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Menu