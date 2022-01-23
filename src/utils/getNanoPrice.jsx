import axios from "axios";

export const getNanoPrice = async (currency) => {
  return await axios({
    method: "get",
    url: `https://api.coingecko.com/api/v3/simple/price?ids=nano&vs_currencies=${currency}`,
    timeout: 10000,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
};
