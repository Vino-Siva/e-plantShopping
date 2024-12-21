import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!items) return null;

  const calculateTotalAmount = React.useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          parseInt(item?.cost?.replace("$", "") || 0, 10) *
            (item?.quantity || 0),
        0
      ),
    [items]
  );

  const handleContinueShoppingClick = React.useCallback(
    (e) => onContinueShopping(e),
    [onContinueShopping]
  );

  const handleIncrementClick = React.useCallback(
    (item) => {
      if (!item) return;
      dispatch(
        updateQuantity({ ...item, quantity: (item?.quantity || 0) + 1 })
      );
    },
    [dispatch]
  );

  const handleDecrementClick = React.useCallback(
    (item) => {
      if (!item) return;
      dispatch(
        updateQuantity({
          ...item,
          quantity: (item?.quantity || 0) - 1,
        })
      );
      if ((item?.quantity || 0) === 1) dispatch(removeItem(item.name));
    },
    [dispatch]
  );

  const handleRemoveClick = React.useCallback(
    (item) => {
      if (!item) return;
      dispatch(removeItem(item.name));
    },
    [dispatch]
  );

  const calculateItemTotalCost = React.useCallback(
    (item) =>
      (item?.quantity || 0) * parseInt(item?.cost?.replace("$", "") || 0, 10),
    []
  );

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount}
      </h2>
      <div>
        {items.map((item) => (
          <div className="cart-item" key={item?.name}>
            <img
              className="cart-item-image"
              src={item?.image}
              alt={item?.name}
            />
            <div className="cart-item-details">
              <div className="cart-item-name">{item?.name}</div>
              <div className="cart-item-cost">{item?.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrementClick(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item?.quantity || 0}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrementClick(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateItemTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemoveClick(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShoppingClick}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => alert('Functionality to be added for future reference')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
