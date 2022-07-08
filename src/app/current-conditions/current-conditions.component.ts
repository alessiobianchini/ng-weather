import { Component } from '@angular/core';
import { WeatherService } from "../weather.service";
import { LocationService } from "../location.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  constructor(private weatherService: WeatherService, private locationService: LocationService, private router: Router) {
  }

  getCurrentConditions() {
    let c = this.weatherService.getCurrentConditions();
    return c;
  }

  showForecast(location: { zip: string, countryCode: string }) {
    this.router.navigate(['/forecast', location.zip, location.countryCode])
  }
}
