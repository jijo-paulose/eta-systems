import React, { Component } from "react";
import { connect } from "react-redux";
import { getDistance,getAddress } from "./helpers";
import MapWidget from "../../components/mapWidget"
import { Button,Row, Col } from 'antd';
import notification from "../../components/notification";

let start;
let polyLines = []
const mapDispatchToProps = ({ delivery }) => {
    return {
        ...delivery
    };
};

const mapStateToProps = ({ delivery }) => {
    return {
        ...delivery
    };
};

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false
        }
    }

    componentDidMount() {
       this.init()
    }
    async init() {
        await this.props.listOrder()
        this.currentActive()
    }
   
   
    newLocation(lat,lng) {
        polyLines.push({lat,lng})
    }
    initialLocation(lat,lng) {
        start = {lat,lng}
    }
    async generateOrder(){
        await this.props.genarateOrder()
    }
    currentActive(){
        let obj = this.props.orders.find(o => o.orderState === "ACTIVE_DELIVERY");
        console.log(obj)
        this.setState({current:obj})


    }
    async startDelivery(item,index){
        this.setState({loading:true,index})
        if(item.orderState ===  "ON_DELIVERY"){
            let locations = await getAddress(item.place)
            if(locations && locations.results && locations.results.length){
                let end = locations.results[0] && locations.results[0].geometry && locations.results[0].geometry.location
                if(index === 0){
                    item.location.start = start
                    item.location.current = start
                }
                item.location.end = end
                item.action = "start"
            }else{
                notification("error", "Unable to start.Location not found");
                
            }   
        }else if(item.orderState ===  "ACTIVE_DELIVERY"){
            item.action = "finish"
            if(this.props.orders && this.props.orders[index +1]){
                let nextLoc = this.props.orders[index +1]
                let nextlocations = await getAddress(nextLoc.place)
                if(nextlocations && nextlocations.results && nextlocations.results.length){
                    item.nextend = nextlocations.results[0] && nextlocations.results[0].geometry && nextlocations.results[0].geometry.location
                }
            }

        }     
        await this.props.updateOrder(item)
        this.setState({loading:false,index:null})
        this.currentActive()
    }
    getButtonText(item,index){
        let label = "Start"
        if(item.orderState === 'FINISHED_DELIVERY')
            label = "Done"
        else if(item.orderState === 'ACTIVE_DELIVERY')
            label = "Finish"
        else if(item.orderState === "ON_DELIVERY" && index !== 0)    
            label = "Pending Previous"
        return label
    }
    render() {
        return (
            <main className="main-content-area" >
                <header className="splash-screen-header">
                    <MapWidget
                        newLocation={this.newLocation.bind(this)}
                        initialLocation={this.initialLocation.bind(this)}
                        currentData={this.state.current}
                        polyLines={polyLines}
                    />
                    {this.props.orders ? 
                   <section className="main-content-area">
                       <center><Button type="primary" onClick={this.generateOrder.bind(this)} style={{maxWidth: "50%"}} block>Generate Multiple Order Delivery</Button></center> 
                        <div>
                        <center>
                            <p>Current Delivery List:</p>
                            <p><b>ETA</b></p>
                            {this.props.orders.map((item,index) => (
                            <Row key={index}>
                                <Col xs={2} sm={4} md={6} lg={8} xl={10} style={{paddingTop: "10px",paddingBottom: "10px"}}>
                                     <center><b>{index + 1 }) {item.place}</b></center>
                                </Col>
                                <Col xs={20} sm={16} md={12} lg={8} xl={4} style={{paddingTop: "10px",paddingBottom: "10px"}}>
                                    <span className={"border-span"}>{item.location  && item.location.current &&  item.location.end && item.orderState === 'ACTIVE_DELIVERY'  ? `${getDistance(item.location.current,item.location.end)} min` : '-'}</span>
                                </Col>
                                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                    <Button type="primary" loading={this.state.loading && this.state.index === index} style={{maxWidth: "50%"}} block disabled={item.orderState === 'FINISHED_DELIVERY' || (item.orderState === "ON_DELIVERY" && index !== 0)} onClick={this.startDelivery.bind(this,item,index)}>{this.getButtonText(item,index)}</Button>
                                </Col>
                            </Row>
                             ))
                            }
                            </center>
                        </div>
                    </section> : null }
                </header>
            </main>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)