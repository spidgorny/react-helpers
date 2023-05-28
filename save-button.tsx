import { Button, Spinner } from "react-bootstrap";
import { HStack } from "./hstack";
import {ReactNode} from 'react';

export function SaveButton({ children, type, disabled, isWorking, onClick, className }:{
 children: ReactNode; 
 type?: "button"|"submit"|"reset"; 
 disabled?: boolean; 
 isWorking?: boolean; 
 onClick?: () => void; className?: string;
}) {
	return (
		<Button type={type} disabled={disabled} onClick={onClick} className={className}>
			<HStack>
				{isWorking && <Spinner animation="border" size="sm" />}
				{children}
			</HStack>
		</Button>
	);
}
