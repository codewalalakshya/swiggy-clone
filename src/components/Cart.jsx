import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.price ? item.price / 100 : 99;
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const taxes = parseFloat((totalPrice * 0.05).toFixed(2));
  const grandTotal = (totalPrice + deliveryFee + taxes).toFixed(2);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    dispatch(clearCart());
    setTimeout(() => setOrderPlaced(false), 5000);
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-box">
          <div className="success-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your food is being prepared. Estimated delivery: 30-40 mins</p>
          <Link to="/" className="btn-primary">Order More</Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-box">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add items from a restaurant to get started</p>
          <Link to="/" className="btn-primary">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-left">
          <div className="cart-header">
            <h2 className="cart-title">🛒 Your Cart</h2>
            <button className="btn-clear" onClick={() => dispatch(clearCart())}>Clear All</button>
          </div>
          <div className="cart-items">
            {cartItems.map((item) => {
              const price = item.price ? item.price / 100 : 99;
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-left">
                    <span className={`veg-dot ${item.isVeg ? "veg" : "nonveg"}`}>
                      {item.isVeg ? "🟢" : "🔴"}
                    </span>
                    <div>
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-price">₹{price.toFixed(0)} each</p>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => dispatch(removeItem(item))}>−</button>
                      <span className="qty-count">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => dispatch(addItem(item))}>+</button>
                    </div>
                    <span className="cart-item-total">₹{(price * item.quantity).toFixed(0)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="delivery-info">
            <div className="delivery-row">
              <span>🚴 Delivery Partner</span>
              <span className="delivery-time">Arriving in 30-40 mins</span>
            </div>
          </div>
        </div>

        <div className="cart-right">
          <div className="bill-card">
            <h3 className="bill-title">Bill Summary</h3>
            <div className="bill-rows">
              <div className="bill-row"><span>Item Total</span><span>₹{totalPrice.toFixed(2)}</span></div>
              <div className="bill-row"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
              <div className="bill-row"><span>Taxes & Charges (5%)</span><span>₹{taxes}</span></div>
              <div className="bill-divider" />
              <div className="bill-row bill-total"><span>Grand Total</span><span>₹{grandTotal}</span></div>
            </div>
            <button className="btn-place-order" onClick={handlePlaceOrder}>
              Place Order • ₹{grandTotal}
            </button>
            <p className="bill-note">🔒 Safe and Secure Payments. Easy returns.</p>
          </div>

          <div className="offers-card">
            <h4>🏷️ Apply Coupon</h4>
            <div className="coupon-input">
              <input type="text" placeholder="Enter coupon code" className="coupon-field" />
              <button className="coupon-apply">Apply</button>
            </div>
            <div className="available-coupons">
              <div className="coupon-chip">SWIGGY50</div>
              <div className="coupon-chip">FIRSTORDER</div>
              <div className="coupon-chip">FREEDEL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
