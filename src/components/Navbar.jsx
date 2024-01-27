import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false)

    useEffect (() => {
        const innernav = document.querySelector('.inner-nav')
        if(showNav === true){
            innernav.style.left = '0px'
        }
        else{
            innernav.style.left = '-300px'
        }
    }, [showNav])

    const handleClick = () => {
        setShowNav(!showNav)
    }
  return (
    <div className='navbar'>
        <div onClick={handleClick} className={`${showNav ? "hamburger1":"hamburger"}`}></div>
        <div className='logo'>
            <h1>PANACEA</h1>
            <nav className='menu'>
                <ul className='inner-nav'>
                <li><Link to="/Signin">Sign In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                    <li><a href='https://knowcodemap.vercel.app/'>Nearby Doctors</a></li>
                    <li><a href="#contact">Contact us</a></li>
                </ul>
            </nav>
        </div>
        
        <div className="topright"> 
            <p>HEALTH CARE AT YOUR FINGERTIPS.</p>
        </div>
        
      
    </div>
  )
}

export default Navbar