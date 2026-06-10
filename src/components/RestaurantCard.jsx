import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";
import { truncate } from "../utils/helper";

const COLORS = ["#ff6b6b","#feca57","#48dbfb","#ff9ff3","#54a0ff","#5f27cd","#00d2d3","#ff9f43","#10ac84","#ee5a24"];
const getColor = (name = "") => COLORS[name.charCodeAt(0) % COLORS.length];

const RestaurantCard = ({ resData }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const { id, name, cuisines, avgRating, sla, costForTwo, cloudinaryImageId, locality, aggregatedDiscountInfoV3 } = resData?.info || {};

  const getRatingClass = () => {
    if (avgRating >= 4.3) return "rating-green";
    if (avgRating >= 4.0) return "rating-yellow";
    return "rating-red";
  };

  const imageUrl = cloudinaryImageId ? IMG_CDN_URL + cloudinaryImageId : null;

  return (
    <div className="restaurant-card" onClick={() => navigate(`/restaurant/${id}`)}>
      <div className="card-img-wrapper">
        {imageUrl && !imgError ? (
          <img className="card-img" src={imageUrl} alt={name} onError={() => setImgError(true)} />
        ) : (
          <div className="card-img-placeholder" style={{ background: `linear-gradient(135deg, ${getColor(name)}, ${getColor(name + "x")})` }}>
            <span className="card-img-emoji">🍽️</span>
            <span className="card-img-name">{name}</span>
          </div>
        )}
        {aggregatedDiscountInfoV3?.header && (
          <div className="card-offer">
            <span>{aggregatedDiscountInfoV3.header}</span>
            {aggregatedDiscountInfoV3.subHeader && <span className="offer-sub"> {aggregatedDiscountInfoV3.subHeader}</span>}
          </div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-cuisines">{truncate(cuisines?.join(", "), 40)}</p>
        <div className="card-meta">
          <span className={`card-rating ${getRatingClass()}`}>★ {avgRating}</span>
          <span className="card-dot">•</span>
          <span className="card-time">🕐 {sla?.deliveryTime} mins</span>
          <span className="card-dot">•</span>
          <span className="card-cost">{costForTwo}</span>
        </div>
        {locality && <p className="card-locality">📍 {locality}</p>}
      </div>
    </div>
  );
};

export const withPromotedLabel = (WrappedComponent) => (props) => (
  <div className="promoted-wrapper">
    <span className="promoted-tag">⚡ Promoted</span>
    <WrappedComponent {...props} />
  </div>
);

export default RestaurantCard;
