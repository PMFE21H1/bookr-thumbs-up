import React from "react";

export default class ResourceTaxonomy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newResourceTextSingular: "",
            newResourceTextPlural: "",
            newUrl: ""
        }
    }

    updateTaxonomy = () => {

                fetch(`https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/taxonomy.json`,
                    {
                        body: JSON.stringify({resource :this.state.newResourceTextSingular ,resources:this.state.newResourceTextPlural ,url:this.state.newUrl}),
                        method: "PUT"
                    }
                ).then(this.props.taxonomyChange(this.state.newResourceTextSingular,this.state.newResourceTextPlural,this.state.newUrl))
    }

    updateNewResourceTextSingular = (e) => {
        this.setState({
            newResourceTextSingular: e.target.value
        })
    }

    updateNewResourceTextPlural = (e) => {
        this.setState({
            newResourceTextPlural: e.target.value,
            newUrl:  e.target.value.toLowerCase()
        })
    }

    render() {
        return (
            <>
                <h2>Change Resource Name</h2>

                <label>Singular Name</label>
                <input value={this.state.newResourceTextSingular} onChange={this.updateNewResourceTextSingular}/>
                <label>Plural Name</label>
                <input value={this.state.newResourceTextPlural} onChange={this.updateNewResourceTextPlural}/>
                <button onClick={this.updateTaxonomy}>Submit</button>
            </>
        )
    }
}