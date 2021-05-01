import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({
	variant = "primary",
	children,
}: {
	variant?: string;
	children: React.ReactNode;
}) => {
	return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
