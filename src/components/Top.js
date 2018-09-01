import React from "react"
import styled from "react-emotion"
import { connect } from "react-redux"
import { fetchEventListAction } from "../redux/events/event"
import { fetchActionListAction } from "../redux/actions/actions";
import display from "../styles/display"
import Select from "react-select";


class Top extends React.Component {

  constructor() {
    super();
    this.state = {
      events: null,
      selectedEvents: [],
      eventOptionList: [],
      actions: null
    }
  }

  componentDidMount() {
    this.props.fetchEventList().then(() => {
      this.setState({
        events: this.props.events.events
      });
      this.mapEventOptionList();
    });
    this.props.fecthActionList().then(() => {
      this.setState({
        actions: this.props.actions.relations
      })
    })
  }

  mapEventOptionList() {
    this.state.events.map(e => {
      this.setState({
        eventOptionList: this.state.eventOptionList.concat({
          value: e.ID,
          label: e.Name
        })
      });
    });
  }

  handleSelectChange(selectedEvents, index) {
    const copiedEventList = this.state.selectedEvents.slice();
    copiedEventList[index] = selectedEvents;
    this.setState({ selectedEvents: copiedEventList })
  }

  render() {
    return (
      <TopPageWrapper>
        {this.state.actions && (this.state.actions.map((e, index) =>
          <EventCard>
            <EventTitle>{e.Action_name}</EventTitle>
            <ItemWrapper>
              <Selector
                onChange={(e, index) => this.handleSelectChange(e, index)}
                options={this.state.eventOptionList}
                value={this.state.selectedEvents[index]}
                placeholder={e.Event_name}
                simpleValue
              />
              <ChangeButton>変更</ChangeButton>
            </ItemWrapper>
          </EventCard>
        ))}
      </TopPageWrapper>
    )
  }
}

const TopPageWrapper = styled("div")`
  width: 85%;
  margin: 20px auto;
  background-color: whitesmoke;
  min-width: 320px;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    margin: auto;
    width: unset;
  }
`;

const Selector = styled(Select)`
  width: 70%;
`;

const EventCard = styled("div")`
  display: block;
  height: 100%;
  background: white;
  padding: 5px;
  margin: 3px auto;
  border-bottom: solid 1px #eeeeee;
  position: relative;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    min-width: unset;
  }
`;

const EventTitle = styled("div")`
  color: black;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  margin: 30px;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    font-size: 20px

  }
`;

const ItemWrapper = styled("div")`
  display: flex;
  width: 100%;
`;

const ChangeButton = styled("button")`
  margin: 2px auto;
  height: 30px;
  color: white;
  width: 80px;
  font-size: 10px;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  background-color: rgb(255, 152, 0);
  border: 10px;
  outline: none;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  transition-property: all;
  transition-duration: 450ms;
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  transition-delay: 0ms;
  :hover {
    background-color: rgb(255, 152, 0, 0.9);
    cursor: pointer;
  }
  :active {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px, rgba(0, 0, 0, 0.23) 0px 1px 8px;
    background-color: rgb(255, 152, 0, 0.8);

  }
`;

const mapStateToProps = state => ({
  events: state.eventList.data,
  actions: state.actionList.data
});

const mapDispatchToProps = dispatch => ({
  fetchEventList: () => dispatch(fetchEventListAction()),
  fecthActionList: () => dispatch(fetchActionListAction())
});


export default connect(mapStateToProps, mapDispatchToProps)(Top)
