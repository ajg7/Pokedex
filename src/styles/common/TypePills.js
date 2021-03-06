import styled from "styled-components";

export const TypePills = styled.div`
	display: flex;

	justify-content: ${({ secondaryType }) => {
		if (secondaryType !== null) {
			return "space-evenly";
		} else {
			return "center";
		}
	}};

	margin: ${({ secondaryType }) => {
		if (secondaryType === null) {
			return "0 5px";
		}
	}};

	.type-pill-primary {
		padding: 5px 0;
		background-color: ${({ theme, type }) => theme.types[type]};
		border-radius: 5px;
		width: 100px;
		font-size: 12px;
		color: ${({ type }) => {
			switch (type) {
				case "poison":
					return "#fff";
				case "water":
					return "#fff";
				case "fire":
					return "#fff";
				case "bug":
					return "#fff";
				case "fighting":
					return "#fff";
				case "psychic":
					return "#fff";
				case "rock":
					return "#fff";
				case "ghost":
					return "#fff";
				case "dragon":
					return "#fff";
				case "ice":
					return "#fff";
				case "flying":
					return "#fff";
				default:
					return "#212121";
			}
		}};
	}

	.type-pill-secondary {
		padding: 5px 0;
		background-color: ${({ theme, secondaryType }) => theme.types[secondaryType]};
		font-size: 10px;
		border-radius: 5px;
		width: ${({ secondaryType }) => (!secondaryType ? "0" : "100px")};
		color: ${({ secondaryType }) => {
			switch (secondaryType) {
				case "poison":
					return "#fff";
				case "water":
					return "#fff";
				case "fire":
					return "#fff";
				case "bug":
					return "#fff";
				case "fighting":
					return "#fff";
				case "psychic":
					return "#fff";
				case "rock":
					return "#fff";
				case "ghost":
					return "#fff";
				case "dragon":
					return "#fff";
				case "ice":
					return "#fff";
				case "flying":
					return "#fff";
				default:
					return "#212121";
			}
		}};
	}
`;
