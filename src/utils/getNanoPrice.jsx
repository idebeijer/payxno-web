import axios from "axios";

export const getNanoPrice = async () => {
  return await axios({
    method: "get",
    url: `https://api.coingecko.com/api/v3/simple/price?ids=nano&vs_currencies=eur`,
    timeout: 10000,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
