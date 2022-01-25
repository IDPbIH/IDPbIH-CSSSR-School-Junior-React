import React from 'react';
import { store } from '../store';

const withHistory = (InputComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.setFromHistoryTrigger = false;
        }

        setURL = (state) => {
            console.log('Working...');
            let activeCategoriesURL = '';
            for (var i = 0; i < state.routing.queryItems.activeCategories.length; i++) {
                activeCategoriesURL = activeCategoriesURL + '&category=' + state.routing.queryItems.activeCategories[i];
            }
            const url = '?page=' + state.routing.queryItems.activePage + activeCategoriesURL;
            window.history.pushState(state,123, url);
        }

        componentDidMount() {
            window.addEventListener('popstate', (event) => {
                this.setFromHistoryTrigger = true;
                this.props.setStateFromHistory(event.state);
            });
        }

        componentWillUnmount() {
            window.removeEventListener('popstate', (event) => {
                this.setFromHistoryTrigger = true;
                this.props.setStateFromHistory(event.state);
            });
        }

        componentDidUpdate() {
            !this.setFromHistoryTrigger && this.setURL(store.getState());
            this.setFromHistoryTrigger = false;
        }

        render() {
            return <InputComponent {...this.props} />;
        }
    };
}

export default withHistory;