import {customElement, useShadowDOM, bindable, bindingMode as b} from 'aurelia-framework';
import {addStyleToTemplate} from 'lib/util';
import style from './yi-card-list.css!text';

@customElement('yi-card-list')
@useShadowDOM
export class YiCardList {
    @bindable({defaultBindingMode: b.twoWay})
    order = 'date';

    orderOptions = [
        {
            title: 'Orden alfabético',
            icon: 'az',
            name: 'alpha'
        },
        {
            title: 'Mas cercanos',
            icon: 'location',
            name: 'location'
        },
        {
            title: 'Número de respaldos',
            icon: 'hand',
            name: 'supports'
        },
        {
            title: 'Fecha de creación',
            icon: 'recent',
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
