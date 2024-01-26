import React from 'react'

const Section = () => {
  return (
    <div className='section'>
        <div className='inner-section'>
            <div className='section-text'>
                <h5>For Doctors</h5>
                <h1>Prefered by qualified healthcare providers.</h1>
                <p>The web application streamlines medical record management for healthcare providers. It securely centralizes patient data in the cloud, allowing easy access and real-time updates. With data visualization tools and telemedicine integration, it improves decision-making and boosts overall healthcare workflow efficiency.</p>
                <div className='button'><a href="/">Explore Now</a></div>
            </div>
            <div className='section-image'>
                <img src="cardpic.png" alt="" />
            </div>
        </div>
        <div className='card-section'>
            <div className='cards'>
                <div className='card'>
                    <img src="globe.png" alt="" />
                    <h1>Easy Account Registration</h1>
                    <p>Global banking made easy and available in 140+ countries</p>
                    <a href="/">learn &rarr;</a>
                </div>
                <div className='card'>
                    <img src="2.png" alt="" />
                    <h1>Easy Account Registration</h1>
                    <p>Global banking made easy and available in 140+ countries.</p>
                    <a href="/">learn &rarr;</a>
                </div>
                <div className='card'>
                    <img src="3.png" alt="" />
                    <h1>Easy Account Registration</h1>
                    <p>Global banking made easy and available in 140+ countries.</p>
                    <a href="/">learn &rarr;</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Section