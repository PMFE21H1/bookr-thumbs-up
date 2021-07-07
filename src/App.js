import { createResource, Resource, listResources } from "./resources/resources";

let resource = new Resource("Room 305");



function App() {
  return (
    <div>
      <button onClick={() => createResource(resource).then(created => console.log(created))}>Add resource</button>
      <button onClick={() => listResources().then(resources => console.log(resources))}>Get resources</button>
    </div>
  );
}

export default App;
