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
                    <label for="collapsible-head-4">What technologies are used for biomedical data processing?</label>
                    <div class="collapsible-text-4">
                        <p>The solution utilizes Google Gemini AI for Optical Character Recognition (OCR) to extract and store biomedical data from medical records. This technology ensures accurate and efficient processing of medical information.</p>
                    </div>
                </div>
                <div className='qa'>
                    <input type="checkbox" id="collapsible-head-5" />
                    <label for="collapsible-head-5">What types of medical records can be stored in the cloud platform?</label>
                    <div class="collapsible-text-5">
                        <p>The solution supports the storage of diverse medical records, including diagnostic reports, prescriptions, imaging data, vaccination history, and other relevant healthcare documents.</p>
                    </div>
                </div>
                <div className='qa'>
                    <input type="checkbox" id="collapsible-head-6" />
                    <label for="collapsible-head-6">Can family members or caregivers access a patient's records with proper authorization?</label>
                    <div class="collapsible-text-6">
                        <p>Yes, the system can be configured to allow authorized family members or caregivers to access a patient's records. Strict authorization protocols are in place to protect patient privacy.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default FAQ