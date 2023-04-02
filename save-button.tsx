import { Button, Spinner } from "react-bootstrap";
import { HStack } from "./hstack";

export function SaveButton({ children, type, disabled, isWorking, onClick, className }) {
	return (
		<Button type={type} disabled={disabled} onClick={onClick} className={className}>
			<HStack>
				{isWorking && <Spinner animation="border" size="sm" />}
				{children}
			</HStack>
		</Button>
	);
}
