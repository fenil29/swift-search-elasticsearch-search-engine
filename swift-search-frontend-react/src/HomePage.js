import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  RangeSlider,
  SingleRange,
  SelectedFilters,
  ResultCard,
  ReactiveList,
} from "@appbaseio/reactivesearch";
import Constants from "./Constants";
import { Link } from "react-router-dom";
import "./App.css";
import Logo from "./logo1.png";

class HomePage extends Component {
  render() {
    return (
      <ReactiveBase
        app={Constants.elasticSearchAppName}
        url={Constants.elasticSearchUrl}
        //url="http://192.168.2.86:9200/"
      >
        {/* Navigation Bar */}
        <div className="navbar">
          <div className="logo">Swift</div>
          <div className="logo">
            {/* <img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-search-interface-kiranshastry-lineal-color-kiranshastry.png" /> */}
            {/* <img src="https://w7.pngwing.com/pngs/321/177/png-transparent-computer-icons-magnifier-magnifying-glass-magnifying-glass-text-share-icon-magnifier.png" /> */}
            <img src={Logo} />
          </div>

          {/* Configuring Search Bar */}
          <DataSearch
            componentId="mainSearch"
            // dataField={[
            //   {
            //     field: "title",
            //     weight: 4,
            //   },
            //   {
            //     field: "description",
            //     weight: 3,
            //   },
            //   // {
            //   //   "field": "author_name",
            //   //   "weight": 2
            //   // },
            //   // "publisher",
            //   // "format",
            //   // "language"
            // ]}
            dataField={[
              "title",
              "description",
              // "author_name",
              // "publisher",
              // "format",
              // "language",
            ]}
            fieldWeights={[5, 1]}
            // fieldWeights={[5, 1, 1, 1]}
            // fieldWeights={[5, 1, 1, 1, 1, 1]}
            queryFormat="or"
            placeholder="Search Me"
            iconPosition="left"
            // autosuggest={true}
            // autosuggest={false}
            highlight={false}
            // highlightField={["title","description","author_name"]}
            filterLabel="search"
            fuzziness={0}
            // fuzziness={1}
            URLParams={false}
            debounce={100}
            // enableRecentSuggestions={true}
            // enablePopularSuggestions={true}
            // enablePredictiveSuggestions={true}
            // popularSuggestionsConfig={{
            //   size: 3,
            //   minHits: 2,
            //   minChars: 4,
            // }}
            // recentSuggestionsConfig={{
            //   size: 3,
            //   minChars: 4,
            // // }}
            index="title"
            // size={10}
            className="searchbar"
            innerClass={{
              input: "searchbox",
              list: "suggestionlist",
            }}
          />
        </div>

        {/* Body having side bar and main content */}
        <div className={"display"}>
          {/* Configuring Side Bar with filters */}
          <div className={"leftSidebar"}>
            <span className="filter">Filters</span>
            <RangeSlider //For Publish date
              componentId="publishDateFilter"
              dataField="publication_date"
              title="Year of Publication"
              filterLabel="published"
              range={{
                start: new Date("1950-12-12"),
                end: new Date("2022-12-12"),
              }}
              defaultValue={{
                start: new Date("1950-12-12"),
                end: new Date("2022-12-12"),
              }}
              rangeLabels={{
                start: "1950",
                end: "2022",
              }}
              stepValue={1}
              showHistogram={true}
              queryFormat="basic_date"
              showFilter={true}
              // includeNullValues
              interval={2}
            />
            <MultiList //Filter data by author name
              componentId="authorFilter"
              dataField="author_name.keyword"
              title="Authors"
              size={8}
              showCheckbox={true}
              className="authors"
              innerClass={{
                list: "author-list",
              }}
              placeholder="Filter by author name"
              filterLabel="Authors"
              react={{
                and: ["mainSearch"],
              }}
            />

            <MultiList //Filter data by publisher name
              componentId="publisherFilter"
              dataField="publisher.keyword"
              title="Publishers"
              size={6}
              showCheckbox={true}
              className="publishers"
              innerClass={{
                list: "publisher-list",
              }}
              placeholder="Filter by publisher name"
              filterLabel="Publishers"
              react={{
                and: ["mainSearch"],
              }}
            />

            <MultiList //Filter data by format type
              componentId="formatFilter"
              dataField="format.keyword"
              title="Data Format"
              size={6}
              showCheckbox={true}
              className="dataFormat"
              innerClass={{
                list: "format-list",
              }}
              placeholder="Filter by format type"
              filterLabel="Format"
              // react={{
              //   and: ["mainSearch"],
              // }}
            />

            <MultiList //Filter data by language
              componentId="languageFilter"
              dataField="language.keyword"
              title="Languages"
              size={6}
              showCheckbox={true}
              className="languages"
              innerClass={{
                list: "language-list",
              }}
              placeholder="Filter by languages"
              filterLabel="Languages"
              // react={{
              //   and: ["mainSearch"],
              // }}
            />

            <RangeSlider //Filter data by page numbers
              componentId="pageFilter"
              dataField="num_pages"
              title="Number of Pages"
              filterLabel="total pages"
              range={{
                start: 0,
                end: 5000,
              }}
              rangeLabels={{
                start: 0,
                end: 5000,
              }}
              showFilter={true}
              includeNullValues
              interval={2}
            />
          </div>

          {/* Main Body  */}
          <div className={"mainBar "}>
            {/* Shows filters on top */}
            <SelectedFilters />

            {/* Shows the main content   */}
            <ReactiveList
              componentId="SearchResult"
              // dataField="title"
              // dataField={[
              //   "title",
              //   "description",
              //   "author_name",
              //   "publisher",
              //   "format",
              //   "language",
              // ]}
              // fieldWeights={[5, 1, 1, 1, 1, 1]}
              size={12}
              showResultStats={true}
              pagination
              loader={<div className="loader"></div>}
              renderResultStats={function (stats) {
                // return `Showing ${stats.numberOfResults} in ${stats.time} ms`;
                return (
                  <div className="time-text">
                    Showing {stats.numberOfResults} in {stats.time} ms
                  </div>
                );
              }}
              react={{
                and: [
                  "mainSearch",
                  "publishDateFilter",
                  "authorFilter",
                  "publisherFilter",
                  "formatFilter",
                  "languageFilter",
                  "pageFilter",
                ],
              }}
              ////Link  to={`/${item.id}`}
              sortOptions={[
                {
                  label: "Best Match",
                  dataField: "_score",
                  sortBy: "desc",
                },
                {
                  label: "Year Descending ",
                  dataField: "publication_date",
                  sortBy: "desc",
                },
                {
                  label: "Year Ascending ",
                  dataField: "publication_date",
                  sortBy: "asc",
                },
              ]}
              render={({ data }) => (
                <div className="cardContainer">
                  {data.map((item, i) => (
                    <Link
                      to={`/information/${item._uuid}`}
                      className="resultCard"
                      key={i}
                    >
                      {item.image_url == null ||
                      item.image_url ==
                        "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png" ? (
                        <img
                          className="cardImage"
                          // src="https://cms.cut.ac.za/Files/Images/f25625f6-e024-444b-b31e-be7db64abb44.jpg"
                          src="https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        />
                      ) : (
                        <img className="cardImage" src={item.image_url} />
                      )}
                      <div className="cardData">
                        <div
                          className="title"
                          dangerouslySetInnerHTML={{
                            __html: item.title,
                          }}
                        />

                        <div className="flex column justify-space-between">
                          <div className="description">{item.description}</div>

                          <div>
                            <div className="tags">
                              <span>Tags: </span>
                              {item.author_name == null ? (
                                ""
                              ) : (
                                <div>
                                  <span className="authors-list tag">
                                    {item.author_name}
                                  </span>
                                </div>
                              )}

                              {item.publisher == null ? (
                                ""
                              ) : (
                                <div>
                                  <span className="publishers-list tag">
                                    {item.publisher}
                                  </span>
                                </div>
                              )}

                              {item.publication_date == null ? (
                                ""
                              ) : (
                                <div>
                                  <span className="pub-year tag">
                                    {item.publication_date}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default HomePage;
