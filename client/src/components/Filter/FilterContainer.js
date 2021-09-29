import React, { Component } from 'react';

import update from 'immutability-helper';
import { AiFillPlusCircle } from 'react-icons/ai';

import colorStyles from '../../styles/colors.module.css';
import fontStyles from '../../styles/fonts.module.css';
import inputStyles from '../../styles/inputs.module.css';
import layoutStyles from '../../styles/layout.module.css';
import styles from './filter.module.css';

import { snakeCaseToCapitalized } from '../../utils/formatterUtils';
import { FILTER_OPTS, DEFAULT_STATE_MAP } from '../../utils/filterUtils';

// TODO: Break this into smaller components.
class FilterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      column: '',
      columnData: {}
    }
  }

  // METHODS
  handleModalClick = () => {
    this.state.showModal
      ? document.removeEventListener("click", this._handleOutsideClick, false)
      : document.addEventListener("click", this._handleOutsideClick, false)

    this.setState(prevState => ({showModal: !prevState.showModal}));
  };

  updateField(event) {
    if (event.target.value === '') {
      this._clearFilterOption();
    } else {
      this.setState({column: event.target.value}, () => {
        this.setState({columnData: DEFAULT_STATE_MAP[event.target.value]});
      });
    }
  }

  updateFilterState(e, subCol, param) {
    // If the input value is an empty string, remove the param filter object entirely.
    // If the input value is NOT an empty string, add the param filter object.
    if (e.target.value === '') {
      const newState = update(this.state.columnData, {
        [ this.state.column ]: { [ subCol ]: { $unset: [ param ] } }
      });
      this.setState({columnData: newState});
    } else {
      const newState = update(this.state.columnData, {
        [ this.state.column ]: { [ subCol ]: { [ param ]: { $set: e.target.value } } }
      });
      this.setState({columnData: newState});
    }
  }

  // HELPERS
  _handleModalClose() {
    this.handleModalClick();
    this._clearFilterOption();
  }

  _handleOutsideClick = e => {
    if (!this.node.contains(e.target)) {
      this._handleModalClose();
    }
  };

  _clearFilterOption = () => {
    this.setState({column: ''}, () => {
      this.setState({columnData: {}});
    })
  }

  // VIEWS
  _getFilterParamView(param, subCol) {
    switch (param) {
      case 'contains':
        return (
          <div>
            <p className={layoutStyles.marginBottom10}>contains</p>
            <input onChange={event => this.updateFilterState(event, subCol, param)}></input>
          </div>
        );
      case 'exact':
        return (
          <div>
            <p className={layoutStyles.marginBottom10}>is exactly</p>
            <input onChange={event => this.updateFilterState(event, subCol, param)}></input>
          </div>
        )
      case 'greater_than':
        return (
          <div>
            <p className={layoutStyles.marginBottom10}>is greater than</p>
            <input type='number' onChange={event => this.updateFilterState(event, subCol, param)}></input>
          </div>
        )
      case 'less_than':
        return (
          <div>
            <p className={layoutStyles.marginBottom10}>is less than</p>
            <input type='number' onChange={event => this.updateFilterState(event, subCol, param)}></input>
          </div>
        )
      case 'starts_with':
        return (
          <div>
            <p className={layoutStyles.marginBottom10}>starts with</p>
            <input type='' onChange={event => this.updateFilterState(event, subCol, param)}></input>
          </div>
        )
      default:
        <div></div>
    }
  }

  _getModalView() {
    return (
      <div className={`${styles.modal} ${colorStyles.white} ${layoutStyles.flexJustifySpaceBetween} ${layoutStyles.flexCol}`}>
        <div>
          <div className={`${layoutStyles.flexJustifySpaceBetween} ${layoutStyles.flexAlignCenter} ${layoutStyles.marginBottom15}`}>
            <h2 className={`${fontStyles.sizeXl}`}>Column</h2>
            <select className={inputStyles.select} onChange={(event) => this.updateField(event)}>
              <option value="">Click To Select A Filter</option>
              { Object.keys(FILTER_OPTS).map((filter, index) => <option key={index} value={filter}>{filter}</option>) }
            </select>
          </div>
          {!!this.state.column && this._getSubColumnsView(FILTER_OPTS[this.state.column])}
        </div>

        <div className={`${layoutStyles.flex} ${layoutStyles.marginTop30}`} >
          <div
            class={`${inputStyles.purpleBtn} ${layoutStyles.marginRight20}`}
            onClick={(event) => this.props.handleFilterUpdate(this.state.column, this.state.columnData)}
            style={{ width: '70%' }}
            >
            Submit
          </div>
          <div
            class={inputStyles.grayBtn}
            onClick={(event) => this._handleModalClose()}
            style={{ width: '30%' }}
            >
            Cancel
          </div>
        </div>
      </div>
    );
  }

  _getSubColumnsView(subColsObj) {
    return Object.keys(subColsObj).map((subCol, index) => (
      <div key={index} className={layoutStyles.marginTop30}>
        <div className={`${fontStyles.bold} ${fontStyles.sizeLg}`}>{snakeCaseToCapitalized(subCol)}</div>
        <div>
          { subColsObj[subCol].map((param, index) => this._getFilterParamView(param, subCol)) }
        </div>
      </div>
    ));
  }

  render() {
    return(
      <div className={`${layoutStyles.flexJustifySpaceBetween} ${layoutStyles.margin10}`}>
        <div>
          {/* If there's, filters render them here. */}
        </div>
        <div ref={node => { this.node = node; }} >
          {this.state.showModal && this._getModalView() }
          <AiFillPlusCircle onClick={() => this.handleModalClick()} className={`${colorStyles.green} ${fontStyles.sizeXxl} ${styles.addFilterBtn}`} />
        </div>
      </div>
    );
  }
}

export default FilterContainer;