import { compose, withHandlers } from 'recompose';
import { withInputs } from 'custom-hoc';
import { withRouter } from 'react-router';
import { withUser } from '../../utils';
import Component from './Component';
import { signUp } from '../../service/auth';
import { connect } from 'react-redux';
import { userActions } from '../../modules/user';


const enhance = compose(
  connect(),
  withInputs({
    username: { validate: value => value.length < 20 && value.length > 3 },
    email: { validate: value => value.length < 25 && value.length > 6 },
    password: { validate: value => value.length < 20 && value.length > 5 },
  }),
  withRouter,
  withUser,
  withHandlers({
    onSubmit: ({ onUserChange, username, email, password, history, dispatch }) => () => {
      signUp(username, email, password, null)
      .then(user => {
        console.log(user)
        dispatch(userActions.signIn(user));
        onUserChange({ username, password, _id: user._id });
        history.push('/');
      })
      .catch(err => {
        console.error(err);
        alert('Something went wrong');
      });
    }
  }),
);

export default enhance(Component);