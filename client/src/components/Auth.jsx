import React, { useState } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div>
      {isLogin ? (
        <Login onSwitchToSignup={switchToSignup} />
      ) : (
        <Register onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default Auth; 