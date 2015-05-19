import {customElement, useShadowDOM, bindable, bindingMode} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-card-list.css!text';

@customElement('yi-card-list')
@useShadowDOM
@bindable({name: 'order', defaultBindingMode: bindingMode.twoWay, defaultValue: 'date'})
export class YiCardList {
    orderOptions = [
        {
            title: 'Orden alfabético',
            icon: 'hand',
            name: 'alpha'
        },{
            title: 'Mas cercanos',
            icon: 'location',
            name: 'location'
        },{
            title: 'Número de respaldos',
            icon: 'hand',
            name: 'supports'
        },{
            title: 'Fecha de creación',
            icon: 'hand',
            name: 'date'
        }
    ];

    select(opt) {
        this.order = opt.name;
    }

    static beforeCompile(template) {
        addStyleToTemplate(template, style);
    }
}
