import React from 'react';
import Countdown from 'react-countdown';

// Custom renderer to format the countdown
const renderer = ({ days, hours, minutes, seconds, completed }) => {
	return (
		<>
			<span>{days > 1 ? days + ' days,' : days === 1 ? '1 day,' : null}</span>{' '}
			<span>
				{hours > 1 ? hours + ' hours,' : hours === 1 ? '1 hour,' : null}
			</span>{' '}
			<span>
				{minutes > 1 ? minutes + ' minutes' : minutes === 1 ? '1 minute' : null}
			</span>{' '}
		</>
	);
};

const CountdownTimer = ({ date }) => {
	return <Countdown date={date} renderer={renderer} />;
};

export default CountdownTimer;
