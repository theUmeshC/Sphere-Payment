// WebhookHandler.js
import axios from "axios";

const WebhookHandler = () => {
  const test = async () => {
    const response = await axios.post(
      "https://api.spherepay.co/v1/webhook",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SPHERE_API_KEY}`,
        },
      },
      {
        event: ["customer.kyc.successful"],
      }
    );
    const webhookResponse = response
      .then((result) => result.json())
      .catch((error) => console.error);
    console.log(webhookResponse);
  };

  return (
    <div>
      {/* <h2>Webhook Data</h2>
      {webhookData ? (
        <pre>{JSON.stringify(webhookData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )} */}
      <button onClick={test}>Webhook</button>
    </div>
  );
};

export default WebhookHandler;
