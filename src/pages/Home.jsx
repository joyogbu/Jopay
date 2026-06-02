import { Link } from 'react-router-dom';

function Home() {

        return (
                <div id="landing_div">
                        <div id="landing_one">
                                <h1>
                                        Instant USDC Payments
                                </h1>
                                <h2>
                                        Built on Arc. Powered by Circle
                                </h2>
                                <h3>
                                        Receive Stablecoins instantly from anywhere in the world through simple payment links
                                </h3>

                                <br />
                                <Link to ="/signup" className="landing_bttn" >Start Here
                                </Link>
                                <br /><br />
                                <button class="landing_bttn">Request a Demo</button>
                        </div><br /><br />
                        <div id="landing_two">
                                <h2>Seamless Stablecoin Payments Built for modern African Businesses</h2><br />
                                <div class="landing_feature"><div class="feature_img"><img src="#" /></div><br /> <p><h3>Whatsapp Payment Links.</h3> Create a payment link in seconds and share it on WhatsApp.</p></div><br /><br />
                                <div class="landing_feature"><div class="feature_img"><img src="#" /></div><br /> <p><h3>Cross-border Friendly.</h3> No card restrictions. No banking borders</p></div><br /><br />
                                <div class="landing_feature"><div class="feature_img"><img src="#" /></div><br /> <p><h3>Secure & Transparent.</h3> Transparent Transactions. Blockchain Verified</p></div><br /><br />
                        <h2>The easiest way to receive USDC payments in Africa.</h2>
                        <h3>Get paid globally in stablecoins without banking stress.</h3>
                        <button class="landing_bttn">Start Here</button><br /><br />
                        </div>
                </div>
        );
}

export default Home;
