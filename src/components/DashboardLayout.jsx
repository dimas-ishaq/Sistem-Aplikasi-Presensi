import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function DashboardLayout() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Container fluid>
      <Row >
        <Sidebar showSidebar={showSidebar} />
        <Col lg={showSidebar ? 10 : 12}>
          <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className="d-flex flex-column">
            <Outlet />
          </div>
        </Col>
      </Row >
    </Container >
  )
}