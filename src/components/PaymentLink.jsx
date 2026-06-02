import { useState } from 'react';
import { FaLink, FaRegClone } from 'react-icons/fa';

function PaymentLink({ closeModal }) {
	
	return (
		<div className= "modal_overlay">
			<div className="modal_box">
				<button onClick={closeModal} id="close_btn"> X </button>
				<br />
				<h2>Get paid in USDC instantly</h2>
				<br />
				<h3>Create Payment Link</h3>
                                <form>
					<label>
Amount (USDC)</label><br />
					<input type="text"></input><br /><br />
					<label> Description (Optional)</label><br />
					<input type="text"></input><br /><br />
					<input type="button" value="Generate Link" id="gen_link_btn"></input><br /><br />
				</form>
				<br />
				<div className="generated_link">
					<input type="text" readOnly />
					<button id="_link"><FaLink /></button>
					<button id="copy_link"><FaRegClone /></button>
				</div>
			</div>
		</div>
	);
}

export default PaymentLink;
