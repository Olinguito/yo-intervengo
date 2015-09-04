import {resource, property} from 'lib/backend/decorators';

/**
 * Category
 */
@resource
export class Category {
    // tell the {RemoteBackend} what is the plural from of category
    static resName = 'category';
    static resNamePlural = 'categories';

    @property slug;
    @property name;
    @property icon;
    @property(Category) parent;
}

@resource
export class CategoryNode {
    // tell the {RemoteBackend} what is the plural from of category
    static resName = 'category';
    static resNamePlural = 'categories';

    @property slug;
    @property name;
    @property icon;
    @property(Array) children;
}
