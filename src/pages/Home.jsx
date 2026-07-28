import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../images/logo2.png';
import image18 from '../images/image18.png';
import image19 from '../images/image19.png';
import image82 from '../images/image82.jpeg';
import jopay from '../images/jopay.jpg';
import wallet from '../images/wallet1.jpg';
import link from '../images/link2.png';
import bg from '../images/received1.png';
import image4 from '../images/image4.png';
import Footer from '../components/Footer.jsx';

function Home() {
        const navigate = useNavigate();
        const [isOpen, setIsOpen] = useState(false);
        function toggle() {
            setIsOpen(!isOpen);
        }
        return (
                <div id="landing_div">
                    {isOpen && <nav className="navbar">
                        <button type="button" className="menu_link_close_btn" onClick={toggle}>X</button>
                        <br />
                        <ul className={`menu_links ${isOpen ? 'show_link' : '' }`}>
                            <li><a href="#how-it-works">How it works</a></li>
                            <br />
                            <li><a href="/#demo">Request a demo</a></li>
                            <br />
                            <li><a href="#">Docs</a></li>
                        <br />
                        </ul>
                    </nav>}
                    <div className="landing_menu_div">
                        <div className="landing_menu landing_logo">
                            <img src={jopay} className="landing_logo_img" />
                        </div>
                        <div className=" landing_menu nav_links desktop_only">
                            <a href="#how-it-works">How it works</a>
                            <a href="#Request-a-demo">Request a demo</a>
                            <a href="#">Docs</a>
                        </div>
                        <div className="landing_menu start_here nav_actions">
                            <div className="btn_flex"><button className="menu_start" onClick={() => navigate("/signup")}>Log in</button><span className="flex_arrow"><FaArrowRight /></span></div>
                        
			                <div className="landing_menu_bar">
                                <button className="landing_menu_btn" onClick={toggle}>
                                    ☰
                                </button>
                            </div>
                        </div>
                            
		            </div>
			        <div id="landing_one">
                        <br />
                        
                        <div className="arc_box">
                            <div className="_flex _dot">&bull; </div><div className="_flex">Built on Arc. Powered by Circle</div>
                        </div>
                            <h1 className="heading_1">
                                        Instant USDC <span className="text_change"> Payments.</span>
                                </h1>
                               
                                
                                <p className="heading_2">
                                        Create an invoice, generate a payment link share link on whatsapp, and receive USDC instantly from anywhere
                                </p>

                                <br />
                                <div className="call_to_action_btns">
                                    <div className="btn_flex flex_a"><button onClick ={() => navigate("/signup")} className="landing_bttn _start" >START HERE </button><span className="btn_arrow"><FaArrowRight /></span></div>
                                    
                                    <br />
                                    <div className="btn_flex flex_b"><button onClick ={() => navigate("/signup")} className="landing_bttn _demo">REQUEST A DEMO </button><span className="btn_arrow"><FaArrowRight /></span></div>
                                </div>
                        </div>
                    <br /><br />
                    <div className="home_stats">
                        <div className="stats_box">
                            <span className="stats_label">6</span><br />
                            <span className="stats_value">Total Businesses</span>
                        </div>
                        <div className="stats_box">
                            <span className="stats_label">26</span><br />
                            <span className="stats_value">Total invoice generated</span>
                        </div>
                        <div className="stats_box">
                            <span className="stats_label">65</span><br />
                            <span className="stats_value">Transaction Volume</span>
                        </div>
                        <div className="stats_box">
                            <span className="stats_label">1</span><br />
                            <span className="stats_value">Total countries</span>
                        </div>
                    </div>
                    <br />
                    <div className="landing_two_intro">
				        <div clasaName="intro_1">
					        <img id="usdc_img" src={bg} />
				        </div>
                        <div className="intro_1 intro_text">
				            <h2><span className="text_change">Seamless <br />Stablecoin Payments</span> built for modern African Businesses.</h2>
                        </div>
			        </div>
			        <br />
				

                    <h3 id="how-it-works"><u>How it works</u></h3>
                    <p className="_how">Simple payments in four steps. Built for merchants</p>
			        <div id="landing_two">
				
				        <div className="landing_feature"><div className="feature_img"><img className="feature_image" src={wallet} /></div><br /> <h3 className="heading_3 text_change_b">No Wallet Friction</h3><p className="feature_text">Get a wallet generated instantly, for non-crypto native.</p> </div>
                                <div className="landing_feature"><div className="feature_img"><img className="feature_image" src={link} /></div><br /> <h3 className="heading_3 text_change_b">Payment Links.</h3><p className="feature_text"> Create a payment link in seconds and share it on WhatsApp.</p> 
</div>
				            <div className="landing_feature"><div className="feature_img"><img className="feature_image" src= {image82} /></div><br /> <h3 className="heading_3 text_change_b"> Instant USDC Settlement.</h3><p className="feature_text">Get paid in stablecoins in seconds without banking stress. </p></div>

					<div className="landing_feature"><div className="feature_img"><img className="feature_image" src={image19} /></div><br /> <h3 className="heading_3 text_change_b">Secure & Transparent. </h3><p className="feature_text">Transparent Transactions. Blockchain Verified</p> </div>
			    </div>
                <br />
                <hr />
			    <div className="landing_closing">
                   <div className="landing_closing_b">
                        <h2>Try it now</h2>
                        <p className="closing_text">Create a payment link in 30 seconds to see how it works.</p>
                        <h2>The easiest way to receive USDC payments in Africa.</h2>
                        <br />
                        
                    <div className="btn_flex flex_b"><button onClick ={() => navigate("/signup")} className="landing_bttn _demo">Generate Link </button><span className="btn_arrow"><FaArrowRight /></span></div>
                    <br /><br />
                    </div>
                    <div className="jopay_img_div">
                        <img src={image4} id="jopay_img" />
                    </div>
                </div>
                <br />
			    <Footer />
            </div>
        );
}

export default Home;
