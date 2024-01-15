import axios from "axios";
import { API_BASE_URL, API_AUTH_URL } from "../../globals.js";
import { verifyToEqual } from "../../utils.js";

export async function placeBid({bid, productId, token, responseStatus=200, responseData}) { 
  let response = await axios.post(`${API_BASE_URL}/bids`, {
    bid: bid,
    productId: productId,
  },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  verifyToEqual(response.status, responseStatus);
  if(responseData){
    verifyToEqual(response.data, responseData)
  }
  return response
}
