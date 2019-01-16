import React, { Component } from 'react';
import Tag from '../TagComponent/Tag';
import _ from 'underscore';
import './Filters.scss';

const tooltipGenerator = (value) =>  <div className="tooltip" ref="tooltip">
  <span className="tooltip__value">{value}</span>
</div>;

class Filters extends Component {
  constructor(props) {
    super(props);
    this.tags = [];

    this.state = {
      searchForTitle: '',
      searchForTag: '',
      resultsPerPage: 15,
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.searchForTitleChange = this.searchForTitleChange.bind(this);
    this.searchForTagChange = this.searchForTagChange.bind(this);
    this.createTags = this.createTags.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  handleSliderChange(event) {
    event.preventDefault();
    const slider = event.target;
    let value = slider.value;
    let position = slider.value / slider.max;
    let offset = slider.clientWidth * position;
    this.setToolTipPosition(offset);
    this.setState({ resultsPerPage: value, });
  }

  removeTag(event) {
    let tagToRemove = event.target.parentNode.childNodes[0].innerText;
    let index = this.state.tags.indexOf(tagToRemove);
    if (index > -1) {
      this.state.tags.splice(index, 1);
      this.forceUpdate();
    }
  }

  createTags() {
    if (this.state.searchForTag !== '') {
      this.tags.push(this.state.searchForTag);
      this.forceUpdate();
    }
  }

  setToolTipPosition(left) {
    const toolTip = this.refs.tooltip;
    toolTip.style.visibility = 'visible';
    if (left > 60) {
      toolTip.style.left = `${left - 18}px`;
    } else {
      toolTip.style.left = `${left - 8}px`;
    }
  }

  searchForTitleChange(event) {
    event.preventDefault();
    let value = event.target.value;
    _.debounce(this.setState({ searchForTitle: value }), 2500);
  }

  searchForTagChange(event) {
    event.preventDefault();
    let value = event.target.value;
    this.setState({ searchForTag: value, });
  }

  setFilters(value) {
    this.props.updateParams(value);
  }

  render() {
    return (
      <div className="side-filters">
        <i className="fas fa-times close-icon" onClick={this.props.closeFilters} ></i>
        <div className="input-wrapper">
          <span className="labels" htmlFor="volume">Resulst per page</span>
          {tooltipGenerator(this.state.resultsPerPage)}
          <input
            className="slider"
            type="range"
            name="volume"
            max="100"
            min="0"
            step="1"
            onBlur={() => {
              this.refs.tooltip.style.visibility = 'hidden';
            }}
            onChange={this.handleSliderChange}
            value={this.state.resultsPerPage} />
        </div>
        <div className="input-wrapper">
          <label className="inputs" htmlFor="searchForTitle">
          <input
            className="labels"
            type="text"
            name="searchForTitle"
            id="searchForTitle"
            placeholder="&nbsp;"
            onChange={this.searchForTitleChange}
            value={this.state.searchForTitle} />
            <span className="labels">Search by name:</span>
            <span className="border"></span>
          </label>
        </div>
        <div className="input-wrapper">
          <label className="inputs" htmlFor="searchForTags">
          <input
            className="labels"
            type="text"
            name="searchForTags"
            id="searchForTags"
            placeholder="&nbsp;"
            onChange={this.searchForTagChange}
            onBlur={this.createTags}
            value={this.state.searchForTag} />
            <span className="labels">Search by tags:</span>
            <span className="border"></span>
          </label>
        </div>
        <div>
          {this.tags.map((tag, index) => <Tag key={index} iconClickHandler={this.removeTag} tagName={tag} />)}
        </div>
        <span className="search-button" onClick={
          this.setFilters({
            searchForTitle: this.state.searchForTitle,
            resultsPerPage: this.state.resultsPerPage,
            tags: this.tags.join(','),
          })}>Send tags</span>
      </div>
    );
  }
}

export default Filters;
