import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { nanoid } from "nanoid";
import redis from "../../../lib/redis";
import { isValidHttpUrl } from "../../../lib/utils";
import { BASE_URL } from "../../../lib/constants";

export default nextConnect<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    if (typeof req.body === "string")
      return res
        .status(422)
        .send({ message: "Request must contain body of type string (URL)." });
    const link = Object.keys(req.body);
    if (link.length > 0) {
      if (isValidHttpUrl(link[0])) {
        const id = nanoid();
        redis.set(id, link[0]);
        res.status(200).send(BASE_URL + "/" + id);
      } else {
        res
          .status(400)
          .send({ message: "Body string is not a valid http url." });
      }
    } else {
      res.status(422).send({ message: "Body must be the url string." });
    }
  }
);
