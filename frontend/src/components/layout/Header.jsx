import ApiStatus from "../common/ApiStatus";

function Header() {
    return (
        <header className="header">
            <div>
                <p className ="eyebrown">CSV Analytics Platform</p>
                <h1>Insightflow</h1>
            </div>

            <ApiStatus />
        </header>
    );
}

export default Header;