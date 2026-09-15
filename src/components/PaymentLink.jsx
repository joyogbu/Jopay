import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLink, FaRegClone } from 'react-icons/fa';
//import {createInvoice} from '../components/CreateInvoice.jsx'

import {supabase} from '../lib/supabase.js';
import { useMerchant } from '../auth/MerchantContext.jsx';
import Footer from '../components/Footer.jsx';                                import Header from '../components/Header.jsx';
import Sidelink from '../components/Sidelink.jsx';

function PaymentLink({ closeModal, isOpen, toggle }) {
	const {merchant} = useMerchant();
	const [payLink, setPayLink] = useState("");
	const [statusError, setStatusError] = useState("");
    const [message, setMessage] = useState("");
	const [formData, setFormData] = useState({
		amount: "",
		customer_name: "",
		description: "",
	});
	const [isCopied, setIsCopied] = useState(false);

    const navigate = useNavigate();
	const handleForm = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData(prevData => ({...prevData, [name]: value}));
	}

	const createInvoice = async (e) => {
		e.preventDefault();
		if(!formData.amount || formData.amount <= 0) {
			setStatusError("Please enter the amount");
			return;
		}
	

		const { data, error } = await supabase.from('invoices')
			.insert([
				{
					merchant_id: merchant?.merchant_id,
					merchant_name: merchant?.merchant_name,
					merchant_wallet: merchant?.circle_wallet_address,
					amount: Number(formData.amount),
					customer_name: formData.customer_name,
					description: formData.description,
					tx_hash: formData.tx_hash
				}
			])
			.select()
		console.log("Error:", error)
		console.log("Data:", data)
	

		const invoice = data[0];
		const invoiceId = data[0].invoice_id;

		setPayLink(
			`${window.location.origin}/pay/${invoiceId}`);

        setMessage("Payment link generated ✅");
	}

	const copyLink = async () => {
		await navigator.clipboard.writeText(payLink);
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 200);
	}


	return (
        <>        
        <div className="dashboard_page">
            <Sidelink isOpen={isOpen} toggle={toggle} />
            <div className="dashboard_content">
            <Header isOpen={isOpen} toggle={toggle} />
		    <div className= "payment_link_div">
            
			<div className="payment_link_box">
				
				<h2>Get paid in USDC instantly</h2>
				<h3>Create Payment Link</h3>
				<p>{statusError}</p>
				<form onSubmit={createInvoice}>
					<label>
Amount (USDC)</label><br />
					<input name="amount" placeholder="Enter Amount" value={formData.amount} type="number" min="0" step="0.01" onChange={handleForm} required /><br /><br />
					<label>Customer name</label><br />
					<input type="text" name="customer_name" placeholder="Enter Customer Name" value={formData.customer_name} onChange={handleForm} required /><br /><br />
					<label> Description (Optional)</label><br />
					<textarea name="description" type="text" placeholder="Decription" value={formData.description} onChange={handleForm} /><br />
                    {message && <p className="form_success">{message}</p>}
					{payLink && ( <div className="generated_link">
                                        <input type="text" value={payLink} readOnly />
                                        <button type="button" className="copy_link" onClick={ copyLink }>{isCopied ? "Copied!" : <FaRegClone />}</button>
                                	</div>)}

                    <br />
					<button value="Generate Link" type="submit" id="gen_link_btn" disabled={!!payLink}>{payLink ? "Link Generated" : "Generate Link"} <FaLink /></button><br />
                    <br />
				</form>
				
			</div>
            
		</div>
        
        </div>
        </div>
        <Footer />
        </>
	);
}

export default PaymentLink;
