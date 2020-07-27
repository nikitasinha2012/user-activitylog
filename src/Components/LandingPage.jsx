import React, { Component } from 'react';
import { Card, Modal, Button } from 'antd';
import dateFormat from 'dateformat';
import 'antd/dist/antd.css';
import './LandingPage.css';
import "react-datepicker/dist/react-datepicker.css";

class LandingPage extends Component {
    constructor() {
        super()
        this.state = {
            userDetails: [],
            selectedUserDetails: [],
            visible: false,
            visibleNested: false,
            curTime: new Date(),
            selectedDate: new Date()
        }
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
        fetch('data/file.json')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    userDetails: data.members
                });
            })
    }

    showModal = (id) => {
        this.setState({
            visible: true,
            selectedUserDetails: this.state.userDetails.filter((x) => x.id === id),
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            visibleNested: false
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            visibleNested: false
        });
    };

    handleChange(event) {
        this.setState({
            selectedDate: event.target.value
        });
    }
    showNestedModal = () => {
        this.setState({
            visibleNested: true
        });
    };


    render() {
        const { userDetails, selectedDate, curTime } = this.state;
        const convertedPresentDate = dateFormat(curTime, "mmm dd yyyy"); 
        const convertedSelectedDate = dateFormat(selectedDate, "mmm dd yyyy");
        return (
            <Card title="LIST OF USERS" style={{ width: 400, height: 400 }}>
                {
                    userDetails.map((item, index) => {
                        return (
                            <ul key={index}>
                                <li onClick={this.showModal.bind(this, item.id)}>{item.real_name}</li>
                                <Modal
                                    title="Activity log"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    destroyOnClose={true}
                                >
                                    {
                                        this.state.selectedUserDetails.map((item, index) => {

                                            return (
                                                <div key={index}>
                                                    {item.activity_periods.map((c, i) => {
                                                        const startTime = c.start_time;
                                                        const endTime = c.end_time;
                                                        var res = startTime.split(" ");  //split by space
                                                        res.pop();  //
                                                        const convertedUserDate = res.join(" ");
                                                        const userDateValue = new Date(convertedUserDate)
                                                        const presentDateValue = new Date(convertedPresentDate)
                                                        if (userDateValue.valueOf() === presentDateValue.valueOf()) {
                                                            return (
                                                                <div key={i}>
                                                                    <h2>Today's activities</h2>
                                                                    <h4>{startTime}</h4>
                                                                    <h4>{endTime}</h4>
                                                                </div>

                                                            )
                                                        }
                                                    }
                                                    )}
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="wrapper">
                                        <p>To view activities, enter/select date below.</p>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={this.state.selectedDate}
                                            onChange={event => this.setState({ selectedDate: event.target.value })}
                                        />
                                        <Button type="primary" onClick={this.showNestedModal}>
                                            Search log
                                    </Button>
                                    </div>
                                    <Modal
                                        title="Activity log"
                                        visible={this.state.visibleNested}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}

                                    >
                                        {
                                            this.state.selectedUserDetails.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        {item.activity_periods.map((c, i) => {
                                                            const startTime = c.start_time;
                                                            var res = startTime.split(" ");
                                                            res.pop();
                                                            const convertedUserDate = res.join(" ");
                                                            const userValue = new Date(convertedUserDate)
                                                            const selectedValue = new Date(convertedSelectedDate)
                                                            if (userValue.valueOf() === selectedValue.valueOf()) {
                                                                return (
                                                                    <div key={i}>
                                                                        <h4>{startTime}</h4>
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                        )}
                                                    </div>
                                                )
                                            })
                                        }
                                    </Modal>
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
