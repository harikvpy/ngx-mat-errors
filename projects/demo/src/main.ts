import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {
  errorMessagesEnFactory,
  NGX_MAT_ERROR_DEFAULT_OPTIONS, NGX_MAT_ERROR_CONFIG_EN
} from 'ngx-mat-errors';
import { FactoryProvider, LOCALE_ID } from '@angular/core';

export const NGX_MAT_ERROR_DEFAULT_CONFIG: FactoryProvider = {
  useFactory: (locale: string) => ({
    ...errorMessagesEnFactory(locale),
    dateNotWithinCurrentFiscalPeriod: "Date not within current fiscal period",
  }),
  provide: NGX_MAT_ERROR_DEFAULT_OPTIONS,
  deps: [LOCALE_ID],
};

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), NGX_MAT_ERROR_CONFIG_EN, NGX_MAT_ERROR_DEFAULT_CONFIG],
}).catch((err) => console.error(err));
