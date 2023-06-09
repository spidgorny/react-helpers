import React, { Fragment } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import {ReactNode} from 'react';

interface SimpleTableProps {
	isLoading?: boolean;
	className?: string;
	columns: any[];
	rows: any[];
	onOpen?: (row: any, index: number) => ReactNode;
	onRowClick?: (e: any, row: any) => void;
	evenRow?: (row: any) => ReactNode;
}

export function SimpleTable({className, columns, rows, onOpen, onRowClick, evenRow, isLoading}: SimpleTableProps) {
	// console.log({ rows, columns });

	if (!rows) {
		return null;
	}

	if (!columns) {
		columns = Object.keys(rows?.[0] ?? []).map(key => ({
			name: key,
			selector: (row) => row[key],
		}));

	}

	return (
		<table className={className ?? "table table-striped table-bordered table-sm w-full"}>
			<thead>
			<tr>
				{onOpen && <th />}
				{columns.map((x, index) => (
					<th key={index} className="text-center">
						{x.name}
					</th>
				))}
			</tr>
			</thead>
			<tbody>
			{rows.map((row, index) => (
				<Fragment key={index}>
					<tr
						onClick={(e) => (onRowClick ? onRowClick(e, row) : null)}
						className={cn({
							"cursor-pointer": onRowClick,
						})}
					>
						{onOpen && (
							<td>
								<details>
									<summary></summary>
									{onOpen(row, index)}
								</details>
							</td>
						)}

						{columns.map((x, xIndex) => (
							<td
								key={xIndex}
								className={cn({
									"text-end": x.right,
									"text-center": x.center,
								})}
								style={{
									width: x.width,
								}}
							>
								{x.selector(row)}
							</td>
						))}
					</tr>
					{evenRow && evenRow(row)}
				</Fragment>
			))}
			</tbody>
		</table>
	);
}

SimpleTable.propTypes = {
	className: PropTypes.string,
	columns: PropTypes.array,
	rows: PropTypes.array,
	onOpen: PropTypes.func,
	onRowClick: PropTypes.func,
	evenRow: PropTypes.func,
};

export function PropRow({ name, children, className = "py-1" }) {
	return (
		<tr>
			<th className={className}>{name}</th>
			<td className={className}>{children}</td>
		</tr>
	);
}
