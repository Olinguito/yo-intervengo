import {resource, property} from 'lib/backend/decorators';

/**
 * Category
 */
@resource
export class Category {
    // tell the {RemoteBackend} what is the plural from of category
    static resName = 'category';
    static resNamePlural = 'categories';

    @property id;
    @property slug;
    @property name;
    @property icon;
    @property(Category) parent;

    deserializeParent(val) {
        return Category.findOne({slug: val});
    }

    serializeParent(parent) {
        return parent.slug;
    }
}
