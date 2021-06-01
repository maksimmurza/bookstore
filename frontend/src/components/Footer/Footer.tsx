import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.scss";
import { Github } from "react-bootstrap-icons";

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row className="my-2">
					<Col className="col">
						<a
							target="_blank"
							href="https://github.com/maksimmurza/bookstore"
							rel="noreferrer"
						>
							<Github></Github> maksimmurza/bookstore
						</a>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
