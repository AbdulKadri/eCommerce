import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";
import getStripe from "@/utils/get-stripejs";
import axios from "axios";

const Cart = () => {
  const cartRef = useRef(null);
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    onRemove,
    setShowCart,
    toggleCartItemQuantity,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    if (!stripe) {
      toast.error("Stripe failed to initialize. Please try again later.");
      return;
    }

    console.log("cartItems", cartItems);
    const { data } = await axios.post(
      "/api/stripe",
      {
        cartItems: cartItems,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!data) {
      toast.error("Something went wrong. Please try again later.");
      return;
    }

    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          onClick={() => setShowCart(false)}
          className="cart-heading"
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length === 0 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length > 0 &&
            cartItems.map((item, index) => (
              <div className="product" key={item._id}>
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
