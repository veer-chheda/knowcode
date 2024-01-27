import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase';

const UserContext = createContext();
const db = getFirestore();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const createUser = async (email, password, role) => {
    const authUser = await createUserWithEmailAndPassword(auth, email, password);
    const userCollection = role === 'doctor' ? 'doctors' : 'patients';
    try {
      await setDoc(doc(db, userCollection, authUser.user.uid), {
        email: authUser.user.email,
        role: role,
        // Add additional fields if needed
      });
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }

    try {
      await setDoc(doc(db, 'users', authUser.user.uid), {
        email: authUser.user.email,
        role: role,
        // Add additional fields if needed
      });
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }
    return authUser;
  };

  const addDownloadURL = async (userID, category, downloadURL, fileName) => {
    try {
      const patientRef = doc(db, 'patients', userID);
      const categoryRef = collection(patientRef, category);

      await addDoc(categoryRef, {
        downloadURL,
        fileName,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error adding download URL to Firestore:', error);
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Current user:', currentUser);
      const userRef = doc(db, 'users', currentUser.uid);
      var ROLE;
      try {
        const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          ROLE = userData.role
          console.log(userData.role)
        }
        catch(error) {
          console.error('Error fetching user document:', error);
          setUser(null);
        }

      setUser({...currentUser,role: ROLE});
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, addDownloadURL }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
export { db };
