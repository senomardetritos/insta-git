import { useNavigate } from 'react-router-dom'
import { useFollowingQuery } from '../../hooks/useFollowingQuery'
import { useGetReposQuery } from '../../hooks/useGetReposQuery'
import { useGetUserQuery } from '../../hooks/useGetUserQuery'
import RoundImage from '../RoundImage/RoundImage'
import './CardFriend.scss'
import { useEffect, useState } from 'react'
import { getStorage, setStorage } from '../../helpers/store'

function CardFriend({ user, onShowOptions, onShowRepos }: any) {

    const navigate = useNavigate()

    const { data: dataUser } = useGetUserQuery(user.login)
    const { data: dataRepos } = useGetReposQuery(user.login)
    const { data: dataFollowers } = useFollowingQuery(user.login)

    const [liked, setLiked] = useState<any>({})

    useEffect(() => {
        const logged = getStorage('logged')
        if (dataUser) {
            setLiked(logged && logged.likes && logged.likes[dataUser.login])
        }
    }, [dataUser])

    function navigateProfile(user: any) {
        navigate(`/profile/${user}`)
    }

    function changeLike() {
        const logged = getStorage('logged')
        if (!(logged.likes instanceof Object)) logged.likes = {}
        logged.likes[dataUser.login] = !logged.likes[dataUser.login]
        setLiked(logged.likes[dataUser.login])
        setStorage('logged', logged)
    }

    return (
        <div className="card-friend">
            <div className="card-header">
                <div className="user-image" onClick={() => navigateProfile(dataUser.login)}>
                    <RoundImage url={user.avatar_url} size="xs" />
                </div>
                <div className="user-name" onClick={() => navigateProfile(dataUser.login)}>
                    <div className="login">{user.login}</div>
                    <div className="name">{dataUser?.name}</div>
                </div>
                <div className="user-options">
                    <i className="bi bi-three-dots" onClick={() => onShowOptions(user)} />
                </div>
            </div>
            <div className="card-body">
                <img src={user.avatar_url} onClick={() => onShowRepos(user)} />
            </div>
            <div className="card-footer">
                <div className="options">
                    {liked ?
                        (<i className="bi bi-heart-fill" onClick={() => changeLike()} />) :
                        (<i className="bi bi-heart" onClick={() => changeLike()} />)
                    }
                    <i className="bi bi-journal-code" />
                    {dataRepos && dataRepos.length}
                </div>
                <div className="followers">
                    Seguido(a) por
                    {(dataFollowers) &&
                        (
                            <span className="list-followers">
                                <b onClick={() => navigateProfile(dataFollowers[0].login)}>{dataFollowers[0].login}</b>
                                {dataFollowers.length > 1 &&
                                    <span> e mais {dataFollowers.length - 1} pessoas</span>
                                }
                            </span>
                        )}
                </div>
                <div className="repos" onClick={() => onShowRepos(user)}>
                    <b>{user.login}</b>
                    <span className="list-repos">
                        {dataRepos && dataRepos.map((item: any, i: number) => (
                            <span key={i}>
                                {
                                    i < 5 && (
                                        <span className="repos-item">
                                            {item.name}
                                            {i < 4 && i < dataRepos.length - 1 && (<span>, </span>)}
                                        </span>)
                                }
                            </span>
                        ))}
                        {dataRepos && dataRepos.length > 4 && (
                            <span>...</span>
                        )}
                    </span>
                </div>
            </div>
        </div >
    )
}

export default CardFriend