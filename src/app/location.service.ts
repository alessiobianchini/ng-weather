import { Injectable } from '@angular/core';
import { WeatherService } from "./weather.service";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {

  locations: { zipcode: string, countryCode: string }[] = [];

  constructor(private weatherService: WeatherService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.weatherService.addCurrentConditions(loc);
  }

  addLocation(zipcode: string, countryCode: string) {
    let record = { zipcode: zipcode, countryCode: countryCode };
    this.locations.push(record);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions(record);
  }

  removeLocation(record: { zipcode: string, countryCode: string }) {
    let index = this.locations.findIndex(f => f.zipcode == record.zipcode && f.countryCode == record.countryCode);
    if (index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(record);
    }
  }
}
