import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { AppMaterialModule } from './app.material.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { PageSchedulerComponent } from './components/page-scheduler/page-scheduler.component';
import { FormReservationComponent } from './components/form-reservation/form-reservation.component';
import { ReservationService } from './service/reservation-service';
import { ShedulerModule } from './scheduler/scheduler.module';
import { FormReservationGroupeComponent } from './components/form-reservation-groupe/form-reservation-groupe.component';
import { FormReservationIndividuelComponent } from './components/form-reservation-individuel/form-reservation-individuel.component';
import { FormReceptionIndividuelComponent } from './components/form-reception-individuel/form-reception-individuel.component';



@NgModule({
  declarations: [
    AppComponent,
    PageSchedulerComponent,
    FormReservationComponent,
    FormReservationGroupeComponent,
    FormReservationIndividuelComponent,
    FormReceptionIndividuelComponent,



  ],
  entryComponents: [
    FormReservationComponent,
    FormReservationGroupeComponent,
    FormReservationIndividuelComponent,
    FormReceptionIndividuelComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    ShedulerModule,
    AppRoutingModule,
    CommonModule


  ],
  providers: [
    ReservationService,


  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
