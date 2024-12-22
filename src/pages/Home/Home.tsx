import './Home.scss'

import Menu from '../../components/Menu/Menu'
import ListRoundFriend from '../../components/ListRoundFriend/ListRoundFriend'
import RightProfile from '../../components/RightProfile/RightProfile'
import { getStorage } from '../../helpers/store'
import { useFollowingQuery } from '../../hooks/useFollowingQuery'
import UserInterface from '../../interfaces/UserInterface'
import CardFriend from '../../components/CardFriend/CardFriend'
import Modal from '../../components/Modal/Modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalResumeProfile from '../../components/ModalResumeProfile/ModalResumeProfile'

function Home() {

    const navigate = useNavigate()

    const [userSelected, setUserSelected] = useState<any>()
    const [showModalOptions, setShowModalOptions] = useState(false)
    const [showModalRepos, setShowModalRepos] = useState(false)

    const logged = getStorage('logged')
    const { data } = useFollowingQuery(logged?.login)

    function showOptions(user: any) {
        setUserSelected(user)
        setShowModalOptions(true)
    }

    function showRepos(user: any) {
        setUserSelected(user)
        setShowModalRepos(true)
    }

    function navigateProfile() {
        navigate(`/profile/${userSelected.login}`)
    }

    return (
        <div className="container home">
            <div className="left">
                <Menu />
            </div>
            <div className="center">
                <ListRoundFriend />
                <div className="home-feed">
                    {data && data.map((item: UserInterface) => (
                        <div key={item.login}>
                            <CardFriend
                                user={item}
                                onShowOptions={(user: any) => showOptions(user)}
                                onShowRepos={(user: any) => showRepos(user)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="right">
                <RightProfile />
            </div>
            <Modal show={showModalOptions} className="options">
                <div className="options-header">
                    <h1>Selecione uma Opção</h1>
                    <i className="bi bi-x" onClick={() => setShowModalOptions(false)} />
                </div>
                <div className="options-body">
                    <div className="options-item" onClick={() => navigateProfile()}>
                        {userSelected && <div>Ver Perfil de {userSelected.login}</div>}
                    </div>
                    <div className="options-item" onClick={() => setShowModalOptions(false)}>
                        Cancelar
                    </div>
                </div>
            </Modal>

            <Modal show={showModalRepos} className="repos">
                <div className="repos-header">
                    <i className="bi bi-x" onClick={() => setShowModalRepos(false)} />
                </div>
                {userSelected && (
                    <div className="repos-body">
                        <ModalResumeProfile user={userSelected} url={userSelected.avatar_url} />
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default Home