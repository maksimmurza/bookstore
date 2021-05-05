import React, { PropsWithChildren, ReactNode } from "react";
import { Row, Col, Container } from "react-bootstrap";

const FormContainer = ({ children }: PropsWithChildren<any>) => {
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col md={6} xs={12}>
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;
