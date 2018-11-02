//Imported libraries
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {ChartModule} from 'primeng/chart';
import {ToastrModule} from 'ngx-toastr';
import {NgxSmartModalModule} from 'ngx-smart-modal';

//Components
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SettingsComponent} from './components/settings/settings.component';
import {HomeComponent} from './components/home/home.component';

//Directives
import {WidgetComponent} from './directives/widget/widget.component';

//Modal components

//Formly Wrappers
import {FormlyHorizontalWrapper} from './formly/wrappers/horizontal-wrapper';

//Services
import {GlobalService} from './services/global-service/global.service';
import {LayoutFetchingService} from './services/layout-fetching-service/layout-fetching.service';
import {MiscService} from './services/misc-service/misc.service';
import {DruidDataService} from './services/druid-data-service/druid-data.service';
import {ChartBaseService} from './services/chart-base-service/chart-base.service';
import {FormlyFieldBaseService} from './formly/field-bases/formly-field-base.service';

//Router path template
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard/:id', component: DashboardComponent},
    {path: 'settings', component: SettingsComponent}];

@NgModule({
    declarations: [
        AppComponent,
        WidgetComponent,
        SettingsComponent,
        DashboardComponent,
        FormlyHorizontalWrapper,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ChartModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSmartModalModule.forRoot(),
        FormlyModule.forRoot({
            wrappers: [{name: 'form-field-horizontal', component: FormlyHorizontalWrapper}],
            validationMessages: [
                {name: 'required', message: 'This field is required'},
            ],
        }),
        FormlyBootstrapModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
    ],
    entryComponents: [],
    providers: [
        GlobalService,
        LayoutFetchingService,
        DruidDataService,
        MiscService,
        ChartBaseService,
        FormlyFieldBaseService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
