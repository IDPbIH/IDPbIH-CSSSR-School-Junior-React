import React from 'react';
import s from './FilterList.module.css';
import LogRender from '../LogRender/LogRender';
import { getActiveCategoriesFromURL } from '../../utils/getFromURL';

class FilterList extends LogRender {
    setDefault = (event) => {
        event.preventDefault();
        this.props.setDefaultFiltersValue();
    }

    render() {
        const { filterValue: { minPriceValue, maxPriceValue, discountValue }, categories,
            changeInputValue } = this.props;
        //переработать active - уюрать
        const activeCategories = getActiveCategoriesFromURL();

        return (
            <div className={s.filterList}>
                <form>
                    {this.props.renderInputNumber(minPriceValue, maxPriceValue, changeInputValue)}
                    {this.props.renderInputDiscount(discountValue, changeInputValue)}
                    {this.props.renderInputCategory(categories, activeCategories)}
                </form>
                <button className={s.reset_button} onClick={this.setDefault}>Сбросить фильтры</button>
            </div>
        );
    }
}

export default FilterList;