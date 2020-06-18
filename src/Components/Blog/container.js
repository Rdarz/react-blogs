import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Blog from './SubComponent'
import { setSelectedValue } from 'Actions/homeActions'

const mapDispatchToProps = {
  setSelectedValue: obj => setSelectedValue(obj),	
}

const mapStateToProps = state => ({
  selectedValue: state.home.selectedValues
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
