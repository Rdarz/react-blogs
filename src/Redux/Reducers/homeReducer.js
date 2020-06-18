import { SET_SELECTED_VALUE, SET_SORTBY, SET_FILTERBY } from 'Actions/homeActions'

const ACTION_HANDLERS = {
	[SET_SELECTED_VALUE]: (state, action) => ({
		...state,
		selectedValues: action.payload
	}),
	[SET_SORTBY]: (state, action) => ({
		...state,
		sortBy: action.payload
	}),
	[SET_FILTERBY]: (state, action) => ({
		...state,
		filterBy: action.payload
	})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function homeReducer(state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
