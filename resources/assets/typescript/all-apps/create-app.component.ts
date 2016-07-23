import {Component, ViewChild} from '@angular/core';

import {BS_VIEW_PROVIDERS, MODAL_DIRECTIVES, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap'; 
 
@Component({
  selector: 'create-app-modal',
  directives: [MODAL_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS],
  templateUrl: './create-app.html'
})
export class CreateAppComponent
{
    @ViewChild('modal') private modal: ModalDirective;
    
    public show(): void
    {
        this.modal.show();
    }
    
    public hide(): void
    {
        this.modal.hide();
    }
}