export async function SendTelegram(reciever: string, message: string) {
  const res = await fetch(
    `https://api.telegram.org/bot${
      process.env.BOT_TOKEN
    }/sendMessage?chat_id=${reciever}&text=${encodeURIComponent(
      message
    )}&parse_mode=MarkdownV2`
  );

  return res;
}

export async function SendTelegramPhoto(
  reciever: string,
  message: string,
  imageUrl: string
) {
  const res = await fetch(
    `https://api.telegram.org/bot${
      process.env.BOT_TOKEN
    }/sendPhoto?chat_id=${reciever}&photo=${encodeURIComponent(
      imageUrl
    )}&caption=${encodeURIComponent(message)}&parse_mode=MarkdownV2`
  );

  return res;
}
