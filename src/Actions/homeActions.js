export const SET_SELECTED_VALUE = 'SET_SELECTED_VALUE'
export const SET_SORTBY = 'SET_SORTBY'
export const SET_FILTERBY = 'SET_FILTERBY'

export const setSelectedValue = payload => {
	return {
		type: SET_SELECTED_VALUE,
		payload
	}
}

export const setSortByValue = payload => {
	return {
		type: SET_SORTBY,
		payload
	}
}

export const setFilterByValue = payload => {
	return {
		type: SET_FILTERBY,
		payload
	}
}
