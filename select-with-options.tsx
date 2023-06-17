
export function SelectWithOptions({ options, ...selectProps }) {
	  let arrayOptions = Array.isArray(options) ? options : Object.entries(options);
	return <select {...selectProps}>
		{arrayOptions.map(([key, val]) =>
			<option key={key} value={key}>{val}</option>
		)}
	</select>;
}
