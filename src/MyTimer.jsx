import React, { Component } from 'react';
import { Form, FormGroup, Button, ButtonGroup } from 'react-bootstrap';
import { FormLabel } from 'react-bootstrap';
import './Timer.css';



export default class MyTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: null,
            totalSeconds: 0
        };
    }

    incrementCount() {
        this.setState({
            totalSeconds: this.state.totalSeconds + 1
        });
    }

    getDays() {
        return parseInt(this.state.totalSeconds / 60 / 60) / 24;
    }
    getHours() {
        return parseInt(this.state.totalSeconds / 60 / 60) % 24;
    }

    getMinutes() {
        return parseInt(this.state.totalSeconds / 60) % 60;
    }

    getSeconds() {
        return this.state.totalSeconds % 60;
    }

    startCounter = () => {
        clearInterval(this.state.time);
        this.setState({
            time: setInterval(() => this.incrementCount(), 1000)
        });
    }

    stopCounter = () => {
        clearInterval(this.state.time);
        this.setState({
            time: null
        });
    }

    resetCounter = () => {
        clearInterval(this.state.time);
        this.setState({
            totalSeconds: 0,
            time: null
        });
    }

    resumeCounter = () => {
        clearInterval(this.state.time);
        this.setState({
            time: setInterval(() => this.incrementCount(), 1000)  //clearInterval() is the only function that can be used to remove an event started by the setInterval()
        });
    }

    render() {
        let buttons = null;
        let started = this.getHours() > 0 || this.getMinutes() > 0 || this.getSeconds() > 0;
        if (!this.state.time && !started) {
            buttons = (
                <ButtonGroup >
                    <Button className='Stopwatch-button'
                        onClick={this.startCounter}>Start</Button>
                </ButtonGroup>
            );
        } else if (!this.state.time && started) {   //Started but stopped time in middle
            buttons = (
                <ButtonGroup >
                    <Button className='Stopwatch-button'
                        onClick={this.resumeCounter}>Resume</Button>
                    <ButtonGroup></ButtonGroup>
                    <Button className='Stopwatch-button'
                        onClick={this.resetCounter}>Reset</Button>
                </ButtonGroup>
            );
        } else {   // started and time is running
            buttons = (
                <ButtonGroup >
                    <Button className='Stopwatch-button'
                        onClick={this.stopCounter}>Stop</Button>
                    <ButtonGroup></ButtonGroup>
                    <Button className='Stopwatch-button'
                        onClick={this.resetCounter}>Reset</Button>
                </ButtonGroup>
            );
        }
        return (
            <div >
                <Form className='Stopwatch-display'>
                    <FormGroup bsSize='large' controlId='formStopwatch'>
                        <div class="form-inline" >
                            <FormLabel className='Stopwatch-number'>{this.leadingZero(this.getDays())}:</FormLabel>
                            <FormLabel className='Stopwatch-number'>{this.leadingZero(this.getHours())}:</FormLabel>
                            <FormLabel className='Stopwatch-number'>{this.leadingZero(this.getMinutes())}:</FormLabel>
                            <FormLabel className='Stopwatch-number'>{this.leadingZero(this.getSeconds())} </FormLabel>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        {buttons}
                    </FormGroup>
                </Form>
            </div >

        );
    }

    leadingZero(num) {
        return num < 10 ? '0' + num : num;
    }
}



