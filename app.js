const app = document.getElementById('app')
const loader = document.getElementById('loader')
const params = new URLSearchParams(window.location.search)
const basicURL = 'https://jsonplaceholder.typicode.com/'

if (params.has('postId')) {
  showPost(params.get('postId'))
} else if (params.has('userId')) {
  showUser(params.get('userId'))
} else {
  showPosts()
}

async function showPosts () {
  const posts = await fetchJson(`posts`)
  app.removeChild(loader)
  
  app.appendChild(
    createElement('div', { className: 'posts-page' },
      ...posts.map(post =>
        createElement("div", { className: 'post'},
          createElement('h3', { className: 'post-title' },
            createElement('a', { href: `/?postId=${post.id}` }, post.title)
          ),
          createElement('div', { className: 'post-body' }, post.body)
        )
      )
    )
  )
}

async function showPost (postId) {
  const [post, comments] = await Promise.all([
    fetchJson(`posts/${postId}`),
    fetchJson(`posts/${postId}/comments`)
  ])
  const author = await fetchJson(`users/${post.userId}`)
  app.removeChild(loader)

  app.appendChild(
    createElement('div', { className: 'post-page' },
      createElement('div', { className: 'post'},
        createElement('h2', { className: 'post-title' }, post.title),
        createElement('a', { className: 'post-author', href: `/?userId=${author.id}`}, `by ${author.name}`),
        createElement('div', { className: 'post-body' }, post.body)
      ),
      createElement('div', { className: 'comments'},
        createElement('h3', {}, 'Comments'),
        createElement('hr'),
        createElement('div', {},
          ...comments.map(comment =>
            createElement('div', { className: 'comment'},
              createElement('h4', {}, comment.name),
              createElement("div", {}, comment.body)
            )
          )
        )
      )
    )
  )
}

async function showUser (userId) {
  const [user, posts] = await Promise.all([
    fetchJson(`users/${userId}`),
    fetchJson(`users/${userId}/posts`)
  ])
  app.removeChild(loader)

  app.appendChild(
    createElement('div', { className: 'user-page'},
      createElement('h3', {}, `${user.name}'s posts`),
      createElement('hr'),
      createElement('div', {},
        ...posts.map(post =>
          createElement('div', { className: 'post'},
            createElement("a", { href: `/?postId=${post.id}` }, post.title),
          )
        )
      )
    )
  )
}

function createElement(tag, props = {}, ...children) {
  const element = document.createElement(tag)

  Object.keys(props).forEach(key => element[key] = props[key])
  if (children.length > 0) {
    children.forEach (child => {
      if (typeof child === 'string') {
        child = document.createTextNode(child)
      }

      element.appendChild(child)
    })
  }

  return element
}

function fetchJson (url, options) {
  return fetch(basicURL + url, options).then(data => data.json())
}