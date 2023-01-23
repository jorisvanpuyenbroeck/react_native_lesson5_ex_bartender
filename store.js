import { atom } from 'recoil';


export const categoryState = atom({
    key: "categoryState", // unique ID (with respect to other atoms/selectors)
    default: "1", // default value (aka initial value)
  });

  export const orderListState = atom({
    key: "orderListState",
    default: [],
  });

