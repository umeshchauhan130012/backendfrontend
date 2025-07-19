import API from "./apiPath";

export const fetchHeaderLogo = async () => {
  try {
    const response = await API.get("/headerlogo");
    return response.data;
  } catch (error) {
    console.error("Error fetching header logo:", error);
    return [];
  }
};

export const fetchTv = async () => {
  try {
    const response = await API.get("/youtubelink");
    return response.data;
  } catch (error) {
    console.error("Error fetching Tv Link:", error);
    return [];
  }
};

export const fetchHeadMenu = async () => {
  try {
    const response = await API.get("/menuitem");
    return response.data;
  } catch (error) {
    console.error("Error fetching header menu:", error);
    return [];
  }
};

export const fetchFootLogo = async () => {
  try {
    const response = await API.get("/footerlogo");
    return response.data;
  } catch (error) {
    console.error("Error fetching footer logo:", error);
    return [];
  }
};

export const fetchFootMenu = async () => {
  try {
    const response = await API.get("/footmenuitem");
    return response.data;
  } catch (error) {
    console.error("Error fetching footer links:", error);
    return [];
  }
};

export const fetchNetwork = async () => {
  try {
    const response = await API.get("/networkmenuitem");
    return response.data;
  } catch (error) {
    console.error("Error fetching network links:", error);
    return [];
  }
};

export const fetchCopyright = async () => {
  try {
    const response = await API.get("/copyright");
    return response.data;
  } catch (error) {
    console.error("Error fetching copyright:", error);
    return [];
  }
};