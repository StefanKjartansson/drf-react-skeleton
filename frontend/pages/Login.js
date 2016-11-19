import React from 'react';


const Input = props => {
	const {errorText} = props;
	const hasError = errorText.length > 0;
	const errorClass = hasError ? "pt-intent-warning" : "";
	return (
		<div>
			<label className='pt-label'>
				User
				<div className="pt-input-group">
					<span className={`pt-icon ${props.icon}`}></span>
					<input
						className={`pt-input ${errorClass}`}
						{...props}
					/>
				</div>
			</label>
			{hasError ? (
				<div className="pt-callout pt-intent-danger">
					{errorText}
				</div>
			) : null}
		</div>
	);
};


export default class Login extends React.Component {

  state = {
    username: '',
    password: '',
    usernameErrorText: '',
    passwordErrorText: '',
  };

  login = this.login.bind(this);

  login(e) {

    e && e.preventDefault();

    const {
      username,
      password,
    } = this.state;

		this.props.API.auth.login(username, password)
		.catch(response => {

			response.json()
				.then(obj => {

					let stateUpdate = {
						usernameErrorText: '',
						passwordErrorText: '',
					};

					['username', 'password'].forEach(key => {
						if (obj.hasOwnProperty(key)) {
							stateUpdate[`${key}ErrorText`] = obj[key].join(', ');
						}
					});

					if (obj.hasOwnProperty('non_field_errors')) {
						stateUpdate.usernameErrorText = '';
						stateUpdate.passwordErrorText = obj.non_field_errors.join(', ');
					}
					this.setState(stateUpdate);

				})
				.catch(err => {
					console.log(err);
				});

		});
	}

  render() {
    return (
			<div className="pt-card pt-elevation-3">
				<form>
					{this.usernameField}
					{this.passwordField}
					{this.button}
				</form>
			</div>
    );
  }

  get usernameField() {
		return (
			<Input
				errorText={this.state.usernameErrorText}
				icon={'pt-icon-person'}
				type="text"
				autoComplete="off"
				autoFocus
				onChange={(e) => {
					this.setState({
						usernameErrorText: '',
						username: e.target.value,
					});
			}}/>
		);
  }

  get passwordField() {
		return (
			<Input
				errorText={this.state.passwordErrorText}
				icon={'pt-icon-dot'}
				type="password"
				autoComplete="off"
				onChange={(e) => {
					this.setState({
						passwordErrorText: '',
						password: e.target.value,
					});
				}}
				onKeyDown={(e) => {
					if (e.which === 13) {
						this.login(e);
					}
			}}/>
		);
  }

  get button() {

    const {
      username,
      password,
    } = this.state;

    const enabled = password !== '' && username !== '';

    return (
     	<button
				type="button"
				className="pt-button pt-intent-success"
        disabled={!enabled}
        onClick={this.login}>
      	Login
				<span className="pt-icon-standard pt-icon-log-in pt-align-right"></span>
      </button>
    );
  }

};
