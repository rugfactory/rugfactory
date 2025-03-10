import { NEAR_LOGIN } from './components/user_login_button.jsx';
import { useEffect, useState } from 'react';
import { NetworkId } from './config.js';
import { NearContext, Wallet } from '@/wallets/near';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Wallet instance
const wallet = new Wallet({ networkId: NetworkId });

function App() {
  const [signedAccountId, setSignedAccountId] = useState(null);

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <BrowserRouter>
        <NEAR_LOGIN />
        <Routes>
          <Route path="/" element={<div>Welcome to RugFactory</div>} />
        </Routes>
      </BrowserRouter>
    </NearContext.Provider>
  )
}

export default App;
