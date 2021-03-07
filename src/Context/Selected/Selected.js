import React from 'react';

const Selected = React.createContext({
    selection: [],
    addToSelection: () => {},
    removeFromSelection: () => {},
});

export default Selected;
