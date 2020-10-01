import React, {useState, useContext} from 'react'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {GobalState} from '../../GobalState'

function Header() {
    const value = useContext(GobalState)
    const [isAdmin] = value.isAdmin
    const [isLogged] = value.isLogged
    const [cart] = value.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.post('/user/logout')
        localStorage.clear()
        window.location.href = "/"
    }

    const user = {
        display: isLogged ? 'inline-block' : 'none'
    }
    
    const admin = {
        display: isAdmin ? 'inline-block' : 'none'
    }

    const toggleMenu = () =>{
        setMenu(!menu)
    }

    // window.onscroll=function(){scrollFunction()};

    // function scrollFunction(){
    //     if (document.body.scrollTop>50 || document.documentElement.scrollTop>50){
    //         document.getElementById("header").className("ok");
    //     }
            
    //     }
    
   

    return (
      <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
  
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
       <h1><Link to="/" className="nav-link active"> {isAdmin ? 'Admin': 'Shopdeal'} <span className="sr-only">(current)</span></Link></h1> 
      </li>

      
    </ul>
    <ul className="nav justify-content-end">
                <li className="nav-item"><Link to="/" className="nav-link">{isAdmin ? 'Products': 'Shop'}</Link></li>
                
                <li style={admin} className="nav-item"><Link to="/create_product" className="nav-link">Create Products</Link></li>
                <li style={admin} className="nav-item"><Link to="/category" className="nav-link">Categories</Link></li>
               
                <li style={user} className="nav-item"><Link to="/history" className="nav-link">History</Link> </li>
                <li style={user} className="nav-item"><Link to="/" onClick={logoutUser} className="nav-link">Logout</Link> </li>
                                    
                <li style={{display: isLogged ? "none" : "inline-block"}} className="nav-item">
                    <Link to="/login" className="nav-link">Login/Register</Link>
                </li>
                
                <li onClick={toggleMenu}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
                
            </ul>

            <div className="cart-icon" style={{display: isAdmin ? "none" : "inline-block"}}>
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30"/>
                    </Link>
            </div>
  </div>
</nav>
 
          

</header>
       
    )
    }

export default Header
