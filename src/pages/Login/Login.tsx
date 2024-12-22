import './Login.scss'
import { useEffect, useState } from 'react'
import { useLoginMutation } from '../../hooks/useLoginMutation'
import { getStorage } from '../../helpers/store'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const { mutate, isPending, isError, error } = useLoginMutation()

    useEffect(() => {
        const data = getStorage('logged')
        if (data && data.login) setUserName(data.login)
    }, [])

    function login() {
        const data = getStorage('logged')
        if (data && data.login && data.login == userName) navigate('/home');
        else mutate(userName)
    }

    return (
        <div className="login-container">
            <div className="card">
                <div className="card-title">InstaGit</div>
                <div className="form-control">
                    <label htmlFor="user">Digite seu usuário do github</label>
                    <input value={userName} onChange={(e) => setUserName(e.target.value)} name="user" />
                </div>
                {isError && (
                    <div className="form-control">
                        {error && axios.isAxiosError(error) && (
                            <div className="error">{error?.response?.data.message}</div>
                        )}
                    </div>
                )}
                <div className="form-control">
                    <button onClick={login} disabled={isPending}>Entrar</button>
                </div>
            </div>
        </div>
    )
}

export default Login