import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import MenuCategory from "./MenuCategory";
import ShimmerUI from "./ShimmerUI";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!resInfo) return <ShimmerUI type="menu" />;

  const { name, cuisines, avgRating, totalRatingsString, costForTwo, sla, categories = [] } = resInfo;

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <div className="menu-hero-content">
          <h1 className="menu-res-name">{name}</h1>
          <p className="menu-cuisines">{cuisines?.join(", ")}</p>
          <div className="menu-meta">
            <div className="menu-stat">
              <span className="menu-stat-value rating-green">★ {avgRating}</span>
              <span className="menu-stat-label">{totalRatingsString} ratings</span>
            </div>
            <div className="menu-divider" />
            <div className="menu-stat">
              <span className="menu-stat-value">🕐 {sla?.deliveryTime} mins</span>
              <span className="menu-stat-label">Delivery Time</span>
            </div>
            <div className="menu-divider" />
            <div className="menu-stat">
              <span className="menu-stat-value">{costForTwo}</span>
              <span className="menu-stat-label">Cost for two</span>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-filter-bar">
        <div className="veg-toggle">
          <span className="veg-icon">🟢</span>
          <span>Veg Only</span>
        </div>
        <div className="menu-search-mini">
          <span>🔍</span>
          <input type="text" placeholder="Search within menu..." className="menu-search-input" />
        </div>
      </div>

      <div className="menu-categories">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <MenuCategory
              key={category?.title || index}
              data={category}
              isExpanded={expandedIndex === index}
              onToggle={() => setExpandedIndex(index === expandedIndex ? null : index)}
            />
          ))
        ) : (
          <div className="no-results"><p>No menu items available.</p></div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
