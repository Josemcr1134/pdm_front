import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appCurrencyInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputDirective),
      multi: true
    }
  ],
  standalone:true,
})
export class CurrencyInputDirective implements ControlValueAccessor {
  private el: HTMLInputElement | any;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
    this.el.value = value.replace(/[^\d.]/g, '');
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    const numberValue = parseFloat(value) || 0;
    this.el.value = this.currencyPipe.transform(numberValue, 'USD', 'symbol', '1.2-2');
    this.onChange(numberValue);
  }

  onChange = (value: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    if (value) {
      this.el.value = this.currencyPipe.transform(value, 'USD', 'symbol', '1.2-2');
    } else {
      this.el.value = '';
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
