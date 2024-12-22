import './Search.scss'
import Menu from "../../components/Menu/Menu"
import RightProfile from "../../components/RightProfile/RightProfile"
import { useState } from 'react'
import { getStorage } from '../../helpers/store'
import RoundImage from '../../components/RoundImage/RoundImage'
import { useNavigate } from 'react-router-dom'

function Search() {

    const navigate = useNavigate()
    const [userSearch, setUserSearch] = useState('')
    const [userFinded, setUserFinded] = useState<any>()

    function search(e: any) {
        if (e.code == 'Enter') {
            const data = getStorage(`getUser${userSearch}`)
            if (data && data.login) {
                setUserFinded(data)
            } else {
                setUserFinded({
                    error: 'Usuário não encontrado'
                })
            }
        }
    }

    function clearSearch() {
        setUserFinded(null)
        setUserSearch('')
    }

    function navigateProfile(user: string) {
        navigate(`/profile/${user}`)
    }

    return (
        <div className="container search">
            <div className="left">
                <Menu />
            </div>
            <div className="center">
                <h2>Pesquisar Amigos</h2>
                <div className="search-input">
                    <input
                        name="search"
                        placeholder="Pesquisar Amigos"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        onKeyDown={(e) => search(e)}
                    />
                    {userSearch && (
                        <div className="btn-close">
                            <i className="bi bi-x" onClick={() => clearSearch()} />
                        </div>
                    )}
                    <span>Pressione enter para pesquisar ( Pesquisa feita apenas nos usuários salvos no localStorage )</span>
                </div>
                <div className="result">
                    {userFinded && userFinded.login && (
                        <div className="user">
                            <div className="user-image" onClick={() => navigateProfile(userFinded?.login)}>
                                <RoundImage url={userFinded?.avatar_url} size="sm" />
                            </div>
                            <div className="user-name" onClick={() => navigateProfile(userFinded?.login)}>
                                <div className="login">{userFinded?.login}</div>
                                <div className="name">{userFinded?.name}</div>
                            </div>
                        </div>
                    )}
                    {userFinded && userFinded.error && (
                        <div className="error">{userFinded.error}</div>
                    )}
                </div>
            </div>
            <div className="right">
                <RightProfile />
            </div>
        </div>
    )
}

export default Search