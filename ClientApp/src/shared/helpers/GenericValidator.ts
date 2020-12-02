import { FormGroup, AbstractControl, FormArray } from "@angular/forms";

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export enum ValidationTypes {
  Required,
  MaxLength,
  MinLength,
  Email,
  Pattern,
}
// ==========================================================
// this will auto papulate the messages based on the validator type
// ==========================================================
interface IFormFieldProps {
  fieldName: string;
  validationProps: IValidationProps[];
}
interface IValidationProps {
  validatorType: ValidationTypes;
  withValue?: any;
  message?: string;
  messageDefined?: boolean;
}
export class GenericValidator {
  // Provide the set of valid validation messages
  // Stucture:
  // controlName1: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // },
  // controlName2: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // }
  private validationMessages: { [key: string]: { [key: string]: string } };
  constructor(public formGroup: FormGroup = null) {}

  patchValue(fieldName: string, value: any, raiseEvent: boolean = false): void {
    const __field = this.formGroup.get(fieldName);
    if (__field) {
      __field.patchValue(value, { onlySelf: true, emitEvent: raiseEvent });
    }
  }

  patchValues(data: any): void {
    const __props = Object.keys(data);
    if (this.formGroup) {
      __props.forEach((key, _index) => {
        this.patchValue(key, data[key]);
      });
    }
  }

  initilizeFormValitorMessages(_validationMappings: {
    [key: string]: IFormFieldProps;
  }) {
    // ==========================================================
    // building a
    // ==========================================================
    let _messages = {};
    const _keys = Object.keys(_validationMappings);
    for (const key of _keys) {
      const fieldProp = _validationMappings[key];
      if (fieldProp && fieldProp.validationProps) {
        const _validations = {};
        for (let index = 0; index < fieldProp.validationProps.length; index++) {
          const validation = fieldProp.validationProps[index];
          switch (validation.validatorType) {
            case ValidationTypes.Required:
              Object.assign(_validations, {
                required: `${fieldProp.fieldName} is required.`,
              });
              break;
            case ValidationTypes.MaxLength:
              Object.assign(_validations, {
                maxlength: `${fieldProp.fieldName} is should not be greater than ${validation.withValue}.`,
              });
              break;
            case ValidationTypes.Email:
              Object.assign(_validations, {
                email: `${fieldProp.fieldName} is should be a valid email address.`,
              });
              break;
            case ValidationTypes.Pattern:
              Object.assign(_validations, {
                pattern: `${fieldProp.fieldName} is not valid.`,
              });
              break;
          }
        }
        _messages[key] = _validations;
      }
    }

    this.validationMessages = _messages;
  }

  processValidationOnFormArray(
    array: FormArray
  ): { [index: number]: { [key: string]: string } } {
    const result = {};
    if (array && array.controls.length > 0) {
      for (let index = 0; index < array.controls.length; index++) {
        const formGroup = array.controls[index] as FormGroup;
        const _validationErrors = this.processMessages(formGroup);
        result[index] = _validationErrors;
      }
    }
    return result;
  }

  // Processes each control within a FormGroup
  // And returns a set of validation messages to display
  // Structure
  // controlName1: 'Validation Message.',
  // controlName2: 'Validation Message.'
  processMessages(container: FormGroup): { [key: string]: string } {
    let messages = {};
    for (let controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        let c = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          let childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = "";
            if (c.errors) {
              for (let messageKey in c.errors) {
                if (
                  c.errors.hasOwnProperty(messageKey) &&
                  this.validationMessages[controlKey][messageKey]
                ) {
                  messages[controlKey] += this.validationMessages[controlKey][
                    messageKey
                  ];
                }
              }
            }
          }
        }
      }
    }
    return messages;
  }
}
