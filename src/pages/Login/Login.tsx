import './Login.scss'
import { useEffect, useState } from 'react'
import { useLoginMutation } from '../../hooks/useLoginMutation'
import { getStorage } from '../../helpers/store'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import Logo from 'src/vite.svg';

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
                <div className="card-title">
                    <img src='./vite.svg' width={50} height={50} />
                    <p>InstaGit</p>
                </div>
                <div className="form-control">
                    <label htmlFor="user">Digite seu usuário do GitHub</label>
                    <input value={userName} onChange={(e) => setUserName(e.target.value)} name="user" placeholder="Usuário do GitHub" />
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
                <div className="form-control">
                    <i>* Utilizaremos seu usuário do GitHub para acessar dados de perfil, seguindo e seguidores, projetos, entre outros. Todos os dados serão acessados a partir da API do GitHub. Somente dados públicos serão acessados.</i>
                </div>
            </div>
        </div>
    )
}

export default Login