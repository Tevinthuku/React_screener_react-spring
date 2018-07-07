// Inspired by Corey Haggards "Screeners"
// https://dribbble.com/shots/4138489-Screeners

import React from 'react'
import ReactDOM from 'react-dom'
import { Parallax } from 'react-spring'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  number: {
    fontSize: '3em',
    position: 'relative',
    color: '#373c4c',
    pointerEvents: 'none',
    justifyContent: 'start !important',
    fontFamily: "'Kanit', sans-serif",
    lineHeight: 0,
    textTransform: 'uppercase'
  },
  header: {
    pointerEvents: 'none',
    justifyContent: 'start !important',
    fontFamily: "'Kanit', sans-serif",
    marginLeft: 65,
    color: 'white'
  },
  container: {
    '& div': {
      '& div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  },
  slopeBegin: {
    backgroundColor: '#20232f',
    clipPath: 'polygon(20vw 0, 70 % 0, calc(70 % - 20vw) 100%, 0 100%)',
    position: 'absolute',
    width: '140%',
    height: '100%',
    cursor: 'pointer'
  },
  slopeEnd: {
    clipPath: 'polygon(70% 0, 100% 0, calc(100% - 20vw) 100%, calc(70% - 20vw) 100%)',
    position: 'absolute',
    width: '140%',
    height: '100%',
    cursor: 'pointer'
  },
  strip: {
    height: 2,
    width: 'auto'
  }
})

const Page = ({ offset, caption, content, gradient, color, onClick, classes }) => (
  <React.Fragment>
    <Parallax.Layer offset={offset} speed={0.2}>
      <div className={classes.slopeBegin} />
    </Parallax.Layer>

    <Parallax.Layer offset={offset} speed={-0.2}>
      <div
        className={classes.slopeEnd}
        style={{
          background: color
        }}
        onClick={onClick}
      />
    </Parallax.Layer>

    <Parallax.Layer className={classes.number} offset={offset} speed={0.3}>
      <span>0{offset + 1}</span>
    </Parallax.Layer>

    <Parallax.Layer className={classes.header} offset={offset} speed={0.4}>
      <span>
        <Typography style={{ fontSize: 20 }} color="inherit" noWrap={false}>
          {caption}
        </Typography>
        <div
          className={classes.strip}
          style={{
            background: color
          }}
        />
        <Typography color="inherit">{content}</Typography>
      </span>
    </Parallax.Layer>
  </React.Fragment>
)

class App extends React.Component {
  scroll = to => this.refs.parallax.scrollTo(to)
  pages = components.length

  direction = num => (Math.max(num, components.length) === num ? 0 : num)
  render() {
    const { components, classes } = this.props
    return (
      <Parallax
        className={classes.container}
        ref="parallax"
        pages={this.pages}
        horizontal
        scrolling={false}
        style={{
          height: 300
        }}>
        {components.map((component, i) => (
          <Page
            key={i}
            {...{ classes }}
            offset={i}
            gradient="pink"
            caption={component.caption}
            content={component.content}
            color={component.color}
            onClick={() => {
              this.scroll(this.direction(i + 1))
            }}
          />
        ))}
      </Parallax>
    )
  }
}

const components = [
  {
    content: 'Lorem ipsum ',
    caption: 'WHO WE ARE',
    color: 'blue'
  },
  {
    content: 'lorem ipsum tada',
    caption: 'WHAT WE DO',
    color: 'teal'
  },
  {
    content: 'lorem ipsum',
    caption: 'WHAT WE WANT',
    color: 'yellow'
  }
]

const Styledapp = withStyles(styles)(App)

ReactDOM.render(<Styledapp components={components} />, document.getElementById('root'))
