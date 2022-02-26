import styles from "../styles/Footer.module.css";
import Image from "next/image";


const Footer = () => {
    return ( 
        <>
        
          <div className={styles.footercontainer}>
           <div className={styles.leftside}>
             <div className={styles.contact}>
                 <div className={styles.info}>
                  <b> Address</b>
                  <br />
                  Lorem ipsum, dolor sit orem ipsum
                 </div>
             </div>

             <div className={styles.contact}>
                 <div className={styles.info}>
                  <b> Email</b>
                  <br />
                   rehaanredkar32@gmail.com
                 </div>
             </div>


             <div className={styles.contact}>
                 <div className={styles.info}>
                  <b> Call Us Now</b>
                  <br />
                   9168549326
                 </div>
             </div>
           </div>
           <div className={styles.rightside}>
           <h4>About Us</h4>
            <div className={styles.aboutus}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dolorum corrupti
             laborum doloremque veniam ratione excepturi! Laudantium atque fugit
             repellat fuga in, odio quos a officia quia tempore molestiae aliquam.
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dolorum corrupti
             laborum doloremque veniam ratione excepturi! Laudantium atque fugit
             repellat fuga in, odio quos a officia quia tempore molestiae aliquam</div>
           </div>

          </div>
           <span className={styles.bottom}> © 2022 All rights reserved . Designed and Developed by Rehan with ❤️</span>
        </>
     );
}
 
export default Footer;