import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import walleticon from "../../../assets/walleticon.svg";
import fiaticon from "../../../assets/fiaticon.svg";
import buidlicon from "../../../assets/buidlicon.svg";

import "../dashboard.css";
import TransactionTable from "./TransactionTable";

function WalletComponent() {
  const Cardbody = {
    backgroundColor: "#222532",
    border: "1px solid #3F4561",
    padding: "1rem 1rem ",
    borderRadius: 12 + "px",
    height: "auto",
  };
  const Cardbodyinner = {
    backgroundColor: "#222532",
    border: "1px solid #3F4561",
    padding: "1.6rem 1rem ",
    borderRadius: 12 + "px",
    height: "auto",
  };
  const Buttonstylex = {
    borderRadius: "26.22px",
    backgroundColor: "#EEA20E",
    border: "1px solid #EEA20E",
    color: "#ffffff",
    fontSize: 0.8 + "rem",
    padding:0.45+'rem',
    width: 100 + "%",
  };
  const Buttonstyley = {
    borderRadius: "26.22px",
    backgroundColor: "transparent",
    border: "1px solid #EEA20E",
    color: "#EEA20E",
    fontSize: 0.8 + "rem",
    padding:0.45+'rem',
    width: 100 + "%",
  };

  return (
    <Container>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <div style={Cardbody}>
            <Row>
              <Col sm={12} md={6} lg={6}>
                <Row style={{ paddingTop: 1.0 + "rem" }}>
                  <Col sm={12} md={12} lg={6}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1 + "rem",
                      }}
                    >
                      <Image src={walleticon} alt="icon" />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <span
                          style={{ color: "#999999", fontSize: 0.8 + "rem" }}
                        >
                          Total Balance
                        </span>
                        <h6 style={{ color: "#ffffff", fontSize: 1.2 + "rem" }}>
                          $ 6500.00
                        </h6>
                        <span
                          style={{ color: "#999999", fontSize: 0.8 + "rem" }}
                        >
                          ~ $ 93.00
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col
                    sm={12}
                    md={12}
                    lg={6}
                    className="btnxy"
                    style={{ gap: 5 + "rem", paddingTop: 1.5 + "rem" }}
                  >
                    <Row>
                      <Col>
                        <Button type="outline" style={Buttonstylex} size="sm">
                          Fund Wallet
                        </Button>{" "}
                      </Col>
                      <Col>
                        <Button type="outline" style={Buttonstyley} size="sm">
                          Withdraw
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col sm={12} md={6} lg={6}>
                <Row>
                  <Col className="btnxy">
                    <div style={Cardbodyinner}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 1 + "rem",
                        }}
                      >
                        <Image src={fiaticon} alt="icon" />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          <span
                            style={{ color: "#999999", fontSize: 0.8 + "rem" }}
                          >
                            Total Balance
                          </span>
                          <h6
                            style={{ color: "#ffffff", fontSize: 1.2 + "rem" }}
                          >
                            $ 6500.00
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div style={Cardbodyinner}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 1 + "rem",
                        }}
                      >
                        <Image src={buidlicon} alt="icon" />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          <span
                            style={{ color: "#999999", fontSize: 0.8 + "rem" }}
                          >
                            Total Balance
                          </span>
                          <h6
                            style={{ color: "#ffffff", fontSize: 1.2 + "rem" }}
                          >
                            $ 6500.00
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: 1 + "rem" }}>
        <Col>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#272A38",
              padding: 0.8 + "rem",
            }}
          >
            <h6 style={{ fontSize: 0.75 + "rem", color: "#ffffff" }}>
              Recent Transaction
            </h6>
            <span style={{ fontSize: 0.7 + "rem", color: "#ffffff" }}>
              See All
            </span>
          </div>
          <TransactionTable />
        </Col>
      </Row>
    </Container>
  );
}

export default WalletComponent;
