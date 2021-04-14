import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {

    handleSubmit = () => {
        return <Redirect to="/main" />
    }

    render() {
        return (
            <div className='login'>
                <form>
                    <input type="text" placeholder="Login" /><br/>
                    <input type="password" placeholder="Password" /><br/>
                    <Link to="/main"><input id="login" type="submit" value="ВОЙТИ" /></Link>
                </form>
            </div>
        );
    }
}

export default Login;