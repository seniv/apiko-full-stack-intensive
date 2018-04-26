const mongoose = require('mongoose')
const { mongoURI } = require('./config.json')

const { User, Question, Answer, Vote } = require('./db')
const { lookup } = require('./utils/db')

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error(`Connection to mongoDB failed. Error: ${err}`));

(async () => {
  const user = {
    email: 'some@email.com',
    profile: {
      fullName: 'Some Name'
    }
  }
  const newUser = await User.create(user)

  const question = {
    title: 'Some title',
    description: 'Some description',
    createdById: newUser._id,
    tags: ['one', 'two']
  }
  const newQuestion = await Question.create(question)
  
  const answer = {
    title: 'Some title',
    description: 'Some description',
    questionId: newQuestion._id,
    createdById: newUser._id
  }
  const newAnswer = await Answer.create(answer)

  const vote = {
    isPositive: true,
    answerId: newAnswer._id,
    createdById: newUser._id
  }
  const newVote = await Vote.create(vote)

  const findedUser = await User.aggregate([
    {
      $match: { _id: newUser._id }
    },
    lookup('questions', '_id', 'createdById', 'questions'),
    lookup('answers', '_id', 'createdById', 'answers'),
    lookup('votes', '_id', 'createdById', 'votes')
  ])
  console.log(JSON.stringify(findedUser, null, 2))
})()
  .catch(err => console.error(`Something went wrong: ${err}`))