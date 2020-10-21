import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailResolverService } from './email-resolver.service';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // need to add <router-outlet> in HomeComponent to show its children
      { path: 'not-found', component: NotFoundComponent },
      {
        path: ':id',
        component: EmailShowComponent,
        // "resolve" will pass resolved response data to EmailShowComponent as route.data
        resolve: {
          email: EmailResolverService,
        },
      },
      { path: '', component: PlaceholderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
