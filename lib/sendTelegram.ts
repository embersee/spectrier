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
