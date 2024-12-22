import { useNavigate } from 'react-router-dom'
import './ModalResumeProfile.scss'
import { useGetUserQuery } from '../../hooks/useGetUserQuery'
import { useGetReposQuery } from '../../hooks/useGetReposQuery'
import { useFollowingQuery } from '../../hooks/useFollowingQuery'
import { useEffect, useState } from 'react'
import { getStorage, setStorage } from '../../helpers/store'
import RoundImage from '../RoundImage/RoundImage'

function ModalResumeProfile({ user, url, close }: any) {

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
        if (close) { close() }
        navigate(`/profile/${user}`)
    }

    function changeLike() {
        if (dataUser) {
            const logged = getStorage('logged')
            if (!(logged.likes instanceof Object)) logged.likes = {}
            logged.likes[dataUser.login] = !logged.likes[dataUser.login]
            setLiked(logged.likes[dataUser.login])
            setStorage('logged', logged)
        }
    }

    return (
        <div>
            {dataUser && (
                <div className="modal-resume-profile">
                    <div className="modal-resume-profile-left">
                        <img src={url} />
                    </div>
                    <div className="modal-resume-profile-right">
                        <div className="modal-user-header" onClick={() => navigateProfile(dataUser.login)}>
                            <RoundImage url={dataUser.avatar_url} size="xs" />
                            <div>
                                <b>{dataUser.login}</b>
                                <span>{dataUser.name}</span>
                            </div>
                        </div>
                        <div className="modal-user-body">
                            <b className="item">
                                Repositórios:
                            </b>
                            {dataRepos && dataRepos.map((item: any) => (
                                <div className="item" key={item.name}>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                        <div className="modal-user-footer">
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
                                                <b onClick={() => navigateProfile(dataFollowers[0].login)}>
                                                    {dataFollowers[0].login}
                                                </b>
                                                {dataFollowers.length > 1 &&
                                                    <span> e mais {dataFollowers.length - 1} pessoas</span>
                                                }
                                            </span>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalResumeProfile