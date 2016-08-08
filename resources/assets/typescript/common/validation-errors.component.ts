import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'validation-errors',
    templateUrl: './validation-errors.html'
})
export class ValidationErrorsComponent implements OnInit
{
    public fields: { field: string; errors: string[]; }[];
    
    public ngOnInit(): void
    {
        this.fields = [];
    }
    
    public show(errors: { [field: string]: string[]; }): void
    {
        this.clear();
        
        this.fields = Object.keys(errors).map(field => {
            return {
                field: field,
                errors: errors[field]
            };
        });
    }
    
    public clear(): void
    {
        this.fields = [];
    }
}