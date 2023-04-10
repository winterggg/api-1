import logo from '../img/logo.svg';

interface HeaderProps {
    title?: string;
}

const Header = ({ title = 'Notedly' }: HeaderProps) => {
    return (
        <header>
            <img src={logo} alt="logo" height="40" />
            <h1>{ title }</h1>
        </header>
    )
}

export default Header;