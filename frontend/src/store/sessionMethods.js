export const loadState = (key, defaultValues) => {
  try {
    const newState = sessionStorage.getItem(key);
    if (newState === null) {
      return defaultValues; // Return default if key doesn't exist
    }
    return JSON.parse(newState); // Parse the stored value
  } catch (err) {
    console.error("Error loading state:", err);
    return defaultValues; // Return default in case of an error
  }
};

export const saveState = (key, obj) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(obj));
    return true; // Indicate success
  } catch (err) {
    console.error("Error saving state:", err);
    return false; // Indicate failure
  }
};
