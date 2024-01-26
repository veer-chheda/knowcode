import React from 'react'

const FAQ = () => {
  return (
    <div className='faq'>
        <h1>Frequently Asked Questions</h1>
        <p>Have a question? We are here to help.</p>
        <section className='services'>
            <div className='service-right'>
                <div className='qa'>
                    <input type="checkbox" id='collapsible-head-1' />
                    <label for = "collapsible-head-1">Can doctors easily access my records using this platform?</label>
                    <div className='collapsible-text-1'>
                        <p>Yes, we have implemented a unique key system for each patient, ensuring that doctors have secure and consolidated access to their respective patients' records through our user-friendly platform.</p>
                    </div>
                </div>
                <div className='qa'>
                <input type="checkbox" id="collapsible-head-2" />
                <label for="collapsible-head-2">Can I monitor my health trends over time using the system?</label>
                <div class="collapsible-text-2">
                    <p>Yes, we utilize React-chart-js2 for data visualization, providing visually appealing and easy-to-understand graphs that enable you to monitor your health trends over time</p>
                </div>
                </div>
                <div className='qa'>
                    <input type="checkbox" id="collapsible-head-3" />
                    <label for="collapsible-head-3">How do I know my medical records are secure on this platform?</label>
                    <div class="collapsible-text-3">
                        <p>Your privacy is our priority. We use advanced security measures, including Google Cloud services like Firestore and Firebase, to ensure the safe storage of your medical records.</p>
                    </div>
                </div>
                <div className='qa'>
                    <input type="checkbox" id="collapsible-head-4" />
                    <label for="collapsible-head-4">What chain do txn support?</label>
                    <div class="collapsible-text-4">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit odit similique doloremque
                            ab unde. Placeat recusandae nobis voluptate atque, fugit itaque nam quos.</p>
                    </div>
                </div>
                <div className='qa'>
                    <input type="checkbox" id="collapsible-head-5" />
                    <label for="collapsible-head-5">What OS is TN compatible with?</label>
                    <div class="collapsible-text-5">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit odit similique doloremque
                            ab unde. Placeat recusandae nobis voluptate atque, fugit itaque nam quos.</p>
                    </div>
                </div>
                <div className='qa'>
                    <input type="checkbox" id="collapsible-head-6" />
                    <label for="collapsible-head-6">Is TXN safe to use?</label>
                    <div class="collapsible-text-6">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit odit similique doloremque
                            ab unde. Placeat recusandae nobis voluptate atque, fugit itaque nam quos.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default FAQ