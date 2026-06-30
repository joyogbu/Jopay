import {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

function CompleteSignup() {
	const navigate = useNavigate();
	const [ merchant, setMerchant ] = useState(null)
	
	useEffect(() => {

		//check if user signed up
		async function loadUser() {
			const {data: { user } } = await supabase.auth.getUser();
			
			//if no sign up, redirect to sign up
			if(!user) {
				navigate("/signup");
				return;
			}
			
			//signed up? check if fully onboarded
			const {data: profile} = await supabase
				.from("merchants")
				.select("is_active")
				.eq("merchant_id", user.id)
				.single();

			//Already onboarded, redirect to dashboard
			if(profile?.is_active) {
				navigate("/dashboard");
				return;
			}

			//not fully onboarded
			setMerchant(user);
			console.log("There is user:", user);
		}
		loadUser();
	}, []);

        const [formData, setFormData] = useState({
		merchant_id: merchant?.id,
                merchant_name: "",
                merchant_address: "",
        });

        function handleForm(e){
                const name = e.target.name;
                const value = e.target.value;

                setFormData(prevData => ({...prevData, [name]: value}));
        }

        async function submitForm(e){
                e.preventDefault();	

		const {data, error} = await supabase.from("merchants").insert({
			merchant_id: merchant?.id,
			merchant_email: merchant?.email,
			merchant_name: formData.merchant_name,
			merchant_address: formData.merchant_address,
			is_active: true,
			wallet_status: "not_created",
			}).select();

		if (error) {
			console.log("create merchant error:", error);
			//setStatus("Failed to create merchant");
			return;
		
		}
		console.log("Merchant created");
		//setStatus("Success!, redirecting");

		// redirect user to the dashboard
		setTimeout(() => {navigate( "/dashboard");
		}, 9000 );
	}


        return (
                <div id="sign_up">
                        <h3>JoPay</h3>
                        <form onSubmit= {submitForm }>
                                <h4>Step 2: Complete Sign Up</h4>
                               
                                <label>Business Name</label>
                                <input type="text" placeholder="Enter your Business name" name="merchant_name" value={formData.merchant_name} onChange={handleForm}></input><br /><br />
                                <label>Business Country</label>
                                <input type="text" placeholder="Country" name="merchant_address" value={formData.merchant_address} onChange={handleForm}></input><br /><br />

                                <button type="submit" value="continue">Continue</button><br /><br />
                        </form><br />
		</div>
	);
}
export default CompleteSignup; 
