import State from "@/models/State";
import Tag from "@/models/Tag";
import Task from "@/models/Task";
import EisenhowerPrincipleEnum from "@/enums/EisenhowerPrincipleEnum";
import StatesEnum from "@/enums/StatesEnum";

export default class DbSeeder {
    static init() {
        this.addPublishedStates();
        this.addBoilerplateTasks();
        this.addEisenhowerPrinciple();
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
                    state_id: StatesEnum.ACTIVE
                },
                {
                    title: 'that',
                    state_id: StatesEnum.ACTIVE
                },
                {
                    title: 'the',
                    state_id: StatesEnum.ACTIVE
                },
                {
                    title: 'other.',
                    state_id: StatesEnum.ACTIVE
                },
            ]
        });

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