import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { LeaderboardContainer } from "../../StyledElements";
import { GetCategoryQuizResultsPage } from "../../ApiCalls";
import { FlexColumnContainer } from "../../StyledElements";
import LeaderboardItem from "./LeaderboardItem";

export default class LeaderboardList extends React.Component {
  constructor(props) {
    super(props);
    let initialPage = props.initialPage || 1;
    let initialIdx = (initialPage - 1) * 10 + 1;

    this.state = {
      category: props.category,
      items: props.initialItems,
      fetching: false,
      initialPage: initialPage,
      initialIdx: initialIdx,
      lastLoadedPage: initialPage,
      hasMoreItems: true,
      focusItemIdx: props.focusItemIdx || -1,
    };

    this.focusItemRef = React.createRef();
  }

  fetchItems = async () => {
    if (this.state.fetching === true) {
      return false;
    }

    this.setState({ fetching: true });
    const pageToLoad = this.state.lastLoadedPage + 1;

    try {
      await GetCategoryQuizResultsPage(this.state.category, pageToLoad)
        .then((res) => res.json())
        .then(async (res) => {
          if (res.length > 0) {
            this.setState({
              items: [...this.state.items, ...res],
              lastLoadedPage: pageToLoad,
            });
          } else {
            this.setState({ hasMoreItems: false });
          }
        })
        .catch((err) => {
          this.setState({ hasMoreItems: false });
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    } finally {
      this.setState({ fetching: false });
      return true;
    }
  };

  loader() {
    <div key="loader" className="loader">
      Loading ...
    </div>;
  }

  async componentDidMount() {
    if (this.state.focusItemIdx !== -1 && this.focusItemRef.current) {
      this.focusItemRef.current.scrollItemToTop();
    }
  }

  render() {
    return (
      <FlexColumnContainer
        style={{ overflow: "auto", width: "90%", alignSelf: "center" }}
      >
        <InfiniteScroll
          pageStart={this.state.initialPage}
          loader={this.loader}
          loadMore={this.fetchItems}
          hasMore={this.state.hasMoreItems}
          threshold="5"
          useWindow={false}
        >
          <LeaderboardContainer>
            {this.state.items.map((hs, idx) => {
              let currItemIdx = this.state.initialIdx + idx;
              if (currItemIdx === this.state.focusItemIdx) {
                // create special focused item that we can scroll to top
                return (
                  <LeaderboardItem
                    ref={this.focusItemRef}
                    giveFocus={true}
                    userId={hs.userId}
                    score={hs.finalScore}
                    timeStamp={hs.timeStamp}
                    idx={currItemIdx}
                  />
                );
              } else {
                return (
                  <LeaderboardItem
                    userId={hs.userId}
                    score={hs.finalScore}
                    timeStamp={hs.timeStamp}
                    idx={currItemIdx}
                  />
                );
              }
            })}
          </LeaderboardContainer>
        </InfiniteScroll>
      </FlexColumnContainer>
    );
  }
}
