const React = {
  createElement (tag, props = {}, children) {
    const element = document.createElement(tag)
  
    if (props) Object.keys(props).forEach(key => {
      if (key === "style") Object.assign(element.style, props.style)
      else element[key] = props[key]
    })

    if (Array.isArray(children) && children.length > 0) {
      children.forEach (child => {
        if (typeof child === 'string') {
          child = document.createTextNode(child)
        }
        element.appendChild(child)
      })
    } else if (typeof children === 'string') {
      element.appendChild(
        document.createTextNode(children)
      )
    }
  
    return element
  },
  render (application, root) {
    root.appendChild(application)
  }
}

const app = 
  React.createElement('div', { style: { backgroundColor: 'red' } }, [
    React.createElement('span', undefined, 'Hello world'),
    React.createElement('br'),
    'This is just a text node',
    React.createElement('div', { textContent: 'Text content' }),
  ]);

React.render(
  app,
  document.getElementById('root'),
);