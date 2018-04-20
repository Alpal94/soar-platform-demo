import { createSelector } from 'reselect';

const getNotificationsDomain = () => (state: any) => state.get('notificationsDomain');

const selectMessage = () => createSelector(
    getNotificationsDomain(),
    notificationsState => notificationsState.get('message')
);

const selectUserInfo = () => createSelector(
    getNotificationsDomain(),
    notificationsState => notificationsState.get('info')
);

export {
    selectMessage,
    selectUserInfo
};

export default getNotificationsDomain;