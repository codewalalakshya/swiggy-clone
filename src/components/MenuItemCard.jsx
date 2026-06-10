import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/slices/cartSlice";
import { truncate } from "../utils/helper";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const { id, name, price, description, isVeg, rating } = item || {};
  const cartItem = cartItems.find((i) => i.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const displayPrice = price ? `₹${(price / 100).toFixed(0)}` : "₹99";

  return (
    <div className="menu-item">
      <div className="item-info">
        <div className="item-top">
          <span className={`veg-dot ${isVeg ? "veg" : "nonveg"}`}>{isVeg ? "🟢" : "🔴"}</span>
          {rating && <span className="item-rating">★ {rating}</span>}
        </div>
        <h4 className="item-name">{name}</h4>
        <p className="item-price">{displayPrice}</p>
        {description && <p className="item-description">{truncate(description, 80)}</p>}
      </div>
      <div className="item-right">
        <div className="item-img-placeholder">
          <span>{isVeg ? "🥗" : "🍗"}</span>
        </div>
        <div className="item-add-wrapper">
          {quantity === 0 ? (
            <button className="btn-add" onClick={() => dispatch(addItem(item))}>ADD</button>
          ) : (
            <div className="qty-control">
              <button className="qty-btn" onClick={() => dispatch(removeItem(item))}>−</button>
              <span className="qty-count">{quantity}</span>
              <button className="qty-btn" onClick={() => dispatch(addItem(item))}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
