import './ListRoundFriend.scss'
import { getStorage } from '../../helpers/store'
import { useFollowingQuery } from '../../hooks/useFollowingQuery'
import UserInterface from '../../interfaces/UserInterface'
import RoundImage from '../RoundImage/RoundImage'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ListRoundFriend() {

    const navigate = useNavigate()
    const [index, setIndex] = useState<number>(0)
    const logged = getStorage('logged')
    const { data } = useFollowingQuery(logged?.login)

    function navigateProfile(user_login: string) {
        navigate(`/profile/${user_login}`)
    }

    function moveList(to: number) {
        setIndex(index + to)
    }

    return (
        <div className="list-round-friend">
            {data && data.length && (
                <div>
                    {data.map((item: UserInterface, i: number) => {
                        if (i >= index && i < index + 6) {
                            return (
                                <div className="friend" key={item.login} onClick={() => navigateProfile(item.login)}>
                                    <div className="user-image">
                                        <RoundImage url={item.avatar_url} size="md" />
                                    </div>
                                    <div className="login">{item.login}</div>
                                </div>
                            )
                        }
                    })}
                    {index > 0 && (
                        <div className="btn-arrow-left" onClick={() => moveList(-1)}>
                            <i className="bi bi-arrow-left-circle-fill" />
                        </div>
                    )}
                    {data.length > 6 + index && (
                        <div className="btn-arrow-right" onClick={() => moveList(1)}>
                            <i className="bi bi-arrow-right-circle-fill" />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ListRoundFriend