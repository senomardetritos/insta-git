import { useEffect, useState } from 'react'
import RoundImage from '../RoundImage/RoundImage'
import './RightProfile.scss'
import { getStorage } from '../../helpers/store'
import UserInterface from '../../interfaces/UserInterface'
import { useNavigate } from 'react-router-dom'

function RightProfile() {

    const navigate = useNavigate()

    const [logged, setLogged] = useState<UserInterface>({
        login: '',
        name: '',
        avatar_url: ''
    })

    useEffect(() => {
        setLogged(getStorage('logged'))
    }, [])

    function logout() {
        navigate('/')
    }

    function navigateProfile() {
        navigate(`/profile/${logged.login}`)
    }

    return (
        <div className="right-profile">
            <div className="user-image" onClick={() => navigateProfile()}>
                <RoundImage url={logged?.avatar_url} size="sm"/>
            </div>
            <div className="user-name" onClick={() => navigateProfile()}>
                <div className="login">{logged?.login}</div>
                <div className="name">{logged?.name}</div>
            </div>
            <button onClick={() => logout()}>Sair</button>
        </div>
    )
}

export default RightProfile