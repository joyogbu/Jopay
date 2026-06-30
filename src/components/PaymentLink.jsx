import { useState } from 'react';
import { FaLink, FaRegClone } from 'react-icons/fa';
//import {createInvoice} from '../components/CreateInvoice.jsx'

import {supabase} from '../lib/supabase.js';

function PaymentLink({ closeModal }) {
	const [payLink, setPayLink] = useState("");
	const [formData, setFormData] = useState({
		merchant_name: "Jotech Business Solutions",
		merchant_wallet: "0xAA8A308205C3aAe6c598509A94276a1cdf6237cE",
		amount: "",
		description: "",
	})
	const [isCopied, setIsCopied] = useState(false);

	const handleForm = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData(prevData => ({...prevData, [name]: value}));
	}

	const createInvoice = async (e) => {
		e.preventDefault();

	

		const { data, error } = await supabase.from('invoices')
			.insert([
				{
					merchant_name: formData.merchant_name,
					merchant_wallet: formData.merchant_wallet,
					amount: Number(formData.amount),
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
	}

	const copyLink = async () => {
		await navigator.clipboard.writeText(payLink);
		setIsCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 200);
	}


	return (
		<div className= "modal_overlay">
			<div className="modal_box">
				<button onClick={closeModal} id="close_btn"> X </button>
				<br />
				<h2>Get paid in USDC instantly</h2>
				<br />
				<h3>Create Payment Link</h3>
				<form onSubmit={createInvoice}>
					<label>
Amount (USDC)</label><br />
					<input name="amount" placeholder="Enter Amount" value={formData.amount} type="number" min="0" step="0.01" onChange={handleForm} required /><br /><br />
					<label> Description (Optional)</label><br />
					<textarea name="description" type="text" placeholder="Decription" value={formData.description} onChange={handleForm} /><br /><br />
					<button value="Generate Link" type="submit" id="gen_link_btn">Generate Link <FaLink /></button><br /><br />
				</form>
				<br />
				{payLink && ( <div className="generated_link">
					<input type="text" value={payLink} readOnly />
					<button id="copy_link" onClick={ copyLink }>{isCopied ? "Copied!" : <FaRegClone />}</button>
				</div>
				)}
				
			</div>
		</div>
	);
}

export default PaymentLink;
