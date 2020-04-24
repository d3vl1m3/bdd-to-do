import State from "@/models/State";
import Tag from "@/models/Tag";
import Task from "@/models/Task";
import EisenhowerPrincipleEnum from "@/enums/EisenhowerPrincipleEnum";
import StatesEnum from "@/enums/StatesEnum";

export default class DbSeeder {
    static init() {
        this.addPublishedStates();
        this.addTags();
        this.addBoilerplateTasks();
    }

    // add the published states for items (active, deleted etc.)
    static addPublishedStates() {
        const data = [];
        Object.keys(StatesEnum).forEach((key) => {
            if (key === 'properties')
                return;

            data.push({state: StatesEnum.properties[StatesEnum[key]].name, id: StatesEnum[key],});
        });

        State.insert({data});

    }

    // add basic tasks to pre-populate the list
    static addBoilerplateTasks() {
        Task.insert({
            data: [
                {
                    title: 'This',
                    state_id: StatesEnum.ACTIVE,
                    tags: [
                        {
                            ...Tag.find(0),
                            tag: {
                                id: 1,
                                order: 2
                            }
                        },
                        {
                            ...Tag.find(1),
                            tag: {
                                id: 1,
                                order: 5
                            }
                        }
                    ]
                },
                {
                    title: 'that',
                    state_id: StatesEnum.ACTIVE,
                    tags: [
                        {
                            ...Tag.find(0),
                            tag: {
                                id: 1,
                                order: 3
                            }
                        },
                        {
                            ...Tag.find(1),
                            tag: {
                                id: 1,
                                order: 3
                            }
                        }
                    ]
                },
                {
                    title: 'the',
                    state_id: StatesEnum.ACTIVE,
                    tags: [
                        {
                            ...Tag.find(0),
                            tag: {
                                id: 1,
                                order: 1
                            }
                        },
                        {
                            ...Tag.find(1),
                            tag: {
                                id: 1,
                                order: 4
                            }
                        }
                    ]
                },
                {
                    title: 'other.',
                    state_id: StatesEnum.ACTIVE,
                    tags: [
                        {
                            ...Tag.find(0),
                            tag: {
                                id: 1,
                                order: 4
                            }
                        },
                        {
                            ...Tag.find(1),
                            tag: {
                                id: 1,
                                order: 2
                            }
                        }
                    ]
                },
            ]
        });

    }

    static addTags() {
        this.addEisenhowerPrinciple();
    }

    // add basic tasks to pre-populate the list
    static addEisenhowerPrinciple() {
        const data = [];

        Object.keys(EisenhowerPrincipleEnum).forEach((key) => {
            // ignore properties key
            if (key === 'properties')
                return;

            data.push({
                id: EisenhowerPrincipleEnum[key],
                title: EisenhowerPrincipleEnum.properties[EisenhowerPrincipleEnum[key]].name
            });
        });

        Tag.insert({data});

    }
}