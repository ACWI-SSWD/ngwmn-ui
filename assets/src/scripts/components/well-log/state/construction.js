import memoize from 'fast-memoize';


const MOUNT_POINT = 'components/well-log/construction';
const SELECTED_CONSTRUCTION_ITEM_SET = `${MOUNT_POINT}/SELECTED_CONSTRUCTION_ITEM_SET`;
const VISIBLE_CONSTRUCTION_ITEMS_SET = `${MOUNT_POINT}/VISIBLE_CONSTRUCTION_ITEMS_SET`;


/**
 * Action creator to set the selected construction item index, key on siteKey.
 * @param {Object} siteKey                 Site ID
 * @param {Object} selectedConstructionId Construction ID
 */
export const setSelectedConstructionId = function(siteKey, selectedConstructionId) {
    return {
        type: SELECTED_CONSTRUCTION_ITEM_SET,
        payload: {
            siteKey,
            selectedConstructionId
        }
    };
};

/**
 * Action creator to set the selected construction item index, key on siteKey.
 * @param {Object} siteKey                 Site ID
 * @param {Object} visibleConstructionIds Currently visible IDs
 */
export const setVisibleConstructionIds = function(siteKey, visibleConstructionIds) {
    return {
        type: VISIBLE_CONSTRUCTION_ITEMS_SET,
        payload: {
            siteKey,
            visibleConstructionIds
        }
    };
};

/**
 * Gets the index of the selected construction item.
 */
export const getSelectedConstructionId = memoize(siteKey => state => {
    const selectedConstructionIds = state[MOUNT_POINT].selectedConstructionIds || {};
    return selectedConstructionIds[siteKey];
});

/**
 * Gets the visible IDs, if set.
 */
export const getVisibleConstructionIds = memoize(siteKey => state => {
    const visibleConstructionIds = state[MOUNT_POINT].visibleConstructionIds || {};
    return visibleConstructionIds[siteKey];
});

/**
 * Well log reducer
 * @param  {Object} state  Redux state
 * @param  {Object} action Action object
 * @return {Object}        New state
 */
const reducer = function(state = {}, action) {
    let selectedConstructionIds;
    let visibleConstructionIds;
    switch (action.type) {
        case SELECTED_CONSTRUCTION_ITEM_SET:
            selectedConstructionIds = Object.assign({}, state.selectedConstructionIds);
            selectedConstructionIds[action.payload.siteKey] = action.payload.selectedConstructionId;
            return {
                ...state,
                selectedConstructionIds: selectedConstructionIds
            };
        case VISIBLE_CONSTRUCTION_ITEMS_SET:
            visibleConstructionIds = Object.assign({}, state.visibleConstructionIds);
            visibleConstructionIds[action.payload.siteKey] = action.payload.visibleConstructionIds;
            return {
                ...state,
                visibleConstructionIds: visibleConstructionIds
            };
        default:
            return state;
    }
};

/**
 * Export the reducer keyed on the mount point, for easy usage with
 * combineReducers.
 */
export default {
    [MOUNT_POINT]: reducer
};
