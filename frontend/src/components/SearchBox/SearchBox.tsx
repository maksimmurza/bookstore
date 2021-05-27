import React, { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useHistory } from "react-router";

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");
	const history = useHistory();

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push("/");
		}
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type="text"
				name="query"
				placeholder="Search products..."
				className="mr-2 ml-5"
				onChange={(e) => setKeyword(e.target.value)}
			></Form.Control>
			<Button type="submit" variant="outline-success">
				{/* <Search size={20}></Search> */}
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
