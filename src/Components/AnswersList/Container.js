import { compose, withStateHandlers, withHandlers, lifecycle, branch, renderComponent, withProps } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { db } from '../../utils';
import * as R from 'ramda';

import AppLoader from '../Loaders/AppLoader';
import Component from './Component';

const mapStateToProps = state => ({
  user: state.user,
  answerSort: state.answerSort
});

const divideVotes = votes => {
  const positive = R.filter(R.prop('isPositive'), votes).length
  const negative = votes.length - positive
  return { positive, negative }
}
const filterVotesById = R.curry((votes, id) => R.filter(R.propEq('answerId', id), votes))
const divideByAnswerId = votes => R.compose(divideVotes, filterVotesById(votes), R.prop('_id'))
const assignVotes = votes => answer => Object.assign({}, answer, divideByAnswerId(votes)(answer))
const sortCondition = R.cond([
  [R.equals('best'), () => R.prop('positive')],
  [R.equals('worst'), () => R.prop('negative')],
  [R.T, () => R.prop('createdAt')]
])

const sortAnswersWithVotes = ({answers, votes, answerSort}) => {
  const answersWithVotes = R.map(assignVotes(votes), answers)
  return R.sort(R.descend(sortCondition(answerSort)), answersWithVotes)
}

const enhance = compose(
  connect(mapStateToProps),
  withStateHandlers({ answers: [], users: [], votes: [], isFetching: true }),

  withRouter,

  lifecycle({
    componentWillMount() {
      this.interval = db.pooling(async () => {
        const questionId = this.props.match.params.questionId;

        let answers = await db.answers.find();
        answers = answers.filter(answer => answer.questionId === questionId);

        let votes = await db.votes.find();
        const answerIds = answers.map(a => a._id);
        votes = votes.filter(vote => answerIds.includes(vote.answerId));

        const users = await db.users.find();

        this.setState({ answers, votes, users, isFetching: false });
      });
    },
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  }),
  
  branch(
    ({ isFetching }) => isFetching,
    renderComponent(AppLoader)
  ),

  withHandlers({
    onVote: ({ user }) => (answerId, isPositive) => {
      if (user) {
        db.votes.insert({
          answerId,
          isPositive,
          createdAt: new Date(),
          createdById: user._id,
        });
      }
    }
  }),

  withProps(props => ({ answers: sortAnswersWithVotes(props)})),
);


export default enhance(Component);
