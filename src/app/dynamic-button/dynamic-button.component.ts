import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ButtonConfig } from 'app/models/button-config.model';
import { ButtonState } from 'app/models/button-state.enum';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-button',
  templateUrl: './dynamic-button.component.html'
})
export class DynamicButtonComponent implements OnInit, OnDestroy {
  @Input()
  useTemplate = false;
  config: ButtonConfig;
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();
  public isDisabled: boolean = false;
  public buttonState: BehaviorSubject<{ state: ButtonState, config?: ButtonConfig }> = new BehaviorSubject<{ state: ButtonState, config: ButtonConfig }>({ state: ButtonState.AddLocation, config: null });
  public buttonState$: Observable<{ state: ButtonState, config?: ButtonConfig }>;
  private btnStateSub: Subscription;
  public buttonStateEnum = ButtonState;

  constructor() {
    this.setDefautlConfig(ButtonState.AddLocation);
    this.buttonState$ = this.buttonState.asObservable();
  }

  ngOnInit(): void {
    this.btnStateSub = this.buttonState$.subscribe((data) => {
      this.updateState(data.state, data.config);
    })
  }

  get currentState() {
    return this.buttonState.value.state;
  }

  onBtnClick() {
    this.buttonClicked.emit('Button clicked');
  }

  updateState(state: ButtonState, config?: ButtonConfig) {
    if (state == ButtonState.Done) {
      setTimeout(() => {
        this.buttonState.next({ state: ButtonState.AddLocation, config: null });
      }, 500)
    }

    if (config) {
      this.config = config;
    }
    else {
      this.setDefautlConfig(state);
    }
  }

  setDefautlConfig(state: ButtonState) {
    this.config = new ButtonConfig;
    switch (state) {
      case ButtonState.AddLocation:
        this.config.text = "Add location";
        this.config.classes = "btn btn-primary";
        this.config.disabled = false;
        break;
      case ButtonState.Adding:
        this.config.text = "Adding...";
        this.config.classes = "btn btn-info";
        this.config.disabled = true;
        break;
      case ButtonState.Done:
        this.config.text = "Done";
        this.config.classes = "btn btn-success";
        this.config.disabled = true;
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.btnStateSub) {
      this.btnStateSub.unsubscribe();
    }
  }
}
