"use server"

import { db } from "@/lib/db"
import {
	NewOrder,
	NewProductsToOrders,
	NewUser,
	category,
	insertProductsToOrder,
	insertUser,
} from "@/lib/db/schema"
import { SendTelegram } from "@/lib/sendTelegram"
import { storeProduct } from "@/types/products"

import { insertOrder } from "@/lib/db/schema"

export async function getCategories() {
	return await db.select().from(category)
}

export async function sendInvoiceToSupport(
	cart: storeProduct[],
	totalSum: number,
	comment: string,
  address: string,
	userValues: NewUser
) {
	const userExists = await db.query.user.findFirst({
		where: (users, { eq }) => eq(users.telegramId, userValues.telegramId),
	})

	const sendMessageToUser = async () => {
		const items = cart
			.map((item) => `${item.quantity} x ${item.name} – ${item.price}\n`)
			.join("")

		const message = `*Ваш Заказ:*
${items}
––––––––––––––
*Total:* ${totalSum} Рублей
${
	comment &&
	`––––––––––––––
*Ваш комментарий:* ${comment}`
}
${
  address && 
`––––––––––––––
*Адрес доставки:* ${address}`
}`

		const res = await SendTelegram(
			userValues.telegramId?.toString() as string,
			message
		)

		await res.json().then((data) => console.log(data))
	}

	if (userExists) {
		await db
			.transaction(async (tx) => {
				const NewOrder: NewOrder = {
					userId: userExists.id,
					comment: comment,
					orderStatus: "created",
					address: address, 
					paymentType: "support",
					paymentStatus: "incomplete",
					totalSum,
				}

				const newOrder = await insertOrder(NewOrder)

				const NewProductsToOrders: NewProductsToOrders[] = cart.map((v) => ({
					orderId: newOrder[0].orderId,
					productId: v.id,
					quantity: v.quantity,
				}))

				await insertProductsToOrder(NewProductsToOrders)
			})
			.then(async () => {
				sendMessageToUser()
			})
	} else {
		await db
			.transaction(async (tx) => {
				const newUser = await insertUser(userValues)

				const NewOrder: NewOrder = {
					userId: newUser[0].userId,
					comment: comment,
					orderStatus: "created",
					address: address, 
					paymentType: "support",
					paymentStatus: "incomplete",
					totalSum,
				}

				const newOrder = await insertOrder(NewOrder)

				const NewProductsToOrders: NewProductsToOrders[] = cart.map((v) => ({
					orderId: newOrder[0].orderId,
					productId: v.id,
					quantity: v.quantity,
				}))

				const newProductsToOrder = await insertProductsToOrder(
					NewProductsToOrders
				)
			})
			.then(async () => {
				sendMessageToUser()
			})
	}
}
