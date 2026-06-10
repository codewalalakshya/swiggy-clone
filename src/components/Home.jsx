import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard.jsx";
import ShimmerUI from "./ShimmerUI.jsx";
import { SWIGGY_API_URL, DUMMY_RESTAURANTS, FILTER_BUTTONS } from "../utils/constants";
import { filterTopRated } from "../utils/helper";

const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [topRatedActive, setTopRatedActive] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(SWIGGY_API_URL);
        const json = await response.json();
        const cards = json?.data?.cards || [];

        // Collect all restaurants from all cards
        let list = [];
        cards.forEach((c) => {
          const restaurants = c?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          if (restaurants?.length > 0) {
            list = [...list, ...restaurants];
          }
        });

        // Remove duplicates by id
        const seen = new Set();
        list = list.filter((r) => {
          if (seen.has(r?.info?.id)) return false;
          seen.add(r?.info?.id);
          return true;
        });

        if (isMounted) {
          if (list.length > 0) {
            setAllRestaurants(list);
            setFilteredRestaurants(list);
          } else {
            setAllRestaurants(DUMMY_RESTAURANTS);
            setFilteredRestaurants(DUMMY_RESTAURANTS);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (isMounted) {
          setAllRestaurants(DUMMY_RESTAURANTS);
          setFilteredRestaurants(DUMMY_RESTAURANTS);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchRestaurants();
    return () => { isMounted = false; };
  }, []);

  const handleSearch = () => {
    const results = allRestaurants.filter((r) =>
      r?.info?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      r?.info?.cuisines?.join(", ").toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(results);
    setTopRatedActive(false);
    setActiveFilter("All");
  };

  const handleTopRated = () => {
    if (topRatedActive) {
      setFilteredRestaurants(allRestaurants);
    } else {
      setFilteredRestaurants(filterTopRated(allRestaurants));
    }
    setTopRatedActive(!topRatedActive);
  };

  const handleCuisineFilter = (cuisine) => {
    if (activeFilter === cuisine) {
      setActiveFilter("All");
      setFilteredRestaurants(allRestaurants);
      return;
    }
    setActiveFilter(cuisine);
    setTopRatedActive(false);
    const results = allRestaurants.filter((r) =>
      r?.info?.cuisines?.join(", ").toLowerCase().includes(cuisine.toLowerCase())
    );
    setFilteredRestaurants(results);
  };

  if (loading) return <ShimmerUI />;

  return (
    <main className="home">
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Hungry? <span className="hero-highlight">We've got you.</span></h1>
          <p className="hero-sub">Order food from the best restaurants near you</p>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for restaurants, cuisines..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {searchText && (
              <button className="search-clear" onClick={() => { setSearchText(""); setFilteredRestaurants(allRestaurants); }}>✕</button>
            )}
            <button className="search-btn" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      <div className="home-content">
        <section className="filter-section">
          <div className="filter-chips">
            <button className={`chip ${topRatedActive ? "chip-active" : ""}`} onClick={handleTopRated}>⭐ Top Rated</button>
            {FILTER_BUTTONS.map((f) => (
              <button key={f} className={`chip ${activeFilter === f ? "chip-active" : ""}`} onClick={() => handleCuisineFilter(f)}>{f}</button>
            ))}
          </div>
        </section>

        <div className="results-header">
          <h2 className="section-title">
            {topRatedActive ? "⭐ Top Rated" : activeFilter !== "All" ? `${activeFilter} Restaurants` : "All Restaurants Near You"}
          </h2>
          <span className="results-count">{filteredRestaurants.length} places</span>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="no-results">
            <div className="no-results-emoji">🍽️</div>
            <h3>No restaurants found</h3>
            <p>Try a different search or filter</p>
            <button className="btn-primary" onClick={() => { setSearchText(""); setActiveFilter("All"); setTopRatedActive(false); setFilteredRestaurants(allRestaurants); }}>Clear Filters</button>
          </div>
        ) : (
          <div className="restaurant-grid">
            {filteredRestaurants.map((restaurant) =>
              restaurant?.info?.promoted ? (
                <PromotedRestaurantCard key={restaurant.info.id} resData={restaurant} />
              ) : (
                <RestaurantCard key={restaurant.info.id} resData={restaurant} />
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
