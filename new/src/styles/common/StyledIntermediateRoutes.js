import styled from "styled-components";

export const StyledIntermediateRoutes = styled.div`
	padding: ${({ theme }) => theme.globalPadding};

	h3,
	img {
		margin: 15px 0;
		font-size: 40px;
	}

	img {
		height: 400px;
		width: 400px;
	}
`;
