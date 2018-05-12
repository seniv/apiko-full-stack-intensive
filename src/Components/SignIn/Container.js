import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { userActions } from '../../modules/user';
import { withInputs } from 'custom-hoc';
import { withRouter } from 'react-router';
import { withUser } from '../../utils';
import Component from './Component';
import { signIn } from '../../service/auth';


const enhance = compose(
  // just to get dispatch function below
  connect(),
  withInputs({
    email: { validate: value => value.length < 20 && value.length > 3 },
    password: { validate: value => value.length < 20 && value.length > 5 }
  }),
  withRouter,
  withUser,
  withHandlers({
    onSubmit: ({ onUserChange, email, password, history, dispatch }) => () => {
      signIn(email, password)
      .then(user => {
        dispatch(userActions.signIn(user));
        onUserChange({ username: user.username, password, _id: user._id });
        history.push('/');
      })
      .catch(err => {
        console.error(err);
        alert('Wrong email or password');
      });

    }
  }),
);

export default enhance(Component);