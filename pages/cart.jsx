import React from 'react';
import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { reset,removeProduct } from "../redux/cartSlice.js";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { AiFillDelete} from "react-icons/ai";
import {useState} from 'react';
import GooglePayButton from '@google-pay/button-react';
import { useRouter } from 'next/router';
import axios from "axios";
import OrderDetails from "../components/OrderDetails";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Cart = () => {
   
   const cart = useSelector(state => state.cart);
   const [open,setOpen] = useState(false);
   const dispatch = useDispatch();
   const router = useRouter();
    const [cash, setCash] = useState(false);
    const [opener, setOpener] = React.useState(false);

    const handleClick = () => {
      setOpener(true);
    };

    const handleClose = (event, reason) => {
      console.log('clied')
      if (reason === 'clickaway') {

        return;
      }

      setOpener(false);
    };


   const createOrder = async(data) => {
     try {
       
      const res = await axios.post("https://pizza-app-five.vercel.app/api/orders",data)

         if (res.status === 201) {
        dispatch(reset());
        setOpen(false)
        router.push(`/orders/${res.data._id}`);
       
      }   
     

     } catch (error) {
       console.log(error.message);

     }
   }
  

    return (
          <div className={styles.container}>
            <Snackbar open={opener}
             autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                 Item Added
                </Alert>
          </Snackbar>
      <div className={styles.left}>
        <table className={styles.table}>
         <tbody>
         {cart.products.length > 0 ? cart.products.map((product,key) => (
           <>
              <tr className={styles.tr}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.label}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>{product.price}Rs</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    {product.price * product.quantity} Rs
                  </span>
                </td>
                <td>
                <span className={styles.total}>
                  <AiFillDelete onClick={ () => {
                      
                       dispatch(removeProduct({key,product}));
                    
                  }}  style={{ cursor:"pointer"}}/>
                  </span>
                </td>
              </tr>
              </>
            )):
            
          
              <h2   className={styles.cartText}>Your Cart is Empty</h2>

            
            }
           </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
           <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>{cart.total}Rs
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>0.00 Rs
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>{cart.total} Rs
          </div>
          {
            open?(
            <>

              <button className={styles.CashButton}  onClick={() =>  setCash(true)}>Cash On Delivery</button>
                  <GooglePayButton
                        environment="TEST"
                        paymentRequest={{
                          apiVersion: 2,
                          apiVersionMinor: 0,
                          allowedPaymentMethods: [
                            {
                              type: 'CARD',
                              parameters: {
                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                              },
                              tokenizationSpecification: {
                                type: 'PAYMENT_GATEWAY',
                                parameters: {
                                  gateway: 'example',
                                  gatewayMerchantId: 'exampleGatewayMerchantId',
                                },
                              },
                            },
                          ],
                          merchantInfo: {
                            merchantId:'BCR2DN4T5DHKP2LB',
                            merchantName:'Rehaan Redkar',
                          },
                          transactionInfo: {
                            totalPriceStatus: 'FINAL',
                            totalPriceLabel: 'Total',
                            totalPrice:`${cart.total}`,
                            currencyCode: 'INR',
                            countryCode: 'IN',
                          },
                          shippingAddressRequired: true,
                          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                        }}
                        onLoadPaymentData={paymentRequest => {

                            const shipping = paymentRequest.shippingAddress;
                             createOrder({
                                customer: shipping.name,
                                address: shipping.address2,
                                total: cart.total,
                                method: 1,
                              });
                            
                        }}
                        onPaymentAuthorized={paymentData => {

                           
                            return { transactionState: 'SUCCESS'}
                            setOpener(true);
                          }
                        }
                        onPaymentDataChanged={paymentData => {
                           
                            return { }
                          }
                        }
                        existingPaymentMethodRequired='false'
                        buttonColor='black'
                        buttonType='Buy'
                 />


               </>
            ):(
            <button onClick={() => cart.total > 0 && setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>
            )
          }
        </div>
      </div>
       {cash && <OrderDetails total={cart.total} createOrder={createOrder} />}
    </div>
    )
}

export default Cart
