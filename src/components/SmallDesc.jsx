
const SmallDesc = ({ smallDescs }) => {

	return (
		<div className="smalldesc">
			{smallDescs.map((desc, index) => {
				return <p key={index}>{desc}</p>
			})}
		</div>
	)
}

export default SmallDesc