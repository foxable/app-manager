import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'errors',
    templateUrl: './errors.html'
})
export class ErrorsComponent implements OnInit
{
    public errors: string[];
    
    public ngOnInit(): void
    {
        this.errors = [];
    }
    
    public show(errors: string | string[]): void
    {
        this.errors = errors instanceof Array ? errors : [errors];
    }
    
    public clear(): void
    {
        this.errors = [];
    }
}