import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='snake'>
            <div className='pic'>
                <img src="snakeimg.png" alt="" />
                <h1>Knowledge Grow Your Influence</h1>
            </div>
            <div className='footer-text'>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis quaerat in error, pariatur optio dolorum corporis dolore maiores suscipit. Quam.</p>
                <a href="/">Get Started</a>
            </div>
        </div>
        <div className='newsletter'>
            <div className='news-left'>
                <h4>Subscribe</h4>
                <h1>Subscribe To Get <br/> The Latest <br />Updates From Us</h1>
                <span className='curve'><img src="curve.png" alt="" /></span>
            </div>
            <div className='news-right'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia explicabo exercitationem quis consequuntur voluptas nihil.</p>
                <form action="">
                    <input type="email" name='email' />
                    <button>Subscribe</button>
                </form>
            </div>
        </div>
        <div className='footer-menu'>
            <h1>PANACEA</h1>
            <ul className='footer-inner-nav'>
                    <li><a href="#login">Log In</a></li>
                    <li><a href="#signup">Sign Up</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                    <li><a href="#help">Help Desk</a></li>
            </ul>
        </div>
        <hr />
        <div>
            <p className='text-center'>&#169; Copyright 2024-2029 | All Right Reserved |</p>
        </div>
    </div>
  )
}

export default Footer