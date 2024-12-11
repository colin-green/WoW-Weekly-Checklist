import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/global';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';

export default function AddToonForm() {
	const { state, dispatch } = useContext(GlobalContext);

	const [formData, setFormData] = useState({
		name: '',
		class: '',
		tasks: {
			raidBosses: 0,
			dungeons: 0,
			delves: 0,
			worldBoss: false,
		},
	});

	const classOptions = [
		'Death Knight',
		'Demon Hunter',
		'Druid',
		'Evoker',
		'Hunter',
		'Mage',
		'Monk',
		'Paladin',
		'Priest',
		'Rogue',
		'Shaman',
		'Warlock',
		'Warrior',
	];

	const addToon = toon => {
		dispatch({ type: 'ADD_TOON', payload: toon });
	};

	const handleInputChange = event => {
		const { name, value } = event.target;
		setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
	};

	const handleAutocompleteChange = (event, value) => {
		setFormData(prevFormData => ({ ...prevFormData, class: value || '' }));
	};

	const handleFormSubmit = event => {
		event.preventDefault();
		if (formData.name.trim().length > 0 && formData.class) {
			addToon({
				...formData,
				name: formData.name.trim(),
				id: new Date(),
			});
			// Reset the form to blank after adding the character
			setFormData({
				name: '',
				class: '',
				tasks: {
					raidBosses: 0,
					dungeons: 0,
					delves: 0,
					worldBoss: false,
				},
			});
		} else {
			alert('All fields are required.');
		}
	};

	return (
		<FormGroup row>
			<TextField
				required
				label='Name'
				name='name'
				value={formData.name}
				onChange={handleInputChange}
			/>
			<Autocomplete
				required
				options={classOptions}
				getOptionLabel={option => option}
				sx={{ width: 210 }}
				renderInput={params => <TextField {...params} label='Class' />}
				value={formData.class || null}
				onChange={handleAutocompleteChange}
				disableClearable
			/>
			<Button
				variant='contained'
				color='success'
				size='medium'
				onClick={handleFormSubmit}
			>
				Add Toon
			</Button>
		</FormGroup>
	);
}
