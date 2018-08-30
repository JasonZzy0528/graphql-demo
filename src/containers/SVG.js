import React from 'react'
import SVG from 'svg.js'
import Button from '@material-ui/core/Button'

class SVGComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPause: false,
      isFinished: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleRequest = this.handleRequest.bind(this)
  }

  componentDidMount () {
    // let _self = this
    let state = Object.assign({}, this.state)
    var draw = SVG('svg').size(600, 300)

    var path = draw.path('M66.039,133.545c0,0-21-57,18-67s49-4,65,8 s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41 C46.039,146.545,53.039,128.545,66.039,133.545z')
    path.fill('none').move(20, 20)
    path.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round'})

    let length = path.length()

    let circle = draw.circle(10).move(66.039,133.545)

    circle.animate({ ease: '<>' }).during(function(pos, morph, eased){
      console.error(pos, eased)
      // if (pos > 0.5 && !_self.state.isFinished) {
      //   circle.animate().speed(1 - pos)
      // } else {
      //   circle.animate().speed(1)
      // }
      // console.error(_self)

      // if ( pos > 0.5_self.state)
      var p = path.pointAt(eased * length)
      circle.center(p.x, p.y)
    }).loop(true)
    circle.animate().speed(0.01)

    state.circle = circle
    this.setState(state)


    // path.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round',dasharray:'1000', dashoffset: '1000' })
    // path.animate(2000).attr({'stroke-dashoffset': '0'}).loop(true)

    // path.animate(2000).plot('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80').loop(true, true)

    // var path = draw.path('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80')
    // path.fill('none').move(20, 20)
    // path.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round',dasharray:'10', dashoffset: '1000' })
    // path.animate(2000).plot('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80').loop(true, true)

    // var polyline = draw.polyline('50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40, 50,0')
    // polyline.fill('none').move(20, 20)
    // polyline.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })
    // // polyline.animate(3000).attr({color: '#0f9'})
    // console.error(polyline)

    // var linear = draw.gradient('linear', function(stop) {
    //   stop.at(0, '#f06')
    //   stop.at(0.01, '#0f9')
    // })

    // var polyline = draw.polyline('50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40, 50,0')
    // polyline.fill('none').move(20, 20)
    // polyline.stroke({ color: linear, width: 4, linecap: 'round', linejoin: 'round' })
    // let point = 0
    // let startCol = '#0f9'
    // let endCol = '#f06'
    // setInterval(() => {
    //   let originStart = point
    //   let startPoint = new Number(100 * (point + 0.01) % 101)
    //   let endPoint = new Number(100 * (point + 0.02) % 101)
    //   startPoint = startPoint.toFixed(0)
    //   endPoint = endPoint.toFixed(0)
    //   point = parseInt(startPoint)
    //   point = point / 100
    //   endPoint = parseInt(endPoint)
    //   endPoint = endPoint / 100
    //   linear.update(stop => {
    //     if (originStart === 0) {
    //       console.warn('===0')
    //       console.error(startCol,endCol)
    //       const color = startCol
    //       startCol = endCol
    //       endCol = color
    //       console.error(startCol,endCol)
    //     }
    //     stop.at(originStart, startCol)
    //     stop.at(point, startCol)
    //     stop.at(endPoint, endCol)
    //   })
    // }, 50)
  }

  handleClick () {
    let state = Object.assign({}, this.state)
    state.isPause = !state.isPause
    if (state.isPause) {
      state.circle.pause()
    } else {
      state.circle.play()
    }
    this.setState(state)
  }

  handleRequest () {
    let state = Object.assign({}, this.state)
    state.isFinished = true
    this.setState(state)
  }

  render() {
    return (
      <React.Fragment>
        <div id='svg'/>
        <Button variant='contained' color='primary' onClick={this.handleClick}>
          {this.state.isPause ? 'play' : 'pause'}
        </Button>
        <Button variant='contained' color='primary' onClick={this.handleEasing}>
          update animation easing function
        </Button>
      </React.Fragment>
    )
  }
}

export default SVGComponent
