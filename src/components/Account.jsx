import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Import your Firebase storage instance
import { db } from '../context/AuthContext'; // Assuming you have db access in the context
import { collection, query, getDocs, orderBy, limit, addDoc } from 'firebase/firestore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {GoogleGenerativeAI} from '@google/generative-ai'
import { getBase64 } from '../imageHelper';

const genAI = new GoogleGenerativeAI('AIzaSyD5QLk3eGBktuNXGwURuBnd4b1cPRo-cHs');
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });


const Account = () => {
  const { user, logout, addDownloadURL, patients } = UserAuth();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileType, setFileType] = useState('test'); // Default to 'test'
  const [expandedImages, setExpandedImages] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [selectedPatientTests, setSelectedPatientTests] = useState([]);
  const [selectedPatientPrescriptions, setSelectedPatientPrescriptions] = useState([]);
  const [image, setImage] = useState('');
  const [imageInineData, setImageInlineData] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch tests and prescriptions for the logged-in user
        const testsRef = collection(db, 'patients', user.uid, 'tests');
        const testsSnapshot = await getDocs(testsRef);
        const testsData = testsSnapshot.docs.map(doc => doc.data());
        setTests(testsData);

        const prescriptionsRef = collection(db, 'patients', user.uid, 'prescriptions');
        const prescriptionsSnapshot = await getDocs(prescriptionsRef);
        const prescriptionsData = prescriptionsSnapshot.docs.map(doc => doc.data());
        setPrescriptions(prescriptionsData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [user.uid]);

  // Function to fetch tests and prescriptions for a selected patient
  const fetchPatientData = async () => {
    try {
      const testsRef = collection(db, 'patients', patientId, 'tests');
      const testsSnapshot = await getDocs(testsRef);
      const testsData = testsSnapshot.docs.map(doc => doc.data());
      setSelectedPatientTests(testsData);

      const prescriptionsRef = collection(db, 'patients', patientId, 'prescriptions');
      const prescriptionsSnapshot = await getDocs(prescriptionsRef);
      const prescriptionsData = prescriptionsSnapshot.docs.map(doc => doc.data());
      setSelectedPatientPrescriptions(prescriptionsData);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };


  const handleToggleChange = (event) => {
    setFileType(event.target.value);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      const folder = fileType === 'test' ? 'tests' : 'prescriptions';
      try {
        // Upload the file to Firebase Storage
        const storageRef = ref(storage, `users/${user.uid}/${folder}/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        
        // Add the file data to Firestore with a timestamp as document ID
        const docRef = await addDoc(collection(db, 'patients', user.uid, folder), {
          downloadURL,
          fileName: selectedFile.name,
          timestamp: new Date().getTime() // Add current timestamp as document ID
        });

        console.log('File uploaded successfully. Document ID:', docRef.id);
        
        // Update the UI to reflect the newly uploaded file
        if (folder === 'tests') {
          setTests(prevTests => [...prevTests, { downloadURL, fileName: selectedFile.name }]);
        } else {
          setPrescriptions(prevPrescriptions => [...prevPrescriptions, { downloadURL, fileName: selectedFile.name }]);
        }

        // Clear selected file after upload
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleImageClick = (index, type) => {
    const updatedExpandedImages = [...expandedImages];
    updatedExpandedImages[index] = !updatedExpandedImages[index];
    if (type === 'tests') {
      setExpandedImages(updatedExpandedImages);
    } else {
      setExpandedImages(updatedExpandedImages);
    }
  };

  const handlePatientIdChange = (event) => {
    setPatientId(event.target.value);
  };

  const handleFetchPatientData = async () => {
    if (patientId) {
      try {
        // Fetch tests and prescriptions for the selected patient
        const testsRef = collection(db, 'patients', patientId, 'tests');
        const testsSnapshot = await getDocs(testsRef);
        const testsData = testsSnapshot.docs.map(doc => doc.data());
        setSelectedPatientTests(testsData);
  
        const prescriptionsRef = collection(db, 'patients', patientId, 'prescriptions');
        const prescriptionsSnapshot = await getDocs(prescriptionsRef);
        const prescriptionsData = prescriptionsSnapshot.docs.map(doc => doc.data());
        setSelectedPatientPrescriptions(prescriptionsData);
  
        // Store the patient ID, prescriptions, and tests in state
        setPatientId(patientId);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    } else {
      console.log('Please enter a patient ID.');
    }
  };
  

  // Configuration for react-slick carousel
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // Adjust the number of slides to show
    slidesToScroll: 1,
    draggable: true,
    focusOnSelect: true,
    rtl: true,
    responsive: [
        {
            breakpoint: 768, // Adjust the breakpoint as needed
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

 
  async function aiImageRun() {
    setLoading(true);
    setResponse('');
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([
        "If the photo is a test result, describe the provided images in detail give high or low according to the test parameters and recommand natural ways to keep it under control and give a conclusion of the analysis. If it's a prescription, describe the medicines give their side effects if any and provide with a natural alternative and present the output in a clean manner in english. Give a 50 word response", imageInineData
    ]);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
    setLoading(false);
}

const handleClick = async() => {
    aiImageRun();
    if (selectedFile) {
      setUploading(true);
      const folder = fileType === 'test' ? 'tests' : 'prescriptions';
      try {
        // Upload the file to Firebase Storage
        const storageRef = ref(storage, `users/${user.uid}/${folder}/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        
        // Add the file data to Firestore with a timestamp as document ID
        const docRef = await addDoc(collection(db, 'patients', user.uid, folder), {
          downloadURL,
          fileName: selectedFile.name,
          timestamp: new Date().getTime() // Add current timestamp as document ID
        });

        console.log('File uploaded successfully. Document ID:', docRef.id);
        
        // Update the UI to reflect the newly uploaded file
        if (folder === 'tests') {
          setTests(prevTests => [...prevTests, { downloadURL, fileName: selectedFile.name }]);
        } else {
          setPrescriptions(prevPrescriptions => [...prevPrescriptions, { downloadURL, fileName: selectedFile.name }]);
        }

        // Clear selected file after upload
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
}

const handleImageChange = (e) => {
    const file = e.target.files[0];
    // getting base64 from file to render in DOM
    setSelectedFile(file);
    getBase64(file)
        .then((result) => {
            setImage(result);
        })
        .catch(e => console.log(e))

    // generating content model for Gemini Google AI
    fileToGenerativePart(file).then((image) => {
        setImageInlineData(image);
    });
}

// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });

    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
}

  return (
    <div className='display'>
      <div className="right"><button onClick={handleLogout} className='border px-6 py-2 mt-4'>
        Logout
      </button>
      <h1 className='panacea'>PANACEA</h1> 
      <h1 className='account'>Account</h1></div> 
      <p className='userid'>User ID: {user && user.uid}</p>
      <p className='email'>User Email: {user && user.email}</p>

      {user && user.role==='patient' &&(
        <div>
          <div className='my-4'>
          <button onClick={(e)=>handleUpload(e)} className='border px-6 py-2 ml-4 choose' disabled={uploading || !selectedFile}>
          <div className="choosefile">
           <input type='file' onChange={(e)=>handleImageChange(e)} accept='image/*, .pdf' />
           </div>
           </button>
           
           
           
           
            <div>
              <label>
                <input type='radio' value='test' checked={fileType === 'test'} onChange={handleToggleChange} /> Medical Test
              </label>
              <label>
                <input type='radio' value='prescription' checked={fileType === 'prescription'} onChange={handleToggleChange} /> Prescription
              </label>
            </div>
            <button onClick={handleUpload} className='border px-6 py-2 ml-4 upload' disabled={uploading || !selectedFile}>
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
                    <button className='border px-6 py-2 ml-4 explain' onClick={() => handleClick()}>Explain</button>
                
          </div>
        

          <div className='medtests'>
            <h2>Medical Tests</h2>
            <Slider {...sliderSettings} className='image-slider'>
            {tests.map((test, index) => (
  <div key={index}>
    <a href={test.downloadURL} target="_blank" rel="noopener noreferrer">
      <img 
        src={test.downloadURL} 
        alt={`Test ${index + 1}`} 
        className={'slider-image'}
        onClick={() => handleImageClick(index, 'tests')}
      />
    </a>
  </div>
))}

            </Slider>
          </div>
          {
                loading === true && (aiResponse === '') ?
                    <p style={{ margin: '30px 0' }}>Loading ...</p>
                    :
                    <div style={{ margin: '30px 0' }}>
                        <p>{aiResponse}</p>
                    </div>
            }
          <div className='presc'>
            <h2>Prescriptions</h2>
            <Slider {...sliderSettings} className='image-slider'>
            {prescriptions.map((prescription, index) => (
  <div key={index}>
    <a href={prescription.downloadURL} target="_blank" rel="noopener noreferrer">
      <img 
        src={prescription.downloadURL} 
        alt={`Prescription ${index + 1}`} 
        className={'slider-image'}
        onClick={() => handleImageClick(index, 'prescriptions')}
      />
    </a>
  </div>
))}

            </Slider>
          </div>
        </div>
      )}

      {user && user.role==='doctor' &&(
        <div>
          <input type='text' placeholder='Enter Patient ID' value={patientId} onChange={handlePatientIdChange} />
          <button onClick={handleFetchPatientData}>Fetch Patient Data</button>
          
          <div>
            <h2>Medical Tests (Patient)</h2>
            <Slider {...sliderSettings}>
            {selectedPatientTests.map((test, index) => (
  <div key={index}>
    <a href={test.downloadURL} target="_blank" rel="noopener noreferrer">
      <img 
        src={test.downloadURL} 
        alt={`Test ${index + 1}`} 
        className={expandedImages[index] ? 'expanded' : ''}
        onClick={() => handleImageClick(index, 'tests')}
      />
    </a>
  </div>
))}

            </Slider>
          </div>

          <div>
            <h2>Prescriptions (Patient)</h2>
            <Slider {...sliderSettings}>
            {selectedPatientPrescriptions.map((prescription, index) => (
  <div key={index}>
    <a href={prescription.downloadURL} target="_blank" rel="noopener noreferrer">
      <img 
        src={prescription.downloadURL} 
        alt={`Prescription ${index + 1}`} 
        className={expandedImages[index] ? 'expanded' : ''}
        onClick={() => handleImageClick(index, 'prescriptions')}
      />
    </a>
  </div>
))}

            </Slider>
          </div>
        </div>
      )}
     <div className='footer-menu'>
            <h1>PANACEA</h1>
            <ul className='footer-inner-nav'>
                    <li><a href="#login">Sign In</a></li>
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
  );
};

export default Account;
