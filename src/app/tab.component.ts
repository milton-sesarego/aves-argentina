import { Component, Input } from '@angular/core';

@Component({
  selector: 'tabs',
  template: `
    <mat-tab-group>
      <ng-container *ngFor="let tab of tabsName">
        <mat-tab label="{{ tab.name }}">
          <ng-container [ngTemplateOutlet]='tab.template'></ng-container>
        </mat-tab>
      </ng-container>
    </mat-tab-group>
    <ng-content></ng-content>
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class TabComponent  {
  @Input() tabsName: any;
  
  onSelect(event){
    console.log(this.tabsName[0].name)
  }
}