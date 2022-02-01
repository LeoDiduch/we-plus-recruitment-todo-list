import React, {useState} from "react";
import PropTypes from "prop-types";


async function loginUser(credentials) {
    return fetch('https://test1.quadra-informatique.fr/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json());
}

export default function Login({ setToken }) {
    /**
     * Initial State
     */
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const handleConnect = async e => {
        e.preventDefault();
        const token = await loginUser({
            login,
            password
        });
        if(typeof token === 'object') {
            setToken(token)
        } else alert(token)

    }

    return (
        <div className="login-wrapper">
            <h1>Connexion à votre compte</h1>
            <form className="login-form" onSubmit={handleConnect}>
                <label>
                    <p className="login-form-label">Utilisateur :</p>
                    <input className="login-form-input" type="text" onChange={event => setLogin(event.target.value)} placeholder="Saisir l'identifiant"/>
                </label>
                <label>
                    <p className="login-form-label">Mot de passe :</p>
                    <input className="login-form-input" type="password" onChange={event => setPassword(event.target.value)} placeholder="Saisir le mots de passe"/>
                </label>
                <div>
                    <button className="login-button" type="submit">Connect</button>
                </div>
            </form>
        </div>

    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}