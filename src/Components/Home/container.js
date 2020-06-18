import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Home from './SubComponent'
import { setSelectedValue, setSortByValue, setFilterByValue } from 'Actions/homeActions'

const mapDispatchToProps = {
	setSelectedValue: obj => setSelectedValue(obj),
	setSortByValue: obj => setSortByValue(obj),
	setFilterByValue: obj => setFilterByValue(obj)
}

const mapStateToProps = state => ({
	selectedValues: state.home.selectedValues,
	sortBy: state.home.sortBy,
	filterBy: state.home.filterBy
})

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Home)
)
