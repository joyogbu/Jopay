import { Link, useNavigate } from 'react-router-dom';
import { FaLink, FaChevronDown, FaHome, FaCog, FaExchangeAlt, FaArrowRight, FaRegClone, FaDollarSign, FaFileInvoiceDollar, FaSignOutAlt, FaUser, FaBell, FaWallet, FaCoins, FaCheckCircle, FaClock, FaHistory, FaPaperPlane } from 'react-icons/fa';
import logo from '../images/jopay.jpg';

function Sidelink({isOpen, toggle}) {
    return (
        <>
            <div className = {`sidebar ${isOpen ? "open" : "close"}`}>


                <div id="logo_box">
                    <span className="_name"><img src= {logo} className ="logo_icon" /></span>

                                <span><button className="bttn_right" onClick = { toggle }>✕</button></span>
                </div>
                <br />
                <ul className="sidebar_links">
                    <li className="link_flex"><Link to="/"><FaHome /></Link><Link to="/">Home</Link></li>

                    <br />

                    <li className="link_flex"><Link to="/dashboard"><FaHome /></Link><Link to="/dashboard">Dashboard</Link></li>

                    <br />

                    <li className="link_flex"><Link to="/send"><FaPaperPlane /></Link><Link to="/send">Send USDC</Link></li>

                    <br />

                    <li className="link_flex"><Link to="/generate-link"><FaLink /></Link><Link to="/generate-link">Payment Link</Link></li>

                    <br />
                    <li className="link_flex"><Link to="/transactions"><FaFileInvoiceDollar /></Link><Link to="/transactions">Invoices</Link></li>
                    <br />
                   <li className="link_flex"><Link to="/transactions"><FaExchangeAlt /></Link><Link to="/transactions">Transactions</Link></li>
                    <br />
                    <li className="link_flex"><Link to="/settings"><FaCog /></Link><Link to="/settings">Settings</Link></li>
                    <br />
                    <li className="link_flex"><Link to="/transactions"><FaSignOutAlt /></Link><Link to="/transactions">Sign Out</Link></li>

                </ul>
            </div>
        </>
    )
}
export default Sidelink;
