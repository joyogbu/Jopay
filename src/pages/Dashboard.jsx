import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCog, FaExchangeAlt, FaDollarSign, FaSignOutAlt, FaUser, FaBell } from 'react-icons/fa';
import { supabase } from '../lib/supabase.js';
import PaymentLink from '../components/PaymentLink.jsx';
import { MerchantProvider, useMerchant } from '../auth/MerchantContext.jsx';
import Footer from '../components/Footer.jsx';
import logo from '../images/logo2.png'

function DashboardHeader() {
  const {merchant} = useMerchant();
  return (
    <div id="dashboard_top_div">
	  <div id="logo_name" className="top_div">
	  	<div className="logo_div" id="logo">
	  		<img src={ logo } className="_logo" />

	  	</div>
	  </div>
	  <div className="top_div" id="notis">
	  	<span><FaBell /></span>
	  </div>
	  <div className="top_div" id="user_profile">
	  	<div id="profile_img">
	  		<FaUser />
	  	</div>
	  	<div id="profile_name">
	  		<span>{ merchant?.merchant_email }</span>
	  	</div>
	  </div>
    </div>
  );
}

function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();
	function toggle() {
		setIsOpen(!isOpen);
	}

	const handleSignout = async () => {
		await supabase.auth.signOut();
		navigate("/");
	};

	return (
		<div className = {isOpen ? "sidebar open" : "close"}>
			<br />
			<span><button className="bttn_right" onClick = { toggle }> {isOpen ? "✕" : "☰"}</button></span>
			<br />	<br />	
			{isOpen && <div id="logo_box"><span className="_name"><img src= {logo} className ="logo_icon" /></span></div>}
			{isOpen && <hr />}
			<ul className="sidebar_links">
				<li><Link to="/dashboard"><FaHome />{isOpen && <span className="sidebar_link">Dashboard</span>}</Link></li><br />
				
				<li><Link to="/transactions"><FaExchangeAlt />{isOpen && <span className="sidebar_link">Transactions</span>}</Link></li><br />
				<li><Link to="/payment"><FaDollarSign />{isOpen && <span className="sidebar_link">Payment</span>}</Link></li><br />
				<li><Link to="/settings"><FaCog />{isOpen && <span className="sidebar_link">Settings</span>}</Link></li><br />
				<li><button type="button" onClick={ handleSignout }><FaSignOutAlt />{isOpen && <span className="sidebar_link">Sign out</span>}</button></li>
			</ul>
			
		
			
		</div>
	);
}

function DashboardBody() {
	const[isModal, setIsModal] = useState(false);
	function showModal() {
		setIsModal(true);
        }
	function closeModal() {
		setIsModal(false);
	}
	return (
		<div id="dashboard_body">
			<h2>Hello, Joy</h2>
			<p>Receive USDC payment Instantly from anywhere through simple payment links</p>
			<button id="generate_link" onClick={showModal}>Generate Payment Link</button>
		
			{isModal && (<PaymentLink closeModal={closeModal} />)}
		</div>
	);
}

function TotalTxn() {
        return (
                <div id="txn_boxes" class="clearfix">
                        <div class ="txn_box" id="total_inv">
                                <p>Total Invoice paid</p>
                                <h3>800,000 USDC</h3>
                        </div>
                        <div class="txn_box" id="wallet_balance">
                                <p>Wallet Balance</p>
                                <h3>45,000 USDC</h3>
                        </div>
                        <div class="txn_box" id="unpaid_inv">
                                <p>unpaid Invoice</p>
                                <h3>163</h3>
                        </div>
                </div>
        );
}


function Display() {
	return (
		<MerchantProvider>
			<div id="dashboard_page">
				<Sidebar />
				<DashboardHeader />
				<DashboardBody />			
				<TotalTxn />
				<Footer />	
			</div>
		</MerchantProvider>
	);
}

export default Display;

