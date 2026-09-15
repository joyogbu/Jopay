import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLink, FaChevronDown, FaHome, FaCog, FaExchangeAlt, FaArrowRight, FaRegClone, FaDollarSign, FaFileInvoiceDollar, FaSignOutAlt, FaUser, FaBell, FaWallet, FaCoins, FaCheckCircle, FaClock, FaHistory, FaPaperPlane } from 'react-icons/fa';
import { supabase } from '../lib/supabase.js';
import PaymentLink from '../components/PaymentLink.jsx';
import SendTransaction from '../components/SendTransaction.jsx';
import { MerchantProvider, useMerchant, } from '../auth/MerchantContext.jsx';
import Footer from '../components/Footer.jsx';
import logo from '../images/jopay.jpg'
import usdc from '../images/usdc1.png'
import jopay from '../images/jopay.jpg';


function Header({isOpen, toggle}) {
    const {merchant, invoices, walletBalance} = useMerchant();
    const [copyWallet, setCopyWallet] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);
  //  const [isOpen, setIsOpen] = useState(false);
    const walletAddress = merchant?.circle_wallet_address;

    const trimAddress = walletAddress ? `${walletAddress?.slice(0, 3)}...${walletAddress?.slice(-2)}` : "";
    const copyAddress = async () => {
        await navigator.clipboard.writeText(walletAddress);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 500);
    }
/*
    useEffect(() => {
    const handleResize = () => {
        setIsOpen(window.innerWidth >= 768);
    };

    handleResize(); // run once on mount

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
}, [setIsOpen]);*/

    function dropNotis() {
        setIsDropdown(!isDropdown);
    }

    function dropProfile() {
        setIsProfile(!isProfile);
    }
 
   /* function toggle() {
        setIsOpen(!isOpen);
    }*/
    
    const handleSignout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };
    
    const notifications = invoices.filter(invoice => invoice.status === "Escrowed" || invoice.status === "Paid" );
    const notificationCount = invoices.filter(invoice => invoice.status === "Escrowed").length;

    return (
        <div id="dashboard_top_div">
            <div id="myProfile" className={`wallet_dropdown ${isProfile ? "show_profile" : ""}`}>
                <h2>{Number(walletBalance).toFixed(2) ?? "0"} USDC</h2>
                <p className="wallet_address">{walletAddress?.toLowerCase()}</p>
                <button className="copy" onClick={ copyAddress }>{isCopied ? "Copied!" : <FaRegClone />} Copy Address</button>
                <br /><hr />
                <button type="button" className="wallet_disconnect" onClick={handleSignout}>Disconnect</button>
            </div>


            <div className={`notification_div ${isDropdown ? "show_notis" : ""}`}>
                <p><u>Notifications</u></p>
                {notifications.length === 0 ? (
                    <p>No notifications.</p>
                ) : (
                    notifications.map(invoice => (
                        <div key={invoice.invoice_id} className="notification-item">
                            <span><b>{`${invoice.customer_name}: ` }</b></span><span><b>{invoice.description}</b></span>
                            {invoice.status === "Escrowed" && ( <p> {invoice.amount} USDC has been deposited into escrow. </p>)}
                            {invoice.status === "Paid" && ( <p> {invoice.amount} USDC has been released successfully.</p>)}
                            <small>{new Date(invoice.released_at).toLocaleString()}</small>
                        </div>
                    ))
                )}
            </div>

            <div className="top_div _menu_bar">
                <button type="button" onClick={toggle}>☰</button>
            </div>
            <div id="logo_name" className="top_div">
                <div className="logo_div" id="logo">
                    <img src={ jopay } className="_logo" />
                </div>
            </div>
        
            <div className ="top_div" id="notis">
                <button id="notification_bell" onClick={dropNotis}>🔔 </button>
                {notificationCount > 0 && (
                    <span className="badge">{notificationCount}</span>
                )}
            </div>
            <div className="top_div" id="user_wallet">
                <div id="_wallet">
                    <span>{ trimAddress }</span><span><button onClick={dropProfile} type="button" className="drop_btn"><FaChevronDown /></button></span>
                </div>
            </div>
        </div>
    );
}
export default Header;
