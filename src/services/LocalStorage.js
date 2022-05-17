const LocalStorage = {
  storeData: (KEY, data) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      // saving error
      console.log("Storage error: ", e);
    }
  },
  getData: (KEY) => {
    try {
      const value = window.localStorage.getItem(KEY);
      console.log(value);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (e) {
      console.log("Storage retrieve error: ", e);
    }
    return null;
  },
  delete: (KEY) => {
    window.localStorage.removeItem(KEY);
  },
};

export default LocalStorage;
