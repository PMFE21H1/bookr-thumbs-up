import { createResource, Resource, deleteResource } from "./resources/resources";

deleteResource("erzgt").then(response=>response.json()).then(data=>console.log(data))

function App() {
  return (
    <div>
    </div>
  );
}

export default App;
