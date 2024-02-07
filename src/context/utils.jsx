import React from "react";

// Creating the context object and passing the default values.
const UtilContext = React.createContext({
  loading: null,
  setLoading: () => {},
});

export default UtilContext;
