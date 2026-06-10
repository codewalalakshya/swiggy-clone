export const IMG_CDN_URL = "/proxy-image?url=https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
export const SWIGGY_API_URL = "/api/restaurants";
export const MENU_API_URL = "/api/menu?id=";
export const FILTER_BUTTONS = ["Burgers", "Pizza", "Biryani", "North Indian", "Chinese", "South Indian", "Desserts", "Healthy"];
export const DUMMY_RESTAURANTS = [
  { info: { id: "1001", name: "Burger King", cuisines: ["Burgers", "American"], avgRating: 4.3, totalRatingsString: "10K+", sla: { deliveryTime: 25 }, costForTwo: "₹300 for two", cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2026/2/12/7a25cc2e-090a-4883-a7fa-f815c886a841_10576.JPG", locality: "Koramangala", areaName: "Koramangala", promoted: false, aggregatedDiscountInfoV3: { header: "60% OFF", subHeader: "UPTO ₹120" } } },
  { info: { id: "1002", name: "Pizza Hut", cuisines: ["Pizzas", "Italian"], avgRating: 4.1, totalRatingsString: "20K+", sla: { deliveryTime: 30 }, costForTwo: "₹400 for two", cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2026/2/12/7a25cc2e-090a-4883-a7fa-f815c886a841_10576.JPG", locality: "Indiranagar", areaName: "Indiranagar", promoted: false, aggregatedDiscountInfoV3: { header: "₹125 OFF" } } },
  { info: { id: "1003", name: "McDonald's", cuisines: ["Burgers", "Beverages"], avgRating: 4.4, totalRatingsString: "50K+", sla: { deliveryTime: 20 }, costForTwo: "₹400 for two", cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2026/2/12/7a25cc2e-090a-4883-a7fa-f815c886a841_10576.JPG", locality: "MG Road", areaName: "MG Road", promoted: false, aggregatedDiscountInfoV3: { header: "FREE DELIVERY" } } },
];
export const DUMMY_MENU = {
  id: "1001", name: "Burger King", cuisines: ["Burgers"], avgRating: 4.3,
  totalRatingsString: "10K+", costForTwo: "₹300 for two", sla: { deliveryTime: 25 },
  categories: [
    { title: "🔥 Bestsellers", items: [
      { id: "m1", name: "Whopper Burger", price: 19900, description: "Flame-grilled beef patty", isVeg: false, rating: 4.5 },
      { id: "m2", name: "Crispy Veg Burger", price: 12900, description: "Crispy veggie patty", isVeg: true, rating: 4.3 },
    ]},
  ],
};
