export const initialState = {
  toggle: false,
  displayCart: false,
  displayFavourites: false,
  displayNotifications: false,
  displayCartNotification: false,
};

export const displayReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'displayCart':
      return {
        displayCart: true,
        toggle: !state.toggle,
      };

    case 'displayNotification':
      return {
        displayNotification: !state.displayNotification,
        toggle: !state.toggle,
      };
    case 'displayCartNotification':
      return {
        displayCartNotification: true,
        toggle: true,
      };
    case 'disableCartNotification':
      return {
        displayCartNotification: true,
        toggle: false,
      };
    default:
      break;
  }
};
