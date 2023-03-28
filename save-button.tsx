import { Button, Spinner } from "react-bootstrap";
import { HStack } from "./hstack";

export function SaveButton({ children, type, disabled, isWorking, onClick }) {
	return (
		<Button type={type} disabled={disabled} onClick={onClick}>
			<HStack>
				{isWorking && <Spinner animation="border" size="sm" />}
				{children}
			</HStack>
		</Button>
	);
}
