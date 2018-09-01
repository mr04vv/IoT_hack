import React from "react"
import styled from "react-emotion"
import {connect} from "react-redux"
import ReactLoading from "react-loading";
import {fetchEventListAction} from "../redux/events/event"
import {fetchActionListAction} from "../redux/actions/actions";
import {updateEventRelation} from "../redux/events/update";
import display from "../styles/display"
import Select from "react-select";


class Top extends React.Component {

  constructor() {
    super();
    this.state = {
      events: null,
      selectedEvents: [],
      eventOptionList: [],
      actions: null,
      loading: false,
      success: false,
      error: false
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
      });
      this.state.actions.map((a) => {
        if (this.state.selectedEvents.length > 0) {
          const e = this.state.selectedEvents.concat([{
            label: a.Event_name,
            value: a.Event_id
          }]);
          this.setState({
            selectedEvents: e
          })
        } else {
          this.setState({
            selectedEvents: [{
              label: a.Event_name,
              value: a.Event_id
            }]
          })
        }
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
    copiedEventList[index] = {
      label: selectedEvents.label,
      value: selectedEvents.value
    };
    this.setState({selectedEvents: copiedEventList})
  }

  updateEventRelation(actionId, index) {
    this.setState({
      loading: true
    });
    this.props.updateEventRelation(actionId, this.state.selectedEvents[index].value).then(() => {

      return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
            this.setState({
              loading: false,
              success: true
            })
          }, 1000
        )
      }).then(() => {
        this.props.fetchEventList().then(() => {
          setTimeout(() => {
              this.setState({
                success: false
              })
            }, 1000
          )
        })

      })
    }).catch(() => {

        return new Promise((resolve) => {
          setTimeout(() => {
              resolve();
              this.setState({
                loading: false,
                error: true
              })
            }, 1000
          )
        }).then(() => {
          setTimeout(() => {
              this.setState({
                error: false
              })
            }, 1000
          )
        })
      }
    );
  }

  render() {
    return (
      <TopPageWrapper>
        {this.state.error && <ErrorMessage>変更に失敗しました</ErrorMessage>}
        {this.state.success && (
          <SuccessMessage>正常に変更されました</SuccessMessage>
        )}
        {this.state.actions && this.state.selectedEvents && (this.state.actions.map((e, index) =>
          <EventCard>
            <EventTitle>{e.Action_name}</EventTitle>
            <ItemWrapper>
              <Selector
                onChange={(e) => this.handleSelectChange(e, index)}
                options={this.state.eventOptionList}
                value={this.state.selectedEvents[index]}
                simpleValue
              />
              <ChangeButton onClick={() => this.updateEventRelation(e.Action_id, index)}>変更</ChangeButton>
            </ItemWrapper>
          </EventCard>
        ))}
        {this.state.loading &&
        <LoadingWrapper><LoadingStyle><ReactLoading type={"spinningBubbles"} color={"#fff"} width={"100%"}
        /></LoadingStyle></LoadingWrapper>}

      </TopPageWrapper>
    )
  }
}


const
  TopPageWrapper = styled("div")`
  width: 85%;
  margin: 20px auto;
  background-color: whitesmoke;
  min-width: 320px;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    margin: auto;
    width: unset;
  }
`;

const
  Selector = styled(Select)`
  width: 70%;
`;

const
  EventCard = styled("div")`
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

const
  EventTitle = styled("div")`
  color: black;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  margin: 30px;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    font-size: 20px

  }
`;

const
  ItemWrapper = styled("div")`
  display: flex;
  width: 100%;
`;

const
  ChangeButton = styled("button")`
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

const
  LoadingWrapper = styled("div")`
  background-color: black;
  opacity:0.2;
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

const
  LoadingStyle = styled("div")`
  margin: auto;
  width: 100px;
  margin-top: 50%;
`;

const
  SuccessMessage = styled("div")`
  margin: auto;
  color: #0076ce;
  padding: 8px;  
  position: sticky;
  text-align: center;
`;

const
  ErrorMessage = styled("div")`
  margin: auto;
  padding: 8px;
  position: sticky;
  text-align: center;
  color: '#DE350B';
`;


const
  mapStateToProps = state => ({
    events: state.eventList.data,
    actions: state.actionList.data
  });

const
  mapDispatchToProps = dispatch => ({
    fetchEventList: () => dispatch(fetchEventListAction()),
    fecthActionList: () => dispatch(fetchActionListAction()),
    updateEventRelation: (id, eventId) => {
      const data = {
        event_id: eventId
      }
      return dispatch(updateEventRelation(id, data))
    }

  });


export default connect(mapStateToProps, mapDispatchToProps)

(
  Top
)
