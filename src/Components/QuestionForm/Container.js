import React from 'react';
import { compose, withHandlers, lifecycle, withStateHandlers, branch, renderComponent } from 'recompose';
import { withInputs } from 'custom-hoc';
import { withRouter, Redirect } from 'react-router';
import * as R from 'ramda';
import { db, withUser } from '../../utils';

import Component from './Component';
import AppLoader from '../Loaders/AppLoader';


const unique = array => [...new Set(array)];

const toArray = string => string.split(' ').filter(t => t);

const stripSpaces = string => string.trim().replace(/\s+/g, ' ');

const prepareTags = R.compose(
  unique,
  toArray,
  stripSpaces,
);


const enhance = compose(
  withRouter,

  withStateHandlers({ question: {}, isFetching: true }),

  lifecycle({
    async componentWillMount() {
      const { questionId } = this.props.match.params;
      let question = {};
      if (questionId) {
        question = await db.questions.findOne(questionId);
      }
      this.setState({ question, isFetching: false });
    },
  }),

  branch(
    ({ isFetching }) => isFetching,
    renderComponent(AppLoader)
  ),

  withUser,

  branch(
    ({ user, question }) => !user || (question._id && question.createdById !== user._id),
    renderComponent(() => <Redirect to="/"/>),
  ),

  withInputs(({ question }) => ({
    title: {
      validate: value => value.length >= 10,
      defaultValue: question.title,
    },
    description: {
      validate: value => value.length >= 10,
      defaultValue: question.description,
    },
    tags: { defaultValue: question.tags && question.tags.join(' ') },
  })),

  withHandlers({
    onSubmit: ({ tags, title, description, history, user, match }) => () => {
      const document = {
        title,
        description,
        tags: prepareTags(tags),
        createdById: user._id
      };

      if (match.params.questionId) {
        db.questions.update(match.params.questionId, document)
      } else {
        db.questions.insert(document);
      }

      history.push('/');
    },
    onRemove: ({ match, history }) => () => {
      db.questions.remove(match.params.questionId);
      history.push('/');
    },
  })
);


export default enhance(Component);
