import React from 'react';

const RenderVulnerabilities = ({data = [], className}) => {
	return (
		<div className={className}>
			{data.map((item) => <li key={item}>
				<a href={item}  rel="noreferrer" target='_blank'>{item}</a>
			</li>)}
		</div>
	);
};

export default RenderVulnerabilities;
