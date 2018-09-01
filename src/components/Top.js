import React from "react"
import styled from "react-emotion"
import {connect} from "react-redux"
import {fetchEventListAction} from "../redux/events/event"
import display from "../styles/display"

class Top extends React.Component {

  constructor() {
    super()
    this.state = {
      events: null
    }
  }

  componentDidMount () {
    this.props.fetchEventList().then(() => {
      this.setState({
        events: this.props.events.events
      })
    })
  }

  render() {
    return (
      <TopPageWrapper>
        {this.state.events && (this.state.events.map(e =>
          <EventCard>{e.Name}</EventCard>
        ))}
      </TopPageWrapper>
    )
  }
}

const TopPageWrapper = styled("div")`
  width: 85%;
  margin: 20px auto;
`;

const EventCard = styled("div")`
  background: white;
  display: flex;
  padding: 10px;
  border-radius: 5px;
  border-bottom: solid 1px #eeeeee;
  position: relative;
  padding: 20px 10px 20px 8%;
  :hover {
    cursor: pointer;
    background: #FFE4B5;
  }
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    min-width: unset;
    padding: 10px 10px 10px 10px;
  }
`;

const mapStateToProps = state => ({
  events: state.eventList.data
});

const mapDispatchToProps = dispatch => ({
  fetchEventList: () => dispatch(fetchEventListAction())
});


export default connect(mapStateToProps,mapDispatchToProps)(Top)
