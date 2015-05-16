import {resource, property} from 'lib/backend/decorators';
import {deserialize} from 'lib/backend/backend';

/**
 * Category
 */
@resource
export class Category {
    // tell the {RemoteBackend} what is the plural from of category
    static resName = 'category';
    static resNamePlural = 'categories';

    @property id = null;
    @property slug = '';
    @property name = '';
    @property icon = '';
    @property(Category) parent = null;

    serialize() {
        var {id, slug, name, icon, parent} = this;
        return {id, slug, name, icon, parent: parent.slug};
    }
}
