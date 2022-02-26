import styles from '../styles/PizzaCard.module.css';
import Image from "next/image";
import Link from "next/link";


const PizzaCard = ({pizza}) => {

    return (
         <div className={styles.container}>
          <Link href={`/product/${pizza._id}`} passHref>
          <div className={styles.wrapper}>
          <Image src ={pizza.img} alt="" width="200" height="200"  />
          </div>
          </Link>
          <div className={styles.card}>
          <h1 className={styles.title}> {pizza.title} </h1>
          <span className={styles.price}> {pizza.prices[0]} Rs</span>
          <p className={styles.desc}> 
           {pizza.desc}
          </p>
          </div>
          </div> 

    )
}

export default PizzaCard
