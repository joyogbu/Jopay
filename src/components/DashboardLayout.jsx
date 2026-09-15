import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div id="dashboard_page">

            <Sidebar
                isOpen={isOpen}
                toggle={toggle}
            />

            <div className="dashboard_content">

                <Header
                    toggle={toggle}
                />

                {children}

            </div>

        </div>
    );
}

export default DashboardLayout;
