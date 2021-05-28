import mailchimp from "@mailchimp/mailchimp_marketing"

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us6",
})

export default async (req, res) => {
  console.log(req.body)
  const userEmail = req.body.email

  if (!userEmail)
    return res.status(400).json({ message: "Twoje dane są błędne :(" })

  const data = {
    members: [
      {
        email_address: userEmail,
        status: "pending",
      },
    ],
    update_existing: true,
  }

  const response = await mailchimp.lists.batchListMembers("29f43bd0dc", data)

  console.log(response)

  if (response.total_created || response.total_updated)
    return res.status(200).json({
      message: "Na Twojego maila została wysłana wiadomość weryfikacyjna!",
    })

  if (response.error_count)
    return res
      .status(400)
      .json({ message: "Niestety wystąpił problem. Spróbuj ponownie później." })

  res.status(500).json({ message: "Błąd po stronie serwera" })
}
