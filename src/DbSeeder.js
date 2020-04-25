import State from "@/models/State";
import Category from "@/models/Category";
import Task from "@/models/Task";
import StatesEnum from "@/enums/StatesEnum";
import DefaultCategoriesEnum from "@/enums/DefaultCategoriesEnum";

export default class DbSeeder {
    static init() {
        this.addPublishedStates();
        this.addCategories();
        if ( process.env.NODE_ENV === 'development') {
            this.addBoilerplateTasks();
        }
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

    static addCategories() {
        Object.keys(DefaultCategoriesEnum.properties).forEach((i) => {
            const prop = DefaultCategoriesEnum.properties[i];

            Category.insert({
                data: {
                    title: prop.name
                }
            }).then((parentCollection) => {
                const parent = parentCollection.categories[0];
                const data = [];

                Object.keys(prop.data.properties).forEach((j) => {
                    const child = prop.data.properties[j];
                    data.push({title: child.name, parent_id: parent.id})
                });

                Category.insertOrUpdate({
                    data
                });
            });



        });
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