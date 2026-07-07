import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCog, FaExchangeAlt, FaDollarSign, FaSignOutAlt, FaUser, FaBell, FaWallet, FaCoins, FaCheckCircle, FaClock, FaHistory, FaPaperPlane } from 'react-icons/fa';
import { supabase } from '../lib/supabase.js';
import PaymentLink from '../components/PaymentLink.jsx';
import SendTransaction from '../components/SendTransaction.jsx';
import { MerchantProvider, useMerchant, } from '../auth/MerchantContext.jsx';
import Footer from '../components/Footer.jsx';
import logo from '../images/logo2.png'

function DashboardHeader() {
  const {merchant} = useMerchant();
  const walletAddress = merchant?.circle_wallet_address;
  
  const trimAddress = walletAddress ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}` : "";
 
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
	  		<span>{ trimAddress }</span>
	  	</div>
	  </div>
    </div>
  );
}

function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	const [isSend, setIsSend] = useState(false);

	const navigate = useNavigate();
	
	//Display the send transaction modal box
	function showUsdc() {
		setIsSend(true);
	}

	//close send transaction modal box
	function closeUsdc() {
		setIsSend(false);
	}

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

				<li><button type="button" onClick={showUsdc} ><FaPaperPlane />{isOpen && <span className="sidebar_link">Send USDC</span>}</button></li><br />
				{isSend && (<SendTransaction closeUsdc={closeUsdc} />)}

				<li><Link to="/transactions"><FaExchangeAlt />{isOpen && <span className="sidebar_link">Transactions</span>}</Link></li><br />
				<li><Link to="/payment"><FaDollarSign />{isOpen && <span className="sidebar_link">Payment</span>}</Link></li><br />
				<li><Link to="/settings"><FaCog />{isOpen && <span className="sidebar_link">Settings</span>}</Link></li><br />
				<li><button type="button" onClick={ handleSignout }><FaSignOutAlt />{isOpen && <span className="sidebar_link">Sign out</span>}</button></li>
			</ul>
			
		
			
		</div>
	);
}

function DashboardBody() {
	const {merchant, walletBalance} = useMerchant();
	const[isModal, setIsModal] = useState(false);
	function showModal() {
		setIsModal(true);
        }
	function closeModal() {
		setIsModal(false);
	}
	return (
		<div id="dashboard_body">
			<h2>Hello, {merchant?.merchant_name} </h2>
			<p>Balance:{walletBalance ?? "0"} USDC</p>
			<p>Receive USDC payment Instantly from anywhere through simple payment links</p>
			<button id="generate_link" onClick={showModal}>Generate Payment Link</button>
		
			{isModal && (<PaymentLink closeModal={closeModal} />)}
		</div>
	);
}

function TotalTxn() {
	const {invoiceStats, walletBalance} = useMerchant();
        return (
                <div id="txn_boxes" className="clearfix">
			<p>See what is happening in your business today</p>
                        <div className ="txn_box" id="total_inv">
				<p className="txn_fa_icons"><FaHistory /></p>
                                <span>Total Invoices</span><br />
				<h3>{invoiceStats?.totalInvoices}</h3>
                                <span>Total invoices generated</span>
                        </div>
                        <div className="txn_box" id="wallet_balance">
				<p className="txn_fa_icons"><FaWallet /></p>
                                <span>Wallet Balance</span>
                                <h3>{walletBalance ?? "0"} USDC</h3>
			
                        </div>
			<div className="txn_box" id="paid_inv">
				<p className="txn_fa_icons"><FaCoins /> </p>
                                <span>Total Volume</span>
                                <h3>{invoiceStats?.totalVolume} USDC</h3>
				<span>Custumers payments</span>
                        </div>
                        <div className="txn_box" id="unpaid_inv">
				<p className="txn_fa_icons"><FaClock /></p>
                                <span>Receivables</span>
                                <h3>{invoiceStats?.receivables} USDC</h3>
				<span>Pending invoices</span>
                        </div>
                </div>
        );
}

/*function InvoiceTable() {
	const {invoices} = useMerchant();

	return (
		<div className="invoice_history">
			<h1>Invoice History</h1>
			<div className="table_container"><table className="invoice-table">
			    <thead>
			        <tr>
				    <th>Invoice ID</th>
				    <th>Description</th>
            			    <th>Amount</th>
				    <th>Status</th>
				    <th>Date</th>
				</tr>
			    </thead>
			    <tbody>
				{invoices?.map((invoice) => (
				    <tr key={invoice?.invoice_id}>
				        <td>{invoice?.invoice_id}</td>
				        <td>{invoice?.description}</td>
				        <td>{Number(invoice?.amount).toFixed(2)} USDC</td>
				        <td> {invoice.status}</td>
				        <td>{new Date(invoice?.created_at).toLocaleDateString()}</td>
				    </tr>
				))}
			    </tbody>
			</table></div>

		</div>
	);
}*/

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

