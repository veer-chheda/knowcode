import React,{useState, useEffect} from 'react'

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
                    <li><a href="#login">Log In</a></li>
                    <li><a href="#signup">Sign Up</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                    <li><a href="#help">Help Desk</a></li>
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