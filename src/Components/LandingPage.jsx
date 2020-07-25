import React, { Component } from 'react';
import { Card, Modal, DatePicker } from 'antd';
import dateFormat from 'dateformat';
import 'antd/dist/antd.css';
import './LandingPage.css';


class LandingPage extends Component {
    constructor() {
        super()
        this.state = {
            userDetails: [],
            visible: false,
            pickerOpen: false,
            selectedDate: null,
            curTime: new Date(),
            trialArray: [ ],
            activeItemId: null

        }

    }
    componentDidMount() {
        var pushedArray = []
        const convertedDateFormat = dateFormat(this.state.curTime, "mmmm dd yyyy");

        fetch('data/file.json')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    userDetails: data.members
                })
                console.log(this.state.userDetails)
            })
           
        // this.state.trialArray.map((item) => {
        //     const newdatee = item.activity_periods[3].start_time
        //     var res = newdatee.split(" ");  //split by space
        //     res.pop();  //remove last elemen
        //     const convertedStartTime = res.join(" ")
        //     console.log(convertedStartTime)
        //     const convertedDateFormat = dateFormat(this.state.curTime, "mmmm dd yyyy");
        //        if(convertedDateFormat === convertedStartTime){
        //            console.log('h')
        //        }
        //        else{
        //            console.log(convertedDateFormat,convertedStartTime)
        //        }

        // })


    }

    showModal = () => {
        
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const { userDetails, trialArray } = this.state;
        const dateFormatting = 'YYYY/DD/MM';
        console.log(this.state.activeItemId)

        return (
            <Card title="List of Users" style={{ width: 400, height: 400 }}>
                {
                    userDetails.map((item, index) => {
                        return (
                            <ul key={index}>
                                <li onClick={this.showModal}>{item.real_name}</li>
                                <Modal
                                    title="Today's activities"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <DatePicker format={dateFormatting} />

                                </Modal>
                            </ul>
                        )
                    })
                }
            </Card>
        )
    }
}

export default LandingPage;
