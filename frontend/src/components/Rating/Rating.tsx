import React from "react";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const Rating = ({ rating, text, color = "gray" }: RatingProps) => {
	let c = rating;
	let stars = new Array(5).fill(0).map((e) => {
		if (c >= 1) {
			c--;
			return 1;
		} else if (c === 0.5) {
			c -= 0.5;
			return 0.5;
		} else return 0;
	});

	return (
		<div className="pb-2">
			<span className="pr-2">
				{stars.map((star, i) => {
					if (star !== 0) {
						return star === 1 ? (
							<StarFill
								key={i}
								width={18}
								height={18}
								color={color}
								className="mr-1"
							></StarFill>
						) : (
							<StarHalf
								key={i}
								width={18}
								height={18}
								color={color}
								className="mr-1"
							></StarHalf>
						);
					} else {
						return (
							<Star
								key={i}
								width={18}
								height={18}
								color={color}
								className="mr-1"
							></Star>
						);
					}
				})}
			</span>
			<span>{text && text}</span>
		</div>
	);
};

type RatingProps = {
	rating: number;
	text?: string;
	color?: string;
};

export default Rating;
