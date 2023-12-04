export const usePromotion = (promotion) => {
    return {
      type: 'USE_PROMOTION',
      payload: { promotion }
    };
  };
  