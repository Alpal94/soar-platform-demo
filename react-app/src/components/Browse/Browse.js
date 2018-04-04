import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import BrowseItem from './BrowseItem';


class Browse extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    {Object.keys(this.props.soar.uploads).map(key =>
                        <Col key={key} md={4}> 
                            <BrowseItem key={key} {...this.props} fileHash={key} />
                        </Col>
                    )}
                </Row>
            </Grid>
        )
    }
}

export default Browse;

