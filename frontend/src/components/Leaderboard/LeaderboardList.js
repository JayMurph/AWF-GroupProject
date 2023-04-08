import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { CenteredDiv, ScrollDiv } from "../../StyledElements";
import { GetCategoryQuizResultsPage } from "../../ApiCalls";
import { FlexColumnContainer } from "../../StyledElements";

export default class LeaderboardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      items: props.initialItems,
      fetching:false,
      page:1, 
      hasMoreItems:true,
      scrollParentRef:null,
    };
  }

  fetchItems = async() => {
    if (this.state.fetching === true) {
      return;
    } 

    this.setState({fetching:true});

    try {
      await GetCategoryQuizResultsPage(this.state.category, this.state.page + 1)
      .then((res)=>res.json())
      .then(async (res) => {
        if (res.length > 0) {
          this.setState({
            // set items
            // increment page numer
            page:this.state.page+1,
            items:[...this.state.items, ...res]
          });
        }
        else {
          this.setState({hasMoreItems:false});
        }
      })
      .catch((err) =>  {
        this.setState({hasMoreItems:false});
        console.log(err) 
      });
    }
    catch (err) {
      console.log(err.message);
    }
    finally {
      this.setState({fetching:false});
    }
  }

  loader() {
    <div key="loader" className="loader">
      Loading ...
    </div>
  }

  render() {
    return (
      <FlexColumnContainer>
        <CenteredDiv
          style={{"display":"grid", "height":"90%", "width":"90%", "alignSelf":"center"}}
          >
          <InfiniteScroll 
            pageStart={this.state.page}
            loader={this.loader}
            loadMore={this.fetchItems}
            hasMore={this.state.hasMoreItems}
            threshold="50"
            useWindow="false"
          >
            <div>
              {this.state.items.map((hs) => {
                return <div style={{"height":"200px"}}> {hs.userId} {hs.finalScore} {hs.timeStamp} </div>
              })}
            </div>
          </InfiniteScroll>
        </CenteredDiv>
      </FlexColumnContainer>
    );
  }
}
