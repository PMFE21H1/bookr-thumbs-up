import { createResource, Resource } from "./resources/resources";

let resource = new Resource("Room 303");
let promise = createResource(resource);
promise.then(created => console.log(created));


function App() {
  return (
    <div>
    </div>
  );
}

export default App;
