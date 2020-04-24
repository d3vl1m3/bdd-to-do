// Used for tracking the current published state of an item
export default {
    ACTIVE: 0,
    INACTIVE: 1,
    ARCHIVED: 2,
    DELETED: 3,
    properties: {
        0: {name: "active", value: 0},
        1: {name: "inactive", value: 1},
        2: {name: "archived", value: 2},
        3: {name: "deleted", value: 3}
    }
};