import React from 'react';
import Countdown from 'react-countdown';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

// Custom renderer to format the countdown
const renderer = ({ days, hours, minutes, seconds, completed }) => {
	return (
		<>
			<span>
				{days > 1 ? days + ' days' : days === 1 ? '1 day' : null}
				{days >= 1 && (hours >= 1 || minutes >= 1) ? ',' : null}
			</span>{' '}
			<span>
				{hours > 1 ? hours + ' hours' : hours === 1 ? '1 hour' : null}
				{hours >= 1 && minutes >= 1 ? ',' : null}
			</span>{' '}
			<span>
				{minutes > 1 ? minutes + ' minutes' : minutes === 1 ? '1 minute' : null}
			</span>{' '}
		</>
	);
};

const CountdownTimer = ({ date }) => {
	const getNextTuesdayAtTenAM = () => {
		const now = new Date();
		const currentDay = now.getDay();
		const daysUntilNextTuesday = (9 - currentDay) % 7;
		const nextTuesday = new Date(now);
		nextTuesday.setDate(now.getDate() + daysUntilNextTuesday);
		nextTuesday.setHours(10, 0, 0, 0); // Set the time to 10:00 AM
		return nextTuesday;
	};
	const nextTuesday = getNextTuesdayAtTenAM();

	return (
		<Card>
			<CardHeader
				sx={{
					textDecoration: 'underline',
					textAlign: 'center',
				}}
				title='Time Left Until Weekly Reset'
			/>
			<CardContent>
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
				>
					<Typography sx={{ fontSize: 30 }}>
						<Countdown date={nextTuesday.getTime()} renderer={renderer} />
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default CountdownTimer;
