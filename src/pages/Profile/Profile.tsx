import './Profile.scss'

import Menu from '../../components/Menu/Menu'
import { useFollowingQuery } from '../../hooks/useFollowingQuery'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserQuery } from '../../hooks/useGetUserQuery'
import RoundImage from '../../components/RoundImage/RoundImage'
import { useGetReposQuery } from '../../hooks/useGetReposQuery'
import { useFollowersQuery } from '../../hooks/useFollowersQuery'
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import ModalResumeProfile from '../../components/ModalResumeProfile/ModalResumeProfile'
import { getStorage } from '../../helpers/store'

function Profile() {

    const params = useParams() || { login: '' }
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState('')
    const [followerIndex, setFollowerIndex] = useState(0)
    const [isFollowing, setIsFollowing] = useState(false)
    const { data: dataUser } = useGetUserQuery(params.login!)
    const { data: dataRepos } = useGetReposQuery(params.login!)
    const { data: dataFollowers } = useFollowersQuery(params.login!)
    const { data: dataFollowing } = useFollowingQuery(params.login!)
    // Verifica se está seguindo
    const logged = getStorage('logged')
    const { data: loggedFollowing } = useFollowingQuery(logged.login!)

    useEffect(() => {
        if (dataFollowers && dataFollowers.length) {
            const rand = Math.floor(Math.random() * dataFollowers.length)
            setFollowerIndex(rand)
        }
        if (dataUser && loggedFollowing && loggedFollowing.length) {
            setIsFollowing(false)
            loggedFollowing.map((item: any) => {
                if (item.login == dataUser.login) {
                    setIsFollowing(true)
                }
            })
        }
    }, [dataFollowers, params])

    function navigateProfile(user_login: string) {
        setShowModal(false)
        navigate(`/profile/${user_login}`)
    }

    function showPhoto(url: string) {
        setSelectedPhoto(url)
        setShowModal(true)
    }

    return (
        <div className="container profile">
            <div className="left">
                <Menu />
            </div>
            <div className="right">
                <div className="profile-view">
                    {dataUser && (
                        <div className="profile-header">
                            <div className="user-image">
                                <RoundImage url={dataUser.avatar_url} size="xl" />
                            </div>
                            <div className="user-info">
                                <div className="top-buttons">
                                    <div className="user-name">
                                        {dataUser.login}
                                    </div>
                                    {isFollowing && (
                                        <button>Seguindo</button>
                                    )}
                                    {!isFollowing && (
                                        <button className="blue">
                                            Seguir
                                            <i className="bi bi-chevron-down" />
                                        </button>
                                    )}
                                    <button>Enviar Mensagem</button>
                                    <button><i className="bi bi-person-add" /></button>
                                    <i className="bi bi-three-dots" />
                                </div>
                                <div className="top-numbers">
                                    <div className="item">
                                        <b>{dataRepos && dataRepos.length}</b>
                                        Repositórios
                                    </div>
                                    <div className="item">
                                        <b>{dataFollowers && dataFollowers.length}</b>
                                        Seguidores
                                    </div>
                                    <div className="item">
                                        <b>{dataFollowing && dataFollowing.length}</b>
                                        Seguindo
                                    </div>
                                </div>
                                <div className="user-data">
                                    <b>{dataUser.name}</b>
                                    <a href={dataUser.url} target="_blank">{dataUser.url}</a>
                                    <a href={dataUser.blog} target="_blank">{dataUser.blog}</a>
                                </div>
                                <div className="follower-by">
                                    {dataFollowers && dataFollowers[followerIndex] && (
                                        <div>
                                            <span>Seguido(a) por</span>
                                            <b onClick={() => navigateProfile(dataFollowers[followerIndex].login)}>
                                                {dataFollowers[followerIndex].login}
                                            </b>
                                            {dataFollowers.length > 1 &&
                                                <span>e mais {dataFollowers.length - 1} pessoas</span>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="list-repos">
                        {dataRepos && dataRepos.map((item: any, i: number) => (
                            <div className="item" key={item.name} onClick={() => showPhoto(`https://picsum.photos/300?random=${i}`)}>
                                <img src={`https://picsum.photos/300?random=${i}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={showModal} className="profile-modal">
                <div className="profile-modal-header">
                    <i className="bi bi-x" onClick={() => setShowModal(false)} />
                </div>
                {dataUser && (
                    <div className="profile-modal-body">
                        <ModalResumeProfile user={dataUser} url={selectedPhoto} close={() => setShowModal(false)} />
                    </div>
                )}
            </Modal>

        </div>
    )
}

export default Profile