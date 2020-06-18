import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import './../style.css'
import moment from 'moment'

class Blog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			blogs: null,
			limit: 4,
			totalCount: null
		}
	}

	componentDidMount = () => {
		console.log('INSIDE EDSGE')
		const { selectedValue } = this.props
		this.setState({ selectedBlog: selectedValue })
	}

	render() {
		const { selectedBlog } = this.state
		return (
			<div className="Blog">
				<div className="header">
					<Container>
						<h1>News</h1>
					</Container>
				</div>
				<Container>
					<Row className="list-container">
						<Col sm={12}>
							<div className="list-header">
								<h3>{selectedBlog && selectedBlog.title}</h3>
							</div>
							<h6>{`Published on ${moment().format(' DD MMM, YYYY - hh:mm:ss')}`}</h6>
							<Jumbotron className="list-blog">
								<img style={{ width:'100%' }} src={selectedBlog && selectedBlog.urlToImage} alt="new" />
								<h6 className="author">
									Published By <b>{selectedBlog && selectedBlog.author ? selectedBlog.author : 'Anonymus'}</b>
								</h6>
								<p style={{ 'font-size': '18', padding: '30px 0' }}>{selectedBlog && selectedBlog.description}</p>
							</Jumbotron>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default Blog
