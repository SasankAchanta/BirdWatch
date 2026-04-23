//simple function to get all the true birds from the birds caught array
import { getCaughtBirds } from "./api.js";

export const getCaughtBirdNames = async (token) => {
  try {

    //get data
    const data = await getCaughtBirds(token);

    let birds = {};

    //does the bird exist
    if (data) {
      if (data["bird checklist"]) {
        if (data["bird checklist"][0]) {
          if (data["bird checklist"][0].birds) {
            birds = data["bird checklist"][0].birds;
          }
        }
      }
    }

    //get only true birds
    const result = [];

    for (let name in birds) {
      if (birds[name] === true) {
        result.push(name);
      }
    }

    return result;

  } catch (err) {
    console.log("Failed to get caught birds:", err);
    return [];
  }
};