import { Link } from 'react-router-dom';
import logo from '../images/logo2.png';
import image18 from '../images/image18.png';
import image19 from '../images/image19.png';
import image82 from '../images/image82.jpeg';
import image4 from '../images/image4.png';
import Footer from '../components/Footer.jsx';
import bg from '../images/bg.png';

function Home() {

        return (
                <div id="landing_div">
            
			<div className="landing_menu_div">
				<div className="landing_menu landing_logo"><img className="landing_logo_img" src={ logo } /></div>
				<div className="landing_menu landing_menu_bar"><button className="landing_menu_btn">☰</button></div>
			</div>
			<div id="landing_one">
                                <h1>
                                        Instant <span className="text_change">USDC</span> Payments.
                                </h1>
                                <h2>Built on <span className="text_change">Arc. </span>
				Powered by <span className="text_change">Circle</span></h2>
                                
                                <h3>
                                        Receive Stablecoins instantly <span className="text_change">from anywhere </span>through simple payment links.
                                </h3>

                                <br />
                                <Link to ="/signup" className="landing_bttn _start" >START HERE
                                </Link>
                                <br /><br />
                                <button class="landing_bttn _demo">REQUEST A DEMO</button>
                        </div>
                        <div className="landing_two_intro">
				<div>
					<img id="usdc_img" src={image4} />
				</div>

				<h2><span className="text_change">Seamless <br />Stablecoin Payments</span> built for modern African Businesses.</h2>
			</div>
			<br />
				

			<div id="landing_two">
				
				<div class="landing_feature"><div class="feature_img"><img className="feature_image" src={image18} /></div><br /> <p> <span className="text_change">No Wallet Friction</span>Get a wallet generated instantly for non-crypto native.</p></div><br /><br />

                                <div class="landing_feature"><div class="feature_img"><img className="feature_image" src={image18} /></div><br /> <p><h3> <span className="text_change">Whatsapp Payment Links.</span></h3> Create a payment link in seconds and share it on WhatsApp.</p></div><br /><br />
				<div class="landing_feature"><div class="feature_img"><img className="feature_image" src= {image82} /></div><br /> <p><span className="text_change"> Instant USDC Settlement.</span>Get paid globally in stablecoins without banking stress. </p></div><br /><br />

                                <div class="landing_feature"><div class="feature_img"><img className="feature_image" src= {image82} /></div><br /> <p>Cross-border Friendly. No card restrictions. No banking borders</p></div><br /><br />
                                <div class="landing_feature"><div class="feature_img"><img className="feature_image" src={image19} /></div><br /> <p>Secure & Transparent. Transparent Transactions. Blockchain Verified</p></div><br /><br />
			</div>
			<div className="landing_closing">
				<div className="jopay_img_div"><img src={bg} id="jopay_img" /></div>
                        	<div className="landing_closing_b"><h2>The easiest way to receive USDC payments in Africa.</h2>
                        	<br />
                        	<button class="landing_bttn _start">Start Here</button><br /><br /></div>
                        </div>
			<Footer />
                </div>
        );
}

export default Home;
