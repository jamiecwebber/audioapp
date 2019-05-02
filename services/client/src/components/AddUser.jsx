import React from 'react';
import axios from 'axios';

class AddUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.username,
			email: this.props.email
		}
		this.handleChange = this.handleChange.bind(this);
		this.addUser = this.addUser.bind(this);
	}
	addUser(event) {
		event.preventDefault();
		const data = new FormData();
		data.append('username', this.state.username);
		data.append('email', this.state.email);
		data.append('file', this.uploadInput.files[0]);
		console.log(process.env.REACT_APP_USERS_SERVICE_URL)
		axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/uploader`, data)
		.then((res) => { 
			this.getUsers();
			this.setState({ username: '', email: '' });
		})
		.catch((err) => { console.log(err); });
	}
	handleChange(event) {
		const obj = {};
		obj[event.target.name] = event.target.value;
		this.setState(obj);
	}
	render() {
		return(
			<form onSubmit={this.addUser}>
				<div className="field">
					<input
						name='username'
						className='input is-large'
						type='text'
						placeholder='enter a username'
						required
						value={this.state.username}
						onChange={this.handleChange}
					/>
				</div>
				<input
					type="file"
					ref={(ref) => { this.uploadInput = ref; }}
					name="file"
					accept="audio/*"
				/>
				<input
					type="submit"
					className="button is-primary is-large is-fullwidth"
					value="submit"
				/>
			</form>
		)
	}
};

export default AddUser;