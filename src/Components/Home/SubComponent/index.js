import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import axios from 'axios'
import './../style.css'
import moment from 'moment'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			blogs: null,
			limit: 4,
			totalCount: null,
			selectedAuthor: null,
			sortBy: null
		}
	}

	componentDidMount = () => {
		const { sortBy, filterBy } = this.props
		this.setState({
			sortBy,
			selectedAuthor: filterBy
		})
		const blogs = JSON.parse(localStorage.getItem('blogs'))
		if (blogs && blogs.length > 0) {
			this.setState({ blogs, totalCount: blogs.length })
		} else {
			axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=236bef2d071b41c297f3762df8d14e6d`).then(res => {
				console.log('response', res)
				if (res.status === 200) {
					const result = JSON.stringify(res.data.articles)
					localStorage.setItem('blogs', result)
					this.setState({ blogs: res.data.articles })
				}
			})
		}
	}

	OnView = list => {
		const { setSelectedValue, history } = this.props
		setSelectedValue(list)
		history.push(`/blog/${list.title}`)
	}
	sortBy = () => {
		const { blogs, sortBy } = this.state
		if (sortBy === 'date') {
			return blogs.sort((a, b) => {
				let dateA = new Date(a.publishedAt)
				let dateB = new Date(b.publishedAt)
				return dateA - dateB
			})
		} else {
			return blogs.sort(function(a, b) {
				var nameA = a.author,
					nameB = b.author
				if (nameA < nameB) return -1
				if (nameA > nameB) return 1
				return 0
			})
		}
	}
	render() {
		const { blogs, limit, selectedAuthor, sortBy } = this.state
		const { setSortByValue, setFilterByValue } = this.props
		console.log('blogs===>', selectedAuthor)
		const authorList = [
			...new Set(
				blogs &&
					blogs.map((list, i) => {
						return list.author
					})
			)
		]
		const blogList = selectedAuthor
			? blogs.filter(list => list.author === selectedAuthor)
			: sortBy
			? this.sortBy(blogs)
			: blogs

		return (
			<div className="home">
				<div className="header">
					<Container>
						<h1>News</h1>
					</Container>
				</div>
				<Container>
					<Row className="list-container">
						<Col sm={8}>
							<div className="list-header">
								<h3>Latest news</h3>
							</div>

							{blogList &&
								blogList.map((list, i) => {
									return (
										i <= limit - 1 && (
											<Jumbotron className="list-blog">
												<h6>{`Published on ${moment().format(' DD MMM, YYYY - hh:mm:ss')}`}</h6>
												<h5 style={{ cursor: 'pointer' }} onClick={() => this.OnView(list)}>
													{list.title}
												</h5>
												<p>{list.description}</p>
												<h6 className="author">
													By <b>{list.author ? list.author : 'Anonymus'}</b>
												</h6>
											</Jumbotron>
										)
									)
								})}
							{blogList && blogList.length > limit && (
								<p className="load-more" onClick={() => this.setState({ limit: limit + 4 })}>
									{' '}
									Load More{' '}
								</p>
							)}
						</Col>

						<Col sm={4}>
							<div className="list-header">
								<h3>Author</h3>
							</div>
							{selectedAuthor && (
								<h6 style={{ padding: '20px 0', color: '#333', borderBottom: '1px solid #333' }}>{`${selectedAuthor &&
									'Filter by author -' + selectedAuthor}`}</h6>
							)}
							<div className="filter">
								{authorList &&
									authorList.map(li => {
										return (
											<h6
												style={{ cursor: 'pointer' }}
												onClick={() => {
													this.setState({ selectedAuthor: li })
													setFilterByValue(li)
												}}
											>
												{li}
											</h6>
										)
									})}
							</div>
							<div className="list-header" style={{ padding: '30px 0 0' }}>
								<h3>Sort by</h3>
							</div>
							{sortBy && (
								<h6 style={{ padding: '20px 0', color: '#333', 'border-bottom': '1px solid #333' }}>{`${sortBy &&
									'Sort by -' + sortBy}`}</h6>
							)}
							<div className="filter">
								<h6
									style={{ cursor: 'pointer' }}
									onClick={() => {
										this.setState({ sortBy: 'date' })
										setSortByValue('date')
									}}
								>
									Published Date
								</h6>
								<h6
									style={{ cursor: 'pointer' }}
									onClick={() => {
										this.setState({ sortBy: 'author' })
										setSortByValue('author')
									}}
								>
									Author
								</h6>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default Home
