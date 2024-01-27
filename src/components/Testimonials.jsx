import React from 'react'
import {FcApproval} from "react-icons/fc"

const Testimonials = () => {
  return (
    <div className='testimonials'>
        <div className='testimonial-text'>
           
            <h1>Users love PANACEA</h1>
            
            <p>Trusted by world's top healthcare professionals. See what our users have to say. </p>
            <a href="/">Read all 1,273 reviews</a>
        </div>
        <div className='testimonial-cards'>
            <div className='card'>
                <img src="person1.png" alt="" />
                <p>Panacea has made it so simple for me to efficiently and conveniently access and analyze patient records. Great app! </p>
                <div className='icons'>
                    <a href="/">Dr. Alexa Jamil</a>
                    <FcApproval size={18} className='icon' />
                </div>
            </div>
            <div className='card'>
                <img src="person2.png" alt="" />
                <p>As someone with multiple health conditions, keeping track of my medical history was a nightmare. This web app has been a game-changer. It's like having a personal health assistant.</p>
                <div className='icons'>
                    <a href="/">Brandon Alvarez</a>
                    <FcApproval size={18} className='icon'/>
                </div>
            </div>
            <div className='card'>
                <img src="person3.png" alt="" />
                <p>Managing medical records for my family members was chaotic until I found this app! The ability to share records seamlessly with the concerned doctors ensures everyone gets the best care. It's a relief to have such a reliable tool in times of need.</p>
                <div className='icons'>
                    <a href="/">Jenna Wang</a>
                    <FcApproval size={18} className='icon'/>
                </div>
            </div>
            <div className='card'>
                <img src="person4.jpg" alt="" />
                <p> An invaluable resource for doctors and patients alike. The clear presentation of biomedical data fosters collaboration and improves patient understanding.</p>
                <div className='icons'>
                    <a href="/">Dr. Bob Clark</a>
                    <FcApproval size={18} className='icon'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonials