import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import { useState, useEffect } from 'react';
import AuthCtx from './context/auth-context';
import { validateUser, logOut } from './requests/requests';

function App() {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(0);

  function login(token: string, userId: number) {
    setToken(token);
    setUserId(userId);
  }

  async function logout() {
    const logoutData: any = await logOut();
    setToken(logoutData.userId);
    setUserId(logoutData.token);
  }

  useEffect(() => {
    const validateLoggedIn = async () => {
      const data: any = await validateUser();

      setToken(data.userId);
      setUserId(data.userId);
    }

    validateLoggedIn();
  });

  return (
    <div className="App">
      <AuthCtx.Provider value={{ 
        token: token,
        userId: userId,
        login: login,
        logout: logout,
       }}>
        <Header />
        <Content />
        <Footer />
      </AuthCtx.Provider>
    </div>
  );
}

export default App;
