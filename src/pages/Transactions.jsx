import { MerchantProvider, useMerchant, } from '../auth/MerchantContext.jsx'; import Footer from '../components/Footer.jsx';                                import Header from '../components/Header.jsx';
import Sidelink from '../components/Sidelink.jsx';
function Transactions({isOpen, toggle}) {
    const {invoices} = useMerchant();
    return (
        <>
        <div className="dashboard_page">
            <Sidelink isOpen={isOpen} toggle={toggle} />
            <div className="dashboard_content">
            <Header isOpen={isOpen} toggle={toggle}/>
            <div className="transaction_page">

            <h2>Transaction history</h2>
            {invoices.length === 0 ? (                   <p>No transactions found.</p>
            ) : (
                invoices.map((invoice) => (
                    <div key={invoice.invoice_id} className="invoice_flex">
                        <div className="invoice_item">
                            <p>{invoice.customer_name}</p>
                            <small>{new Date(invoice?.created_at).toLocaleDateString()}</small>
                        </div>
                        <div className="invoice_item">
                            <p>{Number(invoice?.amount).toFixed(2)}</p>
                            <small>{invoice.status}</small>
                        </div>
                        <p>{invoice.description}</p>
                    </div>
                ))
                )}
                </div>
            
            </div>
        </div>
        <Footer />
        </>
    );
}
export default Transactions;
