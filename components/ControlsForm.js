import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Component } from 'react';
import { withRouter } from 'next/router'

import axios from 'axios';
import { toast } from 'react-toastify';

export default withRouter(class ControlsForm extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            complicationStyle: 'randomWords',
            text: undefined  
        };
    }

    complicateThings() {
        if (this.state.text === undefined) {
            return new Promise(res => {
                toast.error('Please enter some text first!');
                return res();
            });
        }

        return axios.post(`${this.props.router.basePath}/api/complicate`, {
            message: this.state.text,
            complicationStyle: this.state.complicationStyle,
        })
            .then(response => {
                if (response.data.fail || !response.data.success) return toast.error('An error has occured.');
                this.setState({ text: response.data.result, isLoading: false })
            })
    }

    componentDidUpdate() {
        if (this.state.isLoading) {
            this.complicateThings()
        }
    }

    handleClick = () => this.setState({ isLoading: true });

    render() {
        return (
            <Row>
                <Col sm={12} md={8}>
                    <Card>
                        <Card.Header>Result &amp; Input</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Insert some text here"
                                    rows={15}
                                    disabled={this.state.isLoading}
                                    required={true}
                                    onChange={evt => this.setState({ text: evt.target.value })}
                                    value={this.state.text}
                                />
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={12} md={4}>
                    <Card>
                        <Card.Header>Controls</Card.Header>
                        <Card.Body>
                            <Form
                                onSubmit={this.handleSubmit}
                            >
                                <Form.Group as={Row}>
                                    <Form.Label
                                        column
                                        sm={12}>
                                        Complication Style:
                                    </Form.Label>
                                    <Col sm={12}>
                                    <Form.Check
                                            type="radio"
                                            label="Shortest word"
                                            name="complicationStyle"
                                            id="shortestWord"
                                            checked={this.state.complicationStyle === 'shortestWord'}
                                            disabled={this.state.isLoading}
                                            required={true}
                                            onChange={() => this.setState({ complicationStyle: 'shortestWord' })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Longest word"
                                            name="complicationStyle"
                                            id="longestWord"
                                            checked={this.state.complicationStyle === 'longestWord'}
                                            disabled={this.state.isLoading}
                                            required={true}
                                            onChange={() => this.setState({ complicationStyle: 'longestWord' })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Random words"
                                            name="complicationStyle"
                                            id="randomWords"
                                            checked={this.state.complicationStyle === 'randomWords'}
                                            disabled={this.state.isLoading}
                                            required={true}
                                            onChange={() => this.setState({ complicationStyle: 'randomWords' })}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm={12}>
                                    <Button
                                        variant="primary"
                                        disabled={this.state.isLoading}
                                        onClick={!this.state.isLoading ? this.handleClick : null}
                                        >
                                        {this.state.isLoading ? 'Complicating things..' : 'Complicate things'}
                                    </Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
});
