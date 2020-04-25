import State from "@/models/State";
import Tag from "@/models/Tag";
import Task from "@/models/Task";
import EHPEnum from "@/enums/EisenhowerPrincipleEnum";
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
        Object.keys(StatesEnum.properties).forEach((key) => {
            const property = StatesEnum.properties[key];
            data.push({state: property.name, id: property.value,});
        });

        State.insert({data});

    }

    static addTags() {
        this.addEisenhowerPrinciple();
    }

    // add basic tasks to pre-populate the list
    static addEisenhowerPrinciple() {
        const data = [];

        Object.keys(EHPEnum.properties).forEach((key) => {
            const property = EHPEnum.properties[key];
            data.push({
                title: property.name
            });
        });

        Tag.insert({data});

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
}