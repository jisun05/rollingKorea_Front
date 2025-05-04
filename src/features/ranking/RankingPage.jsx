import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RankingList from './components/RankingList';
import Comments from './components/Comments';

export default function RankingPage() {
  return (
    <Container fluid>
      <Row>
        <Col md={4} className="p-4">
          <h3>Today's Ranking</h3>
          <p>Sign up and enjoy the journey</p>
          <RankingList />
        </Col>
        <Col md={8} className="p-4">
          <Comments />
        </Col>
      </Row>
    </Container>
  );
}