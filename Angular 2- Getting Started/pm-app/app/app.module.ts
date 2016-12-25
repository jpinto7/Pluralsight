import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ProductModule } from './products/product.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  imports: [
    ProductModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
