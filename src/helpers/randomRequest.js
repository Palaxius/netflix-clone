import requests from "./requests";

const arrayOfRequests = Object.keys(requests)
const randomNumberOfRequest = Math.floor(Math.random() * arrayOfRequests.length)
export const randomRequest = arrayOfRequests[randomNumberOfRequest]