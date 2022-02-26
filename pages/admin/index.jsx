
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Edit from "../../components/Edit";





const Index = ({orders,products}) => {

    const [pizzaList,setPizzaList] = useState(products);
    const [orderList,setOrderList] = useState(orders); 
    const [EditClose,setEditClose] = useState(false);
    const status = ["Preparing","On the Way","Delivered","Completed"];
    const [CurrentPizza, setCurrentPizza] = useState('');


    const handleDelete = async (id) => {
    
        try {
        const res = await axios.delete(
            "http://localhost:3000/api/products/" + id
        );
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (err) {
        console.log(err);
        }
    };


    // const handleUpdate = async (id) => {


    // const data = new FormData();
    // data.append("file", File);
    // data.append("upload_preset", "uploads");

    //   try {
    //     const uploadRes = await axios.post(
          
    //       "https://api.cloudinary.com/v1_1/www-pizza-netlify-app/image/upload",
    //       data
    //     );
        
     

    //   const { url } = uploadRes.data;
    //   const newProduct = {
    //     title,
    //     desc,
    //     prices,
    //     extraOptions,
    //     img: url,
    //   };


    //    const res =  await axios.post("http://localhost:3000/api/products", newProduct);
       
    //    const res = await axios.patch(
    //         "http://localhost:3000/api/products/" + id,{ newProduct }
    //     );

    //     setEditClose(!EditClose);

    //   } catch (error) {
        

    //     console.log(error.message);
    //   }

    // };

   
    const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };
    
  

   const handleUpdate = async (id) => {

      setCurrentPizza(id);
      setEditClose(true);

   }




    return (
             <div className={styles.container}>
                    <div className={styles.item}>
                       {EditClose && <Edit setEditClose={setEditClose} CurrentPizza={CurrentPizza} />}
                        <h1 className={styles.title}>Products</h1>
                        <table className={styles.table}>
                        <tbody>
                            <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                            </tr>
                        </tbody>
                     {pizzaList.map((product) => (
                         
                            <tbody key={product._id}>
                            <tr className={styles.trTitle}>
                                <td>
                                <Image
                                    src={product.img}
                                    width={50}
                                    height={50}
                                    objectFit="cover"
                                    alt=""
                                />
                                </td>
                                <td>{product._id.slice(0, 5)}...</td>
                                <td>{product.title}</td>
                                <td>{product.prices[0]} Rs</td>
                                <td>
                                <button className={styles.button}  onClick={() => handleUpdate(product)} >Edit</button>
                                <button
                                    className={styles.button}
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                            </tbody>
                        ))}
                        </table>
                    </div>
                    <div className={styles.item}>
                        <h1 className={styles.title}>Orders</h1>
                        <table className={styles.table}>
                        <tbody>
                            <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                            </tr>
                        </tbody>
                        {orderList.map((order) => (
                            <tbody key={order._id}>
                            <tr className={styles.trTitle}>
                                <td>{order._id.slice(0, 5)}...</td>
                                <td>{order.customer}</td>
                                <td>{order.total} Rs</td>
                                <td>
                                {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                                </td>
                                <td>{status[order.status]}</td>
                                <td>
                                <button onClick={() => handleStatus(order._id)}>
                                    Next Stage
                                </button>
                                </td>
                            </tr>
                            </tbody>
                        ))}
                        </table>
                     </div>
                    </div>
                );
   };




export const getServerSideProps = async (ctx) => {


     const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

    const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

    return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};


export default Index;