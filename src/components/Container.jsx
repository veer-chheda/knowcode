import React from 'react'

const Container = () => {
  return (
    <div>
        <div className='container'>
            <div className='text'>
                <h3>A HEALTH CARE HUB :</h3>
                <h1>PANACEA</h1>
                <p>Embark on a seamless journey towards holistic healthcare management with our cutting-edge solution. 
                Elevate your patient journey and streamline record-sharing among healthcare providers. 
                Welcome to a future where your health information is intelligently organized and readily available at your fingertips.</p>
                <div className='button'><a href="/">Explore Now &#8599;</a></div>
            </div>
            <div className='image'>
                <img src="3dimg.webp" alt="" />
            </div>
        </div>
        <div className='partners'>
            <span><img src="firebase.png" alt="" /></span>
            <span><img src="gemini.png" alt="" /></span>
            <span><img src="firestore.png" alt="" /></span>
            <span><img src="corsair.svg" alt="" /></span>
            <span><img src="emachines.png" alt="" /></span>
        </div>
    </div>
  )
}

export default Container