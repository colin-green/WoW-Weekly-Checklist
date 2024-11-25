import React, { createContext, useReducer } from 'react';

// Creating (and exporting) the context
export const GlobalContext = createContext();

// Defining the initial state
const initialState = {
	addToonForm: {},
	toons: [
		{
			id: 1,
			name: 'Vortild',
			class: 'Mage',
			tasks: {
				raidBosses: 0,
				dungeons: 0,
				delves: 0,
				worldBoss: false,
			},
		},
	],
};

// Creating the redeucer function that will handle state updates based on actions
const globalReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TOON':
			return {
				...state,
				toons: [...state.toons, action.payload],
			};
		case 'REMOVE_TOON':
			return {
				...state,
				toons: state.toons.filter(toon => toon.id !== action.payload),
			};
		case 'INCREMENT_RAID_BOSS':
			return {
				...state,
				toons: state.toons.map(toon =>
					toon.id === action.payload && toon.tasks.raidBosses < 6
						? {
								...toon,
								tasks: { ...toon.tasks, raidBosses: toon.tasks.raidBosses++ },
						  }
						: toon
				),
			};
		case 'DECREMENT_RAID_BOSS':
			return {
				...state,
				toons: state.toons.map(toon =>
					toon.id === action.payload && toon.tasks.raidBosses > 0
						? {
								...toon,
								tasks: { ...toon.tasks, raidBosses: toon.tasks.raidBosses-- },
						  }
						: toon
				),
			};
		case 'INCREMENT_DUNGEON':
			return {
				...state,
				toons: state.toons.map(toon =>
					toon.id === action.payload && toon.tasks.dungeons < 8
						? {
								...toon,
								tasks: { ...toon.tasks, dungeons: toon.tasks.dungeons++ },
						  }
						: toon
				),
			};
		case 'DECREMENT_DUNGEON':
			return {
				...state,
				toons: state.toons.map(toon =>
					toon.id === action.payload && toon.tasks.dungeons > 0
						? {
								...toon,
								tasks: { ...toon.tasks, dungeons: toon.tasks.dungeons-- },
						  }
						: toon
				),
			};
		case 'INCREMENT_DELVE':
			return {
				...state,
				toons: state.toons.map(toon =>
					toon.id === action.payload && toon.tasks.delves < 8
						? {
								...toon,
								tasks: { ...toon.tasks, delves: toon.tasks.delves++ },
						  }
						: toon
				),
			};
		case 'DECREMENT_DELVE':
			return {
				...state,
				toons: state.toons.map(toon =>
					toon.id === action.payload && toon.tasks.delves > 0
						? {
								...toon,
								tasks: { ...toon.tasks, delves: toon.tasks.delves-- },
						  }
						: toon
				),
			};
		case 'TOGGLE_WORLD_BOSS':
			return {
				...state,
				toons: state.toons.map(toon =>
					toon.id === action.payload
						? {
								...toon,
								tasks: { ...toon.tasks, worldBoss: !toon.tasks.worldBoss },
						  }
						: toon
				),
			};
		case 'RESET_ALL_TASKS':
			return {
				...state,
				toons: state.toons.map(toon => ({
					...toon,
					tasks: {
						raidBosses: 0,
						dungeons: 0,
						delves: 0,
						worldBoss: false,
					},
				})),
			};
		default:
			return state;
	}
};

// Creating the Context Provider component that uses useReducer
const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducer, initialState);

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
