import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import  { GoogleLogin } from 'react-google-login'
import Google from './google'



export default function Login() {
    const [user, setUser] = useState({
        email:'', password:''
    })
  
    const [err, setErr] = useState('')

    const onChangeInput = e =>{
        const {name, value} = e.target;

        setUser({...user, [name]:value})
        setErr('')
    }

    const loginSubmit = async (e) =>{
        e.preventDefault()
        try {
            await axios.post('/user/login', {...user})
           
            localStorage.setItem('firtLogin', true)

            window.location.href = "/";
        } catch (err) {
            setErr(err.response.data.msg)
        }
    }

    // const responseGoogle=async (e)=>{
    //     e.preventDefault()
    //     try {
    //         await axios.post('/user/google-signin', {...user})
           
    //         localStorage.setItem('firtLogin', true)

    //         window.location.href = "/";
    //     } catch (err) {
    //         setErr(err.response.data.msg)
    //     }
       
    // }
    
    return (
        <div className="login-page">
            {err && <h3>{err}</h3>}
            
            <div className="card card-container">
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <form onSubmit={loginSubmit}>
                <h2 className="text-center">Login</h2>
                <input type="email" name="email" required placeholder="Email" 
                value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required placeholder="Password"
                value={user.password} onChange={onChangeInput}
                autoComplete="on" />

                <div className="row">
                    <button type="submit" >Login</button>
                    <Link to="/register">Register</Link>
                </div>
               
                {/* <GoogleLogin 
                clientId="35746752649-8gulr2l93p5lmn3imql443bs9c3ehe86.apps.googleusercontent.com"
                buttontext="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                 cookiePolicy={'single_host_origin'}
                /> */}
            </form>
            <div className="text-center"> 
            Or want to sign in with Google Account?<br></br><br></br>
                <Google /></div>
            </div>
        </div>
    )
}
