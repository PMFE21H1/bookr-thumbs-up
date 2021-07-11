import { createResource, Resource, listResources } from "../resources/resources";

function TestResources() {
    return (
      <div>
          <button onClick={() => listResources().then(resources =>console.log(resources))}>list resources</button>
      </div>
    );
  }
  
  export default TestResources;