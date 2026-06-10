import { useState, useEffect } from "react";
import { MENU_API_URL, DUMMY_MENU } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API_URL + resId);
      if (!response.ok) throw new Error("API blocked");
      const json = await response.json();
      const restaurantData =
        json?.data?.cards?.[2]?.card?.card?.info ||
        json?.data?.cards?.[0]?.card?.card?.info;
      const menuCategories =
        json?.data?.cards
          ?.find((c) => c?.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards
          ?.filter((c) => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
          ?.map((c) => ({
            title: c?.card?.card?.title,
            items: c?.card?.card?.itemCards?.map((item) => ({
              id: item?.card?.info?.id,
              name: item?.card?.info?.name,
              price: item?.card?.info?.price || item?.card?.info?.defaultPrice,
              description: item?.card?.info?.description,
              isVeg: item?.card?.info?.itemAttribute?.vegClassifier === "VEG",
              rating: item?.card?.info?.ratings?.aggregatedRating?.rating,
            })) || [],
          })) || [];
      if (restaurantData) {
        setResInfo({ ...restaurantData, categories: menuCategories });
      } else {
        setResInfo(DUMMY_MENU);
      }
    } catch {
      setResInfo(DUMMY_MENU);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
