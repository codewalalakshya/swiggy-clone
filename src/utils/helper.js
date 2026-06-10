export const filterTopRated = (restaurants) => {
  return restaurants.filter((res) => res?.info?.avgRating >= 4.3);
};

export const formatPrice = (price) => {
  if (!price) return "₹0";
  return `₹${(price / 100).toFixed(0)}`;
};

export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "…" : str;
};
