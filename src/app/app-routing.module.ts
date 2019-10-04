import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const avesRoutes: Routes = [
  {
    path: '',
    loadChildren: './aves/aves.module#AvesModule'
  }
]

const routes: Routes = [
  {
    path: 'aves',
    children: avesRoutes
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, 
                {useHash: false , enableTracing: false}) 
            ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}