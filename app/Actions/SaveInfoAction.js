export const saveInfo = (firstName, lastName, phone, email, image) => {
    return {
      type: 'SAVE_INFO',
      payload: { firstName, lastName, phone, email, image, points, balance }
    };
  };
  