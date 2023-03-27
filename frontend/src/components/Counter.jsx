import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { retrieveReservationDetails } from "../actions/details";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
    };
    this.fetchDetails = this.fetchDetails.bind(this);
  }

  async fetchDetails() {
    await this.props.retrieveReservationDetails();
    console.log(this.props.details);
    this.setState({
      firstName: this.props.details.drivers[0].givenName,
    });
  }

  render() {
    const { details } = this.props;

    const { firstName } = this.state;

    return (
      <div>
        <Button onClick={this.fetchDetails}>Click</Button>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Driver First Name"
              value={firstName}
              disabled
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.details,
  };
};

export default connect(mapStateToProps, {
  retrieveReservationDetails,
})(Counter);
