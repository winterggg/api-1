import logo from '../img/logo.svg';

const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo" height="40" />
            <h1>Notedly</h1>
        </header>
    )
}

export default Header;