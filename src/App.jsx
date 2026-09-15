import {useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import WalletSetup from './pages/WalletSetup';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import { MerchantProvider, useMerchant, } from './auth/MerchantContext.jsx';
import MagicLink from './pages/Confirmation_page';
import Onboarding from './pages/Onboarding.jsx';
import Signin from './pages/Signin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ConnectWallet from './pages/ConnectWallet.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PayEscrow from './pages/PayEscrow.jsx';
import Receipt from './pages/Receipt.jsx';
import AuthCallback from './auth/Callback.jsx';
import PaymentLink from './components/PaymentLink.jsx';
import SendTransaction from './components/SendTransaction.jsx';
import Transactions from './pages/Transactions.jsx';
//import WalletChecker from './components/WalletChecker';

function App() {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth >= 768);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
	return (
		<div id ="container_div">
		
            <MerchantProvider>			
			<Routes>
				<Route path="/signup/wallet-setup" element={<WalletSetup />} />
				<Route path="/" element={ <Home /> } />
				<Route path="/signup" element={ <Signup /> } />
				<Route path="/signup/confirmation" element={ <MagicLink /> } />
				<Route path="/signup/complete_signup" element={ <Onboarding /> } />
				<Route path="/login" element={ <Signin /> } />
				<Route path="/connect_wallet" element={ <ConnectWallet /> } />
				<Route path="/dashboard" element={
				<ProtectedRoute>	
					<Dashboard isOpen={isOpen} toggle={toggle}/> 
				</ProtectedRoute>}
				/>
				<Route path="/pay/:invoiceId" element={ <PayEscrow /> } />
				<Route path="/pay/receipt" element={ <Receipt /> } />
				<Route path="/auth/callback" element={ <AuthCallback /> } />
                <Route path="/send" element={ <SendTransaction isOpen={isOpen } toggle={toggle} /> } />
                <Route path="/generate-link" element={ <PaymentLink isOpen={isOpen} toggle={toggle} /> } />
                <Route path="/transactions" element={ <Transactions isOpen={isOpen} toggle={toggle} /> } />
			</Routes>
            </MerchantProvider>
		</div>
	);
}


export default App;
