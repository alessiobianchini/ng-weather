import { Component, ViewChild } from '@angular/core';
import { DynamicButtonComponent } from 'app/dynamic-button/dynamic-button.component';
import { ButtonState } from 'app/models/button-state.enum';
import { LocationService } from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {
  @ViewChild('button', { read: DynamicButtonComponent })
  buttonComp: DynamicButtonComponent;
  countryCode: string;

  constructor(private service: LocationService) { }

  async addLocation(zipcode: string) {
    if (!this.countryCode || !zipcode) {
      alert("Country and Zipcode are mandatory")
    }
    else {
      this.buttonComp.buttonState.next({ state: ButtonState.Adding, config: null });
      // delay for "Adding..." state demo purpose
      await this.delay(400);
      this.service.addLocation(zipcode, this.countryCode);
      this.buttonComp.buttonState.next({ state: ButtonState.Done, config: null });
    }
  }

  countrySelected(countryCode) {
    this.countryCode = countryCode;
  }

  // Demo purpouse
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
