import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/global';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export default function ToonTable() {
	const { state, dispatch } = useContext(GlobalContext);
	const [resetButtonDisabled, setResetButtonDisabled] = useState(false);

	const getClassColor = characterClass => {
		switch (characterClass) {
			case 'Death Knight':
				return '#C41E3A';
			case 'Demon Hunter':
				return '#A330C9';
			case 'Druid':
				return '#FF7C0A';
			case 'Evoker':
				return '#33937F';
			case 'Hunter':
				return '#AAD372';
			case 'Mage':
				return '#3FC7EB';
			case 'Monk':
				return '#00FF98';
			case 'Paladin':
				return '#F48CBA';
			case 'Priest':
				return '#FFFFFF';
			case 'Rogue':
				return '#FFF468';
			case 'Shaman':
				return '#0070DD';
			case 'Warlock':
				return '#8788EE';
			case 'Warrior':
				return '#C69B6D';
			default:
				return '';
		}
	};

	const getRaidColor = raidCompletionStatus => {
		if (raidCompletionStatus < 2) {
			return 'error.main';
		} else if (raidCompletionStatus < 4) {
			return 'warning.main';
		} else if (raidCompletionStatus < 6) {
			return 'primary.main';
		} else {
			return 'success.main';
		}
	};

	const getDungeonColor = dungeonDelveCompletionStatus => {
		if (dungeonDelveCompletionStatus < 1) {
			return 'error.main';
		} else if (dungeonDelveCompletionStatus < 4) {
			return 'warning.main';
		} else if (dungeonDelveCompletionStatus < 8) {
			return 'primary.main';
		} else {
			return 'success.main';
		}
	};

	const getDelveColor = dungeonDelveCompletionStatus => {
		if (dungeonDelveCompletionStatus < 2) {
			return 'error.main';
		} else if (dungeonDelveCompletionStatus < 4) {
			return 'warning.main';
		} else if (dungeonDelveCompletionStatus < 8) {
			return 'primary.main';
		} else {
			return 'success.main';
		}
	};

	const incrementRaidBoss = toonID => {
		dispatch({ type: 'INCREMENT_RAID_BOSS', payload: toonID });
	};

	const incrementDungeon = toonID => {
		console.log('Incrementing dungeon count for ' + toonID);
		dispatch({ type: 'INCREMENT_DUNGEON', payload: toonID });
	};

	const incrementDelve = toonID => {
		dispatch({ type: 'INCREMENT_DELVE', payload: toonID });
	};

	const decrementRaidBoss = (event, toonID) => {
		event.preventDefault();
		dispatch({ type: 'DECREMENT_RAID_BOSS', payload: toonID });
	};

	const decrementDungeon = (event, toonID) => {
		event.preventDefault();
		dispatch({ type: 'DECREMENT_DUNGEON', payload: toonID });
	};

	const decrementDelve = (event, toonID) => {
		event.preventDefault();
		dispatch({ type: 'DECREMENT_DELVE', payload: toonID });
	};

	const toggleWorldBoss = toonID => {
		dispatch({ type: 'TOGGLE_WORLD_BOSS', payload: toonID });
	};

	const handleDeleteToon = toonID => {
		if (window.confirm('Are you sure you want to delete this toon?')) {
			removeToon(toonID);
		}
	};

	const handleResetTasks = () => {
		if (window.confirm('Are you sure you want to reset all tasks?')) {
			resetAllTasks();
		}
	};

	const removeToon = toonID => {
		dispatch({ type: 'REMOVE_TOON', payload: toonID });
	};

	const resetAllTasks = () => {
		dispatch({ type: 'RESET_ALL_TASKS' });
	};

	const checkAllTasks = () => {
		const allTasksAreZero = state.toons.every(
			toon =>
				toon.tasks.raidBosses === 0 &&
				toon.tasks.dungeons === 0 &&
				toon.tasks.delves === 0 &&
				toon.tasks.worldBoss === false
		);
		setResetButtonDisabled(allTasksAreZero);
	};

	useEffect(() => {
		checkAllTasks();
	}, [state.toons]);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Name</TableCell>
						<TableCell align='right'>Raid Bosses Killed</TableCell>
						<TableCell align='right'>Dungeons Completed</TableCell>
						<TableCell align='right'>Delves Completed</TableCell>
						<TableCell align='right'>World Boss Killed?</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{state.toons.map(toon => (
						<TableRow
							key={toon.id}
							sx={{
								'&:last-child td, &:last-child th': { border: 0 },
							}}
						>
							<TableCell>
								<IconButton
									sx={{
										color: 'error.main',
									}}
									onClick={() => handleDeleteToon(toon.id)}
								>
									<DeleteIcon />
								</IconButton>
							</TableCell>
							<TableCell component='th' scope='row'>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<img
										src={`${process.env.PUBLIC_URL}/class-icons/${toon.class
											.trim()
											.replace(/ /g, '_')}_Icon.jpg`}
										alt={toon.class}
										style={{
											width: 25,
											height: 25,
											borderRadius: '15%',
											marginRight: 8,
										}}
									/>
									<Typography
										sx={{
											color: getClassColor(toon.class),
											fontWeight: 'bold',
										}}
									>
										{toon.name}
									</Typography>
								</div>
							</TableCell>
							<TableCell
								align='right'
								sx={{
									cursor: 'pointer',
									userSelect: 'none',
									color: getRaidColor(toon.tasks.raidBosses),
								}}
								onClick={() => incrementRaidBoss(toon.id)}
								onContextMenu={event => decrementRaidBoss(event, toon.id)}
							>
								{toon.tasks.raidBosses}/6
								{toon.tasks.raidBosses === 6 && <CheckIcon />}
							</TableCell>
							<TableCell
								align='right'
								sx={{
									cursor: 'pointer',
									userSelect: 'none',
									color: getDungeonColor(toon.tasks.dungeons),
								}}
								onClick={() => incrementDungeon(toon.id)}
								onContextMenu={event => decrementDungeon(event, toon.id)}
							>
								{toon.tasks.dungeons}/8
								{toon.tasks.dungeons === 8 && <CheckIcon />}
							</TableCell>
							<TableCell
								align='right'
								sx={{
									cursor: 'pointer',
									userSelect: 'none',
									color: getDelveColor(toon.tasks.delves),
								}}
								onClick={() => incrementDelve(toon.id)}
								onContextMenu={event => decrementDelve(event, toon.id)}
							>
								{toon.tasks.delves}/8
								{toon.tasks.delves === 8 && <CheckIcon />}
							</TableCell>
							<TableCell align='right'>
								{toon.tasks.worldBoss ? (
									<CheckIcon
										color='success'
										cursor='pointer'
										onClick={() => toggleWorldBoss(toon.id)}
									/>
								) : (
									<CloseIcon
										color='error'
										cursor='pointer'
										onClick={() => toggleWorldBoss(toon.id)}
									/>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Box mb={2} display='flex' justifyContent='center'>
				{' '}
				<Button
					disabled={resetButtonDisabled}
					variant='contained'
					color='error'
					onClick={handleResetTasks}
				>
					Reset All Tasks
				</Button>
			</Box>
		</TableContainer>
	);
}
