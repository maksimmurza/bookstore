import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginationComponent = ({
	pages,
	page,
	isAdmin = false,
	keyword,
}: params) => {
	return pages > 1 && <Pagination></Pagination>;
};

interface params {
	pages: number;
	page: number;
	isAdmin: boolean;
	keyword: string;
}

export default PaginationComponent;
