import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from 'app/models/country.model';

@Component({
  selector: 'app-country-auto-filter',
  templateUrl: './country-auto-filter.component.html',
  styleUrls: ['./country-auto-filter.component.css']
})
export class CountryAutoFilterComponent implements OnInit {
  public countries: Array<Country>;
  public filteredCountries: Array<Country>;
  public searchTerm: string;
  public showDropdown = false;
  @Output() countrySelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.countries = [];
  }

  ngOnInit(): void {
    fetch('./assets/countries.json').then(res => res.json())
      .then(jsonData => {
        this.countries = jsonData;
      });
  }

  filterCountries(arr: Array<Country>, regex) {
    regex = regex.toString().toLowerCase();
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].name.toString().toLowerCase().includes(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  }

  public searchOnKeyUp(event) {
    this.showDropdown = true;
    let input = event.target.value;
    if (input.length > 0) {
      this.filteredCountries = Object.assign([], this.filterCountries(this.countries, input));
    }
    else {
      this.filteredCountries = Object.assign([], this.countries);
    }
  }

  countryClicked(country: Country) {
    this.showDropdown = false;
    this.searchTerm = country.name;
    this.countrySelected.emit(country.code);
  }
}
