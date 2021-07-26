import React from "react";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../reservations/reservations";

const storage = getStorage(firebaseApp);
const barbersRef = ref(storage, 'barbers');
const barberImgRef = ref(storage, 'barbers/barber.jpg');
const rootRef = ref(storage)

export default class UploadFile extends React.Component {
    constructor(props){
        super(props)
        this.state={
            file: null,
            uploads: [],
        }
    }

    componentDidMount(){
        listAll(rootRef)
        .then(listResult => {
            let urls = listResult.items.map(item => getDownloadURL(item))
            Promise.all(urls).then(urls => this.setState({uploads: urls}))
            console.log(urls)
            console.log(listResult.prefixes)
            
        })
    }

    fileChanged = (e) => {
        this.setState({file: e.target.files[0]});
    }
    
    upload = () => {
        const barberImgRef = ref(storage, `barbers/${this.state.file.name}`);
        uploadBytes(barberImgRef, this.state.file)
        .then(uploadResult => console.log(uploadResult))
        .catch(uploadError => console.log(uploadError))
    }

    render() {
        return (
            <>
                <input type="file" onChange={this.fileChanged}></input>
                <button onClick={this.upload}>Upload</button>
                <h3>UPLOADS</h3>
                {this.state.uploads.map( url => <img src={url} /> )}
            </>
        )
    }
}

