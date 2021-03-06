import styled from "styled-components";

export const StyledDialogBox = styled.div`
	.dialog-box {
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
	}

	.dialog-box-content {
		background-color: #fefefe;
		margin: 15% auto;
		padding: 30px;
		border: 1px solid #888;
		width: 80%;
	}

	.dialog-box-input label {
		display: flex;
		flex-flow: column wrap;
		align-items: center;
	}

	.dialog-box-input label input {
		width: 25%;
		margin-top: 15px;
	}

	.dialog-box-buttons {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		margin: 25px 0;
	}

	.dialog-box-buttons div button {
		margin: 0 10px;
	}
`;
