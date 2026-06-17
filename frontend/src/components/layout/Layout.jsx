import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

function Layout(){
    return(
        <div className = "app-layout">  
            <Sidebar />

            <div className = "main-area">
                <Header />

                <main className = "page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout;