import { createSelector } from 'reselect';

const getNotificationsDomain = () => (state: any) => state.get('notificationsDomain');

const selectMessage = () => createSelector(
    getNotificationsDomain(),
    notificationsState => notificationsState.get('message')
);

export {
    selectMessage
};

export default getNotificationsDomain;