
const Dropdowns = ({ dropdowns }) => {

	return dropdowns.map((dropdown) => {
		return (
		<div>
			{dropdown.question}
		</div>
		)
	})
}

export default Dropdowns