import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ConnectWallet from './pages/ConnectWallet.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
//import WalletChecker from './components/WalletChecker';

function App() {
	return (
		<div id ="container_div">
		
			
			<Routes>
				<Route path="/" element={ <Home /> } />
				<Route path="/signup" element={ <Signup /> } />
				<Route path="/login" element={ <Signin /> } />
				<Route path="/connect_wallet" element={ <ConnectWallet /> } />
				<Route path="/dashboard" element={
				<ProtectedRoute>	
					<Dashboard /> 
				</ProtectedRoute>}
				/>
			</Routes>
		</div>
	);
}


export default App;
