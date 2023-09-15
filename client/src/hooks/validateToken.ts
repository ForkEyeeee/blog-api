// @ts-nocheck

const validateToken = tokenData => {
  if (tokenData !== undefined) {
    const cTs = Math.floor(Date.now() / 1000);
    return tokenData.exp >= cTs;
  }
  return;
};

export default validateToken;
