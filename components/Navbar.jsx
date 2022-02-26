import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from 'next/link';
import {useSelector} from "react-redux";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {

    const quantity = useSelector(state => state.cart.quantity);


    return ( 
       <>
        <div className={styles.container}>
            <div className={styles.item}>
            <div className={styles.callButton}>
              <Image src ="/img/telephone.png" alt = "" height="32" width="32"/>
            </div>
            <div className={styles.texts}>
                <div className={styles.text}>ORDER NOW</div>
                <div className={styles.text}>9168549326</div>
            </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                <li className={styles.listItem}><Link href="/"> Home </Link> </li>
                 {/* <FontAwesomeIcon icon="fa-bars" /> */}
                <Image src="/img/logo.png" alt="" width="130px" height="120px" />
                <li className={styles.listItem}> Contact Us </li>
                </ul>
             </div>

               <div>
              {/* <FontAwesomeIcon icon="faHome" /> */}
               </div>
            <div className={styles.item}>
               <div  className={styles.cart}>
                <Link href="/cart">
               <Image src="/img/cart.png" alt="" width="37px" height="40px"/>
                </Link>
                <div className={styles.counter}>{quantity}</div>
               </div>
             
            </div>
        </div>
        </>
     );
}


export default Navbar;