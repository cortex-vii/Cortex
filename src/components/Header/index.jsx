import Image from 'next/image'
import styles from "./header.module.css"
import logo from './logo.png'


export const Header = () =>{
    return (
        <header className={styles.header}>
            {/* <img className={styles.logo} src="/images/logo.png" alt="logo Córtex" /> */}
            <Image src={logo} alt="logo Córtex" width={80}/>
        </header>
    )
}