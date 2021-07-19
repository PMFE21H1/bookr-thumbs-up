import React from "react";
import { getAuth } from "firebase/auth";
import {createResource, listResources} from "../resources/resources";
import { Route, Link } from "react-router-dom";
import { updateReservation } from './reservations'
import SlotSelector from "./SlotSelector";
import UserSelector from "./UserSelector";
import { UsersDatabaseContext } from "../App";

export default class UpdateReservationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //itt olvassuk ki az id-t az url-bol
      reservationID: this.props.match.params.reservationID,
      reservationData: {},
      resources:[],
    };
  }
  // fetchelunk az url-bol kiolvasott id alapjan egy reservationt
  componentDidMount = () => {
    return fetch(
      `https://bookr-thumbs-up-default-rtdb.europe-west1.firebasedatabase.app/reservations/${this.state.reservationID}.json`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((reservation) => {
        //a lekert reservation adatait setStateljuk es beleirjuk a reservationDatankba.
        this.setState({
          reservationData: {
            name: reservation.customer,
            resource: reservation.resource,
            //mivel a slot magaba foglalja a datet es a timeot ezert a split hasznalataval szetszedtuk azokat
            date: reservation.slot.split("T")[0],
            time: reservation.slot.split("T")[1],
          },
        });
      })
        .then(()=>{
            listResources().then(resourcesArr => resourcesArr.map(
                resource => {
                  this.setState(() => {
                    return {resources: [...this.state.resources, resource]}
                  })
                }
            ))
        });

  };
  handleName = (newUserName) => {
    this.setState({
      reservationData: {...this.state.reservationData, name: newUserName}
    });

  };

  changeResource = (e) => {
    this.state.resources.forEach(resource => {
      if (resource.id === e.target.value){
        this.setState({ resource:resource.id})
      }
    })
    console.log(this.state)
  }
    changeSlot=(date,time)=>{
        this.setState({reservationData:{...this.state.reservationData, date:date, time:time}})
        console.log(this.state)
    }
  render() {
    return (
      <div>

                        <UsersDatabaseContext.Consumer>
                            {(props) => console.log(props.users)}
                        </UsersDatabaseContext.Consumer>
        <form>
          <h3>Update reservation</h3>

          <select onChange={e =>this.changeResource(e)} value={this.state.resource}>
            <option value={null}>Select a resource</option>

            {(this.state.resources!==[]) ?

                this.state.resources.map(resource =>
                    <option key={resource.id} value={resource.id}>{resource.name}</option>
                )

                :

                ""
            }

          </select>

          <p>Update name</p>
            <UserSelector onHandleName={this.handleName}/>
            <SlotSelector resource={this.state.resource} changeSlot={this.changeSlot}></SlotSelector>

        </form>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              try {
                //itt hasznaljuk fel ujbol a reservationID-t amit a statbol olvasunk ki(ez az elso parameter amit a fg. var)
                updateReservation(this.state.reservationID, 
                  //ez lesz az uj reservation amivel updatelni szeretnenk azt (newData)
                  {customer: this.state.reservationData.name,
                     slot: this.state.reservationData.date + 'T' + this.state.reservationData.time, resource:this.state.resource})
                     .then(()=>this.props.history.push('/admin/reservations'))
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            Apply
          </button>
          <Link to='/admin/reservations'>Cancel</Link>
        </div>
      </div>
    );
  }
}
