import { NEAR_LOGIN } from './components/user_login_button.jsx';
import { NetworkToggleButton } from './components/network_toggle_button.jsx';
import { useEffect, useState } from 'react';
import { NetworkId } from './config.js';
import { NearContext, Wallet } from '@/wallets/near';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WelcomeSection } from './components/welcome_section';
import { TokenCreationSection } from './components/token_creation_section';
import { TokenListSection } from './components/token_list_section';
import TokenDeletionSection from './components/token_deletion_section';
import { FooterSection } from './components/footer_section';
import UserSection from './components/user_section';
import MessageSection from './components/message_section';

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
        <NetworkToggleButton />
        <Routes>
          <Route path="/" element={
            <>
              <WelcomeSection />
              <UserSection />
              <MessageSection />
              <TokenCreationSection />
              <TokenListSection />
              <TokenDeletionSection />
              <FooterSection />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </NearContext.Provider>
  )
}

export default App;
