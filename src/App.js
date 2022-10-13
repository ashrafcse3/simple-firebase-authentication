import './App.css';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const [user, setUser] = useState({});


  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  const handleSignInWithGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignInWithFB = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out successful');
        setUser({});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      {
        user.uid ?
          <button onClick={handleSignOut}>Sign out</button>
          :
          <div>
            <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
            <button onClick={handleSignInWithGithub}>Sign in with GitHub</button>
            <button onClick={handleSignInWithFB}>Sign in with facebook</button>
          </div>
      }

      {
        user.uid && <div>
          <h3>User email: {user.email}</h3>
          <p>Name: {user.displayName}</p>
          <img src={user.photoURL} alt="" />
        </div>
      }
      {
        user.uid || <div>
          <h3>Login with any upper authentication system</h3>
        </div>
      }
    </div>
  );
}

export default App;
