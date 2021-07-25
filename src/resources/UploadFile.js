import React from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
const barbersRef = ref(storage, 'barbers');

export default class UploadFile extends React.Component {
    
    fileChanged = (e) => {
        console.log(e.target);
    }
    
    render() {
        return (
            <>
                <input type="file" onChange={this.fileChanged}></input>
                <button>Upload</button>
            </>
        )
    }
}

export default UploadFile
