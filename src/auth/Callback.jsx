import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
	const navigate = useNavigate();
	const [status, setStatus] = useState("Loading...");
	useEffect(() => {
		const handleAuth = async () => {
			try {
				//get session from magic link
				const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
				if(sessionError) {
					console.error(sessionError);
					setStatus("Authentication failed");
					setTimeout(() => {
						navigate("/signup");
					}, 4000);
					return;
				}
				const session = sessionData.session;

				if(!session) {
					setStatus("No account found");
					console.log("no session");
					setTimeout(() => {
						navigate("/signup");
					}, 4000);
					return;
				}

				//if(data.session) {
				const user = session.user;
				console.log("user logged in:", user);
	
				//check if merchant already exists
				const { data: merchant, error: merchantError } = await supabase
					.from("merchants")
					.select("*")
					.eq("merchant_id", user.id)
					.maybeSingle();
				if(merchantError) {
 					console.log(merchantError);
					setStatus("Something went wrong");
					return;
				}
				if (!merchant) {
					navigate("/signup/complete_signup");
					return;
				}

				//console.log("Merchant created");
				
			/*	setStatus("Success!, redirecting");

			//	redirect user to the dashboard
				setTimeout(() => {
					navigate( "/dashboard");
				}, 5000 );*/
			

			if(merchant?.wallet_status !== "created") {
				navigate("/signup/wallet-setup");
				return;
			}

			navigate("/dashboard");

			} catch (err) {
				console.log(err);
				setStatus("Something went wrong");
				return;
			}
		};
		handleAuth();
	}, []);

	return (
		<>
			<p>{status}</p>
		</>
	)
}
