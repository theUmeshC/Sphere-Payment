import CreateCustomer from "./components/CreateCustomer";
import FileUploadComponent from "./components/FileUpload";
import WebhookHandler from "./components/Webhook";

function App() {
  return (
    <div>
      <CreateCustomer />
      <WebhookHandler />
      <FileUploadComponent />
    </div>
  );
}

export default App;
