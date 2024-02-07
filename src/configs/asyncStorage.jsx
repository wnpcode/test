const prefix = "POSTKI_";
const prefixLocal = "POSTKILOCAL_";

export const setSessionStorage = async (name, value) => {
  return new Promise((resolve, reject) => {
    try {
      sessionStorage.setItem(`${prefix}${name}`, value);
      setTimeout(() => {
        resolve();
      }, 1000);
    } catch (error) {
      reject();
    }
  });
};

export const getSessionStorage = (name) => {
  return sessionStorage.getItem(`${prefix}${name}`);
};

export const removeSessionStorage = async (name) => {
  return new Promise((resolve, reject) => {
    try {
      sessionStorage.removeItem(`${prefix}${name}`);
      setTimeout(() => {
        resolve();
      }, 1000);
    } catch (error) {
      reject();
    }
  });
};

export const setLocalStorage = async (name, value) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(`${prefixLocal}${name}`, value);
      setTimeout(() => {
        resolve();
      }, 1000);
    } catch (error) {
      reject();
    }
  });
};

export const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(`${prefixLocal}${name}`) || "[]");
};

export const removeLocalStorage = async (name) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(`${prefixLocal}${name}`);
      setTimeout(() => {
        resolve();
      }, 1000);
    } catch (error) {
      reject();
    }
  });
};
