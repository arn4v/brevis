import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"
import redis from "../../../lib/redis"
import { isValidHttpUrl } from "../../../lib/utils"
import { BASE_URL } from "../../../lib/constants"
import { nanoid } from "nanoid"

export default nextConnect<NextApiRequest, NextApiResponse>().post(
	async (req, res) => {
		const contentType = req.headers["content-type"]
		if (contentType === "text/plain") {
			const url = req.body
			if (isValidHttpUrl(url)) {
				const existingId = await redis.get(url)
				if (typeof existingId === "string") {
					res.status(409).send(BASE_URL + "/" + existingId)
				} else {
					const id = nanoid(8)
					await redis.set(id, url)
					await redis.set(url, id)
					res.status(200).send(BASE_URL + "/" + id)
				}
			} else {
				res
					.status(400)
					.send({ message: "Body string is not a valid http url." })
			}
		} else {
			res
				.status(400)
				.send({ message: 'Content-Type must always be "text/plain".' })
		}
	}
)
