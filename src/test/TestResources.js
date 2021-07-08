import { createResource, Resource, listResources } from "../resources/resources";

function App() {
    return (
      <div>
          <button onClick={() => listResources().then(resources =>console.log(resources))}>list resources</button>
      </div>
    );
  }
  
  export default App;