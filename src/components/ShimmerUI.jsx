import React from "react";

const ShimmerCard = () => (
  <div className="shimmer-card">
    <div className="shimmer shimmer-img" />
    <div className="shimmer-info">
      <div className="shimmer shimmer-title" />
      <div className="shimmer shimmer-text" />
      <div className="shimmer shimmer-text shimmer-short" />
    </div>
  </div>
);

const ShimmerUI = ({ type }) => {
  if (type === "menu") {
    return (
      <div className="shimmer-menu">
        <div className="shimmer shimmer-menu-hero" />
        <div className="shimmer-menu-items">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="shimmer-menu-row">
              <div className="shimmer-menu-left">
                <div className="shimmer shimmer-menu-title" />
                <div className="shimmer shimmer-menu-text" />
                <div className="shimmer shimmer-menu-price" />
              </div>
              <div className="shimmer shimmer-menu-img" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="shimmer-container">
      <div className="shimmer shimmer-hero" />
      <div className="shimmer-chips">
        {[1,2,3,4,5].map((i) => <div key={i} className="shimmer shimmer-chip" />)}
      </div>
      <div className="shimmer-grid">
        {Array(8).fill("").map((_, i) => <ShimmerCard key={i} />)}
      </div>
    </div>
  );
};

export default ShimmerUI;
