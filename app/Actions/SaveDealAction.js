export const saveDeal = (deal, unsave, dealType) => {
    return {
      type: 'SAVE_DEAL',
      payload: { deal, unsave, dealType}
    };
  };
  