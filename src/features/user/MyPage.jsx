import { Tab, Nav, Row, Col, Container } from 'react-bootstrap';
import BasicInfo from './BasicInfo';
//import MyPosts from './MyPosts/MyPosts';      
//import SubmitRequest from './SubmitRequest';

export default function MyPage() {
  const tabs = [
    { eventKey: 'basic', title: 'Basic Info', Component: BasicInfo },
    { eventKey: 'save',  title: 'My Save',     Component: () => <p>준비 중입니다…</p> },
    //{ eventKey: 'posts', title: 'My Posts',     Component: MyPosts },
    //{ eventKey: 'req', title: 'Submit a Request', Component: SubmitRequest },
    
  ];

  return (
    <Container style={{ paddingTop: '2rem' }}>
      <h2>My Page</h2>
      <Tab.Container defaultActiveKey="basic">
        <Row>
          <Col sm={12}>
            <Nav variant="tabs" className="mt-3">
              {tabs.map(tab => (
                <Nav.Item key={tab.eventKey}>
                  <Nav.Link eventKey={tab.eventKey}>{tab.title}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={12} className="mt-4">
            <Tab.Content>
              {tabs.map(tab => (
                <Tab.Pane key={tab.eventKey} eventKey={tab.eventKey}>
                  <tab.Component />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
