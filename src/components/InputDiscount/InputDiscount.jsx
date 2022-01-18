import React from 'react';
import s from './InputDiscount.module.css'
import Discount from 'csssr-school-input-discount';
import withSubscription from '../../hoc/withSubscription ';
import LogRender from '../../components/LogRender/LogRender';
import { StateContext } from '../../index';

class InputDiscount extends LogRender {
    render() {
        return (
            <StateContext.Consumer>
                {
                    (state) =>
                    <div className={s.discount}>
                        <Discount
                            title='Скидка'
                            name='discountValue'
                            value={state.discountValue}
                            onChange={this.props.handleChange}
                        />
                    </div>
                }
            </StateContext.Consumer>
        );
    }
}


export default withSubscription(InputDiscount);